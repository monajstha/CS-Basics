function fibs(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    if (i === 0) {
      arr.push(0);
      continue;
    }

    if (i === 1) {
      arr.push(1);
      continue;
    }

    let sum = arr[arr.length - 1] + arr[arr.length - 2];
    arr.push(sum);
  }
  return arr;
}

function fibsRec(num, arr = []) {
  if (arr.length === 0) {
    arr.push(0);
  }

  if (arr.length === 1 && num > 0) {
    arr.push(1);
  }

  if (arr.length > num) {
    return arr;
  }

  arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
  return fibsRec(num, arr);
}

console.log(fibsRec(3));
