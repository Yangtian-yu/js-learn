let promise1 = new Promise((reslove) => {
  reslove({ color: "red", price: "$99" });
});
let promise2 = (lv) => {
  let liob = {
    color: "green",
    price: "$55",
  };
  let mes = {
    message: `我买了两个东西`,
    liob: liob,
    lv: lv,
  };
  return Promise.reject(mes);
};

async function res() {
  const p = await promise1;
  return await promise2(p);
}
res()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
