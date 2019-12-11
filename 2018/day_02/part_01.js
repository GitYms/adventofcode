const fs = require('fs')
const data = fs.readFileSync("./input",{encoding:"utf8"}).split("\n")

const test = fs.readFileSync("./test",{encoding:"utf8"}).split("\n");

/*
  String 转换为 '值-数量' 的对象形式
  单个String中 计算出每个字母出现的次数
  分别统计字母次数出现3次和 2次的值
*/

function countRateEvery(array) {
  const duck = {};
  for (let i = 0; i < array.length; i++) {
    if(!duck[array[i]]){
        duck[array[i]] = 1;
    }else {
      duck[array[i]] += 1;
    }
  }
  return duck;
}

function getNumsExistTwice(array) {
  let numsExistTwo = 0;
  array.map(e => {
    const stringArray = e.split("");
    const countsObj = countRateEvery(stringArray);
    const keysArray = Object.keys(countsObj);
    for ( let i = 0; i < keysArray.length; i++) {
      if (countsObj[keysArray[i]] === 2) {
        numsExistTwo += 1;
        break;
      }
    }
  })
  return numsExistTwo;
  console.log(numsExistThree*numsExistTwo);
}

function getNumsExistThree(array) {
  let numsExistThree = 0;
  array.map(e => {
    const stringArray = e.split("");
    const countsObj = countRateEvery(stringArray);
    const keysArray = Object.keys(countsObj);
    for (let i = 0; i < keysArray.length; i++) {
      if (countsObj[keysArray[i]] === 3) {
        numsExistThree += 1;
        break;
      }
    }
  })
  return numsExistThree;
}

const numsExistThree = getNumsExistThree(data);
const numsExistTwice = getNumsExistTwice(data);
console.log(numsExistThree * numsExistTwice);


