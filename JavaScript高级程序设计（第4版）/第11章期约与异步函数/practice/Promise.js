var promise = new Promise((resolve, reject) => {
  console.log("object");
  if (true) {
    resolve(100);
  } else {
    reject("error");
  }
});
promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });

function asyncFunction(value) {
  const p = new Promise((resolve, reject) => {
    if (typeof value === "number") {
      resolve(`${value} is Number`);
    } else {
      reject("error");
    }
  });
  return p;
}
asyncFunction(5)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
asyncFunction("foo")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
