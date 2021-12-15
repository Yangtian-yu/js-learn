// async function foo() {
//   console.log(1);
//   return 3;
// }
// foo().then(console.log);
// console.log(2);

// let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
// p.then((x) => console.log(x));

// async function foo() {
//   let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
//   const a = await p;
//   return a;
// }
// foo().then((res) => {
//   console.log(res);
// });
// async function foo() {
//   console.log(2);
//   await null;
//   console.log(4);
// }
// console.log(1);
// foo();
// console.log(3);
// async function foo() {
//   console.log(2);
//   console.log(await Promise.resolve(8));
//   console.log(9);
// }
// async function bar() {
//   console.log(4);
//   console.log(await 6);
//   console.log(7);
// }
// console.log(1);
// foo();
// console.log(3);
// bar();
// console.log(5);
async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
async function foo() {
  const t0 = Date.now();
  await sleep(1500); // 暂停约 1500 毫秒
  console.log(Date.now() - t0);
}
foo();
