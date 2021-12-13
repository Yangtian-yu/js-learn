const myTarget = {};
const proxy = new Proxy(myTarget, {
  ownKeys(target) {
    console.log("ownKeys()");
    return Reflect.ownKeys(...arguments);
  },
});
Object.keys(proxy);
// ownKeys()
// 1. 返回值
// ownKeys()必须返回包含字符串或符号的可枚举对象。
// 2. 拦截的操作
//  Object.getOwnPropertyNames(proxy)
//  Object.getOwnPropertySymbols(proxy)
//  Object.keys(proxy)
//  Reflect.ownKeys(proxy)
// 3. 捕获器处理程序参数
//  target：目标对象。
// 4. 捕获器不变式
// 返回的可枚举对象必须包含 target 的所有不可配置的自有属性。
// 如果 target 不可扩展，则返回可枚举对象必须准确地包含自有属性键
