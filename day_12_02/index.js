const fs = require('fs')
const data = fs.readFileSync("./input",{encoding:"utf8"}).split("\n")

const test = fs.readFileSync("./test",{encoding:"utf8"}).split("\n");

const duck = {};
function countRateEvery(array) {
  for (let i = 0; i < array.length; i++) {
    if(!duck[array[i]]){
        duck[array[i]] = 1;
    }else {
      duck[array[i]] += 1;
    }
  }
  return duck;
}

function getNumsWithRate(array) {
  let numsExistThree = 0,numsExistTwo = 0;
  array.map(e => {
    const stringArray = e.split("");
    const countsObj = countRateEvery(stringArray);
    const keysArray = Object.keys(countsObj);

    for ( let i = 0; i < keysArray.length; i++) {

      if (countsObj[keysArray[i]] === 3) {
        numsExistThree += 1;
        continue;
      }
      if (countsObj[keysArray[i]] === 2) {
        numsExistTwo += 1;
        continue;
      }
    }
    return ;
  })
  console.log('numsExistThree:'+numsExistThree);
  console.log('numsExistTwo:'+numsExistTwo);
  console.log(numsExistThree*numsExistTwo);
}

getNumsWithRate(test);
// 单个String中 计算出每个字母出现的次数
// 分别统计字母次数出现3次和 2次的值