//与object类型的一个主要差异是，map实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作
//映射实例可以提供一个迭代器（iterator） 能以插入顺序生成【key，value】形式的数组。
//可以通过entris()方法或symbol。iterator属性，它
//引用enries()取得这个迭代器
const m = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"],
]);
console.log(m.entries === m[Symbol.iterator]); //true
console.log(m.entries());
for (let pair of m.entries()) {
  console.log(pair);
}

// [key1,val1] // [key2,val2] // [key3,val3]
for (let pair of m[Symbol.iterator]()) {
  console.log(pair);
} // [key1,val1] // [key2,val2] // [key3,val3]
console.log([...m]);
//[ [ 'key1', 'val1' ], [ 'key2', 'val2' ], [ 'key3', 'val3' ] ]
m.forEach((val, key) => {
  console.log(`${key}=>${val}`);
});
// key1 -> val1 // key2 -> val2 // key3 -> val3
//keys()和values()分别返回以插入顺序生成键和值的迭代器
console.log(m.keys());
console.log(m.values());
for (let key of m.keys()) {
  console.log(key);
}
for (let key of m.values()) {
  console.log(key);
}
//键和值在迭代器遍历时是可以修改的，但映射内部的引用则无法修改。
//当然，这并不妨碍修改作为键或值的对象内部的属性，因为这样并不影响它们在映射实例中的身份：
const m1 = new Map([["key1", "val1"]]);
// 作为键的字符串原始值是不能修改的
for (let key of m1.keys()) {
  key = "newKey";
  console.log(key); //newkey
  console.log(m1.get("key1")); //val1
  console.log(m1.get("newKey")); //undefined
}

const keyObj = { id: 1 };
const m2 = new Map([[keyObj, "val1"]]);
// 修改了作为键的对象的属性，但对象在映射内部仍然引用相同的值
for (let key of m2.keys()) {
  key.id = "newkey";
  console.log(key);
  console.log(m2.get(keyObj));
}
console.log(keyObj);
console.log(m2);
