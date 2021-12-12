class Person {
  constructor(name) {
    this.name = name;
    this.colors = ["red"];
  }
  sayname() {
    console.log(this.name);
  }
  static sayname() {
    console.log(this.name);
  }
}
class Child extends Person {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
let p = new Child("yangtianyu", 27);
console.log(p);
