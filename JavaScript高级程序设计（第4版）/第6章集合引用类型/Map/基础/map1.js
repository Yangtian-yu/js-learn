const m = new Map();
console.log(m);
const m1 = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"],
]);
console.log(m1);
console.log(m1.size);
console.log(m.has("firstName"));
console.log(m.get("firstName"));
console.log(m.size);
m.set("firstName", "yang").set("lastName", "Tianyu");
console.log(m.has("firstName"));
console.log(m.get("firstName"));
m.delete("firstName");
console.log(m.size);
m.delete("lastName");
console.log(m.size);
const objKey = {},
  objVal = {},
  arrKey = [],
  arrVal = [];
m.set(objKey, objVal);
m.set(arrKey, arrVal);
objKey.foo = "foo";
objVal.bar = "bar";
arrKey.push("foo");
arrVal.push("bar");
console.log(m);
for (let item of m.entries()) {
  console.log(item);
}
m.forEach((key, value) => {
  console.log(`${key}=>${value}`);
});
console.log(Array.from(m));
const m2 = new WeakMap();
const container = {
  key: {},
};
m2.set(container, "val");
console.log(m2);
const wm = new WeakMap();
class User {
  constructor(id) {
    this.idProperty = Symbol("id");
    this.setId(id);
  }
  setPrivate(property, value) {
    const privateMembers = wm.get(this) || {};
    privateMembers[property] = value;
    wm.set(this, privateMembers);
  }
  getPrivate(property) {
    return wm.get(this)[property];
  }
  setId(id) {
    this.setPrivate(this.idProperty, id);
  }
  getId() {
    return this.getPrivate(this.idProperty);
  }
}
const user = new User(123);
console.log(user.getId());
user.setId(456);
console.log(user.getId());
