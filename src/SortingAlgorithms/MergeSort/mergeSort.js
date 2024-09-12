function merge(arr, start, mid, end) {
  // Calculate the length for temp arrays
  const n1 = mid - start + 1;
  const n2 = end - mid;

  // Create temp arrays
  const leftArr = new Array(n1);
  const rightArr = new Array(n2);

  // Copy all the array elements to temp arrays
  for (let i = 0; i < n1; i++) {
    leftArr[i] = arr[start + i];
  }

  for (let j = 0; j < n2; j++) {
    rightArr[j] = arr[mid + 1 + j];
  }

  // Sort and merge the temp arrays back into the arr
  let i = 0,
    j = 0;
  let k = start;

  while (i < n1 && j < n2) {
    if (leftArr[i] < rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }

  // Copy the remianing elements
  for (; i < n1; i++) {
    arr[k++] = leftArr[i];
  }

  for (; j < n2; j++) {
    arr[k++] = rightArr[j];
  }

  //   Return the sorted array
  return arr;
}

function mergeSort(arr, start = 0, end = arr.length - 1) {
  // Return if there is only one element in the array
  if (start >= end) return;

  //  Calculate the mid of the array
  const mid = Math.floor(start + (end - start) / 2);

  //   Divide the left half
  mergeSort(arr, start, mid);

  //   Divide the right half
  mergeSort(arr, mid + 1, end);

  //   Merge the arrays
  return merge(arr, start, mid, end);
}

let arr = [3, 2, 1, 13, 8, 5, 0, 1];
console.log(mergeSort(arr));
