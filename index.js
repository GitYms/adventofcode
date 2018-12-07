const fs = require('fs')
const data = fs.readFileSync("./input1",{encoding:"utf8"}).split("\n")


const result1 = data.reduce((a,b) => {
  const numA = a-0;
  const numB = b-0;
  return numA+numB;

  /*const num1 = parseInt(a);
  const num2 = parseInt(b);
  return num1+num2;*/
})

const ceshi = [+3, +3, +4, -2, -4]


//找出首先重复的
ceshi.forEach(e => {
  const copy = ceshi.filter(item=> item !== e)
  console.log(copy);

})
