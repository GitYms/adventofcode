const fs = require('fs')
const data = fs.readFileSync("./input",{encoding:"utf8"}).split("\n")
const test = fs.readFileSync("./test",{encoding:"utf8"}).split("\n");

const dataXY = data.map(e => {
  const rectangleXY = {};
  rectangleXY.id = e.match(/#[0-9]+/).shift()
  rectangleXY.X1 = e.match(/@.([0-9]+)/)[1] - 0
  rectangleXY.X2 = (e.match(/:.([0-9]+)/)[1]-0)+(rectangleXY.X1-0);
  rectangleXY.Y1 = e.match(/,([0-9]+)/)[1] - 0;
  rectangleXY.Y2 = (e.match(/x([0-9]+)/)[1]-0)+(rectangleXY.Y1-0);
  rectangleXY.rangeX = rangeArray(rectangleXY.X1, rectangleXY.X2);
  rectangleXY.rangeY = rangeArray(rectangleXY.Y1, rectangleXY.Y2);
  return rectangleXY;
});
const maxX = getMaxOfArray(dataXY.map(e => e.X2))
const maxY = getMaxOfArray(dataXY.map(e => e.Y2))
let canvas = {x:rangeArray(0, maxX),y:rangeArray(0, maxY)}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
function rangeArray (start, end) {
  return Array(end - start + 1).fill(0).map((v, i) => i + start);
}
function getArrayRepeat(arr1, arr2) {
  const result = [];
  for(let i = 0; i < arr1.length; i++){
    if(arr2.indexOf(arr1[i]) !== -1) result.push(arr1[i]);
  }
  return result;
}
//去掉画布中矩形重合的部分  并算出重合面积
function getRepeatArea(obj1, obj2) {
  const ArrayX = getArrayRepeat(obj1.rangeX, obj2.rangeX);
  const ArrayY = getArrayRepeat(obj1.rangeY, obj2.rangeY);
  const aim = {x:[], y:[]};
  // 画布中存在
  canvas.x.map(e => {
   if(ArrayX.indexOf(e) === -1) aim.x.push(e);
   return aim;
  })
  canvas.x.map(e => {
   if(ArrayY.indexOf(e) === -1) aim.y.push(e);
   return aim;
  })
  canvas = aim;
  return (ArrayX.length-1)*(ArrayY.length-1);
}

let AreaResult=0;
for(let i = 0; i < dataXY.length; i ++) {
  let j = i;
  for(let j = i+1; j < dataXY.length; j++) {
    AreaResult += getRepeatArea(dataXY[i], dataXY[j]);
  }
}
console.log(AreaResult);
