function waited(callback) {
  return new Promise((resolve) => {
    callback(resolve);
    setTimeout(() => {
      resolve("成功");
    }, 3000);
  });
}

async function wait(during = 4000) {
  // const startTime = new Date();
  // try {
  //   while (ture) {
  //     setInterval(() => {
  //       const now = new Date();
  //       if (during < now - startTime) {
  //         return new Error("超出时间了");
  //       }
  //     }, 100);
  //   }
  // } catch (error) {
  //   return error;
  // }

  const aaaa = await waited((resolve) =>
    setTimeout(() => {
      resolve("222222");
    }, during)
  );
  return aaaa;
}

wait().then((e) => {
  console.log(e);
});
