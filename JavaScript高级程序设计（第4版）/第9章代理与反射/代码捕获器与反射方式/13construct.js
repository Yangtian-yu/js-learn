const myTarget = function () {};
const proxy = new Proxy(myTarget, {
  construct(target, argumentsList, newTarget) {
    console.log("construct()");
    return Reflect.construct(...arguments);
  },
});
new proxy();
// construct()
// 1. 返回值
// construct()必须返回一个对象。
// 2. 拦截的操作
//  new proxy(...argumentsList)
//  Reflect.construct(target, argumentsList, newTarget)
// 3. 捕获器处理程序参数
//  target：目标构造函数。
//  argumentsList：传给目标构造函数的参数列表。
//  newTarget：最初被调用的构造函数。
// 4. 捕获器不变式
// target 必须可以用作构造函数。
