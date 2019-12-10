const fs = require('fs')
const data = fs.readFileSync("./input",{encoding:"utf8"}).split("\n")

/*
  input: 各个飞船的质量
  result: 所有飞船的燃油总和
  part_01: 每个飞船所需燃油fuel，divide by three & round down & subtract 2
  part_02: 每个飞船所需燃油fuel，质量divide by three & round down & subtract 2的值为输入，重复计算。一直到最后值<=0的累计和
*/

function getFuel(mass) {
  const fuel = Math.floor(Number(mass) / 3) - 2
  return fuel;
}
const result1 = data.map(e => getFuel(e)).reduce((acc, cur) => acc + cur, 0)
console.log(result1);


function getSingleAllFuel(mass) {
  const arr = [];
  let result = getFuel(mass);
  while(result > 0) {
    arr.push(result);
    result = getFuel(result);
  }
  return arr.reduce((acc, cur) => acc + cur, 0);
}
const result2 = data.map(e => getSingleAllFuel(e)).reduce((acc, cur) => acc + cur, 0)
console.log(result2);
