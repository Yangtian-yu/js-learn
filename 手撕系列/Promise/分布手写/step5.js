//5.实现定时器情况(如果promise中含有settimeout，在settimeout之后执行回调)
// 我们不能确保1秒后才执行then函数，但是我们可以保证1秒后再执行then里的回调
// 也就是在这1秒时间内，我们可以先把then里的两个回调保存起来，然后等到1秒过后，执行了resolve或者reject，
// 咱们再去判断状态，并且判断要去执行刚刚保存的两个回调中的哪一个回调。
// 那么问题来了，我们怎么知道当前1秒还没走完甚至还没开始走呢？其实很好判断，只要状态是pending，
// 那就证明定时器还没跑完，因为如果定时器跑完的话，那状态肯定就不是pending，而是fulfilled或者rejected
// 那是用什么来保存这些回调呢？建议使用数组，因为一个promise实例可能会多次then，用数组就一个一个保存了
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
  }
}

//测试：
const test1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功"); //1s后输出 成功
    //reject("失败")   //1s后输出 失败
  }, 1000);
}).then(
  (res) => console.log(res),
  (err) => console.log(err)
);
// console.log(test1);
// =>进行第六步
// 实现链式调用
