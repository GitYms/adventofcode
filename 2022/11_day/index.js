import getInput from "../common/index.js";
const input = getInput('./input.txt');
const test = getInput('./test.txt');

/**
 * 描述：
 *    每只猴子拥有的每一个东西（items）,经历自己的操作（operate)后，我的‘担心’(除以3取最小整数)，
 *  是否能被（divider）整除，能整除扔给猴子A（rightTo)， 不能则扔给猴子B（errorTo)，接的猴子items依次增加；
 *    每只猴子会把自己拥有的扔完，然后换下一只猴子；
 *    从第一只猴子到最后一只猴子扔完，为一个回合；
 *    猴子没有东西则当前猴子的操作结束；
 * 输出：
 *    part 01：20个回合后，猴子的生意水平（最活跃的两只猴子的扔的次数的乘积）
 *    part 02: 10000 汇合后，猴子的生意水平 （担心不除以3）
*/

const getNum = (str) => Number(str.replace(/[^0-9]/ig, ''));

const transInput = (input) => {
  const monkeyList = [];
  let monkey = {};
  for (let i = 0; i < input.length; i++) {
    const info = input[i];
    if (!info) {
      monkeyList.push(monkey);
      monkey = {};
    }
    const num = getNum(info);
    if (info.includes('Monkey')) {
      monkey.id = num; // 实际，即为数组的下标
    }
    if (info.includes('divisible')) {
      monkey.divider = num;
    }
    if (info.includes('true')) {
      monkey.rightTo = num;
    }
    if (info.includes('false')) {
      monkey.errorTo = num;
    }
    if (info.includes('items')) {
      const items = info.split(':')[1].split(',').map(e => Number(e));
      monkey.items = items;
    }
    if (info.includes('Operation')) {
      const [number, operate] = info.split(' ').reverse();
      monkey.operate = operate;
      monkey.operateVal = Number(number || 0);
    }
  };
  return monkeyList;
}

const initMonkeyList = transInput(input);
const testMokeyList = transInput(test);
// console.log('initMonkeyList', initMonkeyList)

const reduceNum = (val) => {
  // 23*19*13*17 test数据最小公倍数
  const num = 9699690; // 所有猴子除数的最小公倍数
  if (val <= num) {
    return val;
  }
  let res = val;
  while (res > num) {
    res -= num;
  }
  return res;
}
// console.log('ffff', reduceNum(61302170796480))

const changeMonkeyInfo = (monkeys, isDivid) => {
  // console.log('before:',monkeys);
  let res = [...monkeys];
  for (let i = 0; i < res.length; i++) {
    const { items, operate, operateVal, divider, rightTo, errorTo } = res[i];
    if (items.length) {
      for (let j = 0; j < items.length; j++) {
        const initWorry = items[j];
        const val = operateVal || initWorry; // 没有操作值时，操作本身
        const worry = operate === '*' ? (initWorry * val) : (initWorry + val);
        const worryLevel = isDivid ? Math.floor(worry / 3) : reduceNum(worry);
        if (worryLevel % divider === 0) {
          // console.log('divider', divider, worryLevel)
          res[rightTo].items.push(worryLevel);
        } else {
          res[errorTo].items.push(worryLevel)
        }
        res[i].time = (res[i]?.time || 0) + 1;
      }
      res[i].items = [];
    }
  }
  // console.log('res', res);
  return res;
}

const getMonkeyBusiness = (monkeys, turn) => {
  let monkeysInfo = [...monkeys];
  const isDivid = turn === 20;
  for (let i = 0; i < turn; i++) {
    const list = changeMonkeyInfo(monkeysInfo, isDivid);
    monkeysInfo = [...list];
  }
  const monkeyTimeDes = monkeysInfo.map(e => e.time).sort((a, b) => b - a);
  return monkeyTimeDes[0] * monkeyTimeDes[1];
}

console.log('part 01:', getMonkeyBusiness(initMonkeyList, 20));
console.log('part 02:', getMonkeyBusiness(initMonkeyList, 10000));
