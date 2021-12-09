//创建对象
let person = {
  name: "nocholas",
  age: "29",
  job: "software engineer",
  sayname() {
    console.log(this.name);
  },
};
//属性的类型
//1.数据属性
// 数据属性包含一个保存数据值的位置。值会从这个位置读取，也会写入到这个位置。数据属性有 4
// 个特性描述它们的行为。

//【Configurable】表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特
// 性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特
// 性都是 true，如前面的例子所示。

//[Enumerable]表示属性是否可以通过 for-in 循环返回。默认情况下，所有直接定义在对
// 象上的属性的这个特性都是 true，如前面的例子所示。

//[Writable]表示属性的值是否可以被修改。默认情况下，所有直接定义在对象上的属性的
// 这个特性都是 true，如前面的例子所示。

//[Value]包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性
// 的默认值为 undefined。

// 在像前面例子中那样将属性显式添加到对象之后，[[Configurable]]、[[Enumerable]]和
// [[Writable]]都会被设置为 true，而[[Value]]特性会被设置为指定的值。

// 这里，我们创建了一个名为 name 的属性，并给它赋予了一个值"Nicholas"。这意味着[[Value]]
// 特性会被设置为"Nicholas"，之后对这个值的任何修改都会保存这个位置。

//要修改属性的默认特性，就必须使用 Object.defineProperty()方法。这个方法接收 3 个参数：
// 要给其添加属性的对象、属性的名称和一个描述符对象。最后一个参数，即描述符对象上的属性可以包
// 含：configurable、enumerable、writable 和 value，跟相关特性的名称一一对应。根据要修改
// 的特性，可以设置其中一个或多个值。比如：

let person1 = {
  name: "yangtianyu",
};
Object.defineProperty(person1, "name", {
  value: "Nicholas",
  writable: false,
});
console.log(person1); //{name: 'Nicholas'}
person1.name = "age";
console.log(person1); //{name: 'Nicholas'}

// 此外，一个属性被定义为不可配置之后，就
// 不能再变回可配置的了。
//报错
// Object.defineProperty(person1, "name", {
//   value: "Nicholas",
//   writable: true,
// });

// 2.访问器属性
// 访问器属性不包含数据值。相反，它们包含一个获取（getter）函数和一个设置（setter）函数，不
// 过这两个函数不是必需的。在读取访问器属性时，会调用获取函数，这个函数的责任就是返回一个有效
// 的值。在写入访问器属性时，会调用设置函数并传入新值，这个函数必须决定对数据做出什么修改。访
// 问器属性有 4 个特性描述它们的行为。
// [[Configurable]]：表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特
// 性，以及是否可以把它改为数据属性。默认情况下，所有直接定义在对象上的属性的这个特性都是 true。
// [[Enumerable]]：表示属性是否可以通过 for-in 循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是 true。
// [[Get]]：获取函数，在读取属性时调用。默认值为 undefined。
// [[Set]]：设置函数，在写入属性时调用。默认值为 undefined。
let book = {
  year_: 2017,
  edition: 1,
};
Object.defineProperty(book, "year", {
  get() {
    return this.year_;
  },
  set(newval) {
    if (newval > 2017) {
      this.year_ = newval;
      this.edition += newval - 2017;
    }
  },
});
book.year = 2018;
console.log(book); //{ year_: 2018, edition: 2 }
// 在这个例子中，对象 book 有两个默认属性：year_和 edition。year_中的下划线常用来表示该
// 属性并不希望在对象方法的外部被访问。另一个属性 year 被定义为一个访问器属性，其中获取函数简
// 单地返回 year_的值，而设置函数会做一些计算以决定正确的版本（edition）。因此，把 year 属性修改
// 为 2018 会导致 year_变成 2018，edition 变成 2。这是访问器属性的典型使用场景，即设置一个属性
// 值会导致一些其他变化发生。
// 获取函数和设置函数不一定都要定义。只定义获取函数意味着属性是只读的，尝试修改属性会被忽
// 略。在严格模式下，尝试写入只定义了获取函数的属性会抛出错误。类似地，只有一个设置函数的属性
// 是不能读取的，非严格模式下读取会返回 undefined，严格模式下会抛出错误。

//定义多个属性
// 在一个对象同事定义多个属性的可能性是非常大的。为此，ECMAScript 提供了 Object.define.Properties()方法。
// 这个方法可以通过多个描述符一次性定义多个属性。它接收两个参数：要为之添
// 加或修改属性的对象和另一个描述符对象，其属性与要添加或修改的属性一一对应。比如：
let book1 = {};
Object.defineProperties(book1, {
  year_: {
    value: 2017,
  },
  edition: {
    value: 1,
  },
  year: {
    get() {
      return this.year_;
    },
    set(newValue) {
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue - 2017;
      }
    },
  },
});

//读取属性的特性
// 使用 Object.getOwnPropertyDescriptor()方法可以取得指定属性的属性描述符。这个方法接
// 收两个参数：属性所在的对象和要取得其描述符的属性名。返回值是一个对象，对于访问器属性包含
// configurable、enumerable、get 和 set 属性，对于数据属性包含 configurable、enumerable、
// writable 和 value 属性。
let descripit = Object.getOwnPropertyDescriptor(book1, "year");
console.log(descripit.value);
console.log(descripit.configurable);
console.log(descripit.set);
// 对于数据属性 year_，value 等于原来的值，configurable 是 false，get 是 undefined。对
// 于访问器属性 year，value 是 undefined，enumerable 是 false，get 是一个指向获取函数的指针。
// ECMAScript 2017 新增了 Object.getOwnPropertyDescriptors()静态方法。这个方法实际上
// 会在每个自有属性上调用 Object.getOwnPropertyDescriptor()并在一个新对象中返回它们。对于
// 前面的例子，使用这个静态方法会返回如下对象：
let Descriptors = Object.getOwnPropertyDescriptors(book1, "year");
console.log(Descriptors);
// {
//   year_: {
//     value: 2017,
//     writable: false,
//     enumerable: false,
//     configurable: false
//   },
//   edition: { value: 1, writable: false, enumerable: false, configurable: false },
//   year: {
//     get: [Function: get],
//     set: [Function: set],
//     enumerable: false,
//     configurable: false
//   }
// }

//合并对象
// JavaScript 开发者经常觉得“合并”（merge）两个对象很有用。更具体地说，就是把源对象所有的
// 本地属性一起复制到目标对象上。有时候这种操作也被称为“混入”（mixin），因为目标对象通过混入
// 源对象的属性得到了增强。
// ECMAScript 6 专门为合并对象提供了 Object.assign()方法。这个方法接收一个目标对象和一个
// 或多个源对象作为参数，然后将每个源对象中可枚举（Object.propertyIsEnumerable()返回 true）
// 和自有（Object.hasOwnProperty()返回 true）属性复制到目标对象。以字符串和符号为键的属性
// 会被复制。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标
// 对象上的[[Set]]设置属性的值。

let dest, src, result;
//简单复制
dest = { age: "27" };
src = { id: "src" };
result = Object.assign(dest, src);
// Object.assign 修改目标对象
// 也会返回修改后的目标对象
console.log(dest === result); // true
console.log(dest !== src); // true
console.log(result); // { id: src }
console.log(dest); // { id: src }
console.log(src, "------"); //{ id: 'src' }
// 多个源对象
dest = {};
result = Object.assign(dest, { a: "foo" }, { b: "bar" });
console.log(dest);
console.log(result);

//获取函数与设置函数
dest = {
  set a(val) {
    console.log(`Invalked dest setter with param ${val}`);
  },
};
src = {
  get a() {
    console.log("Invalked src getter");
    return "foo";
  },
};
Object.assign(dest, src);
// 调用 src 的获取方法
// 调用 dest 的设置方法并传入参数"foo"
// 因为这里的设置函数不执行赋值操作
// 所以实际上并没有把值转移过来
console.log(dest); // { set a(val) {...} }
// Object.assign()实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使
// 用最后一个复制的值。此外，从源对象访问器属性取得的值，比如获取函数，会作为一个静态值赋给目
// 标对象。换句话说，不能在两个对象间转移获取函数和设置函数。
dest = { id: "dest" };
result = Object.assign(
  dest,
  { id: "src1", a: "foo" },
  { id: "src2", b: "bar" }
);
// Object.assign 会覆盖重复的属性
console.log(result); // { id: src2, a: foo, b: bar }
//可以通过目标对象上的设置函数观察覆盖的过程：
dest = {
  set id(x) {
    console.log(x);
  },
};
Object.assign(dest, { id: "first" }, { id: "second" }, { id: "third" });

//对象引用
dest = {};
src = { a: {} };
Object.assign(dest, src);
// 浅复制意味着只会复制对象的引用；
console.log(dest);
console.log(dest.a === src.a);

// 对象标识及相等判定
// ECMAScript 6 之前，有些特殊情况即使是===操作符也无能为力：
// 这些是 === 符合预期的情况；
console.log(true === 1);
console.log({} === {});
console.log("2" === 2); // false

// 这些情况在不同 JavaScript 引擎中表现不同，但仍被认为相等
console.log(+0 === -0); // true
console.log(+0 === 0); // true
console.log(-0 === 0); // true

//要确定NaN的相等性， 必须使用极为讨厌的isNaN();
console.log(NaN === NaN);
console.log(isNaN(NaN));
// 为改善这类情况，ECMAScript 6 规范新增了 Object.is()，这个方法与===很像，但同时也考虑
// 到了上述边界情形。这个方法必须接收两个参数：
console.log(Object.is(true, 1)); // false
console.log(Object.is({}, {})); // false
console.log(Object.is("2", 2)); // false
// 正确的 0、-0、+0 相等/不等判定
console.log(Object.is(+0, -0)); // false
console.log(Object.is(+0, 0)); // true
console.log(Object.is(-0, 0)); // false
// 正确的 NaN 相等判定
console.log(Object.is(NaN, NaN)); // true
// 要检查超过两个值，递归地利用相等性传递即可：
function recursivelyCheckEqual(x, ...rest) {
  return (
    Object.is(x, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest))
  );
}
//增强的对象语法
// ECMAScript 6 为定义和操作对象新增了很多极其有用的语法糖特性。这些特性都没有改变现有引擎
// 的行为，但极大地提升了处理对象的方便程度。
// 本节介绍的所有对象语法同样适用于 ECMAScript 6 的类，本章后面会讨论。
// 相比于以往的替代方案，本节介绍的增强对象语法可以说是一骑绝尘。因此本章及
// 本书会默认使用这些新语法特性。

// 属性值简写
// 在给对象添加变量的时候，开发者经常会发现属性名和变量名是一样的，例如
let name = "matt";
let newPerson = {
  name: name,
};
console.log(newPerson);
// 为此，简写属性名语法出现了。简写属性名只要使用变量名（不用再写冒号）就会自动被解释为同
// 名的属性键。如果没有找到同名变量，则会抛出 ReferenceError。
// 以下代码和之前的代码是等价的：
let name2 = "Matt";
let person2 = {
  name2,
};
console.log(person2); // { name2: 'Matt' }

// 可计算属性
// 在引入可计算属性之前，如果想使用变量的值作为属性，那么必须先声明对象，然后使用中括号语
// 法来添加属性。换句话说，不能在对象字面量中直接动态命名属性。比如：
// const nameKey = "name";
// const ageKey = "age";
// const jobKey = "job";
// let person3 = {};
// person3[nameKey] = "Matt";
// person3[ageKey] = 27;
// person3[jobKey] = "Software engineer";
// console.log(person3); //{ name: 'Matt', age: 27, job: 'Software engineer' }
// 有了可计算属性，就可以在对象字面量中完成动态属性赋值。中括号包围的对象属性键告诉运行时
// 将其作为 JavaScript 表达式而不是字符串来求值：
const nameKey = "name";
const ageKey = "age";
const jobKey = "job";
let person4 = {
  [nameKey]: "Matt",
  [ageKey]: 27,
  [jobKey]: "Software engineer",
};
console.log(person4); // { name: 'Matt', age: 27, job: 'Software engineer' }
const nameKey5 = "name";
const ageKey5 = "age";
const jobKey5 = "job";
let uniqueToken5 = 0;
function getUniqueKey(key) {
  return `${key}_${uniqueToken5++}`;
}
let person5 = {
  [getUniqueKey(nameKey5)]: "Matt",
  [getUniqueKey(ageKey5)]: 27,
  [getUniqueKey(jobKey5)]: "Software engineer",
};
console.log(person5); // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' }
// 可计算属性表达式中抛出任何错误都会中断对象创建。如果计算属性的表达式有副
// 作用，那就要小心了，因为如果表达式抛出错误，那么之前完成的计算是不能回滚的。
// 简写方法名
// 在给对象定义方法时，通常都要写一个方法名、冒号，然后再引用一个匿名函数表达式，如下所示：
let person6 = {
  sayName: function (name) {
    console.log(`My name is ${name}`);
  },
};
person6.sayName("Matt"); // My name is Matt
// 新的简写方法的语法遵循同样的模式，但开发者要放弃给函数表达式命名（不过给作为方法的函数
// 命名通常没什么用）。相应地，这样也可以明显缩短方法声明。
// 以下代码和之前的代码在行为上是等价的：
let person7 = {
  sayName(name) {
    console.log(`My name is ${name}`);
  },
};
person7.sayName("Matt"); // My name is Matt
// 简写方法名对获取函数和设置函数也是适用的：
let person8 = {
  name_: "",
  get name() {
    return this.name_;
  },
  set name(name) {
    this.name_ = name;
  },
  sayName() {
    console.log(`My name is ${this.name_}`);
  },
};
person8.name = "Matt";
person8.sayName(); // My name is Matt
// 简写方法名与可计算属性键相互兼容：
const methodKey9 = "sayName";
let person9 = {
  [methodKey9](name) {
    console.log(`My name is ${name}`);
  },
};
person9.sayName("Matt"); // My name is Matt
// 简写方法名对于本章后面介绍的 ECMAScript 6 的类更有用。

//对象解构
// ECMAScript 6 新增了对象解构语法，可以在一条语句中使用嵌套数据实现一个或多个赋值操作。简
// 单地说，对象解构就是使用与对象匹配的结构来实现对象属性赋值。
// 下面的例子展示了两段等价的代码，首先是不使用对象解构的：
// 不使用对象解构
// let person = {
//   name: 'Matt',
//   age: 27
//  };
//  let personName = person.name,
//  personAge = person.age;
// console.log(personName); // Matt
// console.log(personAge); // 27
// 然后，是使用对象解构的：
// 使用对象解构
// let person = {
//  name: 'Matt',
//  age: 27
// };
// let { name: personName, age: personAge } = person;
// console.log(personName); // Matt
// console.log(personAge); // 27
// 使用解构，可以在一个类似对象字面量的结构中，声明多个变量，同时执行多个赋值操作。如果想
// 让变量直接使用属性的名称，那么可以使用简写语法，比如：
// let person = {
//  name: 'Matt',
//  age: 27
// };
// let { name, age } = person;
// console.log(name); // Matt
// console.log(age); // 27
// 解构赋值不一定与对象的属性匹配。赋值的时候可以忽略某些属性，而如果引用的属性不存在，则
// 该变量的值就是 undefined：
// let person = {
//  name: 'Matt',
//  age: 27
// };
// let { name, job } = person;
// console.log(name); // Matt
// console.log(job); // undefined
// 也可以在解构赋值的同时定义默认值，这适用于前面刚提到的引用的属性不存在于源对象中的
// 情况：
// let person = {
//  name: 'Matt',
//  age: 27
// };
// let { name, job='Software engineer' } = person;
// console.log(name); // Matt
// console.log(job); // Software engineer
// 解构在内部使用函数 ToObject()（不能在运行时环境中直接访问）把源数据结构转换为对象。这
// 意味着在对象解构的上下文中，原始值会被当成对象。这也意味着（根据 ToObject()的定义），null
// 和 undefined 不能被解构，否则会抛出错误。
// let { length } = 'foobar';
// console.log(length); // 6
// let { constructor: c } = 4;
// console.log(c === Number); // true
// let { _ } = null; // TypeError
// let { _ } = undefined; // TypeError
// 解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，则赋值表达式
// 必须包含在一对括号中：
// let personName, personAge;
// let person = {
//  name: 'Matt',
//  age: 27
// };
// ({name: personName, age: personAge} = person);
// console.log(personName, personAge); // Matt, 27
// 嵌套解构
// 解构对于引用嵌套的属性或赋值目标没有限制。为此，可以通过解构来复制对象属性：
let person10 = {
  name: "Matt",
  age: 27,
  job: {
    title: "Software engineer",
  },
};
let personCopy10 = {};
({
  name: personCopy10.name,
  age: personCopy10.age,
  job: personCopy10.job,
} = person10);
// 因为一个对象的引用被赋值给 personCopy，所以修改
// person.job 对象的属性也会影响 personCopy
person10.job.title = "Hacker";
console.log(person10);
// { name: 'Matt', age: 27, job: { title: 'Hacker' } }
console.log(personCopy10);
// { name: 'Matt', age: 27, job: { title: 'Hacker' } }
// 解构赋值可以使用嵌套结构，以匹配嵌套的属性：
let person11 = {
  name: "Matt",
  age: 27,
  job: {
    title: "Software engineer",
  },
};
// 声明 title 变量并将 person.job.title 的值赋给它
let {
  job: { title },
} = person11;
console.log(title); // Software engineer
// 在外层属性没有定义的情况下不能使用嵌套解构。无论源对象还是目标对象都一样：
// let person12 = {
//   job: {
//     title: "Software engineer",
//   },
// };
// let personCopy12 = {};
// foo 在源对象上是 undefined
// ({
//   foo: { bar: personCopy12.bar },
// } = person12);
// TypeError: Cannot destructure property 'bar' of 'undefined' or 'null'.
// job 在目标对象上是 undefined
// ({
//   job: { title: personCopy12.job.title },
// } = person12);
// TypeError: Cannot set property 'title' of undefined
// 部分解构
// 需要注意的是，涉及多个属性的解构赋值是一个输出无关的顺序化操作。如果一个解构表达式涉及
// 多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分：
// let person = {
//   name: 'Matt',
//   age: 27
//  };
//  let personName, personBar, personAge;
//  try {
// person.foo 是 undefined，因此会抛出错误
//   ({name: personName, foo: { bar: personBar }, age: personAge} = person);
//  } catch(e) {}
//  console.log(personName, personBar, personAge);
// Matt, undefined, undefined
// 参数上下文匹配
// 在函数参数列表中也可以进行解构赋值。对参数的解构赋值不会影响 arguments 对象，但可以在
// 函数签名中声明在函数体内使用局部变量：
let person13 = {
  name: "Matt",
  age: 27,
};
function printPerson(foo, { name, age }, bar) {
  console.log(arguments);
  console.log(name, age);
}
function printPerson2(foo, { name: personName, age: personAge }, bar) {
  console.log(arguments);
  console.log(personName, personAge);
}
printPerson("1st", person13, "2nd");
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
printPerson2("1st", person13, "2nd");
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27
