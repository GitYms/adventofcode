const resolveOpcode = require('../common/resolveOpcode')
const fs = require('fs')
const data = fs.readFileSync("./input",{ encoding: "utf8" }).split(",").map(e => Number(e));

// part_1
function processOutput(input, data) {
  const arr = [...data]
  const output = [];
  for(let i = 0; i < arr.length;) {
    const { opcode, varA, varB, varC } = resolveOpcode(arr[i]);
    const index1 = varA === 0 ? arr[i+1] : i+1;
    const index2 = varB === 0 ? arr[i+2] : i+2;
    const index3 = varC === 0 ? arr[i+3] : i+3;
    const paramA = arr[index1];
    const paramB = arr[index2];
    if(opcode === 1) {
      arr[index3] = (paramA - 0) + (paramB - 0);
      i = i + 4;
    }
    if(opcode === 2) {
      arr[index3] = (paramA - 0) * (paramB - 0);
      i = i + 4;
    }
    if(opcode === 3) {
      arr[index1] = input;
      i = i + 2;
    }
    if(opcode === 4) {
      output.push(paramA);
      i = i + 2;
    }
    if(opcode === 5) {
      paramA !== 0 ? i = paramB : i = i + 3;
    }
    if(opcode === 6) {
      paramA === 0 ? i = paramB : i = i + 3;
    }
    if(opcode === 7) {
      paramA < paramB ? arr[index3] = 1 : arr[index3] = 0;
      i = i + 4;
    }
    if(opcode === 8) {
      paramA === paramB ? arr[index3] = 1 : arr[index3] = 0;
      i = i + 4;
    }
    if(opcode === 99) {
      return output;
    }
  }
  return output;
}
const data1 = [1002,4,3,4,33];
const data2 = [3,0,4,0,99]
const output1 = processOutput(1, data);
const answer1 = output1.filter(e => e !== 0);
console.log('answer1', answer1)

// part_2
const input1 = [3,9,8,9,10,9,4,9,99,-1,8];
const input2 = [3,9,7,9,10,9,4,9,99,-1,8];
const input3 = [3,3,1108,-1,8,3,4,3,99];
const input4 = [3,3,1107,-1,8,3,4,3,99];

const input5 = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
const input6 = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];

const input7 = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
  1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
  999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
const partTwoOutput = processOutput(5, data);
console.log('answer2', partTwoOutput)
