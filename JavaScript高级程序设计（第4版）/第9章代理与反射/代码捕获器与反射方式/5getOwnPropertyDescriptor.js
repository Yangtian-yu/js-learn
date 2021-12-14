const myTarget = {};
const proxy = new Proxy(myTarget, {
  getOwnPropertyDescriptor(target, property) {
    console.log("getOwnPropertyDescriptor()");
    return Reflect.getOwnPropertyDescriptor(...arguments);
  },
});
Object.getOwnPropertyDescriptor(proxy, "foo");
// getOwnPropertyDescriptor()
// 1. 返回值
// getOwnPropertyDescriptor()必须返回对象，或者在属性不存在时返回 undefined。
// 2. 拦截的操作
//  Object.getOwnPropertyDescriptor(proxy, property)
//  Reflect.getOwnPropertyDescriptor(proxy, property)
// 3. 捕获器处理程序参数
//  target：目标对象。
//  property：引用的目标对象上的字符串键属性。
// 4. 捕获器不变式
// 如果自有的 target.property 存在且不可配置，则处理程序必须返回一个表示该属性存在的
// 对象。
// 如果自有的 target.property 存在且可配置，则处理程序必须返回表示该属性可配置的对象。
// 如果自有的 target.property 存在且 target 不可扩展，则处理程序必须返回一个表示该属性存
// 在的对象。
// 如果 target.property 不存在且 target 不可扩展，则处理程序必须返回 undefined 表示该属
// 性不存在。
// 如果 target.property 不存在，则处理程序不能返回表示该属性可配置的对象。
