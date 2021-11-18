//在闭包中使用 this 会让代码变复杂。如果内部函数没有使用箭头函数定义，则 this 对象会在运
//行时绑定到执行函数的上下文。如果在全局函数中调用，则 this 在非严格模式下等于 window，在严
//格模式下等于 undefined。如果作为某个对象的方法调用，则 this 等于这个对象。匿名函数在这种情
//况下不会绑定到某个对象，这就意味着 this 会指向 window，除非在严格模式下 this 是 undefined。
//不过，由于闭包的写法所致，这个事实有时候没有那么容易看出来。
window.identity = "The Window";
let object = {
  identity: "My Object",
  getIdentityFunc() {
    return function () {
      return this.identity;
    };
  },
};
console.log(object.getIdentityFunc()()); // 'The Window'
// 这里先创建了一个全局变量 identity，之后又创建一个包含 identity 属性的对象。这个对象还
// 包含一个 getIdentityFunc()方法，返回一个匿名函数。这个匿名函数返回 this.identity。因为
// getIdentityFunc()返回函数，所以 object.getIdentityFunc()()会立即调用这个返回的函数，
// 从而得到一个字符串。可是，此时返回的字符串是"The Winodw"，即全局变量 identity 的值。为什
// 么匿名函数没有使用其包含作用域（getIdentityFunc()）的 this 对象呢？
