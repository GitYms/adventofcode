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
function changeIndex(opcode, index) {
  const addTwo = [3, 4, 9];
  const addFour = [1, 2, 7, 8]
  if (addTwo.indexOf(opcode)) {
    return index + 2;
  } else if(addFour.indexOf(opcode)){
    return index + 4;
  } else {
    return index;
  }
}
module.exports = function intcodeComputer({arr, i, input, base = 0, output = []}) {
  const data = [...arr]
  const outputArr = [...output];
  const { opcode, modeA, modeB, modeC } = resolveOpcode(data[i]);
  const index1 = getIndex(data, i+1, base, modeA);
  const index2 = getIndex(data, i+2, base, modeB);
  const index3 = getIndex(data, i+3, base, modeC);
  const paramA = data[index1] || 0;
  const paramB = data[index2];
  if(opcode === 1) {
    data[index3] = (paramA - 0) + (paramB - 0);
  }
  if(opcode === 2) {
    data[index3] = (paramA - 0) * (paramB - 0);
  }
  if(opcode === 3) {
    data[index1] = input;
  }
  if(opcode === 4) {
    outputArr.push(paramA);
  }
  if(opcode === 5) {
    i = (paramA !== 0) ? paramB : i + 3;
  }
  if(opcode === 6) {
    i = (paramA === 0) ?  paramB : i + 3;
  }
  if(opcode === 7) {
    data[index3] = (paramA < paramB) ?  1 : 0;
  }
  if(opcode === 8) {
    data[index3] = (paramA === paramB) ? 1 : 0;
  }
  if(opcode === 9) {
    base += paramA;
  }
  if(opcode === 99) {
    return outputArr;
  }
  const index = changeIndex(opcode, i);
  return { data: [...data], i: index, input, base, output: outputArr }
}