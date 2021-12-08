//迭代器协议
// 迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器 API 使用 next()方法
// 在可迭代对象中遍历数据。每次成功调用 next()，都会返回一个 IteratorResult 对象，其中包含迭
// 代器返回的下一个值。若不调用 next()，则无法知道迭代器的当前位置。
// next()方法返回的迭代器对象 IteratorResult 包含两个属性：done 和 value。done 是一个布
// 尔值，表示是否还可以再次调用 next()取得下一个值；value 包含可迭代对象的下一个值（done 为
// false），或者 undefined（done 为 true）。done: true 状态称为“耗尽”。可以通过以下简单的数
// 组来演示：

//可迭代对象
let arr = ["foo", "bar"];
//迭代器工厂函数
console.log(arr[Symbol.iterator]);
//迭代器
let iter = arr[Symbol.iterator]();
console.log(iter);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
// 这里通过创建迭代器并调用 next()方法按顺序迭代了数组，直至不再产生新值。迭代器并不知道
// 怎么从可迭代对象中取得下一个值，也不知道可迭代对象有多大。只要迭代器到达 done: true 状态，
// 后续调用 next()就一直返回同样的值了：
let arr1 = ["foo"];
let iter1 = arr1[Symbol.iterator]();
console.log(iter1.next()); // { done: false, value: 'foo' }
console.log(iter1.next()); // { done: true, value: undefined }
console.log(iter1.next()); // { done: true, value: undefined }
console.log(iter1.next()); // { done: true, value: undefined }
// 每个迭代器都表示对可迭代对象的一次性有序遍历。不同迭代器的实例相互之间没有联系，只会独
// 立地遍历可迭代对象：
let arr2 = ["foo", "bar"];
let iter2 = arr2[Symbol.iterator]();
let iter3 = arr2[Symbol.iterator]();
console.log(iter2.next()); // { done: false, value: 'foo' }
console.log(iter3.next()); // { done: false, value: 'foo' }
console.log(iter3.next()); // { done: false, value: 'bar' }
console.log(iter2.next()); // { done: false, value: 'bar' }
// 迭代器并不与可迭代对象某个时刻的快照绑定，而仅仅是使用游标来记录遍历可迭代对象的历程。
// 如果可迭代对象在迭代期间被修改了，那么迭代器也会反映相应的变化：
let arr3 = ["foo", "baz"];
let iter4 = arr[Symbol.iterator]();
console.log(iter4.next());
//在数组中间插入值
arr3.splice(1, 0, "bar");
console.log(arr3);
console.log(iter4.next());
console.log(iter4.next());
console.log(iter4.next());

// “迭代器”的概念有时候容易模糊，因为它可以指通用的迭代，也可以指接口，还可以指正式的迭
// 代器类型。下面的例子比较了一个显式的迭代器实现和一个原生的迭代器实现。
// 这个类实现了可迭代接口（Iterable）
// 调用默认的迭代器工厂函数会返回
// 一个实现迭代器接口（Iterator）的迭代器对象
class Foo {
  [Symbol.iterator]() {
    return {
      next() {
        return { done: false, value: "foo" };
      },
    };
  }
}
let f = new Foo();
console.log(f[Symbol.iterator]());
// Array 类型实现了可迭代接口（Iterable）
// 调用 Array 类型的默认迭代器工厂函数
// 会创建一个 ArrayIterator 的实例
let a = new Array();
//打印出ArrayIterator的实例
console.log(a[Symbol.iterator]());
