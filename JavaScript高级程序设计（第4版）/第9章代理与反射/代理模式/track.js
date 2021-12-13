// 跟踪属性访问
const user = {
  name: "jake",
};
const porxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`getting${property}`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    console.log(`Setting ${property}=${value}`);
    return Reflect.set(...arguments);
  },
});
porxy.name;
porxy.age = 27;
