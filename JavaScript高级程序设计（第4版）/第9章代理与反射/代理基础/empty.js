const target = {
  id: "target",
};
const handler = {};
const proxy = new Proxy(target, handler);
console.log(proxy.id);
console.log(target.id);
target.id = " foo";
console.log(proxy.id);
console.log(target.id);
proxy.id = "bar";
console.log(proxy.id);
console.log(target.id);
//
// 使用代理的主要目的是可以定义捕获器（trap）。捕获器就是在处理程序对象中定义的“基本操作的
// 拦截器”。每个处理程序对象可以包含零个或多个捕获器，每个捕获器都对应一种基本操作，可以直接
// 或间接在代理对象上调用。每次在代理对象上调用这些基本操作时，代理可以在这些操作传播到目标对
// 象之前先调用捕获器函数，从而拦截并修改相应的行为。
console.log(
  "============================================================================="
);

const target1 = {
  foo: "bar",
};
const handler1 = {
  //捕获器在处理程序对象中以方法名为键；
  get() {
    return "handler override";
  },
};
const proxy1 = new Proxy(target1, handler1);
console.log(target1.foo);
console.log(proxy1.foo);
console.log(target1["foo"]);
console.log(proxy1["foo"]);
console.log(Object.create(target1)["foo"]);
console.log(Object.create(proxy1)["foo"]);
