//创建初始length为20的数组
let colors = new Array(20);
console.log(colors); //[ <20 empty items> ]
//字符串会被拆分为单字符数组
let arrayfrom = Array.from("matt");
console.log(arrayfrom); //[ 'm', 'a', 't', 't' ]
//可以使用 from()将集合和映射转换为一个新数组
let m = new Map().set(1, 2).set(3, 4);
let s = new Set().add(1).add(2).add(3).add(4).add(1);
console.log(Array.from(m)); //[ [ 1, 2 ], [ 3, 4 ] ]
console.log(Array.from(s)); //[ 1, 2, 3, 4 ]
// 可以使用任何可迭代对象
const iter = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  },
};
console.log(Array.from(iter)); // [1, 2, 3, 4]
// arguments 对象可以被轻松地转换为数组
function getArgsArray() {
  return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4)); //[ 1, 2, 3, 4 ]
//Array.from()还接收第二个可选的映射函数参数。这个函数可以直接增强新数组的值，而无须像
//调用 Array.from().map()那样先创建一个中间数组。还可以接收第三个可选参数，用于指定映射函
//数中 this 的值。但这个重写的 this 值在箭头函数中不适用。
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, (x) => x ** 2);
const a3 = Array.from(
  a1,
  function (x) {
    return x ** this.exponent;
  },
  { exponent: 2 }
);
console.log(a2); // [1, 4, 9, 16]
console.log(a3); // [1, 4, 9, 16]
//Array.of()可以把一组参数转换为数组。这个方法用于替代在 ES6之前常用的 Array.prototype.
//slice.call(arguments)，一种异常笨拙的将 arguments 对象转换为数组的写法：
console.log(Array.of(1, 2, 3, 4)); //[ 1, 2, 3, 4 ]
//values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
let arrayL = ["yang", "tian", "yu", 3].values();
for (const value of arrayL) {
  console.log(value);
}
//检测数组方法
console.log(Array.isArray([])); //true
console.log(Object.prototype.toString.call([]).slice(8, 13));

//在 ES6 中，Array 的原型上暴露了 3 个用于检索数组内容的方法：keys()、values()和
//entries()。keys()返回数组索引的迭代器，values()返回数组元素的迭代器，而 entries()返回
//索引/值对的迭代器：
const a = ["foo", "bra", "baz", "qux"];
const aKeys = Array.from(a.keys());
const aValues = Array.from(a.values());
const aEntries = Array.from(a.entries());
console.log(aKeys); // [0, 1, 2, 3]
console.log(aValues); // ["foo", "bar", "baz", "qux"]
console.log(aEntries); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]

//复制和填充方法
const zeroes = [0, 0, 0, 0, 0];
// 用 5 填充整个数组
zeroes.fill(5);
console.log(zeroes); // [5, 5, 5, 5, 5]
zeroes.fill(0); // 重置
console.log(zeroes);
// 用 6 填充索引大于等于 3 的元素
zeroes.fill(6, 3);
console.log(zeroes); // [0, 0, 0, 6, 6]
zeroes.fill(0); // 重置
// 用 7 填充索引大于等于 1 且小于 3 的元素
zeroes.fill(7, 1, 3);
console.log(zeroes); // [0, 7, 7, 0, 0];
zeroes.fill(0); // 重置
// 用 8 填充索引大于等于 1 且小于 4 的元素
// (-4 + zeroes.length = 1)
// (-1 + zeroes.length = 4)
zeroes.fill(8, -4, -1);
console.log(zeroes); // [0, 8, 8, 8, 0];
let ints,
  reset = () => (ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
reset();
// 从 ints 中复制索引 0 开始的内容，插入到索引 5 开始的位置
// 在源索引或目标索引到达数组边界时停止
ints.copyWithin(5);
console.log(ints); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
reset();
// 从 ints 中复制索引 5 开始的内容，插入到索引 0 开始的位置
ints.copyWithin(0, 5);
console.log(ints); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
reset();
// 从 ints 中复制索引 0 开始到索引 3 结束的内容
// 插入到索引 4 开始的位置
ints.copyWithin(4, 0, 3);
console.log(ints); // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9]
reset();
// JavaScript 引擎在插值前会完整复制范围内的值
// 因此复制期间不存在重写的风险
ints.copyWithin(2, 0, 6);
console.log(ints); // [0, 1, 0, 1, 2, 3, 4, 5, 8, 9]
reset();

//indexOf()、lastIndexOf()和 includes()
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
console.log(numbers.indexOf(4)); // 3
console.log(numbers.lastIndexOf(4)); // 5
console.log(numbers.includes(4)); // true
console.log(numbers.indexOf(4, 4)); // 5
console.log(numbers.lastIndexOf(4, 4)); // 3
console.log(numbers.includes(4, 7)); // false
let person = { name: "Nicholas" };
let people = [{ name: "Nicholas" }];
let morePeople = [person];
console.log(people.indexOf(person)); // -1
console.log(morePeople.indexOf(person)); // 0
console.log(people.includes(person)); // false
console.log(morePeople.includes(person)); // true

//find()和 findIndex()
const allpeople = [
  {
    name: "Matt",
    age: 27,
  },
  {
    name: "Nicholas",
    age: 29,
  },
];
console.log(allpeople.find((element, index, array) => element.age < 28));
// {name: "Matt", age: 27}
console.log(allpeople.findIndex((element, index, array) => element.age < 28));
// 0

//every()：对数组每一项都运行传入的函数，如果对每一项函数都返回 true，则这个方法返回 true。
let numbers1 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers1.every((item, index, array) => item > 2);
console.log(everyResult); // false

//some()：对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true。
let someResult = numbers1.some((item, index, array) => item > 2);
console.log(someResult); // true

//filter()：对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回。
let numbers2 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers2.filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3

//map()：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。
let numbers3 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let mapResult = numbers3.map((item, index, array) => item * 2);
console.log(mapResult); // 2,4,6,8,10,8,6,4,2

//forEach()：对数组每一项都运行传入的函数，没有返回值。
let numbers4 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers4.forEach((item, index, array) => {
  // 执行某些操作
});

//reduce()函数执行累加数组中所有数值的操作
let values1 = [1, 2, 3, 4, 5];
let sum1 = values1.reduce((prev, cur, index, array) => prev + cur);
console.log(sum1); // 15
