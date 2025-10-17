import express from 'express';
import morgan from 'morgan';
import { binarySearch } from './utils/utils.js';
import { quickSort, buildComparator } from './utils/sort.js';

const app = express();
const PORT = 5511;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Sample Grocery Store inventory data
let products = [
  { id: 1, name: 'Strawberries', category: 'Produce',   price: 9.99, quantity: 25 },
  { id: 2, name: 'Bok Choy',     category: 'Produce',   price: 4.99, quantity: 15 },
  { id: 3, name: 'Licorice',     category: 'Candy',     price: 5.99, quantity: 30 },
  { id: 4, name: 'Oat Milk',     category: 'Beverages', price: 6.99, quantity: 12 },
  { id: 5, name: 'Cheese',       category: 'Dairy',     price: 10.99, quantity: 50 },
  { id: 6, name: 'Muffins',      category: 'Bakery',    price: 3.99, quantity: 10 },
];

const generateId = () => {
  return products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
};

// Routes

// Lists all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Sort products via different values
app.get('/products/sorted', (req, res) => {
  console.log('Sorted Products');
  const by = String(req.query.by ?? 'name');
  const order = String(req.query.order ?? 'asc').toLowerCase();
  const allowed = new Set(['name', 'price', 'category']);

  if (!allowed.has(by)) {
    return res.status(400).json({ error: "Invalid 'by' param. Use name|price|category" });
  }

  const cmp = buildComparator(by, order === 'desc' ? 'desc' : 'asc');
  const sorted = quickSort(products, cmp);
  res.json(sorted);
});

// Search for product by name (exact name only, not case sensitive)
app.get('/products/search', (req, res) => {
  const { query } = req.query;

  if (!query || typeof query !== 'string' || query.trim() === '') {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const searchTerm = query.trim().toLowerCase();

  const sortedProducts = [...products].sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    return aName.localeCompare(bName);
  });

  const lowercasedNames = sortedProducts.map(p => p.name.toLowerCase());
  const index = binarySearch(lowercasedNames, searchTerm);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(sortedProducts[index]);
});

// Get a single product by numeric ID
app.get('/products/:id', (req, res) => {
  const idParam = req.params.id;

  // digits only validation 
  if (!/^\d+$/.test(idParam)) {
    return res.status(400).json({ error: 'ID must be an integer' });
  }

  const id = Number(idParam);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

// Update a product by ID
app.put('/products/:id', (req, res) => {
  const idParam = req.params.id;

  if (!/^\d+$/.test(idParam)) {
    return res.status(400).json({ error: 'ID must be an integer' });
  }

  const id = Number(idParam);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, category, price, quantity } = req.body;

  // allow 0 values with nullish coalescing
  product.name     = name     ?? product.name;
  product.category = category ?? product.category;
  product.price    = price    ?? product.price;
  product.quantity = quantity ?? product.quantity;

  res.json(product);
});

// Create a new product
app.post('/products', (req, res) => {
  const { name, category, price, quantity } = req.body;

  // allow 0 for price/quantity
  if (!name || !category || price == null || quantity == null) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newProduct = { id: generateId(), name, category, price, quantity };
  products.push(newProduct);

  res.status(201).json(newProduct);
});

// Error handler 
app.use((err, req, res, next) => {
  console.error('ERROR:', err.stack || err);
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});


console.log('Registered routes:');
for (const layer of (app._router?.stack || [])) {
  if (layer.route) console.log(Object.keys(layer.route.methods), layer.route.path);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// npm run dev