/*
  input: 一串整数以逗号分隔
  result: 结束后的第一个值
  process: 四个数为一组，第1个数为指令（1-add, 2-multiplices，99-halts),第2、3个为操作数的位置，
    第4个数是操作后的结果存放的位置。
*/
const fs = require('fs')
const data = fs.readFileSync("./input",{ encoding: "utf8" }).split(",")

// 开始时替换
data[1] = 12;
data[2] = 12;

function process(arr) {
  const result = [...arr];
  const length = Math.ceil(arr.length / 4);
  for(let i = 0; i < length; i++) {
    const opcode = Number(result[i * 4]);
    const indexA = Number(result[i * 4 + 1]);
    const indexB = Number(result[i * 4 + 2]);
    const outputPosition = Number(result[i * 4 + 3]);
    if(opcode === 1) {
      result[outputPosition] = (result[indexA] - 0) + (result[indexB] - 0);
    }
    if(opcode === 2) {
      result[outputPosition] = (result[indexA] - 0) * (result[indexB] - 0);
    }
    //  99时跳出for循环
  }
  return result;
}
// const arr = [1, 0, 0, 0, 99 ]  // -> [2,0,0,0,99]
// const arr = [2,3,0,3,99 ] // -> [2,3,0,6,99]
// const arr = [2,4,4,5,99,0]  // -> [2,4,4,5,99,9801]
const arr = [1,1,1,4,99,5,6,0,99] // -> [30,1,1,4,2,5,6,0,99]
console.log(process(arr))