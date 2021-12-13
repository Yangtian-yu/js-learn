const myTarget = {};
const proxy = new Proxy(myTarget, {
  getPrototypeOf(target) {
    console.log("getPrototypeOf()");
    return Reflect.getPrototypeOf(...arguments);
  },
});
Object.getPrototypeOf(proxy);
// getPrototypeOf()
// 1. 返回值
// getPrototypeOf()必须返回对象或 null。
// 2. 拦截的操作
//  Object.getPrototypeOf(proxy)
//  Reflect.getPrototypeOf(proxy)
//  proxy.__proto__
//  Object.prototype.isPrototypeOf(proxy)
//  proxy instanceof Object
// 3. 捕获器处理程序参数
//  target：目标对象。
// 4. 捕获器不变式
// 如果 target 不可扩展，则 Object.getPrototypeOf(proxy)唯一有效的返回值就是 Object.
// getPrototypeOf(target)的返回值。
