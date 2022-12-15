import getInput from "../common/index.js";
const input = getInput('./input.txt');

/*
  输入：字符数组，每一个字符代表一棵树的高度
  输出：
    part 01：
      从网格外部能看到的树的总量（边缘的都能看到）
    part 02：
      任何一棵树能看到的风景最高分(风景分计算规则：上下左右能看到的树的乘积)
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
  let upTree = 0, downTree = 0, leftTree = 0, rightTree = 0;
  // 向上
  for (let h = i - 1; h >= 0; h--) {
    upTree += 1;
    const outTree = getNum(h, j, arr);
    if (outTree >= aim) {
      res[0] = false;
      break;
    }
  }
  // 向下
  for (let h = i + 1; h < rows; h++) {
    const outTree = getNum(h, j, arr);
    downTree += 1;
    if (outTree >= aim) {
      res[1] = false;
      break;
    }
  }
  // 向左
  for (let h = j - 1; h >= 0; h--) {
    const outTree = getNum(i, h, arr);
    leftTree += 1;
    if (outTree >= aim) {
      res[2] = false;
      break;
    }
  }
  // 向右
  for (let h = j + 1; h < cols; h++) {
    const outTree = getNum(i, h, arr);
    rightTree += 1;
    if (outTree >= aim) {
      res[3] = false;
      break;
    }
  }
  const canSeeEdeg = res.filter(Boolean).length > 0;
  const score = upTree * downTree * leftTree * rightTree;
  return { canSeeEdeg, score };
}

const isCanSee = (i, j, arr) => {
  // 边缘的
  if (isEdges(i, j, arr)) {
    return { canSeeEdeg: true, score: 0 };
  }
  return canSeeFn(i, j, arr);
}

const getAllTree = (arr) => {
  let res = 0, maxScore = 0;
  const rows = arr.length;
  const cols = arr[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const { canSeeEdeg, score } = isCanSee(i, j, arr);
      if (canSeeEdeg) {
        res += 1;
      }
      maxScore = score > maxScore ? score : maxScore;
    }
  }
  return { totalTreeCanSee: res, maxScore };
}


console.log('output:', getAllTree(input));