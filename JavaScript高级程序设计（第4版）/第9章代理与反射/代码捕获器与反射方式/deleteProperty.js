const myTarget = {};
const proxy = new Proxy(myTarget, {
  deleteProperty(target, property) {
    console.log("deleteProperty()");
    return Reflect.deleteProperty(...arguments);
  },
});
delete proxy.foo;
// deleteProperty()
// 1. 返回值
// deleteProperty()必须返回布尔值，表示删除属性是否成功。返回非布尔值会被转型为布尔值。
// 2. 拦截的操作
//  delete proxy.property
//  delete proxy[property]
//  Reflect.deleteProperty(proxy, property)
// 3. 捕获器处理程序参数
//  target：目标对象。
//  property：引用的目标对象上的字符串键属性。
// 4. 捕获器不变式
// 如果自有的 target.property 存在且不可配置，则处理程序不能删除这个属性
