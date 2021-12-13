const mytarget = {};
const proxy = new Proxy(mytarget, {
  has() {
    console.log("has");
    return Reflect.has(...arguments);
  },
});

"foo" in proxy;
// 1. 返回值
// has()必须返回布尔值，表示属性是否存在。返回非布尔值会被转型为布尔值。
// 2. 拦截的操作
//  property in proxy
//  property in Object.create(proxy)
//  with(proxy) {(property);}
//  Reflect.has(proxy, property)
// 3. 捕获器处理程序参数
//  target：目标对象。
//  property：引用的目标对象上的字符串键属性。
// 4. 捕获器不变式
// 如果 target.property 存在且不可配置，则处理程序必须返回 true。
// 如果 target.property 存在且目标对象不可扩展，则处理程序必须返回 true。
