const student = {
  name: "杨天宇",
  age: "27",
};
const newStudent = {
  name: "yangtianyu",
  age: "26",
};

function sayHi() {
  console.log(this.name);
  console.log(this.age);
}

student.sayHi = sayHi;
student.sayHi();
student.sayHi.apply(newStudent);

function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

console.log(fib(6)); // 8
console.log(fib(10));
