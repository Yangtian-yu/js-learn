function waited() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("失败");
    }, 3000);
  });
}

function waited1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("成功");
    }, 4000);
  });
}

const p = Promise.race([waited(), waited1()]);

p.then((e) => {
  console.log(e);
}).catch((err) => {
  console.log(err);
});
