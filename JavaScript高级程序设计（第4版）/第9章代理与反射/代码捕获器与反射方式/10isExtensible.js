const myTarget = {};
const proxy = new Proxy(myTarget, {
  isExtensible(target) {
    console.log("isExtensible()");
    return Reflect.isExtensible(...arguments);
  },
});
Object.isExtensible(proxy);
// isExtensible()
// 1. 返回值
// isExtensible()必须返回布尔值，表示 target 是否可扩展。返回非布尔值会被转型为布尔值。
// 2. 拦截的操作
//  Object.isExtensible(proxy)
//  Reflect.isExtensible(proxy)
// 3. 捕获器处理程序参数
//  target：目标对象。
// 4. 捕获器不变式
// 如果 target 可扩展，则处理程序必须返回 true。
// 如果 target 不可扩展，则处理程序必须返回 false
