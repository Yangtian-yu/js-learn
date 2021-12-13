function median(...nums) {
  return nums.sort()[Math.floor(nums.length / 2)];
}
const proxy = new Proxy(median, {
  apply(target, thisArg, argumentsList) {
    for (const arg of argumentsList) {
      if (typeof arg !== "number") {
        throw "Non-number argument provided";
      }
    }
    return Reflect.apply(...arguments);
  },
});
console.log(proxy(4, 7, 1)); // 4
console.log(proxy(4, "7", 1));
// Error: Non-number argument provided

class User {
  constructor(id) {
    this.id_ = id;
  }
}
const proxy1 = new Proxy(User, {
  construct(target, argumentsList, newTarget) {
    if (argumentsList[0] === undefined) {
      throw "User cannot be instantiated without id";
    } else {
      return Reflect.construct(...arguments);
    }
  },
});
new proxy1(1);
new proxy1();
// Error: User cannot be instantiated without id
