// 1、执行了resolve，Promise状态会变成fulfilled
// 2、执行了reject，Promise状态会变成rejected
// 3、Promise只以第一次为准，第一次成功就永久为fulfilled，第一次失败就永远状态为rejected
// 4、Promise中有throw的话，就相当于执行了reject 那么咱们就把这四个知识点一步步实现吧！！！

// 1、实现resolve与reject
// 大家要注意：Promise的初始状态是pending
// 这里很重要的一步是resolve和reject的绑定this，为什么要绑定this呢？
// 这是为了resolve和reject的this指向永远指向当前的MyPromise实例，防止随着函数执行环境的改变而改变
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
    //如果执行resolve，状态变为fulfilled
    this.PromiseState = "fulfilled";
    //终值为传进来的值
    this.PromiseResult = value;
  }
  reject(resson) {
    //如果执行reject，状态变为"reject"
    this.PromiseState = "reject";
    //终值为传进来的值
    this.PromiseResult = resson;
  }
}

//测试：
const test1 = new MyPromise((resolve, reject) => {
  resolve("成功");
});

console.log(test1); // MyPromise { PromiseState: 'fulfilled', PromiseResult: '成功' }

const test2 = new MyPromise((resolve, reject) => {
  reject("失败");
});
console.log(test2); // MyPromise { PromiseState: 'rejected', PromiseResult: '失败' }

//上面的代码实现了resove和reject。但是无法实现状态一旦改变就确定promise的最终状态；
const test3 = new MyPromise((resolve, reject) => {
  resolve("成功");
  reject("失败");
});
console.log(test3); // MyPromise { PromiseState: 'rejected', PromiseResult: '失败' }
// 正确的应该是状态为fulfilled，结果是成功，这里明显没有以第一次为准

// 之前说了，Promise只以第一次为准，第一次成功就永久为fulfilled，第一次失败就永远状态为rejected
// =>进行第二步
