//原型式继承
// 2006 年，Douglas Crockford 写了一篇文章：《JavaScript 中的原型式继承》（“Prototypal Inheritance in
// JavaScript”）。这篇文章介绍了一种不涉及严格意义上构造函数的继承方法。他的出发点是即使不自定义
// 类型也可以通过原型实现对象之间的信息共享。文章最终给出了一个函数：
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
// 这个 object()函数会创建一个临时构造函数，将传入的对象赋值给这个构造函数的原型，然后返
// 回这个临时类型的一个实例。本质上，object()是对传入的对象执行了一次浅复制。来看下面的例子：
let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"],
};
let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
// Crockford 推荐的原型式继承适用于这种情况：你有一个对象，想在它的基础上再创建一个新对象。
// 你需要把这个对象先传给 object()，然后再对返回的对象进行适当修改。在这个例子中，person 对
// 象定义了另一个对象也应该共享的信息，把它传给 object()之后会返回一个新对象。这个新对象的原型
// 是 person，意味着它的原型上既有原始值属性又有引用值属性。这也意味着 person.friends 不仅是
// person 的属性，也会跟 anotherPerson 和 yetAnotherPerson 共享。这里实际上克隆了两个 person。
// ECMAScript 5 通过增加 Object.create()方法将原型式继承的概念规范化了。这个方法接收两个
// 参数：作为新对象原型的对象，以及给新对象定义额外属性的对象（第二个可选）。在只有一个参数时，
// Object.create()与这里的 object()方法效果相同：
let anotherPerson1 = Object.create(person);
anotherPerson1.name = "Greg";
anotherPerson1.friends.push("Rob");
let yetAnotherPerson1 = Object.create(person);
yetAnotherPerson1.name = "Linda";
yetAnotherPerson1.friends.push("Barbie");
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
// Object.create()的第二个参数与 Object.defineProperties()的第二个参数一样：每个新增
// 属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性。比如：
let anotherPerson2 = Object.create(person, {
  name: {
    value: "Greg",
  },
});
console.log(anotherPerson2.name); // "Greg"
// 原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但要记住，
// 属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的
// 寄生式继承
// 接ParasiticInheritance.js
