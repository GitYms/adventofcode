import getInput from "../common/index.js";
const input = getInput('./input.txt');
const test = getInput('./test.txt');

/*
  part01-描述：CPU 信号值：X，初始值为1
    noop    执行一个周期，没有其他副作用
    addx V  执行2 个周期, 周期结束后，X + V，（v可能为负值）
  part02-描述：40个周期为一轮回（6行40列），指令为精灵所在位置（3个）
    当前绘制的点，有精灵在则输出亮元素（#），否则输出暗元素（.）
  输出：
    part 01：信号强度和（cycles周期中，周期*对应信号值的和相加）
    part 02：绘制结束后显示的 8 个字母
*/

const cycles = [20, 60, 100, 140, 180, 220];

const getCycleSingle = ({ cycle, single }, command) => {
  if (command === 'noop') {
    return { single, cycle: cycle + 1 };
  }
  const singleNum = Number(command.split(' ')[1]);
  return { single: single + singleNum, cycle: cycle + 2 };
}

const getSingleStrength = (input) => {
  let res = 0;
  let initInfo = {
    cycle: 0,
    single: 1,
  };
  for (let i = 0; i < input.length; i++) {
    const command = input[i];
    const { single, cycle } = getCycleSingle(initInfo, command);
    if (cycles.includes(cycle)) {
      const num = (initInfo.single * cycle);
      res += num;
    }
    if (!cycles.includes(initInfo.cycle) && cycles.includes(cycle - 1)) {
      const num = ((cycle - 1) * initInfo.single);
      res += num;
    }
    initInfo = { single, cycle };
  }
  return res;
}

const getPosition = (command, oldPosition) => {
  if (command === 'noop') {
    return [oldPosition];
  }
  const singleNum = Number(command.split(' ')[1]);
  return [oldPosition, oldPosition + singleNum];
}

// 返回每个周期对应的第一个精灵的位置
const getCyclePositionArr = (input) => {
  let res = [0];
  for (let i = 0; i < input.length; i++) {
    const position = getPosition(input[i], res[res.length - 1]);
    res.push(...position);
  }
  return res;
}

const getAimIndex = (i) => {
  if (i >= 240) {
    return i - 240;
  }
  if (i >= 200) {
    return i - 200;
  }
  if (i >= 160) {
    return i - 160;
  }
  if (i >= 120) {
    return i - 120;
  }
  if (i >= 80) {
   return i - 80;
  }
 if (i >= 40) {
  return i - 40;
 }
 return i;
}

// console.log('test', getAimIndex(89))

const printPicture = (input) => {
  const cyclePosition = getCyclePositionArr(input);
  // console.log('cyclePosition', cyclePosition)
  let spritePosition = [0, 1, 2];
  let picture = '';
  for (let i = 1; i < cyclePosition.length; i++) {
    let dot = '';
    const aim = getAimIndex(i);
    if (spritePosition.includes(aim - 1)) {
      dot = '#';
    } else {
      dot = '.';
    }
    picture += dot;
    if (picture.length === 40) {
      console.log(picture);
      picture = '';
    }
    const j = cyclePosition[i];
    spritePosition = [j, j + 1, j + 2];
    // console.log('spritePosition', spritePosition)
  }
}

console.log('part 01: ', getSingleStrength(input));
console.log('part 02: ')
printPicture(input);