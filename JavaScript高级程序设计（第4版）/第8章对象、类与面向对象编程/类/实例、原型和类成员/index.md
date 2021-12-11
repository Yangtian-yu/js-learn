实例、原型和类成员
类的语法可以非常方便地定义应该存在于实例上的成员、应该存在于原型上的成员，以及应该存在
于类本身的成员。

1. 实例成员
   每次通过 new 调用类标识符时，都会执行类构造函数。在这个函数内部，可以为新创建的实例（this）
   添加“自有”属性。至于添加什么样的属性，则没有限制。另外，在构造函数执行完毕后，仍然可以给
   实例继续添加新成员。
   每个实例都对应一个唯一的成员对象，这意味着所有成员都不会在原型上共享：
   class Person {
   constructor() {
   // 这个例子先使用对象包装类型定义一个字符串
   // 为的是在下面测试两个对象的相等性
   this.name = new String('Jack');
   this.sayName = () => console.log(this.name);
   this.nicknames = ['Jake', 'J-Dog']
   }
   }
   let p1 = new Person(),
   p2 = new Person();
   p1.sayName(); // Jack
   p2.sayName(); // Jack
   console.log(p1.name === p2.name); // false
   console.log(p1.sayName === p2.sayName); // false
   console.log(p1.nicknames === p2.nicknames); // false
   p1.name = p1.nicknames[0];
   p2.name = p2.nicknames[1];
   p1.sayName(); // Jake
   p2.sayName(); // J-Dog 2. 原型方法与访问器
   为了在实例间共享方法，类定义语法把在类块中定义的方法作为原型方法。
   class Person {
   constructor() {
   // 添加到 this 的所有内容都会存在于不同的实例上
   this.locate = () => console.log('instance');
   }
   // 在类块中定义的所有内容都会定义在类的原型上
   locate() {
   console.log('prototype');
   }
   }
   let p = new Person();
   p.locate(); // instance
   Person.prototype.locate(); // prototype
   可以把方法定义在类构造函数中或者类块中，但不能在类块中给原型添加原始值或对象作为成员数据：
   class Person {
   name: 'Jake'
   }
   // Uncaught SyntaxError: Unexpected token
   类方法等同于对象属性，因此可以使用字符串、符号或计算的值作为键：
   const symbolKey = Symbol('symbolKey');
   class Person {
   stringKey() {
   console.log('invoked stringKey');
   }
   [symbolKey]() {
   console.log('invoked symbolKey');
   }
   ['computed' + 'Key']() {
   console.log('invoked computedKey');
   }
   }
   let p = new Person();
   p.stringKey(); // invoked stringKey
   p[symbolKey](); // invoked symbolKey
   p.computedKey(); // invoked computedKey
   类定义也支持获取和设置访问器。语法与行为跟普通对象一样：
   class Person {
   set name(newName) {
   this.name* = newName;
   }
   get name() {
   return this.name*;
   }
   }
   let p = new Person();
   p.name = 'Jake';
   console.log(p.name); // Jake
2. 静态类方法
   可以在类上定义静态方法。这些方法通常用于执行不特定于实例的操作，也不要求存在类的实例。
   与原型成员类似，静态成员每个类上只能有一个。
   静态类成员在类定义中使用 static 关键字作为前缀。在静态成员中，this 引用类自身。其他所
   有约定跟原型成员一样：
   class Person {
   constructor() {
   // 添加到 this 的所有内容都会存在于不同的实例上
   this.locate = () => console.log('instance', this);
   }
   // 定义在类的原型对象上
   locate() {
   console.log('prototype', this);
   }
   // 定义在类本身上
   static locate() {
   console.log('class', this);
   }
   }
   let p = new Person();
   p.locate(); // instance, Person {}
   Person.prototype.locate(); // prototype, {constructor: ... }
   Person.locate(); // class, class Person {}
   静态类方法非常适合作为实例工厂：
   class Person {
   constructor(age) {
   this.age* = age;
   }
   sayAge() {
   console.log(this.age*);
   }
   static create() {
   // 使用随机年龄创建并返回一个 Person 实例
   return new Person(Math.floor(Math.random()\*100));
   }
   }
   console.log(Person.create()); // Person { age\_: ... }
3. 非函数原型和类成员
   虽然类定义并不显式支持在原型或类上添加成员数据，但在类定义外部，可以手动添加：
   class Person {
   sayName() {
   console.log(`${Person.greeting} ${this.name}`);
   }
   }
   // 在类上定义数据成员
   Person.greeting = 'My name is';
   // 在原型上定义数据成员
   Person.prototype.name = 'Jake';
   let p = new Person();
   p.sayName(); // My name is Jake
4. 迭代器与生成器方法
   类定义语法支持在原型和类本身上定义生成器方法：
   class Person {
   // 在原型上定义生成器方法
   *createNicknameIterator() {
   yield 'Jack';
   yield 'Jake';
   yield 'J-Dog';
   }
   // 在类上定义生成器方法
   static *createJobIterator() {
   yield 'Butcher';
   yield 'Baker';
   yield 'Candlestick maker';
   }
   }
   let jobIter = Person.createJobIterator();
   console.log(jobIter.next().value); // Butcher
   console.log(jobIter.next().value); // Baker
   console.log(jobIter.next().value); // Candlestick maker
   let p = new Person();
   let nicknameIter = p.createNicknameIterator();
   console.log(nicknameIter.next().value); // Jack
   console.log(nicknameIter.next().value); // Jake
   console.log(nicknameIter.next().value); // J-Dog
   因为支持生成器方法，所以可以通过添加一个默认的迭代器，把类实例变成可迭代对象：
   class Person {
   constructor() {
   this.nicknames = ['Jack', 'Jake', 'J-Dog'];
   }
   *[Symbol.iterator]() {
   yield *this.nicknames.entries();
   }
   }
   let p = new Person();
   for (let [idx, nickname] of p) {
   console.log(nickname);
   }
   // Jack
   // Jake
   // J-Dog
   也可以只返回迭代器实例：
   class Person {
   constructor() {
   this.nicknames = ['Jack', 'Jake', 'J-Dog'];
   }
   [Symbol.iterator]() {
   return this.nicknames.entries();
   }
   }
   let p = new Person();
   for (let [idx, nickname] of p) {
   console.log(nickname);
   }
   // Jack
   // Jake
   // J-Dog
