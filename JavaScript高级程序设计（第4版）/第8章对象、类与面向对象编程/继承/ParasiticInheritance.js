//寄生式继承
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function createAnother(original) {
  let clone = object(original); // 通过调用函数创建一个新对象
  clone.sayHi = function () {
    // 以某种方式增强这个对象
    console.log("hi");
  };
  return clone; // 返回这个对象
}
// 在这段代码中，createAnother()函数接收一个参数，就是新对象的基准对象。这个对象 original
// 会被传给 object()函数，然后将返回的新对象赋值给 clone。接着给 clone 对象添加一个新方法
// sayHi()。最后返回这个对象。可以像下面这样使用 createAnother()函数：
let person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"],
};
let anotherPerson = createAnother(person);
anotherPerson.sayHi(); // "hi"
//  这个例子基于 person 对象返回了一个新对象。新返回的 anotherPerson 对象具有 person 的所
//  有属性和方法，还有一个新方法叫 sayHi()。
//  寄生式继承同样适合主要关注对象，而不在乎类型和构造函数的场景。object()函数不是寄生式
//  继承所必需的，任何返回新对象的函数都可以在这里使用。
// 寄生式组合继承
// 接ParasiticCombinatorialInheritance.js
