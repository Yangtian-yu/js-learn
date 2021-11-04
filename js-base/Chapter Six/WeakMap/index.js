//ECMAScript  6 新增的“弱映射”（WeakMap）是一种新的集合类型，为这门语言带来了增强的键/
//值对存储机制。WeakMap 是Map 的“兄弟”类型，其API 也是Map 的子集。WeakMap 中的“weak”（弱），
//描述的是JavaScript 垃圾回收程序对待“弱映射”中键的方式。
//基本Api
const wm = new WeakMap();
//弱映射中的键只能是 Object 或者继承自 Object 的类型，尝试使用非对象设置键会抛出
//TypeError。值的类型没有限制。
//如果想在初始化时填充弱映射，则构造函数可以接收一个可迭代对象，其中需要包含键/值对数组。
//可迭代对象中的每个键/值都会按照迭代顺序插入新实例中：
const key1 = { id: 1 },
  key2 = { id: 2 },
  key3 = { id: 3 };
const wm1 = new WeakMap([
  [key1, "val1"],
  [key2, "val2"],
  [key3, "val3"],
]);
console.log(wm1.get(key1));
// 初始化是全有或全无的操作
// 只要有一个键无效就会抛出错误，导致整个初始化失败

//弱键
//WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，这些键不属于正式的引用，
//不会阻止垃圾回收。但要注意的是，弱映射中值的引用可不是“弱弱地拿着”的。只要键存在，键/值
//对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收
const wm2 = new WeakMap();
wm2.set({}, "val");
console.log(wm2); //已被回收
//set()方法初始化了一个新对象并将它用作一个字符串的键。因为没有指向这个对象的其他引用，
//所以当这行代码执行完成后，这个对象键就会被当作垃圾回收。然后，这个键/值对就从弱映射中消失
//了，使其成为一个空映射。在这个例子中，因为值也没有被引用，所以这对键/值被破坏以后，值本身
//也会成为垃圾回收的目标。
const wm3 = new WeakMap();
const container = {
  key: {},
};
wm3.set(container.key, "val");
function removeReference() {
  container.key = null;
}

const vm4 = new WeakMap();
class User {
  constructor(id) {
    this.idProperty = Symbol("id");
    this.setId(id);
  }
  serPrivate(property, value) {
    //Symbol("id")   id
    const privateMembers = vm4.get(this) || {};
    privateMembers[property] = value;
    vm4.set(this, privateMembers);
  }
  getPrivate(property) {
    return vm4.get(this)[property];
  }
  setId(id) {
    this.serPrivate(this.idProperty, id);
  }
  getId() {
    return this.getPrivate(this.idProperty);
  }
}

const user = new User(123);
console.log(user.getId()); //123
user.setId(456);
console.log(user.getId());
console.log(vm4.get(user)[user.idProperty]); //456
