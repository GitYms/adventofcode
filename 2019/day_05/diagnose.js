/*
  part_1:
    note: 
    result:
  part_2:
    note: 
    result:  
*/
const fs = require('fs')
const data = fs.readFileSync("./input",{ encoding: "utf8" }).split(",")
// part_1
function resolveOpcode(opcode) {
  const arr = opcode.toString().split('').map(e => Number(e));
  const leng = 5 - arr.length;
  for(let i = 0; i < leng; i++) {
    arr.unshift(0);
  }
  return { opcode: arr[4], varA: arr[2], varB: arr[1], varC: arr[0] };
}
function process(input, data) {
  const arr = [...data]
  const output = [];
  for(let i = 0; i < data.length; i++) {
    const { opcode, varA, varB, varC } = resolveOpcode(data[i]);
    const paramA = varA === 0 ? arr[arr[i+1]] : arr[i+1];
    const paramB = varB === 0 ? arr[arr[i+2]] : arr[i+2];
    const outputPosition = varC === 0 && arr[i+3];
    if(opcode === 1) {
      arr[outputPosition] = (paramA - 0) + (paramB - 0);
      i = i + 4;
    }
    if(opcode === 2) {
      arr[outputPosition] = (paramA - 0) * (paramB - 0);
      i = i + 4;
    }
    if(opcode === 3) {
      arr[arr[i+1]] = input;
      i = i + 2;
    }
    if(opcode === 4) {
      output.push(input);
      i = i + 2;
    }
    if(opcode === 99) {
      return output;
    }
  }
  console.log('output', output)
}
console.log(process(1, data))
