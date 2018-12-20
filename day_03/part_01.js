const fs = require('fs')
const data = fs.readFileSync("./input",{encoding:"utf8"}).split("\n")
const test = fs.readFileSync("./test",{encoding:"utf8"}).split("\n");
console.log(test);

const dataXY = test.map(e => {
  const rectangleXY = {};
  rectangleXY.id = e.split(" ").shift();
  rectangleXY.X1 = e.match(/@.([0-9]+)/)[1];
  rectangleXY.X2 = e.match(/:.([0-9]+)/)[1]+rectangleXY.X1;
  rectangleXY.Y1 = e.match(/,([0-9]+)/)[1];
  rectangleXY.Y2 = e.match(/x([0-9]+)/)[1]+rectangleXY.Y2;
  return rectangleXY;
})

function getArea(rectangle1,rectangle2) {
  
}
console.log(dataXY);