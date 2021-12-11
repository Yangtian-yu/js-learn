// 组合继承（有时候也叫伪经典继承）综合了原型链和盗用构造函数，将两者的优点集中了起来。基
// 本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方
// 法定义在原型上以实现重用，又可以让每个实例都有自己的属性。
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function () {
  console.log(this.age);
};
let instancel1 = new SubType("yangtianyu", 27);
instancel1.colors.push("black");
console.log(instancel1.colors);
instancel1.sayName();
instancel1.sayAge();
let instance2 = new SubType("Greg", 27);
console.log(instance2.colors); // "red,blue,green"
instance2.sayName(); // "Greg";
instance2.sayAge(); // 27
// 在这个例子中，SuperType 构造函数定义了两个属性，name 和 colors，而它的原型上也定义了
// 一个方法叫 sayName()。SubType 构造函数调用了 SuperType 构造函数，传入了 name 参数，然后又
// 定义了自己的属性 age。此外，SubType.prototype 也被赋值为 SuperType 的实例。原型赋值之后，
// 又在这个原型上添加了新方法 sayAge()。这样，就可以创建两个 SubType 实例，让这两个实例都有
// 自己的属性，包括 colors，同时还共享相同的方法。
// 组合继承弥补了原型链和盗用构造函数的不足，是 JavaScript 中使用最多的继承模式。而且组合继
// 承也保留了 instanceof 操作符和 isPrototypeOf()方法识别合成对象的能力。
//原型式继承
// 接 PrototypeInheritance.js
