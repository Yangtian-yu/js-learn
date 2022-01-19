//异步实现完善
//在状态（status）为pending是把开发者传进来的onfufilled方法存起来，再在resolv方法中执行即可
function Promise(executor) {
  this.status = "pending";
  this.value = null;
  this.reason = null;
  this.onFulfilledFunc = Function.prototype;
  this.onRejectedFunc = Function.prototype;
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
        this.onFulfilledFunc(this.value);
      }
    });
  };
  const reject = (reason) => {
    setTimeout(() => {
      if (this.status === "pending") {
        this.reason = reason;
        this.status = "rejected";
        this.onRejectedFunc(this.value);
      }
    });
  };
  executor(resolve, reject);
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
    this.onFulfilledFunc = onFulfilled;
    this.onRejectedFunc = onRejected;
  }
};

// =>promise细节完善
