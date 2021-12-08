// let collection = ["foo", "bar", "baz"];
// for (let index = 0; index < collection.length; ++index) {
//   console.log(collection[index]);
// }
// collection.forEach((e) => {
//   console.log(e);
// });

//迭代器模式
// 任何实现 Iterable 接口的数据结构都可以被实现 Iterator 接口的结构“消费”（consume）。迭
// 代器（iterator）是按需创建的一次性对象。每个迭代器都会关联一个可迭代对象，而迭代器会暴露迭代
// 其关联可迭代对象的 API。迭代器无须了解与其关联的可迭代对象的结构，只需要知道如何取得连续的
// 值。这种概念上的分离正是 Iterable 和 Iterator 的强大之处。
//可迭代协议
// 实现 Iterable 接口（可迭代协议）要求同时具备两种能力：支持迭代的自我识别能力和创建实现
// Iterator 接口的对象的能力。在 ECMAScript 中，这意味着必须暴露一个属性作为“默认迭代器”，而
// 且这个属性必须使用特殊的 Symbol.iterator 作为键。这个默认迭代器属性必须引用一个迭代器工厂
// 函数，调用这个工厂函数必须返回一个新迭代器。
// 很多内置类型都实现了 Iterable 接口：
// 字符串
// 数组
// 映射
// arguments 对象
// NodeList 等 DOM 集合类型
let obj = {};
console.log(obj[Symbol.iterator]); //undefined
let str = "abc";
console.log(str[Symbol.iterator]); //[Function: [Symbol.iterator]]
// 实际写代码过程中，不需要显式调用这个工厂函数来生成迭代器。实现可迭代协议的所有类型都会
// 自动兼容接收可迭代对象的任何语言特性。接收可迭代对象的原生语言特性包括：
// for-of 循环
// 数组解构
// 扩展操作符
// Array.from()
// 创建集合
// 创建映射
// Promise.all()接收由期约组成的可迭代对象
// Promise.race()接收由期约组成的可迭代对象
// yield*操作符，在生成器中使用
// 这些原生语言结构会在后台调用提供的可迭代对象的这个工厂函数，从而创建一个迭代器：
let arr = ["foo", "bar", "baz"];
//for-of 循环
for (const iterator of arr) {
  console.log(iterator);
}
//数组结构
let [a, b, c] = arr;
console.log(a, b, c);
// 扩展操作符
let arr2 = [...arr];
console.log(arr2);
// Array.from()
let arr3 = Array.from(arr);
console.log(arr3); // ['foo', 'bar', 'baz']
// Set 构造函数
let set = new Set(arr);
console.log(set); // Set(3) {'foo', 'bar', 'baz'}
// Map 构造函数
let pairs = arr.map((x, i) => [x, i]);
console.log(pairs); // [['foo', 0], ['bar', 1], ['baz', 2]]
let map = new Map(pairs);
console.log(map); // Map(3) { 'foo'=>0, 'bar'=>1, 'baz'=>2 }
