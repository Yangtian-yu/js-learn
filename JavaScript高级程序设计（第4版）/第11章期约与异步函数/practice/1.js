const t = false;
const promise = new Promise((reslove, reject) => {
  if (t) {
    reslove("foo");
  } else {
    reject("err");
  }
});

promise
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

function timeout(ms) {
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    //   resolve("done");
    // }, ms);
    setTimeout(resolve, 1000, {});
  });
}
timeout(100).then((res) => {
  console.log(res);
});

const p1 = function () {
  return new Promise.resolve("p1 success");
};
const p2 = function () {
  return new Promise((resolve) => {
    resolve(p1);
  });
};

function durtion1(durtion) {
  const wait = new Promise((resolve) => {
    setTimeout(resolve, durtion);
  });
  return wait;
}
async function foo(color, durtion) {
  console.log(`现在颜色为${color},${durtion}秒后改变`);
  await durtion1(durtion);
}
async function main() {
  while (true) {
    await foo("red", 2000);
    await foo("blue", 3000);
    await foo("yellow", 1000);
  }
}
// main();

const p3 = new Promise((resolve) => {
  resolve(1);
});
p3.then((res) => {
  console.log(res);
  return res + 1;
}).then((res) => {
  console.log(res);
});
const p4 = function () {
  return Promise.resolve("FOO");
};
p4().then((res) => {
  console.log(res);
});

const c1 = function () {
  return new Promise((resolve, reject) => {
    resolve(x + 2);
  });
};
c1()
  .then((res) => {
    console.log(res);
    return 1;
  })
  .catch((res) => {
    // console.log(res);
    console.log(z);
    return 2;
  })
  .then((res) => {
    console.log(res);
    return 9;
  })
  .catch((e) => {
    console.log(11);
  });
Promise.prototype.finally = function (callback) {
  let p = this.constructor;
  return this.then(
    (value) => p.reslove(callback().then(() => value)),
    (reason) =>
      p.resolve(
        callback().then(() => {
          throw reason;
        })
      )
  );
};
async function ted() {
  return "foo";
}
ted().then((res) => {
  console.log(res, "***");
});
