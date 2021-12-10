function* foo(x) {
  console.log("start");
  let y = 2 * (yield x + 1);
  let z = yield y / 3;
  return x + y + z;
}

let it = foo(5);
console.log(it.next());
console.log(it.next(12));
console.log(it.next(13));

// 工厂模式
// 工厂模式是一种众所周知的设计模式，广泛应用于软件工程领域，用于抽象创建特定对象的过程。
// （本书后面还会讨论其他设计模式及其在 JavaScript 中的实现。）下面的例子展示了一种按照特定接口创
// 建对象的方式：
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  };
  return o;
}

let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");
person1.sayName();
// 这里，函数 createPerson()接收 3 个参数，根据这几个参数构建了一个包含 Person 信息的对象。
// 可以用不同的参数多次调用这个函数，每次都会返回包含 3 个属性和 1 个方法的对象。这种工厂模式虽
// 然可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）。
// 构造函数模式
// 前面几章提到过，ECMAScript 中的构造函数是用于创建特定类型对象的。像 Object 和 Array 这
// 样的原生构造函数，运行时可以直接在执行环境中使用。当然也可以自定义构造函数，以函数的形式为
// 自己的对象类型定义属性和方法。
// 比如，前面的例子使用构造函数模式可以这样写：
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}
let person3 = new Person("Nicholas", 29, "Software Engineer");
let person4 = new Person("Greg", 27, "Doctor");
person3.sayName();
// 要创建 Person 的实例，应使用 new 操作符。以这种方式调用构造函数会执行如下操作。
// (1) 在内存中创建一个新对象。
// (2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
// (3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
// (4) 执行构造函数内部的代码（给新对象添加属性）。
// (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。
// 上一个例子的最后，person3 和 person4 分别保存着 Person 的不同实例。这两个对象都有一个
// constructor 属性指向 Person，如下所示：
console.log(person3.constructor == Person); // true
console.log(person4.constructor == Person); // true
// constructor 本来是用于标识对象类型的。不过，一般认为 instanceof 操作符是确定对象类型
// 更可靠的方式。前面例子中的每个对象都是 Object 的实例，同时也是 Person 的实例，如下面调用
// instanceof 操作符的结果所示：
console.log(person3 instanceof Object); // true
console.log(person4 instanceof Person); // true
console.log(person3 instanceof Object); // true
console.log(person4 instanceof Person); // true
// 构造函数不一定要写成函数声明的形式。赋值给变量的函数表达式也可以表示构造函数：
// let Person = function(name, age, job) {
//  this.name = name;
//  this.age = age;
//  this.job = job;
//  this.sayName = function() {
//  console.log(this.name);
//  };
// }

// 1. 构造函数也是函数
// 构造函数与普通函数唯一的区别就是调用方式不同。除此之外，构造函数也是函数。并没有把某个
// 函数定义为构造函数的特殊语法。任何函数只要使用 new 操作符调用就是构造函数，而不使用 new 操
// 作符调用的函数就是普通函数。比如，前面的例子中定义的 Person()可以像下面这样调用：
// 在另一个对象的作用域中调用
// 作为构造函数
// let person = new Person("Nicholas", 29, "Software Engineer");
// person.sayName(); // "Nicholas"
// 作为函数调用
// Person("Greg", 27, "Doctor"); // 添加到 window 对象
// window.sayName(); // "Greg"
let o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); // "Kristen"
// 这个例子一开始展示了典型的构造函数调用方式，即使用 new 操作符创建一个新对象。然后是普通
// 函数的调用方式，这时候没有使用 new 操作符调用 Person()，结果会将属性和方法添加到 window 对
// 象。这里要记住，在调用一个函数而没有明确设置 this 值的情况下（即没有作为对象的方法调用，或
// 者没有使用 call()/apply()调用），this 始终指向 Global 对象（在浏览器中就是 window 对象）。
// 因此在上面的调用之后，window 对象上就有了一个 sayName()方法，调用它会返回"Greg"。最后展
// 示的调用方式是通过 call()（或 apply()）调用函数，同时将特定对象指定为作用域。这里的调用将
// 对象 o 指定为 Person()内部的 this 值，因此执行完函数代码后，所有属性和 sayName()方法都会添
// 加到对象 o 上面。
// 构造函数的问题
// 构造函数虽然有用，但也不是没有问题。构造函数的主要问题在于，其定义的方法会在每个实例上
// 都创建一遍。因此对前面的例子而言，person1 和 person2 都有名为 sayName()的方法，但这两个方
// 法不是同一个 Function 实例。我们知道，ECMAScript 中的函数是对象，因此每次定义函数时，都会
// 初始化一个对象。逻辑上讲，这个构造函数实际上是这样的
// function Person(name, age, job){
//   this.name = name;
//   this.age = age;
//   this.job = job;
//   this.sayName = new Function("console.log(this.name)"); // 逻辑等价
//  }
// 这样理解这个构造函数可以更清楚地知道，每个 Person 实例都会有自己的 Function 实例用于显
// 示 name 属性。当然了，以这种方式创建函数会带来不同的作用域链和标识符解析。但创建新 Function
// 实例的机制是一样的。因此不同实例上的函数虽然同名却不相等，如下所示：
// console.log(person3.sayName == person4.sayName); // false
// 因为都是做一样的事，所以没必要定义两个不同的 Function 实例。况且，this 对象可以把函数
// 与对象的绑定推迟到运行时。
// 要解决这个问题，可以把函数定义转移到构造函数外部：
// function Person(name, age, job){
//   this.name = name;
//   this.age = age;
//   this.job = job;
//   this.sayName = sayName;
//  }
//  function sayName() {
//   console.log(this.name);
//  }
//  let person1 = new Person("Nicholas", 29, "Software Engineer");
//  let person2 = new Person("Greg", 27, "Doctor");
//  person1.sayName(); // Nicholas
//  person2.sayName(); // Greg
// 在这里，sayName()被定义在了构造函数外部。在构造函数内部，sayName 属性等于全局 sayName()
// 函数。因为这一次 sayName 属性中包含的只是一个指向外部函数的指针，所以 person1 和 person2
// 共享了定义在全局作用域上的 sayName()函数。这样虽然解决了相同逻辑的函数重复定义的问题，但
// 全局作用域也因此被搞乱了，因为那个函数实际上只能在一个对象上调用。如果这个对象需要多个方法，
// 那么就要在全局作用域中定义多个函数。这会导致自定义类型引用的代码不能很好地聚集一起。这个新
// 问题可以通过原型模式来解决。
// 接proptotype.js
