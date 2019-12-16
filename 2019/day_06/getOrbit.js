const fs = require('fs');
const data = fs.readFileSync("./input.txt", { encoding: "utf8" }).split('\n');
console.log(data.length)
// part_1 
const test1 = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L']; // 42
function getOribits(map) {

}
const answer1 = getOribits(test1);
console.log('answer1', answer1)