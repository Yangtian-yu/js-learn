//类构造函数
// constructor 关键字用于在类定义块内部创建类的构造函数。方法名 constructor 会告诉解释器
// 在使用 new 操作符创建类的新实例时，应该调用这个函数。构造函数的定义不是必需的，不定义构造函
// 数相当于将构造函数定义为空函数。
// 1. 实例化
// 使用 new 操作符实例化 Person 的操作等于使用 new 调用其构造函数。唯一可感知的不同之处就
// 是，JavaScript 解释器知道使用 new 和类意味着应该使用 constructor 函数进行实例化。
// 使用 new 调用类的构造函数会执行如下操作。
// (1) 在内存中创建一个新对象。
// (2) 这个新对象内部的[[Prototype]]指针被赋值为构造函数的 prototype 属性。
// (3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
// (4) 执行构造函数内部的代码（给新对象添加属性）。
// (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。
// 来看下面的例子：
// class Animal {}
// class Person {
//  constructor() {
//  console.log('person ctor');
//  }
// }
// class Vegetable {
//  constructor() {
//  this.color = 'orange';
//  }
// }
// let a = new Animal();
// let p = new Person(); // person ctor
// let v = new Vegetable();
// console.log(v.color); // orange
// 类实例化时传入的参数会用作构造函数的参数。如果不需要参数，则类名后面的括号也是可选的：
// class Person {
//  constructor(name) {
//  console.log(arguments.length);
//  this.name = name || null;
//  }
// }
// let p1 = new Person; // 0
// console.log(p1.name); // null
// let p2 = new Person(); // 0
// console.log(p2.name); // null
// let p3 = new Person('Jake'); // 1
// console.log(p3.name); // Jake
// 默认情况下，类构造函数会在执行之后返回 this 对象。构造函数返回的对象会被用作实例化的对
// 象，如果没有什么引用新创建的 this 对象，那么这个对象会被销毁。不过，如果返回的不是 this 对
// 象，而是其他对象，那么这个对象不会通过 instanceof 操作符检测出跟类有关联，因为这个对象的原
// 型指针并没有被修改。
// class Person {
//  constructor(override) {
//  this.foo = 'foo';
//  if (override) {
//  return {
//  bar: 'bar'
//  };
//  }
//  }
// }
// let p1 = new Person(),
//  p2 = new Person(true);
// console.log(p1); // Person{ foo: 'foo' }
// console.log(p1 instanceof Person); // true
// console.log(p2); // { bar: 'bar' }
// console.log(p2 instanceof Person); // false
// 类构造函数与构造函数的主要区别是，调用类构造函数必须使用 new 操作符。而普通构造函数如果
// 不使用 new 调用，那么就会以全局的 this（通常是 window）作为内部对象。调用类构造函数时如果
// 忘了使用 new 则会抛出错误：
// function Person() {}
// class Animal {}
// 把 window 作为 this 来构建实例
// let p = Person();
// let a = Animal();
// TypeError: class constructor Animal cannot be invoked without 'new'
// 类构造函数没有什么特殊之处，实例化之后，它会成为普通的实例方法（但作为类构造函数，仍然
// 要使用 new 调用）。因此，实例化之后可以在实例上引用它：
// class Person {}
// 使用类创建一个新实例
// let p1 = new Person();
// p1.constructor();
// TypeError: Class constructor Person cannot be invoked without 'new'
// 使用对类构造函数的引用创建一个新实例
// let p2 = new p1.constructor();
// 2. 把类当成特殊函数
// ECMAScript 中没有正式的类这个类型。从各方面来看，ECMAScript 类就是一种特殊函数。声明一
// 个类之后，通过 typeof 操作符检测类标识符，表明它是一个函数：
// class Person {}
// console.log(Person); // class Person {}
// console.log(typeof Person); // function
// 类标识符有 prototype 属性，而这个原型也有一个 constructor 属性指向类自身：
// class Person{}
// console.log(Person.prototype); // { constructor: f() }
// console.log(Person === Person.prototype.constructor); // true
// 与普通构造函数一样，可以使用 instanceof 操作符检查构造函数原型是否存在于实例的原型链中：
// class Person {}
// let p = new Person();
// console.log(p instanceof Person); // true
// 由此可知，可以使用 instanceof 操作符检查一个对象与类构造函数，以确定这个对象是不是类的
// 实例。只不过此时的类构造函数要使用类标识符，比如，在前面的例子中要检查 p 和 Person。
// 如前所述，类本身具有与普通构造函数一样的行为。在类的上下文中，类本身在使用 new 调用时就
// 会被当成构造函数。重点在于，类中定义的 constructor 方法不会被当成构造函数，在对它使用
// instanceof 操作符时会返回 false。但是，如果在创建实例时直接将类构造函数当成普通构造函数来
// 使用，那么 instanceof 操作符的返回值会反转：
// class Person {}
// let p1 = new Person();
// console.log(p1.constructor === Person); // true
// console.log(p1 instanceof Person); // true
// console.log(p1 instanceof Person.constructor); // false
// let p2 = new Person.constructor();
// console.log(p2.constructor === Person); // false
// console.log(p2 instanceof Person); // false
// console.log(p2 instanceof Person.constructor); // true
// 类是 JavaScript 的一等公民，因此可以像其他对象或函数引用一样把类作为参数传递：
// 类可以像函数一样在任何地方定义，比如在数组中
// let classList = [
//  class {
//  constructor(id) {
//  this.id_ = id;
//  console.log(`instance ${this.id_}`);
//  }
//  }
// ];
// function createInstance(classDefinition, id) {
//  return new classDefinition(id);
// }
// let foo = createInstance(classList[0], 3141); // instance 3141
// 与立即调用函数表达式相似，类也可以立即实例化：
// 因为是一个类表达式，所以类名是可选的
// let p = new class Foo {
// constructor(x) {
//   console.log(x);
//   }
//  }('bar'); // bar
//  console.log(p); // Foo {}
