const list = [
  { name: "111", age: 1 },
  { name: "111", age: 2 },
  { name: "111", age: 3 },
  { name: "111", age: 4 },
];
const newList = list.map((item, index) => {
  console.log(item);
  console.log(index);
  item.id = index;
  return item;
});
console.log(newList);
