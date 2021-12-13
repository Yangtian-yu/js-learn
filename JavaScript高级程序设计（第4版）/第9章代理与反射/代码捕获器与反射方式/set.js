const mytarget = {};
const proxy = new Proxy(mytarget, {
  set() {
    console.log("set");
    return Reflect.set(...arguments);
  },
});
proxy.foo = "bar";
// 1. 返回值
// 返回 true 表示成功；返回 false 表示失败，严格模式下会抛出 TypeError。
// 2. 拦截的操作
//  proxy.property = value
//  proxy[property] = value
//  Object.create(proxy)[property] = value
//  Reflect.set(proxy, property, value, receiver)
// 3. 捕获器处理程序参数
//  target：目标对象。
//  property：引用的目标对象上的字符串键属性。
//  value：要赋给属性的值。
//  receiver：接收最初赋值的对象。
// 4. 捕获器不变式
// 如果 target.property 不可写且不可配置，则不能修改目标属性的值。
// 如果 target.property 不可配置且[[Set]]特性为 undefined，则不能修改目标属性的值。
// 在严格模式下，处理程序中返回 false 会抛出 TypeError。
