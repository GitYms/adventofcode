import getInput from "../common/index.js";
const input = getInput('./input.txt');
const input1 = getInput('./input1.txt');

const MAX_SIZE = 100000;
/*
  输入： 文件操作指令以及相关结果， dir a(文件夹a),
  输出：
    part01: 不超过 MAX_SIZE 的所有文件的总和（可能有重复的） 
      文件夹 A下有文件夹B， 则分别算A、B的值（A的值： B + 其他）
*/

const getFileNum = (str) => {
  const info = str.split(' ');
  const firtItem = info[0];
  const specialChar = ['$', 'dir'];
  if (specialChar.includes(firtItem)) {
    return 0;
  }
  return Number(firtItem);
}

// console.log('test' , getFileNum('dir sdpjprfb'))

const getNumCanAdd = (num) => (num > MAX_SIZE) ? 0 : num;

const getFileSizeTotal = (input) => {
  let res = 0;
  for (let i = 0; i < input.length; i++) {
    const fileNum = getFileNum(input[i]);
    // console.log('fileNum', fileNum)
    const num = getNumCanAdd(fileNum);
    console.log('num', num)
    res += num;
  }
  return res;
}

console.log('part 01: total File size', getFileSizeTotal(input1));