function double(value, callback) {
  setTimeout(() => {
    callback(value * 2);
  }, 1000);
}
double(3, (x) => {
  console.log(`i was give : ${x}`);
});

const tree = function (value) {
  const async = new Promise((reslove, reject) => {
    setTimeout(() => {
      if (typeof value === "number") {
        reslove(value * 2);
      } else {
        reject("请输入数字");
      }
    }, 1000);
  });
  return async;
};

tree("foo")
  .then((res) => {
    console.log(`i was given : ${res}`);
  })
  .catch((e) => {
    console.log(e);
  });
