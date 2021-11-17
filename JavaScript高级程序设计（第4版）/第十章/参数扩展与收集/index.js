//扩展参数
//在给函数传参时，有时候可能不需要传一个数组，而是要分别传入数组的元素。
//假设有如下函数定义，它会将所有传入的参数累加起来：
let values = [1, 2, 3, 4];
function getSum() {
  let sum = 0;
  for (let i = 0; i < arguments.length; ++i) {
    sum += arguments[i];
  }
  return sum;
}
//这个函数希望将所有加数逐个传进来，然后通过迭代 arguments 对象来实现累加。如果不使用扩
//展操作符，想把定义在这个函数这面的数组拆分，那么就得求助于 apply()方法：
const addSum = getSum.apply(null, values);
console.log(addSum);
//但在 ECMAScript 6 中，可以通过扩展操作符极为简洁地实现这种操作。对可迭代对象应用扩展操
//作符，并将其作为一个参数传入，可以将可迭代对象拆分，并将迭代返回的每个值单独传入。
//比如，使用扩展操作符可以将前面例子中的数组像这样直接传给函数：
console.log(getSum(...values)); // 10
//因为数组的长度已知，所以在使用扩展操作符传参的时候，并不妨碍在其前面或后面再传其他的值，
//包括使用扩展操作符传其他参数：
console.log(getSum(-1, ...values)); // 9
console.log(getSum(...values, 5)); // 15
console.log(getSum(-1, ...values, 5)); // 14
console.log(getSum(...values, ...[5, 6, 7])); // 28
//对函数中的 arguments 对象而言，它并不知道扩展操作符的存在，而是按照调用函数时传入的参
//数接收每一个值：
let values = [1, 2, 3, 4];
function countArguments() {
  console.log(arguments.length);
}
countArguments(-1, ...values); // 5
countArguments(...values, 5); // 5
countArguments(-1, ...values, 5); // 6
countArguments(...values, ...[5, 6, 7]); // 7
//arguments 对象只是消费扩展操作符的一种方式。在普通函数和箭头函数中，也可以将扩展操作
//符用于命名参数，当然同时也可以使用默认参数：
function getProduct(a, b, c = 1) {
  return a * b * c;
}
let getSum = (a, b, c = 0) => {
  return a + b + c;
};
console.log(getProduct(...[1, 2])); // 2
console.log(getProduct(...[1, 2, 3])); // 6
console.log(getProduct(...[1, 2, 3, 4])); // 6
console.log(getSum(...[0, 1])); // 1
console.log(getSum(...[0, 1, 2])); // 3
console.log(getSum(...[0, 1, 2, 3])); // 3

//收集参数
//收集参数的前面如果还有命名参数，则只会收集其余的参数；如果没有则会得到空数组。因为收集
//参数的结果可变，所以只能把它作为最后一个参数：
// 不可以
function getProduct(...values, lastValue) {}
// 可以
function ignoreFirst(firstValue, ...values) { 
  console.log(values); 
 }
ignoreFirst(); // [] 
ignoreFirst(1); // [] 
ignoreFirst(1,2); // [2] 
ignoreFirst(1,2,3); // [2, 3]


//函数作为值
function createComparisonFunction(propertyName) { 
  return function(object1, object2) { 
  let value1 = object1[propertyName]; 
  let value2 = object2[propertyName]; 
  if (value1 < value2) { 
  return -1; 
  } else if (value1 > value2) { 
  return 1; 
  } else { 
  return 0; 
  } 
  }; 
 }
 let data = [ 
  {name: "Zachary", age: 28}, 
  {name: "Nicholas", age: 29} 
 ]; 
 data.sort(createComparisonFunction("name")); 
 console.log(data[0].name); // Nicholas
 data.sort(createComparisonFunction("age")); 
console.log(data[0].name); // Zachary