var x = 1;
var fn;
function a() {
  var y = 1;
  function b() {
    var z = 2;
    console.log(x, y, z);
  }
  fn = b;
}
console.log(fn);

const box = [];
let b;
function createMine(box) {
  var s = "地雷的秘密";
  function mine() {
    console.log(s);
  }
  // return mine;
  box.push(mine);
  b = mine;
}
createMine(box);
box[0]();
b();
