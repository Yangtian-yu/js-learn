// 通过代理可以把运行时中原本不相关的部分联系到一起。这样就可以实现各种模式，从而让不同的
// 代码互操作。
const userList = [];
class User {
  constructor(name) {
    this.name_ = name;
  }
}
const proxy = new Proxy(User, {
  construct() {
    const newUser = Reflect.construct(...arguments);
    userList.push(newUser);
    return newUser;
  },
});
new proxy("John");
new proxy("Jacob");
new proxy("Jingleheimerschmidt");
console.log(userList); // [User {}, User {}, User{}]

// 另外，还可以把集合绑定到一个事件分派程序，每次插入新实例时都会发送消息：

const userList1 = [];
function emit(newValue) {
  console.log(newValue);
}
const proxy1 = new Proxy(userList1, {
  set(target, property, value, receiver) {
    const result = Reflect.set(...arguments);
    if (result) {
      emit(Reflect.get(target, property, receiver));
    }
    return result;
  },
});
proxy1.push("John");
// John
proxy1.push("Jacob");
// Jacob
