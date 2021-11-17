//arguments 对象前面讨论过多次了，它是一个类数组对象，包含调用函数时传入的所有参数。这
//个对象只有以 function 关键字定义函数（相对于使用箭头语法创建函数）时才会有。虽然主要用于包
//含函数参数，但 arguments 对象其实还有一个 callee 属性，是一个指向 arguments 对象所在函数的
//指针。来看下面这个经典的阶乘函数：
function factiorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factiorial(num - 1);
  }
}

//阶乘函数一般定义成递归调用的，就像上面这个例子一样。只要给函数一个名称，而且这个名称不
//会变，这样定义就没有问题。但是，这个函数要正确执行就必须保证函数名是factorial，从而导致了紧密
//耦合。使用arguments.callee就可以让函数逻辑与函数名解耦
function factiorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}
//这个重写之后的factorial()函数已经用arguments.callee代替了之前的硬编码的factorial。
//这以为这无论函数叫什么名称，都可以引用正确的函数。考虑下面的情况：
let trueFactorial = factiorial;
factiorial = function () {
  return;
};
console.log(trueFactorial(5)); //120
console.log(factorial(5)); //0
//这里，trueFactorial 变量被赋值为 factorial，实际上把同一个函数的指针又保存到了另一个
//位置。然后，factorial 函数又被重写为一个返回 0 的函数。如果像 factorial()最初的版本那样不
//使用 arguments.callee，那么像上面这样调用 trueFactorial()就会返回 0。不过，通过将函数与
//名称解耦，trueFactorial()就可以正确计算阶乘，而 factorial()则只能返回 0。

//this
//它在标准函数和箭头函数中有不同的行为。
//在标准函数中，this 引用的是把函数当成方法调用的上下文对象，这时候通常称其为 this 值（在
//网页的全局上下文中调用函数时，this 指向 windows）。
window.color = "red";
let o = {
  color: "blue",
};
function saycolor() {
  console.log(this.color);
}
saycolor(); //;red;
o.saycolor = saycolor;
o.saycolor(); //blue

//定义在全局上下文中的函数saycolor()引用了this对象，这个this到底引用哪个对象必须到函数被调用时才能确定。因此这个值在代码执行的过程中可能会变。
//如果在全局上下文中调用saycolor()，这结果会输出‘red’，因为this 指向 window，而 this.color 相当于 window.color。
//而在把 sayColor()赋值给 o 之后再调用 o.sayColor()，this 会指向 o，即 this.color 相当于
//o.color，所以会显示"blue"。
//在箭头函数中，this引用的是定义箭头函数的上下文。下面的例子演示了这一点。在对sayColor()
//的两次调用中，this 引用的都是 window 对象，因为这个箭头函数是在 window 上下文中定义的：
window.color = "red";
let o = {
  color: "blue",
};
let sayColor = () => console.log(this.color);
sayColor(); // 'red'
o.sayColor = sayColor;
o.sayColor(); // 'red'
//有读者知道，在事件回调或定时回调中调用某个函数时，this 值指向的并非想要的对象。此时将
//回调函数写成箭头函数就可以解决问题。这是因为箭头函数中的 this 会保留定义该函数时的上下文：
function King() {
  this.royaltyName = "Henry";
  // this 引用 King 的实例
  setTimeout(() => console.log(this.royaltyName), 1000);
}
function Queen() {
  this.royaltyName = "Elizabeth";
  // this 引用 window 对象
  setTimeout(function () {
    console.log(this.royaltyName);
  }, 1000);
}
new King(); // Henry
new Queen(); // undefined

//prototype 属性也许是 ECMAScript 核心中最有趣的部分。prototype 是保存引用类型所有实例
//方法的地方，这意味着 toString()、valueOf()等方法实际上都保存在 prototype 上，进而由所有实
//例共享。这个属性在自定义类型时特别重要。（相关内容已经在第 8 章详细介绍过了。）在 ECMAScript 5
//中，prototype 属性是不可枚举的，因此使用 for-in 循环不会返回这个属性。
//函数还有两个方法：apply()和 call()。这两个方法都会以指定的 this 值来调用函数，即会设
//置调用函数时函数体内 this 对象的值。apply()方法接收两个参数：函数内 this 的值和一个参数数
//组。第二个参数可以是 Array 的实例，但也可以是 arguments 对象。来看下面的例子：
function sum(num1, num2) {
  return num1 + num2;
}
function callSum1(num1, num2) {
  return sum.apply(this, arguments); // 传入 arguments 对象
}
function callSum2(num1, num2) {
  return sum.apply(this, [num1, num2]); // 传入数组
}
console.log(callSum1(10, 10)); // 20
console.log(callSum2(10, 10)); // 20
//在这个例子中，callSum1()会调用 sum()函数，将 this 作为函数体内的 this 值（这里等于
//window，因为是在全局作用域中调用的）传入，同时还传入了 arguments 对象。callSum2()也会调
//用 sum()函数，但会传入参数的数组。这两个函数都会执行并返回正确的结果。
