// 生成器是 ECMAScript 6 新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行的
// 能力。这种新能力具有深远的影响，比如，使用生成器可以自定义迭代器和实现协程。
// 生成器的形式是一个函数，函数名称前面加一个星号（*）表示它是一个生成器。只要是可以定义
// 函数的地方，就可以定义生成器。
// 生成器函数声明
function* gemeratorFn() {}
//生成器函数表达式
let generatorFn = function* () {};
//作为对象字面量方法的生成器函数
let foo = {
  *generatorFn() {},
};
// 作为类实例方法的生成器函数
class Foo {
  *generatorFn() {}
}
// 作为类静态方法的生成器函数
class Bar {
  static *generatorFn() {}
}

// 注意  箭头函数不能用来定义生成器函数。
// 调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停执行（suspended）的状态。与
// 迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 next()方法。调用这个方法会让生成器
// 开始或恢复执行。
function* gemeratorFn1() {}
const g = gemeratorFn1();
console.log(g);
console.log(g.next);
// next()方法的返回值类似于迭代器，有一个 done 属性和一个 value 属性。函数体为空的生成器
// 函数中间不会停留，调用一次 next()就会让生成器到达 done: true 状态。

function* generatorFn2() {}
let generatorObject = generatorFn2();
console.log(generatorObject);
console.log(generatorObject.next());
//value属性是生成器函数的返回值，默认值为undefined，可以通过生成器函数的返回值指定：
function* generatorFn3() {
  return "foo";
}
let generatorObject1 = generatorFn3();
console.log(generatorObject1);
console.log(generatorObject1.next());
// 生成器函数只会在初次调用 next()方法后开始执行，如下所示：
function* generatorFn4() {
  console.log("foobar");
}
// 初次调用生成器函数并不会打印日志
let generatorObject2 = generatorFn4();
generatorObject2.next();

// 生成器对象实现了 Iterable 接口，它们默认的迭代器是自引用的：

function* generatorFn5() {}
console.log(generatorFn5);
console.log(generatorFn5());
console.log(generatorFn5()[Symbol.iterator]);
console.log(generatorFn5()[Symbol.iterator]());
const p = generatorFn5();
console.log(p === p[Symbol.iterator]());
