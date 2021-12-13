const myTarget = {};
const proxy = new Proxy(myTarget, {
  defineProperty(target, property, descriptor) {
    console.log("defineProperty()");
    return Reflect.defineProperty(...arguments);
  },
});
Object.defineProperty(proxy, "foo", { value: "bar" });
// defineProperty()
// 1. 返回值
// defineProperty()必须返回布尔值，表示属性是否成功定义。返回非布尔值会被转型为布尔值。
// 2. 拦截的操作
//  Object.defineProperty(proxy, property, descriptor)
//  Reflect.defineProperty(proxy, property, descriptor)
// 3. 捕获器处理程序参数
//  target：目标对象。
//  property：引用的目标对象上的字符串键属性。
//  descriptor：包含可选的 enumerable、configurable、writable、value、get 和 set
// 定义的对象。
// 4. 捕获器不变式
// 如果目标对象不可扩展，则无法定义属性。
// 如果目标对象有一个可配置的属性，则不能添加同名的不可配置属性。
// 如果目标对象有一个不可配置的属性，则不能添加同名的可配置属性。
