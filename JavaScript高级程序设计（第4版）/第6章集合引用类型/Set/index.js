//使用 new 关键字和 Set 构造函数可以创建一个空集合：
const m = new Set(["val1", "val2", "val3"]);
console.log(m.size);
console.log(m);
m.add("val7");
console.log(m.size, "----------");
console.log(Array.from(m.keys()));
console.log(m.values(), "============");
console.log(Array.from(m.entries()));
console.log(m);
console.log(...m, "-------------");
const s = new Set();
s.add("val1");
console.log(s, "============================");
s.add("val2");
s.delete("val1");
console.log(s);
s.clear();
console.log(s);
//与 Map 类似，Set 可以包含任何 JavaScript 数据类型作为值。集合也使用 SameValueZero 操作
//（ECMAScript 内部定义，无法在语言中使用），基本上相当于使用严格对象相等的标准来检查值的匹
//配性。
