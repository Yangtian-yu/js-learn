const myTarget = {};
const proxy = new Proxy(myTarget, {
  setPrototypeOf(target, prototype) {
    console.log("setPrototypeOf()");
    return Reflect.setPrototypeOf(...arguments);
  },
});
Object.setPrototypeOf(proxy, Object);
// setPrototypeOf()
// 1. 返回值
// setPrototypeOf()必须返回布尔值，表示原型赋值是否成功。返回非布尔值会被转型为布尔值。
// 2. 拦截的操作
//  Object.setPrototypeOf(proxy)
//  Reflect.setPrototypeOf(proxy)
// 3. 捕获器处理程序参数
//  target：目标对象。
//  prototype：target 的替代原型，如果是顶级原型则为 null。
// 4. 捕获器不变式
// 如果 target 不可扩展，则唯一有效的 prototype 参数就是 Object.getPrototypeOf(target)
// 的返回值。
