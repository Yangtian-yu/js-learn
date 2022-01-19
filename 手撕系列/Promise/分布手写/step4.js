//4.实现then
// 总结点
//1.then接收两个回调，一个是成功回调。一个是失败回调
//2.当promise状态为fulfilled执行成功回调，为rejected执行失败回调
//3.如resolve或reject在定时器里，则定时器结束后再执行then
//4.then支持链式调用，下一次then执行，受上一次then返回值的影响
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
  }
  resolve(value) {
    //state状态不可变
    if (this.PromiseState !== "pending") return;
    //如果执行resolve，状态变为fulfilled
    this.PromiseState = "fulfilled";
    //终值为传进来的值
    this.PromiseResult = value;
  }
  reject(resson) {
    //state状态不可变
    if (this.PromiseState !== "pending") return;
    //如果执行reject，状态变为"reject"
    this.PromiseState = "rejected";
    //终值为传进来的值
    this.PromiseResult = resson;
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
    }
  }
}

//测试：
const test1 = new MyPromise((resolve, reject) => {
  resolve("成功");
}).then(
  (res) => console.log(res),
  (err) => console.log(err)
);

console.log(test1);
// =>进行第五步
// 实现定时器情况
