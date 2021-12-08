//提前终止迭代器
class Counter {
  constructor(limit) {
    this.limit = limit;
  }
  [Symbol.iterator]() {
    let count = 1,
      limit = this.limit;
    return {
      next() {
        if (count <= limit) {
          return { done: false, value: count++ };
        } else {
          return { done: true };
        }
      },
      return() {
        console.log("Exiting early");
        return { done: true };
      },
    };
  }
}
let counter1 = new Counter(5);
for (let i of counter1) {
  if (i > 2) {
    break;
  }
  console.log(i);
}

// 如果迭代器没有关闭，则还可以继续从上次离开的地方继续迭代。比如，数组的迭代器就是不能关
// 闭的：
let a = [1, 2, 3, 4, 5];
let iter = a[Symbol.iterator]();
for (let i of iter) {
  console.log(i);
  if (i > 2) {
    break;
  }
}
// 1
// 2
// 3
for (let i of iter) {
  console.log(i);
}
// 4
// 5
