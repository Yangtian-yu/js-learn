//6.实现链式调用
// then支持链式调用，下一次then执行受上一次then返回值的影响
//1、then方法本身会返回一个新的Promise对象
//2、如果返回值是promise对象，返回值为成功，新promise就是成功
//3、如果返回值是promise对象，返回值为失败，新promise就是失败
//4、如果返回值非promise对象，新promise对象就是成功，值为此返回值
class MyPromise {
  //构造方法
  constructor(executor) {
    //初始化值
    this.initValue();
    //初始化this指向
    this.initBind();
    // 第三步
    try {
      //执行传进来的函数
      executor(this.resolve, this.reject);
    } catch (e) {
      //捕捉到错误直接执行reject
      this.reject(e);
    }
  }
  initBind() {
    //初始化this
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  initValue() {
    //初始化值
    this.PromiseResult = null; //终值
    this.PromiseState = "pending"; //状态
    this.onFulfilledCallbacks = []; //保存成功回调
    this.onRejectedCallbacks = []; //保存失败回调
  }
  resolve(value) {
    //state状态不可变
    if (this.PromiseState !== "pending") return;
    //如果执行resolve，状态变为fulfilled
    this.PromiseState = "fulfilled";
    //终值为传进来的值
    this.PromiseResult = value;
    //执行保存的成功回调 //第五步
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult);
    }
  }
  reject(resson) {
    //state状态不可变
    if (this.PromiseState !== "pending") return;
    //如果执行reject，状态变为"reject"
    this.PromiseState = "rejected";
    //终值为传进来的值
    this.PromiseResult = resson;
    //执行保存的失败回调 //第五步
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult);
    }
  }
  then(onFulfilled, onRejected) {
    //接收两个回调onFulfilled，onRejected
    //参数校验，确保一定是函数
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (val) => {
            throw val;
          };

    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        setTimeout(() => {
          try {
            const x = cb(this.PromiseResult);
            if (x === thenPromise) {
              //不能返回自身
              throw new Error("不能返回自身...");
            }
            if (x instanceof MyPromise) {
              // 如果返回值是Promise
              // 如果返回值是promise对象，返回值为成功，新promise就是成功
              // 如果返回值是promise对象，返回值为失败，新promise就是失败
              // 谁知道返回的promise是失败成功？只有then知道
              x.then(resolve, reject);
            } else {
              //将promise就直接成功
              resolve(x);
            }
          } catch (error) {
            //处理错误
            reject(err);
            throw new Error(err);
          }
        });
      };
    });

    if ((this.PromiseState = "fulfilled")) {
      //如果当前为成功状态，执行第一个回调
      onFulfilled(this.PromiseResult);
    } else if ((this.PromiseState = "rejected")) {
      //如果当前为失败状态，执行第二个回调
      onRejected(this.PromiseResult);
    } else if (this.PromiseState === "pending") {
      //第五步
      //如果状态为特定状态，暂时保存两个回调
      this.onFulfilledCallbacks.push(onFulfilled.bind(this));
      this.onRejectedCallbacks.push(onRejected.bind(this));
    }
    //返回这个包装的promise
    return thenPromise;
  }
}

//测试：
const test3 = new MyPromise((resolve, reject) => {
  resolve(100); // 输出 状态：成功 值：200
  // reject(100) // 输出 状态：失败 值：300
})
  .then(
    (res) => 2 * res,
    (err) => 3 * err
  )
  .then(
    (res) => console.log("成功", res),
    (err) => console.log("失败", err)
  );
const test4 = new MyPromise((resolve, reject) => {
  resolve(100); // 输出 状态：失败 值：300
  // reject(100) // 输出 状态：成功 值：200
  // 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
})
  .then(
    (res) => new MyPromise((resolve, reject) => reject(2 * res)),
    (err) => new MyPromise((resolve, reject) => resolve(3 * res))
  )
  .then(
    (res) => console.log("成功", res),
    (err) => console.log("失败", err)
  );
