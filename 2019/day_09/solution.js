const intcodeComputer = require('../common/intcodeComputer');
const fs = require('fs');
const data = fs.readFileSync('./input', { encoding: 'utf8' }).split(',')

console.log(data.length)
// part_1
function resolve(data, input, base) {

}
const part1_test1 = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
const part1_test2 = [1102,34915192,34915192,7,4,7,99,0]
const part1_test3 = [104,1125899906842624,99]
const answer1 = resolve();
console.log('answer1:', answer1);

// part_2

