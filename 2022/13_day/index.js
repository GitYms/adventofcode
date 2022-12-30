import getInput from "../common/index.js";
const input = getInput('./input.txt');
const testInput = getInput('./test.txt');

/**
 * 描述：
 *    数据包由[开始，]结束，并包含0或多个逗号分隔的值
 *    比较相邻的数据包，第一个数据包序号为1（依次类推）；
 *    正常顺序：左边的长度低于右边的长度，左边的值小于右边的值
 * 输出：
 *    part 01：正常顺序的序号的总和
 *    part 02：将输入的所有数据包按正常顺序排列，并加入[[2]]、[[6]]
 *      2、6插入时的序号（从1开始计数）的乘积
 */

const transInput = (input) => {
  const res = [];
  let parkage = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i]) {
      parkage.push(input[i]);
    }
    if (parkage.length === 2) {
      res.push(parkage);
      parkage = [];
    }
  }
  return res;
}
const isNum = (val) => typeof val === 'number';
const getIsInOrder = (left, right) => {
  const len = right?.length > left?.length ? right?.length : left?.length;
  for (let i = 0; i < len; i++) {
    const parkageA = left[i];
    const parkageB = right[i];
    if (parkageA && !parkageB) {
      return false;
    }
    if (!parkageA && parkageB) {
      return true;
    }
    if (isNum(parkageA) && isNum(parkageB)) {
      if (parkageA > parkageB) {
        return false;
      }
      if (parkageA < parkageB) {
        return true;
      }
    }else {
      const littleLeft = isNum(parkageA) ? [parkageA] : parkageA;
      const littleRight = isNum(parkageB) ? [parkageB] : parkageB;
      const res = getIsInOrder(littleLeft, littleRight);
      if (typeof res !== 'undefined') {
        return res;
      }
    }
  }
}
const getIndexSum = (input) => {
  let res = 0;
  const inputArr = transInput(input);
  for (let i = 0; i < inputArr.length; i++) {
    const left = JSON.parse(inputArr[i][0]);
    const right = JSON.parse(inputArr[i][1]);
    
    const isInOrder = getIsInOrder(left, right);
    if (isInOrder) {
      res += (i + 1);
    }
  }
  return res;
}

const getFirstNum = (input) => {
  if (!input.length) {
    return input;
  }
  if (typeof input[0] === 'object') {
    if (!input[0]?.length) {
      return input[0];
    }else {
      return getFirstNum(input[0]);
    }
  } else {
    return input[0];
  }
}
const trunToFirstNumObj = (input) => {
  const res = {};
  const len = input.length;
  for (let i = 0; i < len; i++) {
    if (input[i]) {
      const parkage = JSON.parse(input[i]);
      const key = String(getFirstNum(parkage));
      res[key] = (res[key] || 0) + 1;
    }
  }
  return res;
}
const getInsetIndex = (input) => {
  const indexObj = trunToFirstNumObj(input);
  let totalLower = 0; 
  let totalHigher = 0;
  Object.keys(indexObj).forEach((key) => {
    if (Number(key) < 2) {
      totalLower += indexObj[key];
    }
    if (Number(key) < 6) {
      totalHigher += indexObj[key];
    }
  })
  return (totalLower + 1) * (totalHigher + 2);
}

console.log('part 01:', getIndexSum(input));  // 5503
console.log('part 02 the result is:', getInsetIndex(input)); // 20952
