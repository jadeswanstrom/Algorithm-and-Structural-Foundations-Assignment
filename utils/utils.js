export function binarySearch(arr, key) {
  
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] === key) {
      return mid; // Key found
    } else if (arr[mid] < key) {
      start = mid + 1; // Search in the right half
    } else {
      end = mid - 1; // Search in the left half
    }
  }

  return -1; // Key not found
}