// 待定（pending）
// 兑现（fulfilled，有时候也称为“解决”，resolved）
//  拒绝（rejected）
// 待定（pending）是期约的最初始状态。在待定状态下，期约可以落定（settled）为代表成功的兑现
// （fulfilled）状态，或者代表失败的拒绝（rejected）状态。无论落定为哪种状态都是不可逆的。只要从待
// 定转换为兑现或拒绝，期约的状态就不再改变。而且，也不能保证期约必然会脱离待定状态。因此，组
// 织合理的代码无论期约解决（resolve）还是拒绝（reject），甚至永远处于待定（pending）状态，都应该
// 具有恰当的行为。
// 重要的是，期约的状态是私有的，不能直接通过 JavaScript 检测到。这主要是为了避免根据读取到
// 的期约状态，以同步方式处理期约对象。另外，期约的状态也不能被外部 JavaScript 代码修改。这与不
// 能读取该状态的原因是一样的：期约故意将异步行为封装起来，从而隔离外部的同步代码。
function sleep(durtion) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, durtion);
  });
}
// async function changeColor(durtion, color) {
//   console.log(color);
//   await sleep(durtion);
// }
function changeColor(durtion, color) {
  return new Promise((reslove) => {
    console.log(color);
    reslove(sleep(durtion));
  });
}
async function main() {
  while (true) {
    await changeColor(3000, "green");
    await changeColor(2000, "yellow");
    await changeColor(1000, "red");
  }
}
// main();
