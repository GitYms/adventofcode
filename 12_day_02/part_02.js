const fs = require('fs')
const dataStringArray = fs.readFileSync("./input",{encoding:"utf8"}).split("\n")

const testStringArray = fs.readFileSync("./test",{encoding:"utf8"}).split("\n");

 /*
* 找到只有一个字符不同的两组String，并输出去掉不同字符的String
*
* String转换为数组 stringToArray(string)
* 比较两个数组 值的差异  diffOneLetter(array1,array2)
* file中的第一个数组  依次与剩余的数组比较差异
*
*
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
  console.log(duck);
  return duck;
}

console.log(testStringArray);
countRateEvery(testStringArray);