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
stringToArray = (str) => {
  const array = str.split("").filter(e => e !== '\r');
  return array;
}
function diffOneLetter(array1,array2) {
  let count = 0, index = 0;
  const lastSub = array1.length;
  for (let i = 0; i < array1.length; i++) {
    if(array1[i] !== array2[i]) {
      index = i;
      count += 1;
    }
  }
  if(count === 1) {
    const arrFirst = array1.slice(0, index);
    const arrLast = array1.slice(index+1, lastSub);
    const result = arrFirst.concat(arrLast)
    const resultString = result.reduce((a,b) => a+b);
    return resultString;
  }
}

const dataChartArray = dataStringArray.map(e => stringToArray(e));
for(let i = 0; i < dataChartArray.length; i++) {
  let j = i;
  const aimArr = dataChartArray[i];
  for(j= j+1; j < dataChartArray.length; j++) {
    const result = diffOneLetter(aimArr,dataChartArray[j]);
    if(result) {
      console.log(result);
      break;
    }
  }
}


