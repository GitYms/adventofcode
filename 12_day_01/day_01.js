const fs = require('fs')
const data = fs.readFileSync("./input",{encoding:"utf8"}).split("\n")


// part 1
const result1 = data.reduce((a,b) => {
  const numA = a-0;
  const numB = b-0;
  return numA+numB;
  /*const num1 = parseInt(a);
  const num2 = parseInt(b);
  return num1+num2;*/
});


// part 2
const ceshi = data;
const aimArray = [];
const duck = {};
let result = 0;
if(result) {
  console.log(result);
}else {
  const aimArray = getSumArray(ceshi);
  const resultF=getResult(aimArray);
  console.log("result:  "+resultF);
}

function getSumArray(arr) {
  const last = aimArray[aimArray.length-1] || 0;
  if(aimArray.length==0){
    arr.reduce((a,b) => {
      const numA = a-0;
      const numB = b-0;
      aimArray.push(numA+numB);
      return numA+numB;
    })
  }else{
    arr.reduce((a,b) => {
      const numA = a-0;
      const numB = b-0;
      aimArray.push(numA+numB);
      return numA+numB;
    },last)
  }
  return aimArray;
}
function getResult(aimArray) {
  for(let i = 0; i < aimArray.length; i++) {
    if (duck["a"+aimArray[i]]) {
      result = aimArray[i]
      break;
    } else {
      duck["a"+aimArray[i]] = 1;
      if(i == aimArray.length-1){
         getSumArray(ceshi);
      }
    }
  }
  return result;
}