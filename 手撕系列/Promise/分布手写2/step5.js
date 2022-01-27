//promise实现链式调用

function Promise(executor) {
  this.status = "pending";
  this.value = null;
  this.reason = null;
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
  //promise2将作为then方法的返回值
  let promise2;
  if (this.status === "fulfilled") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          //这个新的promise2 resolved的值为onfulfilled的执行结果
          let result = onFulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }
  if (this.status === "rejected") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          //这个新的promise2的经过reject处理后的值为onrejected的执行结果
          let result = onRejected(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }
  if (this.status === "pending") {
    return (promise2 = new Promise((resolve, reject) => {
      this.onFulfilledArray.push(() => {
        try {
          let result = onFulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.onRejectedArray.push(() => {
        try {
          let result = onRejected(this.reason);
          resolve(result);
        } catch (error) {
          reject(e);
        }
      });
    }));
  }
};

// =>promise链式调用的完善实现
