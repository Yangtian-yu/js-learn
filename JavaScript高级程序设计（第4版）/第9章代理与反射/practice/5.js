const arr = [];
const porxy = new Proxy(arr, {
  set(a, b, c, d) {
    const res = Reflect.set(...arguments);
    if (res) {
      const result = Reflect.get(a, b, d);
      console.log(result);
    }
    return res;
  },
});
porxy.push("foo");
porxy.push({ name: "yangtianyu" });
console.log(arr);
