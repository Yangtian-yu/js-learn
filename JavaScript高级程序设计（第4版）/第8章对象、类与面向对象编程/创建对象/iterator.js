// 对象迭代
// 在JavaScript 有史以来的大部分时间内，迭代对象属性都是一个难题。ECMAScript 2017 新增了两
// 个静态方法，用于将对象内容转换为序列化的——更重要的是可迭代的——格式。这两个静态方法
// Object.values()和 Object.entries()接收一个对象，返回它们内容的数组。Object.values()
// 返回对象值的数组，Object.entries()返回键/值对的数组。
// 下面的示例展示了这两个方法：
const o = {
  foo: "bar",
  baz: 1,
  qux: {},
};
console.log(Object.values(o));
console.log(Object.entries(o));
console.log(Object.keys(o));
// 注意，非字符串属性会被转换为字符串输出。另外，这两个方法执行对象的浅复制：
console.log(Object.values(o)[2] === o.qux);
// true
console.log(Object.entries(o)[2][1] === o.qux);
// true
// 符号属性会被忽略：
const sym = Symbol();
const o1 = {
  [sym]: "foo",
};
console.log(Object.values(o1));
// []
console.log(Object.entries(o1));
// []

//
//
//
//  其他原型语法
// 有读者可能注意到了，在前面的例子中，每次定义一个属性或方法都会把 Person.prototype 重
// 写一遍。为了减少代码冗余，也为了从视觉上更好地封装原型功能，直接通过一个包含所有属性和方法
// 的对象字面量来重写原型成为了一种常见的做法，如下面的例子所示：
function Person() {}
Person.prototype = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  },
};
// 在这个例子中，Person.prototype 被设置为等于一个通过对象字面量创建的新对象。最终结果
// 是一样的，只有一个问题：这样重写之后，Person.prototype 的 constructor 属性就不指向 Person
// 了。在创建函数时，也会创建它的 prototype 对象，同时会自动给这个原型的 constructor 属性赋
// 值。而上面的写法完全重写了默认的 prototype 对象，因此其 constructor 属性也指向了完全不同
// 的新对象（Object 构造函数），不再指向原来的构造函数。虽然 instanceof 操作符还能可靠地返回
// 值，但我们不能再依靠 constructor 属性来识别类型了，如下面的例子所示：
let friend = new Person();
console.log(friend instanceof Object); // true
console.log(friend instanceof Person); // true
console.log(friend.constructor == Person); // false
console.log(friend.constructor == Object); // true
// 这里，instanceof仍然对Object和Person都返回true。但constructor属性现在等于Object
// 而不是 Person 了。如果 constructor 的值很重要，则可以像下面这样在重写原型对象时专门设置一
// 下它的值：
function Person1() {}
Person1.prototype = {
  constructor: Person1,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  },
};
// 这次的代码中特意包含了 constructor 属性，并将它设置为 Person，保证了这个属性仍然包含
// 恰当的值。
// 但要注意，以这种方式恢复 constructor 属性会创建一个[[Enumerable]]为 true 的属性。而
// 原生 constructor 属性默认是不可枚举的。因此，如果你使用的是兼容 ECMAScript 的 JavaScript 引擎，
// 那可能会改为使用 Object.defineProperty()方法来定义 constructor 属性：
function Person2() {}
Person2.prototype = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  },
};
// 恢复 constructor 属性
Object.defineProperty(Person2.prototype, "constructor", {
  enumerable: false,
  value: Person2,
});

// 原型的动态性
// 因为从原型上搜索值的过程是动态的，所以即使实例在修改原型之前已经存在，任何时候对原型对
// 象所做的修改也会在实例上反映出来。下面是一个例子：
let friend1 = new Person();
Person.prototype.sayHi = function () {
  console.log("hi");
};
friend1.sayHi(); // "hi"，没问题！
// 以上代码先创建一个 Person 实例并保存在 friend 中。然后一条语句在 Person.prototype 上
// 添加了一个名为 sayHi()的方法。虽然 friend 实例是在添加方法之前创建的，但它仍然可以访问这个
// 方法。之所以会这样，主要原因是实例与原型之间松散的联系。在调用 friend.sayHi()时，首先会从
// 这个实例中搜索名为 sayHi 的属性。在没有找到的情况下，运行时会继续搜索原型对象。因为实例和
// 原型之间的链接就是简单的指针，而不是保存的副本，所以会在原型上找到 sayHi 属性并返回这个属
// 性保存的函数。
// 虽然随时能给原型添加属性和方法，并能够立即反映在所有对象实例上，但这跟重写整个原型是两
// 回事。实例的[[Prototype]]指针是在调用构造函数时自动赋值的，这个指针即使把原型修改为不同
// 的对象也不会变。重写整个原型会切断最初原型与构造函数的联系，但实例引用的仍然是最初的原型。
// 记住，实例只有指向原型的指针，没有指向构造函数的指针。来看下面的例子：
function Person3() {}
let friend3 = new Person3();
Person3.prototype = {
  constructor: Person3,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  },
};
// friend3.sayName(); // 错误
// 在这个例子中，Person 的新实例是在重写原型对象之前创建的。在调用 friend.sayName()的时
// 候，会导致错误。这是因为 firend 指向的原型还是最初的原型，而这个原型上并没有 sayName 属性。
// 重写构造函数上的原型之后再创建的实例才会引用新的原型。而在此之前创建的实例仍然会引用最
// 初的原型。
// 原生对象原型
// 原型模式之所以重要，不仅体现在自定义类型上，而且还因为它也是实现所有原生引用类型的模式。
// 所有原生引用类型的构造函数（包括 Object、Array、String 等）都在原型上定义了实例方法。比如，
// 数组实例的 sort()方法就是 Array.prototype 上定义的，而字符串包装对象的 substring()方法也
// 是在 String.prototype 上定义的，如下所示：
console.log(typeof Array.prototype.sort); // "function"
console.log(typeof String.prototype.substring); // "function"
// 通过原生对象的原型可以取得所有默认方法的引用，也可以给原生类型的实例定义新的方法。可以
// 像修改自定义对象原型一样修改原生对象原型，因此随时可以添加方法。比如，下面的代码就给 String
// 原始值包装类型的实例添加了一个 startsWith()方法：
String.prototype.startsWith = function (text) {
  return this.indexOf(text) === 0;
};
let msg = "Hello world!";
console.log(msg.startsWith("Hello")); // true
// 原型的问题
// 原型模式也不是没有问题。首先，它弱化了向构造函数传递初始化参数的能力，会导致所有实例默
// 认都取得相同的属性值。虽然这会带来不便，但还不是原型的最大问题。原型的最主要问题源自它的共
// 享特性。
// 我们知道，原型上的所有属性是在实例间共享的，这对函数来说比较合适。另外包含原始值的属性
// 也还好，如前面例子中所示，可以通过在实例上添加同名属性来简单地遮蔽原型上的属性。真正的问题
// 来自包含引用值的属性。来看下面的例子：
function Person4() {}
Person4.prototype = {
  constructor: Person4,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  friends: ["Shelby", "Court"],
  sayName() {
    console.log(this.name);
  },
};
let person4 = new Person4();
let person5 = new Person4();
person4.friends.push("Van");
console.log(person4.friends); // "Shelby,Court,Van"
console.log(person5.friends); // "Shelby,Court,Van"
console.log(person4.friends === person5.friends); // true
// 这里，Person.prototype 有一个名为 friends 的属性，它包含一个字符串数组。然后这里创建
// 了两个 Person 的实例。person1.friends 通过 push 方法向数组中添加了一个字符串。由于这个
// friends 属性存在于 Person.prototype 而非 person1 上，新加的这个字符串也会在（指向同一个
// 数组的）person2.friends 上反映出来。如果这是有意在多个实例间共享数组，那没什么问题。但一
// 般来说，不同的实例应该有属于自己的属性副本。这就是实际开发中通常不单独使用原型模式的原因。
