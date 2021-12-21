const arr = [45, 78, 42, 47, 12, 58, 9, 5, 78, 31];
const sortFunction = function (arr) {
  for (var i = 0; i <= arr.length - 1; i++) {
    for (var j = 0; j <= arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};

const res = sortFunction(arr);
console.log(res);
