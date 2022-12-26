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

const isInOrder = (input) => {
  const left = JSON.parse(input[0]);
  const right = JSON.parse(input[1]);
  console.log('left', left, right)
  if (left.length > right.length) {
    return false;
  }
  for (let i = 0; i < left.length; i++) {
    // 均是整数的情况
    if (left[i] && !right[i]) {
      return false
    }
    if (left[i] > right[i]) {
      return false;
    }
    // 同为数组、 一为数组一为整数
  }
  return true;
}

// test 1，2,4，6（13）
console.log('test isInOrder', isInOrder([ '[9]', '[[8,7,6]]' ]));
