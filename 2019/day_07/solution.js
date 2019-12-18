const fs = require('fs');
const data = fs.readFileSync('./input', 'utf8').split(',');
console.log(data.length)

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
