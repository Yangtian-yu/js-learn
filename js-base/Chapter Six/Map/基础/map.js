//使用 new 关键字和 Map 构造函数可以创建一个空映射：
const m = new Map();
m.set("fristName", "yang");
console.log(m); //Map(1) { 'fristName' => 'yang' }
console.log(m.size); //1
console.log(m.has("fristName")); // true
m.set("secondName", "tian");
console.log(m); //Map(2) { 'fristName' => 'yang', 'secondName' => 'tian' }
console.log(m.get("secondName")); //'tian'
m.set("key1", "val1").set("key2", "key2");
console.log(m); //Map(4) {'fristName' => 'yang','secondName' => 'tian','key1' => 'val1','key2' => 'key2'}

//与 Object 只能使用数值、字符串或符号作为键不同，Map 可以使用任何 JavaScript 数据类型作为
//键。Map 内部使用 SameValueZero 比较操作（ECMAScript 规范内部定义，语言中不能使用），基本上相
//当于使用严格对象相等的标准来检查键的匹配性。

const map = new Map();
const functionKey = function () {};
const symbolKey = Symbol();
const objectKey = new Object();
map.set(functionKey, "functionValue");
map.set(symbolKey, "symbolValue");
map.set(objectKey, "objectValue");
console.log(map);
console.log(map.get(function () {})); //undefined
console.log(map.get(functionKey)); //'functionValue'
//与严格相等一样，在映射中用作键和值的对象及其他“集合”类型，在自己的内容或属性被修改时
//仍然保持不变

const map1 = new Map();
const objKey = {};
const objVal = {};
const arrKey = [];
const arrVal = [];
map1.set(objKey, objVal).set(arrKey, arrVal);
console.log(map1); //Map(2) { {} => {}, [] => [] }
objKey.foo = "foo";
objVal.bar = "bar";
arrKey.push("foo");
arrVal.push("bar");
console.log(map1); //Map(2) { { foo: 'foo' } => { bar: 'bar' }, [ 'foo' ] => [ 'bar' ] }
