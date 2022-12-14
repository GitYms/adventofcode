import getInput from "../common/index.js";
const input = getInput('./input.txt');

/*
  输入：字符数组，每一个字符代表一棵树的高度
  输出：
    part 01：
      从网格外部能看到的树的总量（边缘的都能看到）
    part 02：
*/

const testInput = [
  '30373',
  '25512',
  '65332',
  '33549',
  '35390',
];

const getNum = (i, j, arr) => {
  const str = arr[i];
  return Number(str.charAt(j));
}

const isEdges = (i, j, arr) => {
  const rowIndex = arr.length - 1;
  const colIndex = arr[0].length - 1;
  return i === 0 || j === 0 || i === rowIndex || j === rowIndex || j === colIndex || i === colIndex;
}

const canSeeFn = (i, j, arr) => {
  const aim = getNum(i, j, arr);
  const rows = arr.length; // 行数
  const cols = arr[0].length; // 列数
  const res = [true, true, true, true];
  // 向上
  for (let h = i - 1; h >= 0; h--) {
    const outTree = getNum(h, j, arr);
    if (outTree >= aim) {
      res[0] = false;
      break;
    }
  }
  // 向下
  for (let h = i + 1; h < rows; h++) {
    const outTree = getNum(h, j, arr);
    if (outTree >= aim) {
      res[1] = false;
      break;
    }
  }
  // 向左
  for (let h = j - 1; h >= 0; h--) {
    const outTree = getNum(i, h, arr);
    if (outTree >= aim) {
      res[2] = false;
      break;
    }
  }
  // 向右
  for (let h = j + 1; h < cols; h++) {
    const outTree = getNum(i, h, arr);
    if (outTree >= aim) {
      res[3] = false;
      break;
    }
  }
  const canSeeEdeg = res.filter(Boolean);
  return canSeeEdeg.length > 0;
}

const isCanSee = (i, j, arr) => {
  // 边缘的
  if (isEdges(i, j, arr)) {
    return true;
  }
  return canSeeFn(i, j, arr);
}

const getAllTree = (arr) => {
  let res = 0;
  const rows = arr.length;
  const cols = arr[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const isSee = isCanSee(i, j, arr);
      if (isSee) {
        res += 1;
      }
    }
  }
  return res;
}


console.log('part 01 output:', getAllTree(input));