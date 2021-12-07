// 引用类型赋值传递存储战空间
// 基本类型赋值复制传值
let person = new Object();
person.name = "nicholas";
console.log(person.name);
let name = "nicholas";
name.age = 17;
console.log(name.age);
//只有引用值可以动态添加后面可以使用的属性
let num1 = 5;
let num2 = num1;
console.log(num2);
num2 = 4;
console.log(num2);
console.log(num1);
let obj1 = new Object();
let obj2 = obj1;
obj1.name = "yangtianyu";
console.log(obj2);
//对象共同改变

//传递参数
//函数传参都按值传递 函数外的值会被复制到函数内部的参数中
function addten(num) {
  num += 10;
  return num;
}
let count = 20;
let result = addten(count);
console.log(count);
console.log(result);
//这里，函数 addTen()有一个参数 num，它其实是一个局部变量。在调用时，变量 count 作为参数
//传入。count 的值是 20，这个值被复制到参数 num 以便在 addTen()内部使用。在函数内部，参数 num
//的值被加上了 10，但这不会影响函数外部的原始变量 count。参数 num 和变量 count 互不干扰，它们
//只不过碰巧保存了一样的值。如果 num 是按引用传递的，那么 count 的值也会被修改为 30。这个事实
//在使用数值这样的原始值时是非常明显的。
function setName(obj) {
  obj.name = "yangtianyu";
}
let person1 = {};
setName(person1);
console.log(person1);

//这一次，我们创建了一个对象并把它保存在变量 person 中。然后，这个对象被传给 setName()
//方法，并被复制到参数 obj 中。在函数内部，obj 和 person 都指向同一个对象。结果就是，即使对象
//是按值传进函数的，obj 也会通过引用访问对象。当函数内部给 obj 设置了 name 属性时，函数外部的
//对象也会反映这个变化，因为 obj 指向的对象保存在全局作用域的堆内存上。很多开发者错误地认为，
//当在局部作用域中修改对象而变化反映到全局时，就意味着参数是按引用传递的。为证明对象是按值传
//递的，我们再来看看下面这个修改后的例子：
function newsetName(obj) {
  obj.name = "yangtianyu";
  obj.age = 26;
  obj = new Object();
  obj.name = "yangxu";
  console.log(obj);
}
let person2 = {};
newsetName(person2);
console.log(person2);
//这个例子前后唯一的变化就是 setName()中多了两行代码，将 obj 重新定义为一个有着不同 name
//的新对象。当 person 传入 setName()时，其 name 属性被设置为"Nicholas"。然后变量 obj 被设置
//为一个新对象且 name 属性被设置为"Greg"。如果 person 是按引用传递的，那么 person 应该自动将
//指针改为指向 name 为"Greg"的对象。可是，当我们再次访问 person.name 时，它的值是"Nicholas"，
//这表明函数中参数的值改变之后，原始的引用仍然没变。当 obj 在函数内部被重写时，它变成了一个指
//向本地对象的指针。而那个本地对象在函数执行结束时就被销毁了。
