const resolveOpcode = require('./resolveOpcode');
function getIndex(data, index, base, mode) {
  let result;
  if(mode === 1) {
    result = index;
  }else if(mode === 2) {
    result = base + data[index];
  }else if(mode === 0) {
    result = data[index];
  }
  return result;
}

module.exports = function intcodeComputer(data, input, base = 0) {
  const output = [];
  for(let i = 0; i < data.length;) {
    const { opcode, modeA, modeB, modeC } = resolveOpcode(data[i]);
    const index1 = getIndex(data, i+1, base, modeA);
    const index2 = getIndex(data, i+2, base, modeB);
    const index3 = getIndex(data, i+3, base, modeC);
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