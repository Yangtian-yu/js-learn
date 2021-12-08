// yield 关键字可以让生成器停止和开始执行，也是生成器最有用的地方。生成器函数在遇到 yield
// 关键字之前会正常执行。遇到这个关键字后，执行会停止，函数作用域的状态会被保留。停止执行的生
// 成器函数只能通过在生成器对象上调用 next()方法来恢复执行：
function* generatorFn() {
  yield;
}
let generatorObject = generatorFn();
console.log(generatorObject.next());
console.log(generatorObject.next());
// 此时的yield 关键字有点像函数的中间返回语句，它生成的值会出现在 next()方法返回的对象里。
// 通过 yield 关键字退出的生成器函数会处在 done: false 状态；通过 return 关键字退出的生成器函
// 数会处于 done: true 状态。
function* generatorFn1() {
  yield "foo";
  yield "bar";
  return "baz";
}
let generatorObject1 = generatorFn1();
console.log(generatorObject1.next());
console.log(generatorObject1.next());
console.log(generatorObject1.next());
// 生成器函数内部的执行流程会针对每个生成器对象区分作用域。在一个生成器对象上调用 next()
// 不会影响其他生成器：
function* generatorFn2() {
  yield "foo";
  yield "bar";
  return "baz";
}
let generatorObject3 = generatorFn2();
let generatorObject2 = generatorFn2();
console.log(generatorObject3.next()); // { done: false, value: 'foo' }
console.log(generatorObject2.next()); // { done: false, value: 'foo' }
console.log(generatorObject2.next()); // { done: false, value: 'bar' }
console.log(generatorObject3.next()); // { done: false, value: 'bar' }
// yield 关键字只能在生成器函数内部使用，用在其他地方会抛出错误。类似函数的 return 关键字，
// yield 关键字必须直接位于生成器函数定义中，出现在嵌套的非生成器函数中会抛出语法错误：
// 有效
function* validGeneratorFn3() {
  yield;
}

// 无效
function* invalidGeneratorFnA() {
  function a() {
    yield;
  }
}

// 无效
function* invalidGeneratorFnB() {
  const b = () => {
    yield;
  };
}

// 无效
function* invalidGeneratorFnC() {
  (() => {
    yield;
  })();
}

//生成器对象作为可迭代对象
// 在生成器对象上显式调用 next()方法的用处并不大。其实，如果把生成器对象当成可迭代对象，
// 那么使用起来会更方便：
function* generatorFn4() {
  yield 1;
  yield 2;
  yield 3;
}
console.log(generatorFn4());
for (const x of generatorFn4()) {
  console.log(x);
}
// 在需要自定义迭代对象时，这样使用生成器对象会特别有用。比如，我们需要定义一个可迭代对象，
// 而它会产生一个迭代器，这个迭代器会执行指定的次数。使用生成器，可以通过一个简单的循环来实现：
function* nTimes(n) {
  while (n--) {
    yield;
  }
}
for (let _ of nTimes(3)) {
  console.log("foo");
}
// 传给生成器的函数可以控制迭代循环的次数。在 n 为 0 时，while 条件为假，循环退出，生成器函
// 数返回。

//使用yield实现输入和输出
// 除了可以作为函数的中间返回语句使用，yield 关键字还可以作为函数的中间参数使用。上一次让
// 生成器函数暂停的 yield 关键字会接收到传给 next()方法的第一个值。这里有个地方不太好理解——
// 第一次调用 next()传入的值不会被使用，因为这一次调用是为了开始执行生成器函数：
function* generatorFn5(initial) {
  console.log(initial);
  console.log(yield);
  console.log(yield);
}
let generatorObject5 = generatorFn5("foo----------");
generatorObject5.next("bar");
generatorObject5.next("baz");
generatorObject5.next("qux");
// yield 关键字可以同时用于输入和输出，如下例所示：
function* generatorFn6() {
  return yield "foo";
}
let generatorObject6 = generatorFn6();
console.log(generatorObject6.next()); // { done: false, value: 'foo' }
console.log(generatorObject6.next("bar")); // { done: true, value: 'bar' }
// yield 关键字并非只能使用一次。比如，以下代码就定义了一个无穷计数生成器函数：
function* generatorFn7() {
  for (let i = 0; ; ++i) {
    yield i;
  }
}
let generatorObject7 = generatorFn7();
console.log(generatorObject7.next());
console.log(generatorObject7.next());
console.log(generatorObject7.next());
console.log(generatorObject7.next());
console.log(generatorObject7.next());

//  产生可迭代对象
// 可以使用星号增强 yield 的行为，让它能够迭代一个可迭代对象，从而一次产出一个值：
function* generatorFn8() {
  yield* [1, 2, 3];
}
let generatorObject8 = generatorFn8();
for (const x of generatorFn8()) {
  console.log(x);
}

// 与生成器函数的星号类似，yield 星号两侧的空格不影响其行为：
function* generatorFn9() {
  yield* [1, 2];
  yield* [3, 4];
  yield* [5, 6];
}
for (const x of generatorFn9()) {
  console.log(x, "-----------");
}
// yield*的值是关联迭代器返回 done: true 时的 value 属性。对于普通迭代器来说，这个值是
// undefined：
// 对于生成器函数产生的迭代器来说，这个值就是生成器函数返回的值：

function* innerGeneratorFn10() {
  yield "foo";
  return "bar";
}
function* outerGeneratorFn(genObj) {
  console.log("iter value:", yield* innerGeneratorFn10());
}
for (const x of outerGeneratorFn()) {
  console.log("value:", x);
}

//
// 使用 yield*实现递归算法

// yield*最有用的地方是实现递归操作，此时生成器可以产生自身。看下面的例子：
function* nTimes1(n) {
  if (n > 0) {
    yield* nTimes1(n - 1);
    yield n - 1;
  }
}
for (const x of nTimes1(3)) {
  console.log(x);
}

// 在这个例子中，每个生成器首先都会从新创建的生成器对象产出每个值，然后再产出一个整数。结
// 果就是生成器函数会递归地减少计数器值，并实例化另一个生成器对象。从最顶层来看，这就相当于创
// 建一个可迭代对象并返回递增的整数。
// 使用递归生成器结构和 yield*可以优雅地表达递归算法。下面是一个图的实现，用于生成一个随
// 机的双向图：
class Node {
  constructor(id) {
    this.id = id;
    this.neighbors = new Set();
  }
  connect(node) {
    if (node !== this) {
      this.neighbors.add(node);
      node.neighbors.add(this);
    }
  }
}
class RandomGraph {
  constructor(size) {
    this.nodes = new Set();
    // 创建节点
    for (let i = 0; i < size; ++i) {
      this.nodes.add(new Node(i));
    }
    // 随机连接节点
    const threshold = 1 / size;
    for (const x of this.nodes) {
      for (const y of this.nodes) {
        if (Math.random() < threshold) {
          x.connect(y);
        }
      }
    }
  }
  // 这个方法仅用于调试
  print() {
    for (const node of this.nodes) {
      const ids = [...node.neighbors].map((n) => n.id).join(",");
      console.log(`${node.id}: ${ids}`);
    }
  }
  isConnected() {
    const visitedNodes = new Set();
    function* traverse(nodes) {
      for (const node of nodes) {
        if (!visitedNodes.has(node)) {
          yield node;
          yield* traverse(node.neighbors);
        }
      }
    }
    // 取得集合中的第一个节点
    const firstNode = this.nodes[Symbol.iterator]().next().value;
    // 使用递归生成器迭代每个节点
    for (const node of traverse([firstNode])) {
      visitedNodes.add(node);
    }
    return visitedNodes.size === this.nodes.size;
  }
}
const g = new RandomGraph(6);
g.print();

// 生成器作为默认迭代器

// 因为生成器对象实现了 Iterable 接口，而且生成器函数和默认迭代器被调用之后都产生迭代器，
// 所以生成器格外适合作为默认迭代器。下面是一个简单的例子，这个类的默认迭代器可以用一行代码产
// 出类的内容：
class Foo {
  constructor() {
    this.values = [1, 2, 3];
  }
  *[Symbol.iterator]() {
    yield* this.values;
  }
}
const f = new Foo();
for (const x of f) {
  console.log(x);
}
