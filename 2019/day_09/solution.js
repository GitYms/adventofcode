const intcodeComputer = require('../common/intcodeComputer');
const fs = require('fs');
const data = fs.readFileSync('./input', { encoding: 'utf8' }).split(',')

// part_1
function resolve(data, base, input) {
  let result = intcodeComputer(data, input, base);
  return result;
}
const part1_test1 = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]; // itself
const part1_test2 = [1102,34915192,34915192,7,4,7,99,0] // -> 1219070632396864
const part1_test3 = [104,1125899906842624,99]  // -> 1125899906842624
const answer1 = intcodeComputer(part1_test1, 0, 0);
//  part1_test1 i=12 1006 死循环
console.log('answer1:', answer1);

// part_2

