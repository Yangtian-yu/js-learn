const myTarget = {};
const proxy = new Proxy(myTarget, {
  preventExtensions(target) {
    console.log("preventExtensions()");
    return Reflect.preventExtensions(...arguments);
  },
});
Object.preventExtensions(proxy);
// preventExtensions()
// 1. 返回值
// preventExtensions()必须返回布尔值，表示 target 是否已经不可扩展。返回非布尔值会被转
// 型为布尔值。
// 2. 拦截的操作
//  Object.preventExtensions(proxy)
//  Reflect.preventExtensions(proxy)
// 3. 捕获器处理程序参数
//  target：目标对象。
// 4. 捕获器不变式
// 如果 Object.isExtensible(proxy)是 false，则处理程序必须返回 true。
