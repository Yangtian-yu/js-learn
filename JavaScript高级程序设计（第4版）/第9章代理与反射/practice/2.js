const o = ["arr", "red"];
const handler = {
  get() {
    console.log("object");
    return Reflect.get(...arguments);
  },
};
const proxy = new Proxy(o, handler);
console.log(proxy[0]);
