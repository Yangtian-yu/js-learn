// 所有捕获器都可以访问相应的参数，基于这些参数可以重建被捕获方法的原始行为。比如，get()
// 捕获器会接收到目标对象、要查询的属性和代理对象三个参数。
const target = {
  foo: "bar",
  baz: "qux",
};
const hanlder = {
  get(trapTarget, property, receiver) {
    let decoration = "";
    if (property === "foo") {
      decoration = "!!!";
    }
    return Reflect.get(...arguments) + decoration;
  },
};
const { proxy, revoke } = Proxy.revocable(target, hanlder);
console.log(proxy.foo);
console.log(target.foo);
console.log(proxy.baz);
console.log(target.baz);
revoke();
