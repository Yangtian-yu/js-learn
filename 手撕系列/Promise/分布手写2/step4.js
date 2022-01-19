//promise细节完善
//将所有then方法找这个你的onfufilledFunc储存到一个数组onfuufilledArrat中
//在当前promise被决议时依次执行onfulfilledarray数组内的方法
//使两个promise.then时  后一个方法的调用不会覆盖前一个方法

function Promise(executor) {
  this.status = "pending";
  this.value = null;
  this.reason = null;
  // this.onFulfilledFunc = Function.prototype;
  // this.onRejectedFunc = Function.prototype;
  this.onFulfilledArray = [];
  this.onRejectedArray = [];
  // 因为resolve的最终调用是由开发者在不确定环境下（往往是在全局中）直接调用的，
  //因此为了在resolve函数中能够拿到promise函数来保证this执行的准确性
  const resolve = (value) => {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (this.status === "pending") {
        this.value = value;
        this.status = "fulfilled";
        this.onFulfilledArray.forEach((func) => func(value));
      }
    });
  };
  const reject = (reason) => {
    setTimeout(() => {
      if (this.status === "pending") {
        this.reason = reason;
        this.status = "rejected";
        this.onRejectedArray.forEach((func) => func(reason));
      }
    });
  };
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
// 为了保证onfulfilled、onrejected能够健壮的执行，我们为其设置了默认值，其默认值
//为一个函数元（Function.prototype）
Promise.prototype.then = function (onFulfilled, onRejected) {
  (onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (data) => data),
    (onRejected =
      typeof onRejected === "function"
        ? onFulfilled
        : (error) => {
            throw error;
          });
  if (this.status === "fulfilled") {
    onFulfilled(this.value);
  }
  if (this.status === "rejected") {
    onRejected(this.reason);
  }
  if (this.status === "pending") {
    this.onFulfilledArray.push(onFulfilled);
    this.onRejectedArray.push(onRejected);
  }
};

// =>promise实现链式调用
