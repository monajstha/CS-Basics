function merge(arr, start, mid, end) {
  //   Length of temp arrays
  let n1 = mid - start + 1;
  let n2 = end - mid;

  //   Create temp arrays
  const leftArr = new Array(n1);
  const rightArr = new Array(n2);

  //   Copy data to temp arrays leftArr and rightArr
  for (let i = 0; i < n1; i++) {
    leftArr[i] = arr[start + i];
  }

  for (let j = 0; j < n2; j++) {
    rightArr[j] = arr[mid + 1 + j];
  }

  let i = 0,
    j = 0;
  let k = start;

  //   Sort and merge the temp arrays back into the arr
  while (i < n1 && j < n2) {
    if (leftArr[i] < rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }

  //   Copy the remaining elements
  for (; i < n1; i++) {
    arr[k++] = leftArr[i];
  }

  for (; j < n2; j++) {
    arr[k++] = rightArr[j];
  }

  //   Return the sorted arr
  return arr;
}

function mergeSort(arr, start, end) {
  if (start >= end) return;

  const mid = Math.floor(start + (end - start) / 2);

  mergeSort(arr, start, mid);
  mergeSort(arr, mid + 1, end);
  return merge(arr, start, mid, end);
}

const arr = [12, 11, 13, 5, 6, 7];
console.log(mergeSort(arr, 0, arr.length - 1));
