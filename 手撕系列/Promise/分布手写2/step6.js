//promise链式调用的完善实现
//变量result可以是一个普通值，可以是一个promise实例
//我们抽象出resolvepromise方法进行统一处理
//resolvepromise函数接受以下4个参数
//1.promise2：返回的prmise实例
//2.result：onfulfilled或onrejected函数的返回值
//3.resolve：promise2的resolve方法
//4.reject：promise2的reject方法
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
const resolvePromise = (promise2, result, resolve, reject) => {
  //当result和promise2相等时，也就是在onfulfilled返回promise2时，执行reject
  if (result === promise2) {
    reject(new TypeError("error due to circular reference"));
  }
  //是否已经通过执行onfuifilled或onrejected
  let consumed = false;
  let thenable;
  if (result instanceof Promise) {
    if (result.status === "pending") {
      result.then(function (data) {
        resolvePromise(promise2, data, resolve, reject);
      }, reject);
    } else {
      result.then(resolve, reject);
    }
    return;
  }
  let isComplexResult = (target) =>
    (typeof target === "function" || typeof target === "object") &&
    target !== null;

  //如果返回的是疑似Promise类型
  if (isComplexResult(result)) {
    try {
      thenable = result.then;
      //判断返回值是否是promise类型
      if (typeof thenable === "function") {
        thenable.call(
          result,
          function (data) {
            if (consumed) {
              return;
            }
            consumed = true;
            return resolvePromise(promise2, data, resolve, reject);
          },
          function (error) {
            if (consumed) {
              return;
            }
            consumed = true;
            return reject(error);
          }
        );
      } else {
        resolve(result);
      }
    } catch (e) {
      if (consumed) {
        return;
      }
      consumed = true;
      return reject(e);
    }
  } else {
    resolve(result);
  }
};

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
          resolvePromise(promise2, result, resolve, reject);
          // resolve(result);
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
          // resolve(result);
          resolvePromise(promise2, result, resolve, reject);
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
          // resolve(result);
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
      this.onRejectedArray.push(() => {
        try {
          let result = onRejected(this.reason);
          // resolve(result);
          resolvePromise(promise2, result, resolve, reject);
        } catch (error) {
          reject(e);
        }
      });
    }));
  }
};

// =>promise静态方法和其他方法实现
