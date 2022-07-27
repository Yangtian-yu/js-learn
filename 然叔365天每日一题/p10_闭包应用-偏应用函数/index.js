// const ajax = (method,url,headers)=>{}
// //get post
// const get = (url,headers)=>ajax("get",url,headers)
// const myAjax = (method,url) = ajax(method,url,{token})

//通用计算
// const add = (x, y, z) => x + y + z;
//偏向应用的方法
//计算香肠的费用
// const myAdd = (x) => add(x, 2, 3);

// const partial =
//   (f, ...args) =>
//   (...moreArgs) =>
//     f(...args, ...moreArgs);
// const myAdd = partial(add, 2, 3);
// console.log(myAdd(100));

//柯里化
const add = (x, y) => x + y;
const curriedAdd = (x) => (y) => x + y;
const addOne = curriedAdd(1);
