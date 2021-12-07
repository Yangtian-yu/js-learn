// var color = "blue";
// function changeColor() {
//   if (color === "blue") {
//     color = "red";
//     console.log(color);
//   } else {
//     console.log(2);
//     color = "blue";
//   }
// }
// changeColor();
// console.log(color);
var color = "blue";
function changeColor() {
  let anotherColor = "red";
  function swapColors() {
    let tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
    // 这里可以访问 color、anotherColor 和 tempColor
  }
  // 这里可以访问 color 和 anotherColor，但访问不到 tempColor
  swapColors();
}
// 这里只能访问 color
changeColor();
