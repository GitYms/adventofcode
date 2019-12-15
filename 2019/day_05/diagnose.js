const data = [3,225,1,225,6,6,1100,1,238,225,104,0,2,136,183,224,101,-5304,224,224,4,224,1002,223,8,223,1001,224,6,224,1,224,223,223,1101,72,47,225,1101,59,55,225,1101,46,75,225,1101,49,15,224,101,-64,224,224,4,224,1002,223,8,223,1001,224,5,224,1,224,223,223,102,9,210,224,1001,224,-270,224,4,224,1002,223,8,223,1001,224,2,224,1,223,224,223,101,14,35,224,101,-86,224,224,4,224,1002,223,8,223,101,4,224,224,1,224,223,223,1102,40,74,224,1001,224,-2960,224,4,224,1002,223,8,223,101,5,224,224,1,224,223,223,1101,10,78,225,1001,39,90,224,1001,224,-149,224,4,224,102,8,223,223,1001,224,4,224,1,223,224,223,1002,217,50,224,1001,224,-1650,224,4,224,1002,223,8,223,1001,224,7,224,1,224,223,223,1102,68,8,225,1,43,214,224,1001,224,-126,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1102,88,30,225,1102,18,80,225,1102,33,28,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,677,677,224,102,2,223,223,1005,224,329,1001,223,1,223,1107,677,226,224,102,2,223,223,1006,224,344,1001,223,1,223,108,226,226,224,102,2,223,223,1005,224,359,1001,223,1,223,1108,677,226,224,102,2,223,223,1006,224,374,101,1,223,223,108,677,226,224,102,2,223,223,1006,224,389,1001,223,1,223,107,226,226,224,102,2,223,223,1005,224,404,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,419,101,1,223,223,1107,677,677,224,102,2,223,223,1006,224,434,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,449,101,1,223,223,7,677,677,224,1002,223,2,223,1006,224,464,1001,223,1,223,1108,226,677,224,1002,223,2,223,1005,224,479,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,494,101,1,223,223,7,226,677,224,102,2,223,223,1005,224,509,101,1,223,223,1008,677,226,224,102,2,223,223,1006,224,524,101,1,223,223,8,226,677,224,1002,223,2,223,1006,224,539,1001,223,1,223,1007,677,677,224,102,2,223,223,1005,224,554,101,1,223,223,107,226,677,224,1002,223,2,223,1005,224,569,1001,223,1,223,1108,677,677,224,1002,223,2,223,1006,224,584,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,599,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,614,101,1,223,223,7,677,226,224,1002,223,2,223,1005,224,629,1001,223,1,223,107,677,677,224,1002,223,2,223,1006,224,644,101,1,223,223,1007,226,677,224,1002,223,2,223,1005,224,659,1001,223,1,223,1007,226,226,224,102,2,223,223,1005,224,674,101,1,223,223,4,223,99,226];
/*
  part_1:
    note: 
    result:
  part_2:
    note: 
    result:  
*/
// const fs = require('fs')
// const data = fs.readFileSync("./input",{ encoding: "utf8" }).split(",")

// part_1
function resolveOpcode(opcode) {
  const arr = opcode.toString().split('').map(e => Number(e));
  const leng = 5 - arr.length;
  for(let i = 0; i < leng; i++) {
    arr.unshift(0);
  }
  return { opcode: Number(arr[3].toString() + arr[4].toString()), varA: arr[2], varB: arr[1], varC: arr[0] };
}
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
