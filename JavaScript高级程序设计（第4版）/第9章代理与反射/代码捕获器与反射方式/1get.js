const myTarget = {};
const proxy = new Proxy(myTarget, {
  get(target, property, receiver) {
    console.log("get()");
    return Reflect.get(...arguments);
  },
});
proxy.foo;

// 1. 返回值
// 返回值无限制。
// 2. 拦截的操作
//  proxy.property
//  proxy[property]
//  Object.create(proxy)[property]
//  Reflect.get(proxy, property, receiver)
// 3. 捕获器处理程序参数
//  target：目标对象。
//  property：引用的目标对象上的字符串键属性。
// ①  receiver：代理对象或继承代理对象的对象。
// 4. 捕获器不变式
// 如果 target.property 不可写且不可配置，则处理程序返回的值必须与 target.property 匹配。
// 如果 target.property 不可配置且[[Get]]特性为 undefined，处理程序的返回值也必须是 undefined。
