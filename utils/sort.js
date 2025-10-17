export function quickSort(arr, compare) {
  const a = arr.slice();
  _quickSort(a, 0, a.length - 1, compare);
  return a;
}

function _quickSort(a, lo, hi, compare) {
  if (lo >= hi) return;
  const p = _partition(a, lo, hi, compare);
  _quickSort(a, lo, p - 1, compare);
  _quickSort(a, p + 1, hi, compare);
}

function _partition(a, lo, hi, compare) {
  
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (compare(a[j], pivot) <= 0) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  return i;
}


 // Helpers to build comparators
export const buildComparator = (key, order = "asc") => {
  const dir = order === "desc" ? -1 : 1;

  if (key === "price" || key === "quantity" || key === "id") {
    return (a, b) => {
      const av = Number(a[key]);
      const bv = Number(b[key]);
      if (av < bv) return -1 * dir;
      if (av > bv) return  1 * dir;
      return 0;
    };
  }

  // String: name, category
  return (a, b) => {
    const av = String(a[key] ?? "").toLocaleLowerCase();
    const bv = String(b[key] ?? "").toLocaleLowerCase();
    // localeCompare gives consistent ordering for text
    return av.localeCompare(bv) * dir;
  };
};
