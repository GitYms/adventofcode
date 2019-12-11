/*
  INPUT: 一串整数以逗号分隔
  part_01: 
    process: 将INPUT的第2，3个值分别替换为[12，2]; 四个数为一组，第1个数为指令（1-add, 2-multiplices，99-halts),第2、3个为操作数的位置，第4个数是操作后的结果存放的位置。
    result: 结束后的第一个值
  part_02: 
    process: 将INPUT的第2，3个值分别替换为[a, b]（0 <= a,b <= 99); 按part_01的执行,执行结束后第一个值为19690720
    resule: a * 100 + b
*/
const fs = require('fs')
const data = fs.readFileSync("./input",{ encoding: "utf8" }).split(",").map(e => Number(e))

function process(input, arr) {
  const result = [...arr];
  // 开始时替换
  result[1] = input[0];
  result[2] = input[1];
  const length = Math.ceil(arr.length / 4);
  for(let i = 0; i < length; i++) {
    const opcode = result[i * 4];
    const indexA = result[i * 4 + 1];
    const indexB = result[i * 4 + 2];
    const outputPosition = result[i * 4 + 3];
    if(opcode === 1) {
      result[outputPosition] = (result[indexA] - 0) + (result[indexB] - 0);
    }
    if(opcode === 2) {
      result[outputPosition] = (result[indexA] - 0) * (result[indexB] - 0);
    }
    if(opcode === 99) {
      return result[0];
    }
  }
}
const arr = [1, 0, 0, 0, 99 ]  // -> [2,0,0,0,99]
// const arr = [2,3,0,3,99 ] // -> [2,3,0,6,99]
// const arr = [2,4,4,5,99,0]  // -> [2,4,4,5,99,9801]
// const arr = [1,1,1,4,99,5,6,0,99] // -> [30,1,1,4,2,5,6,0,99]
const answer1 = process([12, 2], data)
console.log(answer1)

// part_02
function findInput(data, processOutput) {
  for(let i = 0; i < 100; i++) {
    for(let j = 0; j < 100; j++) {
      if(process([i, j], data) === processOutput) {
        return [i, j];
      }
    }
  }
}
const input = findInput(data, 19690720); // -> [51, 21]
const answer2 = input[0] * 100 + input[1];
console.log(answer2)