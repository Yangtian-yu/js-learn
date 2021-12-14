const myTarget = () => {};
const proxy = new Proxy(myTarget, {
  apply(target, thisArg, ...argumentsList) {
    console.log("apply()");
    return Reflect.apply(...arguments);
  },
});
proxy();
// apply()
// 1. 返回值
// 返回值无限制。
// 2. 拦截的操作
//  proxy(...argumentsList)
//  Function.prototype.apply(thisArg, argumentsList)
//  Function.prototype.call(thisArg, ...argumentsList)
//  Reflect.apply(target, thisArgument, argumentsList)
// 3. 捕获器处理程序参数
//  target：目标对象。
//  thisArg：调用函数时的 this 参数。
//  argumentsList：调用函数时的参数列表
// 4. 捕获器不变式
// target 必须是一个函数对象。
