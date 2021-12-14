const target = {
  foo: "bar",
};
const porxy = new Proxy(target, {
  get(target, property, receiver) {
    console.log(target, "target");
    console.log(property, "property");
    console.log(receiver, "receiver");
    return Reflect.get(...arguments);
  },
  set() {
    console.log(...arguments, "-----------");
    return Reflect.set(...arguments);
  },
});
porxy.foo;
porxy.foo = "baz";
console.log(target, "****");
