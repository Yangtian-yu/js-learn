function* name1() {
  for (const x of [1, 2, 3]) {
    try {
      yield x;
    } catch (error) {
      console.log(error);
    }
  }
}
let g = name1();
console.log(g.next());
g.throw("foo");
console.log(g.next("8"));
