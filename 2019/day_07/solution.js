const fs = require('fs');
const resolveOpcode = require('../common/resolveOpcode');
const data = fs.readFileSync('./input', 'utf8').split(',').map(e => Number(e));

// part 1
function processOutput(input, data) {
  const arr = [...data]
  const output = [];
  let j = true;
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
      arr[index1] = j ? input[0] : input[1];
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
const test1 = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]; // 43210
const test2 = [3,23,3,24,1002,24,10,24,1002,23,-1,23,
  101,5,23,23,1,24,23,23,4,23,99,0,0]; // 54321
const test3 = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
  1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0]; // 65210
function getSingal(sequences, data) {
  const outputArr = [0];
  while(sequences.length > 0) {
    const sequence = sequences.shift();
    const input = [sequence, outputArr[outputArr.length - 1]];
    const result = processOutput(input, data)[0];
    outputArr.push(result)
  }
  return outputArr[outputArr.length - 1];
}
function getSequences(numbers) {
  const sequences = [];
  for(let i = 0; i < numbers.length; i++) {
    const sencordNumbers = numbers.filter(e => e !== numbers[i]);
    for(let j = 0; j < sencordNumbers.length; j++) {
      const thirdNumbers = sencordNumbers.filter(e => e !== sencordNumbers[j]);
      for(let k = 0; k < thirdNumbers.length; k++) {
        const forthNumbers = thirdNumbers.filter(e => e !== thirdNumbers[k]);
        for(let h = 0; h < forthNumbers.length; h++) {
          const fifthNumbers = forthNumbers.filter(e => e !== forthNumbers[h]);
          for(let f = 0; f < fifthNumbers.length; f++) {
            const sequence = [numbers[i], sencordNumbers[j], thirdNumbers[k], forthNumbers[h], fifthNumbers[f]]
            sequences.push(sequence)
          }
        }
      }
    }
  }
  return sequences;
}
function getMaxSingal(data) {
  // 获取序列sequences 【0，1，2，3，4】的任意组合
  const sequences = getSequences([0, 1, 2, 3, 4]);
  // one sequence -> one singal 
  const singals = sequences.map(sequence => getSingal(sequence, data));
  // 获取最大的signal
  return Math.max(...singals)
}
const answer1 = getMaxSingal(data);
console.log('answer1:', answer1)


// part 2
const testData1 = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
  27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5]; // 139629729
const testData2 = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
  -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
  53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]; // 18216
function getCircleMaxSingal(data) {
  const sequences = getSequences([9, 8, 7, 6, 5]);
  // 循环sequences -> 循环processOutput 直到没有输出 ->得到signal;
  const singals = sequences.map(sequence => {
    // processOutput 输出：【n】
  })
}
const answer2 = getCircleMaxSingal(data);
console.log('answer2:', answer2)
