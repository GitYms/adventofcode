const intcodeComputer = require('../common/intcodeComputer');
const fs = require('fs');
const data = fs.readFileSync('./input', { encoding: 'utf8' }).split(',')

// part_1
const part1_test1 = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]; // itself
const part1_test2 = [1102,34915192,34915192,7,4,7,99,0] // -> 1219070632396864
const part1_test3 = [104,1125899906842624,99]  // -> 1125899906842624
function resolve(dataArr, inputValue, baseValue = 0 ) {
  let result = intcodeComputer({ arr: dataArr, i: 0, inputValue, baseValue });
  while(!Array.isArray(result)){
    const { data, i, input, base, output }  = result;
    result = intcodeComputer({ arr: data, i, input, base, output});
  }
  console.log('result', result)   // [203, 0]
  return result;
}
resolve(data, 1)
// part_2

