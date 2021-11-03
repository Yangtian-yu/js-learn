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
