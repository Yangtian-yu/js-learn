let object = {
  name: "yangtianyu",
};
function changeStr(value) {
  // value.name = "newName";
  value = {
    age: 26,
  };
}
changeStr(object);
console.log(object);

function proytype(name) {
  this.name = name;
  this.colors = ["red", "black"];
}
proytype.prototype.sayname = function () {
  console.log(this.name);
};
let person = function (name, age) {
  proytype.call(this, name);
  this.age = age;
};
person.prototype = new proytype();

person.prototype.sayage = function () {
  console.log(this.age);
};
let p1 = new person("yangtianyu", 17);
p1.sayage();
console.log(p1.colors);
p1.colors.push("blue");
console.log(p1.colors);
const p2 = new person("kaikeba", 5);
p2.sayage();
console.log(p2.colors);
