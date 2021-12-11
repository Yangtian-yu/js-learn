//类的继承
class Vehicle {
  constructor() {
    this.haEngine = true;
    console.log(this);
  }
  identifyPrototype(id) {
    console.log(id, this);
  }
  static indentifyClass(id) {
    console.log(id, this);
  }
}
//继承类
class Bus extends Vehicle {
  constructor() {
    super();
    console.log(this instanceof Vehicle);
    console.log(this, "----------");
  }
}
let b = new Bus();
let v = new Vehicle();
console.log(b instanceof Bus);
console.log(b instanceof Vehicle);
b.identifyPrototype("bus");
v.identifyPrototype("vehicle");
Bus.indentifyClass("bus"); // bus, class Bus {}
Vehicle.indentifyClass("vehicle"); // vehicle, class Vehicle {}

function Person() {}
// 继承普通构造函数
class engineer extends Person {}
let e = new engineer();
console.log(e instanceof engineer);
console.log(e instanceof Person);
