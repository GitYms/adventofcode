const fs = require('fs');
const data = fs.readFileSync('./input', { encoding: "utf8" }).split('');

const part1_test = '123456789012'.split('');  // 3 * 2
const part2_test = '0222112222120000'.split(''); // 2 * 2
// part 1 
function getLayer(input, wide, tall) {
  const layerInfo = [];
  const layers = [];
  const layerSize = wide * tall;
  // 分层 每层 25*6
  // 统计每层中0 1 2的个数
  // 找到0最少的层数，
  let layer = [];
  let numberA = 0;
  let numberB = 0;
  let numberC = 0;
  for(let i = 0; i < input.length; i++) {
    layer.push(input[i])
    if (input[i] === '0') {
      numberA += 1;
    }
    if (input[i] === '1') {
      numberB += 1;
    }
    if (input[i] === '2') {
      numberC += 1;
    }
    if(layer.length === layerSize){
      layers.push(layer)
      layerInfo.push([numberA, numberB, numberC])
      layer = [];
      numberA = numberB = numberC = 0;
    }
  }
  return { layers, layerInfo };
}
function getResult(input, wide, tall) {
  const { layerInfo } = getLayer(input, wide, tall);
  const number0 = layerInfo.map(e => e[0])
  const fewestNumber = Math.min(...number0);
  const aimLayer = layerInfo.filter(e => e[0] === fewestNumber)
  return aimLayer[0][1] * aimLayer[0][2];
}
const answer1 = getResult(data, 25, 6); // 25 * 6
console.log('answer1:', answer1)

// part 2
function getColor(input, wide, tall) {
  // 0-black 1-white 2-transparent
  const { layers } = getLayer(input, wide, tall);
  const reserveArr = layers
  const result = reserveArr[0];
  for(let i = 0; i < result.length; i++) {
    let j = 1;
    while(result[i] === '2' && j < reserveArr.length) {
      result[i] = reserveArr[j][i] ;
      j += 1;  
    }
  }
  return result;
}
function getImage(input, wide) {
  const result = [];
  let layer = [];
  for(let i = 0; i < input.length; i++) {
    layer.push(input[i]);
    if(layer.length === wide) {
      result.push(layer);
      layer = [];
    }
  }
  for(let i = 0; i < result.length; i++) {
    const str1 = result[i].reduce((a, b) => a + b);
    const str2 = str1.replace(/0/g, " ")
    const str = str2.replace(/1/g, '#')
    console.log(str)
  }
  return result;
}
const answer2 = getColor(data, 25, 6); // 25, 6
console.log('answer1:');
getImage(answer2, 25)
