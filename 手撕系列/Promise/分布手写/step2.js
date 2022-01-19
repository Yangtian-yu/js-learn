//2.实现状态不可变
class MyPromise {
  //构造方法
  constructor(executor) {
    //初始化值
    this.initValue();
    //初始化this指向
    this.initBind();
    //执行传进来的函数
    executor(this.resolve, this.reject);
  }
  initBind() {
    //初始化this
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  initValue() {
    //初始化值
    this.PromiseResult = null; //终值
    this.PromiseState = "pending";
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
    this.PromiseState = "reject";
    //终值为传进来的值
    this.PromiseResult = resson;
  }
}

//测试：
const test1 = new MyPromise((resolve, reject) => {
  resolve("成功");
  reject("失败");
});

console.log(test1);
// =>进行第三步
