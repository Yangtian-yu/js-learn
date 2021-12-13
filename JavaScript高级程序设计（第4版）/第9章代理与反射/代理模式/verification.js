const target = {
  onlyNumbersGoHere: 0,
};
const proxy = new Proxy(target, {
  set(target, property, value) {
    if (typeof value !== "number") {
      return false;
    } else {
      return Reflect.set(...arguments);
    }
  },
});
proxy.onlyNumbersGoHere = 1;
console.log(proxy.onlyNumbersGoHere); // 1
proxy.onlyNumbersGoHere = "foo";
console.log(proxy.onlyNumbersGoHere); // 1
