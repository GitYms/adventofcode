const fs = require('fs')
const data = fs.readFileSync("./input1",{encoding:"utf8"}).split("\n")

// part 1
const result1 = data.reduce((a,b) => {
  const numA = a-0;
  const numB = b-0;
  return numA+numB;

  /*const num1 = parseInt(a);
  const num2 = parseInt(b);
  return num1+num2;*/
})



// part 2
const arr = [];
const duck = [];
data.reduce((a,b) => {
  const numA = a-0;
  const numB = b-0;
  arr.push(numA+numB);

  return numA+numB;
})
let result
for(let i = 0; i < arr.length; i++) {
  if (duck[arr[i]]) {
    result = arr[i]
  } else {
    duck[arr[i]] = 1;
  }
}