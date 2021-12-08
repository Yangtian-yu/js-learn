// 提前终止生成器
// 与迭代器类似，生成器也支持“可关闭”的概念。一个实现 Iterator 接口的对象一定有 next()
// 方法，还有一个可选的 return()方法用于提前终止迭代器。生成器对象除了有这两个方法，还有第三
// 个方法：throw()。
function* generatorFn() {}
const g = generatorFn();
console.log(g);
console.log(g.next);
console.log(g.return);
console.log(g.throw);
// return()和 throw()方法都可以用于强制生成器进入关闭状态
// return
function* generatorFn1() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const f = generatorFn1();
console.log(f);
console.log(f.next());
console.log(f.return(4));
console.log(f);
console.log(f.next());
// 与迭代器不同，所有生成器对象都有 return()方法，
// 只要通过它进入关闭状态，就无法恢复了。
// 后续调用 next()会显示 done: true 状态，
// 而提供的任何返回值都不会被存储或传播：
// for-of 循环等内置语言结构会忽略状态为 done: true 的 IteratorObject 内部返回的值。
function* generatorFn2() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const H = generatorFn2();
for (const x of H) {
  if (x > 1) {
    H.return(4);
  }
  console.log(x);
}

//throw

// throw()方法会在暂停的时候将一个提供的错误注入到生成器对象中。
// 如果错误未被处理，生成器就会关闭：
function* generatorFn3() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const a = generatorFn3();
console.log(a);
try {
  a.throw("foo");
} catch (error) {
  console.log(error);
}
console.log(a);

// 不过，假如生成器函数内部处理了这个错误，那么生成器就不会关闭，而且还可以恢复执行。
// 错误处理会跳过对应的 yield，因此在这个例子中会跳过一个值。比如：

function* generatorFn4() {
  for (const x of [1, 2, 3]) {
    try {
      yield x;
    } catch (e) {}
  }
}
const b = generatorFn4();
console.log(b.next());
b.throw("foo");
console.log(b.next());
console.log(b.next());
// 在这个例子中，生成器在 try/catch 块中的 yield 关键字处暂停执行。在暂停期间，throw()方
// 法向生成器对象内部注入了一个错误：字符串"foo"。这个错误会被 yield 关键字抛出。因为错误是在
// 生成器的 try/catch 块中抛出的，所以仍然在生成器内部被捕获。可是，由于 yield 抛出了那个错误，
// 生成器就不会再产出值 2。此时，生成器函数继续执行，在下一次迭代再次遇到 yield 关键字时产出了
// 值 3。
