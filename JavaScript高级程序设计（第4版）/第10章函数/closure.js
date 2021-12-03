//闭包
//闭包指的是那些引用了另一个函数作用域中变量的函
//数，通常是在嵌套函数中实现的
function createComparisonFunction(propertyName) {
  return function (object1, object2) {
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
//理解作用域链创建和使用的细节对理解闭包非常重要。在
//调用一个函数时，会为这个函数调用创建一个执行上下文，并创建一个作用域链。然后用 arguments
//和其他命名参数来初始化这个函数的活动对象。外部函数的活动对象是内部函数作用域链上的第二个对
//象。这个作用域链一直向外串起了所有包含函数的活动对象，直到全局执行上下文才终止。
//在函数执行时，要从作用域链中查找变量，以便读、写值。来看下面的代码：
function compare(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}
// let result = compare(5, 10);
//这里定义的 compare()函数是在全局上下文中调用的。第一次调用 compare()时，会为它创建一
//个包含 arguments、value1 和 value2 的活动对象，这个对象是其作用域链上的第一个对象。而全局
//上下文的变量对象则是 compare()作用域链上的第二个对象，其中包含 this、result 和 compare。
//函数执行时，每个执行上下文中都会有一个包含其中变量的对象。全局上下文中的叫变量对象，它
//会在代码执行期间始终存在。而函数局部上下文中的叫活动对象，只在函数执行期间存在。在定义
//compare()函数时，就会为它创建作用域链，预装载全局变量对象，并保存在内部的[[Scope]]中。在
//调用这个函数时，会创建相应的执行上下文，然后通过复制函数的[[Scope]]来创建其作用域链。接着
//会创建函数的活动对象（用作变量对象）并将其推入作用域链的前端。在这个例子中，这意味着 compare()
//函数执行上下文的作用域链中有两个变量对象：局部变量对象和全局变量对象。作用域链其实是一个包
//含指针的列表，每个指针分别指向一个变量对象，但物理上并不会包含相应的对象。
//函数内部的代码在访问变量时，就会使用给定的名称从作用域链中查找变量。函数执行完毕后，局
//部活动对象会被销毁，内存中就只剩下全局作用域。不过，闭包就不一样了。
//在一个函数内部定义的函数会把其包含函数的活动对象添加到自己的作用域链中。因此，在
//createComparisonFunction()函数中，
//匿名函数的作用域链中实际上包含 createComparisonFunction()的活动对象。
//createComparisonFunction()返回匿名函数后，
//它的作用域链被初始化为包含 createComparisonFunction()的活动对象和全局变量对象。
//这样，匿名函数就可以访问到 createComparisonFunction()可以访问的所有变量。
//另一个有意思的副作用就是，createComparisonFunction()的
//活动对象并不能在它执行完毕后销毁，
//因为匿名函数的作用域链中仍然有对它的引用。在 createComparisonFunction()执行完毕后，
//其执行上下文的作用域链会销毁，但它的活动对象仍然会保留
//在内存中，直到匿名函数被销毁后才会被销毁：
// 创建比较函数
let compareNames = createComparisonFunction("name");
// 调用函数
let result = compareNames({ name: "Nicholas" }, { name: "Matt" });
console.log(result);
// 解除对函数的引用，这样就可以释放内存了
compareNames = null;
//这里，创建的比较函数被保存在变量 compareNames 中。把 compareNames 设置为等于 null 会
//解除对函数的引用，从而让垃圾回收程序可以将内存释放掉。作用域链也会被销毁，其他作用域（除全
//局作用域之外）也可以销毁。图 10-2 展示了调用 compareNames()之后作用域链之间的关系。

//返回函数的函数
// 1: let val = 7
// 2: function createAdder() {
// 3:   function addNumbers(a, b) {
// 4:     let ret = a + b
// 5:     return ret
// 6:   }
// 7:   return addNumbers
// 8: }
// 9: let adder = createAdder()
// 10: let sum = adder(val, 8)
// 11: console.log('example of function returning a function: ', sum)

// 让我们回到分步分解：

// 第1行。我们在全局执行上下文中声明一个变量val并赋值为 7。

// 第 2-8 行。我们在全局执行上下文中声明了一个名为 createAdder 的变量，并为其分配了一个函数定义。
//第3-7行描述了上述函数定义，和以前一样，在这一点上，我们没有直接讨论这个函数。我们只是将函数定义存储到那个变量(createAdder)中。

// 第9行。我们在全局执行上下文中声明了一个名为 adder 的新变量，暂时，值为 undefined。

// 第9行。我们看到括号()，我们需要执行或调用一个函数，查找全局执行上下文的内存并查找名为createAdder 的变量，它是在步骤2中创建的。好吧，我们调用它。

// 调用函数时，执行到第2行。创建一个新的createAdder执行上下文。我们可以在createAdder的执行上下文中创建自有变量。js 引擎将createAdder的上下文添加到调用堆栈。这个函数没有参数，让我们直接跳到它的主体部分.

// 第 3-6 行。我们有一个新的函数声明，我们在createAdder执行上下文中创建一个变量addNumbers。这很重要，addnumber只存在于createAdder执行上下文中。我们将函数定义存储在名为 ``addNumbers``` 的自有变量中。

// 第7行，我们返回变量addNumbers的内容。js引擎查找一个名为addNumbers的变量并找到它，这是一个函数定义。
//好的，函数可以返回任何东西，包括函数定义。我们返addNumbers的定义。第4行和第5行括号之间的内容构成该函数定义。

// 返回时，createAdder执行上下文将被销毁。addNumbers 变量不再存在。但addNumbers函数定义仍然存在，因为它返回并赋值给了adder 变量。

// 第10行。我们在全局执行上下文中定义了一个新的变量 sum，先赋值为 undefined;

// 接下来我们需要执行一个函数。哪个函数? 是名为adder变量中定义的函数。我们在全局执行上下文中查找它，果然找到了它，这个函数有两个参数。

// 让我们查找这两个参数，第一个是我们在步骤1中定义的变量val，它表示数字7，第二个是数字8。

// 现在我们要执行这个函数，函数定义概述在第3-5行，因为这个函数是匿名，为了方便理解，我们暂且叫它adder吧。
//这时创建一个adder函数执行上下文，在adder执行上下文中创建了两个新变量 a 和 b。它们分别被赋值为 7 和 8，因为这些是我们在上一步传递给函数的参数。

// 第 4 行。在adder执行上下文中声明了一个名为ret的新变量,

// 第 4 行。将变量a的内容和变量b的内容相加得15并赋给ret变量。

// ret变量从该函数返回。这个匿名函数执行上下文被销毁，从调用堆栈中删除，变量a、b和ret不再存在。

// 返回值被分配给我们在步骤9中定义的sum变量。

// 我们将sum的值打印到控制台。

// 如预期，控制台将打印15。我们在这里确实经历了很多困难，我想在这里说明几点。首先，函数定义可以存储在变量中，函数定义在程序调用之前是不可见的。
//其次，每次调用函数时，都会(临时)创建一个本地执行上下文。当函数完成时，执行上下文将消失。函数在遇到return或右括号}时执行完成。

//   1: function createCounter() {
//   2:   let counter = 0
//   3:   const myFunction = function() {
//   4:     counter = counter + 1
//   5:     return counter
//   6:   }
//   7:   return myFunction
//   8: }
//   9: const increment = createCounter()
//  10: const c1 = increment()
//  11: const c2 = increment()
//  12: const c3 = increment()
//  13: console.log('example increment', c1, c2, c3)
