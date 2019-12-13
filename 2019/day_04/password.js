/*
  input: 给定密码范围
  part_1:
    rules: 
      1. 密码为给定范围内的6位数；
      2. 至少有一个相邻的数重复，且数字从左到右只能增加
    result: 密码可能有多少个
  part_2:
    note: 基于part_1的规则，必须含有一个相邻重复的数
    result: 密码个数
*/
const input = [367479, 893698];

// part_1
function isAimNumber(num) {
  const numArr = num.toString().split('').map(e => Number(e));
  const arrNoRepetition = new Set(numArr);
  // 递增 && 有重复
  if ((numArr[0] <= numArr[1]) && (numArr[1] <= numArr[2])
    && (numArr[2] <= numArr[3]) && (numArr[3] <= numArr[4])
    && (numArr[4] <= numArr[5]) && (numArr.length > arrNoRepetition.size)) {
    return true;
  }
  return false;
}
function getNumber(min, max) {
  const aimNumberArr = [];
  const len = max - min;
  for(let i = 0; i <= len; i++) {
    if(isAimNumber(min + i)) {
      aimNumberArr.push(min + i)
    }
  }
  return aimNumberArr;
} 
const answerArr = getNumber(input[0], input[1]);
console.log('answer1: ', answerArr.length)

// part_2
function isJustOneRepet(num) {
  let result = 0;
  const numbers = num.toString().split('').map(e => Number(e));
  const numbersNoRepetition = new Set(numbers);
  numbersNoRepetition.forEach(element => {
    const leng = numbers.filter(e => e === element).length;
    if (leng === 2) {
      result = 1;
    }
  });
  return result;
}
function part_2(input) {
  const answer1 = getNumber(input[0], input[1]);
  const resuleArr = answer1.filter(e => isJustOneRepet(e) === 1);
  return resuleArr.length;
}
console.log('answer2: ', part_2(input))