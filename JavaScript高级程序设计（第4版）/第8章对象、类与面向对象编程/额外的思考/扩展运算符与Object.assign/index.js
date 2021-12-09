function generator(size) {
  let obj = {};
  for (let i = 0; i < size; i++) {
    obj["key" + i] = "key" + i;
  }
  return obj;
}

function execute(keySize, length) {
  let obj = generator(keySize);
  let res = [];
  console.time("execute");
  for (let i = 0; i < length; i++) {
    res.push({
      ...obj,
    });
  }
  console.timeEnd("execute");
}

function execute2(keySize, length) {
  let obj = generator(keySize);
  let res = [];
  console.time("execute2");
  for (let i = 0; i < length; i++) {
    res.push(Object.assign({}, obj));
  }
  console.timeEnd("execute2");
}

execute(20, 20000); // execute: 173.281982421875ms
execute2(20, 20000); // execute2: 18.531005859375ms
