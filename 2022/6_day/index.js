import getInput from "../common/index.js";
const input = getInput('./input.txt')[0];

/*
  输入： 一大串字符
  输出： 
    part01: 相邻 4 位没有重复的字符的末尾位置（从1开始计数）
    part01: 相邻 14 位没有重复的字符的末尾位置（从1开始计数）
*/

const noRepeat = (str) => {
  const set = new Set([...str]);
  return set.size === str.length;
}

const findIndex = (str, num) => {
  const startIndex = num - 1;
  for (let i = startIndex; i < str.length; i++) {
    const aimStr = str.slice(i - num + 1, i + 1);
    const notRepeat = noRepeat(aimStr);
    if (notRepeat) {
      return i + 1;
    }
  }
}

const test = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';

console.log('part01: index', findIndex(test, 4));
console.log('part02: index', findIndex(input, 14));
