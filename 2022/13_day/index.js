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
 *    part 02：
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

const getIsInOrder = (left, right) => {
  const len = left.length > right.length ? right.length : left.length;
  for (let i = 0; i < left.length; i++) {
    const packageA = left[i];
    const packageB = right[i];
    if (packageA && !packageB) {
      return false
    }
    // 均是数组 数组 & 整数
    if (typeof packageA === 'object' || typeof packageB === 'object') {
      const littleLeft = typeof packageA === 'object' ? packageA : [packageA];
      const littleRight = typeof packageB === 'object' ? packageB : [packageB];
      const res = getIsInOrder(littleLeft, littleRight);
      if(!res) {
        return res;
      }
    }
    // 均是整数的情况
    if (packageA > packageB) {
      return false;
    }
    if (packageA < packageB) {
      return true;
    }
  }
  return true;
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

// test 1，2,4，6（13）
// console.log('test isInorder', getIsInOrder([1,1,3,1,1], [1,1,5,1,1]))
console.log('part 01:', getIndexSum(input));
