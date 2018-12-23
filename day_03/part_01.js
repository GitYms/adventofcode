const fs = require('fs')
const data = fs.readFileSync("./input",{encoding:"utf8"}).split("\n")
const test = fs.readFileSync("./test",{encoding:"utf8"}).split("\n");


const dataXY = data.map(e => {
  const rectangleXY = {};
  rectangleXY.id = e.split(" ").shift();
  rectangleXY.X1 = e.split("")[5];
  rectangleXY.X2 = (e.split("")[10]-0)+(rectangleXY.X1-0);
  rectangleXY.Y1 = e.split("")[7];
  rectangleXY.Y2 = (e.split("")[12]-0)+(rectangleXY.Y1-0);
  return rectangleXY;
})

function getArea(obj1,obj2) {
  const OneX1 = obj1.X1;
  const OneX2 = obj1.X2;
  const OneY1 = obj1.Y1;
  const OneY2 = obj1.Y2;
  const TwoX1 = obj2.X1;
  const TwoX2 = obj2.X2;
  const TwoY1 = obj2.Y1;
  const TwoY2 = obj2.Y2;
  let result = 0;
  // obj2 包含 obj1
  if( (OneX1 <= TwoX1 && OneX2 <= TwoX2) && (OneY1 <= TwoY1 && OneY2 <= TwoY2) ){
    result = (OneX2 - OneX1) * (OneY2 - OneY1);
  }
  // obj1 包含 obj2
  if((TwoX1 <= OneX1 && TwoX2 <= OneX2) && (TwoY1 <= OneY1 && TwoY2 <= OneY2)){
    result = (TwoX2 - TwoX1) * (TwoY2 - TwoY1);
  }
  // obj1 与 obj2 有交集
  if (OneX1 < TwoX1 && TwoX1 < OneX2 && OneY1 < TwoY1 && TwoY1 < OneY2) {
    result = (OneX2-TwoX1) * (OneY2-TwoY1)
  }
  if (OneX1 < TwoX1 && TwoX1 < OneX2 && TwoY1 < OneY1 && OneY1 < TwoY2) {
    result = (OneX2-TwoX1) * (TwoY2-OneY1)
  }
  if (TwoX1 < OneX1 && OneX1 < TwoX2 && OneY1 < TwoY1 && TwoY1 < OneY2) { 
    result = (TwoX2-OneX1) * (OneY2-TwoY1)
  }
  if (TwoX1 < OneX1 && OneX1 < TwoX2 && TwoY1 < OneY1 && OneY1  < TwoY2) { 
    result = (TwoX2-OneX1) * (TwoY2-OneY1)
  }
  // obj1 与 obj2 没有交集
  if(OneX2 < TwoX1 || TwoX2 < OneX1){
    result = 0;
  }
  return result;
}


let AreaResult=0;
for(let i = 0; i < dataXY.length; i ++) {
  let j = i;
  for(let j = i+1; j < dataXY.length; j++) {
    AreaResult += getArea(dataXY[i],dataXY[j]);
  }
}

console.log(AreaResult)