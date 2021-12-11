类定义
与函数类型相似，定义类也有两种主要方式：类声明和类表达式。这两种方式都使用 class 关键
字加大括号：
类声明
class Person {}
类表达式
const Animal = class {};
与函数表达式类似，类表达式在它们被求值前也不能引用。不过，与函数定义不同的是，虽然函数
声明可以提升，但类定义不能
`javaScript
console.log(FunctionExpression); // undefined
var FunctionExpression = function() {};
console.log(FunctionExpression); // function() {}
console.log(FunctionDeclaration); // FunctionDeclaration() {}
function FunctionDeclaration() {}
console.log(FunctionDeclaration); // FunctionDeclaration() {}
console.log(ClassExpression); // undefined
var ClassExpression = class {};
console.log(ClassExpression); // class {}
console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
class ClassDeclaration {}
console.log(ClassDeclaration); // class ClassDeclaration {}
另一个跟函数声明不同的地方是，函数受函数作用域限制，而类受块作用域限制：
{
function FunctionDeclaration() {}
class ClassDeclaration {}
}
console.log(FunctionDeclaration); // FunctionDeclaration() {}
console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined
类的构成
类可以包含构造函数方法、实例方法、获取函数、设置函数和静态类方法，但这些都不是必需的。
空的类定义照样有效。默认情况下，类定义中的代码都在严格模式下执行。
与函数构造函数一样，多数编程风格都建议类名的首字母要大写，以区别于通过它创建的实例（比
如，通过 class Foo {}创建实例 foo）：
// 空类定义，有效
class Foo {}
// 有构造函数的类，有效
class Bar {
constructor() {}
}
// 有获取函数的类，有效
class Baz {
get myBaz() {}
}
// 有静态方法的类，有效
class Qux {
static myQux() {}
}
类表达式的名称是可选的。在把类表达式赋值给变量后，可以通过 name 属性取得类表达式的名称
字符串。但不能在类表达式作用域外部访问这个标识符。
let Person = class PersonName {
identify() {
console.log(Person.name, PersonName.name);
}
}
let p = new Person();
p.identify(); // PersonName PersonName
console.log(Person.name); // PersonName
console.log(PersonName); // ReferenceError: PersonName is not defined
