//原型方法与访问器
class Person {
  constructor() {
    this.name = new String("jack");
    this.sayName = () => {
      console.log(this.name);
    };
    this.nicknames = ["jack", "j-dog"];
    this.locate = () => {
      console.log("instance");
    };
  }
  locate() {
    console.log("prototype");
  }
  *createNicknameIterator() {
    yield "jack";
    yield "jake";
    yield "j-dog";
  }
  //在类上定义生成器；
  static *createJobIterator() {
    yield "Butcher";
    yield "Baker";
    yield "Candlestick maker";
  }
}
let p1 = new Person();
let p2 = new Person();
let p = new Person();
let jobTter = Person.createJobIterator();
console.log(jobTter.next().value);
console.log(jobTter.next().value);
console.log(jobTter.next().value);
console.log(jobTter.next().value);
p1.sayName();
p2.sayName();
p.locate();
Person.prototype.locate();
let nicknameIter = p.createNicknameIterator();
console.log(nicknameIter.next().value);
console.log(nicknameIter.next().value);
console.log(nicknameIter.next().value);
console.log(nicknameIter.next().value);
