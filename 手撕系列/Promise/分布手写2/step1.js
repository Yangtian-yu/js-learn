// 实现promise实例状态（pending，fufilled，rejected）
//提供resolve，reject方法
function Promise(executor) {
  this.status = "pending";
  this.value = null;
  this.reason = null;
  // 因为resolve的最终调用是由开发者在不确定环境下（往往是在全局中）直接调用的，
  //因此为了在resolve函数中能够拿到promise函数来保证this执行的准确性
  const resolve = (value) => {
    this.value = value;
  };
  const reject = (reason) => {
    this.reason = reason;
  };
  executor(resolve, reject);
}
// 为了保证onfulfilled、onrejected能够健壮的执行，我们为其设置了默认值，其默认值
//为一个函数元（Function.prototype）
Promise.prototype.then = function (
  onFulfilled = Function.prototype,
  onRejected = Function.prototype
) {
  onFulfilled(this.value);
  onRejected(this.reason);
};

// =>promise实现状态完善
