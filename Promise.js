// function sleep(duration, value) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve(`${duration / 1000}秒后${value}亮`);
//     }, duration);
//   });
// }
// console.log("绿灯直接亮");
// sleep(1000, "红灯").then((res) => {
//   console.log(res);
//   sleep(2000, "黄灯").then((res) => {
//     console.log(res);
//   });
// });

// setTimeout(() => console.log("d"), 0);
// var r = new Promise(function (resolve, reject) {
//   resolve();
// });
// r.then(() => {
//   var begin = Date.now();
//   while (Date.now() - begin < 2000);
//   console.log("c1");
//   new Promise(function (resolve, reject) {
//     resolve();
//   }).then(() => console.log("c2"));
// });

// function sleep1(duration) {
//   return new Promise((reslove, reject) => {
//     setTimeout(reslove, duration);
//   });
// }
// async function foo() {
//   console.log("a");
//   await sleep1(3000);
//   console.log("b");
// }

// foo();
