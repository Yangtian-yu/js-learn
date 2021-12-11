//寄生式组合继承
// 组合继承其实也存在效率问题。最主要的效率问题就是父类构造函数始终会被调用两次：一次在是
// 创建子类原型时调用，另一次是在子类构造函数中调用。本质上，子类原型最终是要包含超类对象的所
// 有实例属性，子类构造函数只要在执行时重写自己的原型就行了。再来看一看这个组合继承的例子：
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name); // 第二次调用 SuperType()
  this.age = age;
}
SubType.prototype = new SuperType(); // 第一次调用 SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  console.log(this.age);
};
// 代码中加粗的部分是调用 SuperType 构造函数的地方。在上面的代码执行后，SubType.prototype
// 上会有两个属性：name 和 colors。它们都是 SuperType 的实例属性，但现在成为了 SubType 的原型
// 属性。在调用 SubType 构造函数时，也会调用 SuperType 构造函数，这一次会在新对象上创建实例属
// 性 name 和 colors。这两个实例属性会遮蔽原型上同名的属性。
// 有两组 name 和 colors 属性：一组在实例上，另一组在 SubType 的原型上。这是
// 调用两次 SuperType 构造函数的结果。好在有办法解决这个问题。
// 寄生式组合继承通过盗用构造函数继承属性，但使用混合式原型链继承方法。基本思路是不通过调
// 用父类构造函数给子类原型赋值，而是取得父类原型的一个副本。说到底就是使用寄生式继承来继承父
// 类原型，然后将返回的新对象赋值给子类原型。寄生式组合继承的基本模式如下所示：
function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype); // 创建对象
  prototype.constructor = subType; // 增强对象
  subType.prototype = prototype; // 赋值对象
}
// 这个 inheritPrototype()函数实现了寄生式组合继承的核心逻辑。这个函数接收两个参数：子
// 类构造函数和父类构造函数。在这个函数内部，第一步是创建父类原型的一个副本。然后，给返回的
// prototype 对象设置 constructor 属性，解决由于重写原型导致默认 constructor 丢失的问题。最
// 后将新创建的对象赋值给子类型的原型。如下例所示，调用 inheritPrototype()就可以实现前面例
// 子中的子类型原型赋值：
function SuperType1(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType1.prototype.sayName = function () {
  console.log(this.name);
};
function SubType1(name, age) {
  SuperType1.call(this, name);
  this.age = age;
}
inheritPrototype(SubType1, SuperType1);
SubType1.prototype.sayAge = function () {
  console.log(this.age);
};

// 这里只调用了一次 SuperType 构造函数，避免了 SubType.prototype 上不必要也用不到的属性，
// 因此可以说这个例子的效率更高。而且，原型链仍然保持不变，因此 instanceof 操作符和
// isPrototypeOf()方法正常有效。寄生式组合继承可以算是引用类型继承的最佳模式。
