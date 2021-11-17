let arrowSum = (a, b) => {
  return a + b;
};
let functionExpressionSum = function (a, b) {
  return a + b;
};
console.log(arrowSum(5, 8)); // 13
console.log(functionExpressionSum(5, 8)); // 13
//如果只有一个参数，那也可以不用括号。只有没有参数，或者多个参数的情况下，才需要使用括号：
// 以下两种写法都有效
let double = (x) => {
  return 2 * x;
};
let triple = (x) => {
  return 3 * x;
};
//箭头函数也可以不用大括号，但这样会改变函数的行为。使用大括号就说明包含“函数体”，可以
//在一个函数中包含多条语句，跟常规的函数一样。如果不使用大括号，那么箭头后面就只能有一行代码，
//比如一个赋值操作，或者一个表达式。而且，省略大括号会隐式返回这行代码的值：
// 以下两种写法都有效，而且返回相应的值
let double = (x) => {
  return 2 * x;
};
let triple = (x) => 3 * x;
//箭头函数虽然语法简洁，但也有很多场合不适用。箭头函数不能使用 arguments、super 和
//new.target，也不能用作构造函数。此外，箭头函数也没有 prototype 属性。
