module.exports = function intcodeComputer(data, input, index = 0, base = 0, output) {
  let j = true;
  for(let i = index; i < data.length;) {
    const { opcode, varA, varB, varC } = resolveOpcode(data[i]);
    const index1 = varA === 0 ? data[i+1] : i+1;
    const index2 = varB === 0 ? data[i+2] : i+2;
    const index3 = varC === 0 ? data[i+3] : i+3;
    const paramA = data[index1];
    const paramB = data[index2];
    if(opcode === 1) {
      data[index3] = (paramA - 0) + (paramB - 0);
      i = i + 4;
    }
    if(opcode === 2) {
      data[index3] = (paramA - 0) * (paramB - 0);
      i = i + 4;
    }
    if(opcode === 3) {
      data[index1] = j ? input[0] : input[1];
      j = !j;
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
      paramA < paramB ? data[index3] = 1 : data[index3] = 0;
      i = i + 4;
    }
    if(opcode === 8) {
      paramA === paramB ? data[index3] = 1 : data[index3] = 0;
      i = i + 4;
    }
    if(opcode === 9) {
      base += paramA;
      i = i + 2;
    }
    if(opcode === 99) {
      return output;
    }
  }
  // return output;
}