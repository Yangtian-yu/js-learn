// 通过原型链实现继承
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperValue = function () {
  return this.property;
};
function SubType() {
  this.subproperty = false;
}
// 继承 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
  return this.subproperty;
};
let instance = new SubType();
console.log(instance.getSuperValue()); // true
// . 原型与继承关系
console.log(instance instanceof Object); // true
console.log(instance instanceof SuperType); // true
console.log(instance instanceof SubType); // true
console.log(Object.prototype.isPrototypeOf(instance)); // true
console.log(SuperType.prototype.isPrototypeOf(instance)); // true
console.log(SubType.prototype.isPrototypeOf(instance)); // true
//原型链的问题
// 原型链虽然是实现继承的强大工具，但它也有问题。主要问题出现在原型中包含引用值的时候。前
// 面在谈到原型的问题时也提到过，原型中包含的引用值会在所有实例间共享，这也是为什么属性通常会
// 在构造函数中定义而不会定义在原型上的原因。在使用原型实现继承时，原型实际上变成了另一个类型
// 的实例。这意味着原先的实例属性摇身一变成为了原型属性。

// 子类型在实例化时不能给父类型的构造函数传参。事实上，我们无法在不
// 影响所有对象实例的情况下把参数传进父类的构造函数。再加上之前提到的原型中包含引用值的问题，
// 就导致原型链基本不会被单独使用。
//盗用构造函数
// 为了解决原型包含引用值导致的继承问题，一种叫作“盗用构造函数”（constructor stealing）的技
// 术在开发社区流行起来（这种技术有时也称作“对象伪装”或“经典继承”）。基本思路很简单：在子类
// 构造函数中调用父类构造函数。因为毕竟函数就是在特定上下文中执行代码的简单对象，所以可以使用
// apply()和 call()方法以新创建的对象为上下文执行构造函数。来看下面的例子：
function SuperType1() {
  this.colors = ["red", "blue", "green"];
}
function SubType1() {
  // 继承 SuperType
  SuperType1.call(this);
}
let instance1 = new SubType1();
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
let instance2 = new SubType1();
console.log(instance2.colors); // "red,blue,green"
// 1. 传递参数
// 相比于使用原型链，盗用构造函数的一个优点就是可以在子类构造函数中向父类构造函数传参。来
// 看下面的例子：
function SuperType3(name) {
  this.name = name;
}
function SubType3() {
  // 继承 SuperType 并传参
  SuperType3.call(this, "Nicholas");
  // 实例属性
  this.age = 29;
}
let instance3 = new SubType3();
console.log(instance3.name); // "Nicholas";
console.log(instance3.age); // 29
// 在这个例子中，SuperType 构造函数接收一个参数 name，然后将它赋值给一个属性。在 SubType
// 构造函数中调用 SuperType 构造函数时传入这个参数，实际上会在 SubType 的实例上定义 name 属性。
// 为确保 SuperType 构造函数不会覆盖 SubType 定义的属性，可以在调用父类构造函数之后再给子类实
// 例添加额外的属性。
// 盗用构造函数的问题
// 盗用构造函数的主要缺点，，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，
// 因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模
// 式。由于存在这些问题，盗用构造函数基本上也不能单独使用。
//组合继承
// 接Combinatorialnheritance.js
