const getIntersection = require('../common/getIntersection')

const fs = require('fs')
const data = fs.readFileSync("./input",{ encoding: "utf8" }).split("\n")
const line1 = data[0].split(',');
const line2 = data[1].split(',');
/*
  INPUT: 两条线
  part_01: 
    note: R, D, L, U分别表示向右、下、左、上移动，方向后为移动的距离（L20, 向左移动20）
    result: 起点(x1, y1)与最近的交点(x2, y2)的曼哈顿距离(|x1 - x2| + |y1 - y2|)
  part_02: 
    note: line1与line2到达同一个交点的路径和
    result: 最短的路径
*/

// const line1 = ['R8','U5','L5','D3'];
// const line2 = ['U7','R6','D4','L4']; // -> part_1: 6, part_2: 30 
// const line1 = ['R75','D30','R83','U83','L12','D49','R71','U7','L72'];
// const line2 = ['U62','R66','U55','R34','D71','R55','D58','R83'];  // -> part_1: 159, part_2: 610 
// const line1 = ['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'];
// const line2 = ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'];  // -> part_1: 135, part_2: 410 
function getPathPoints(lines) {
  const result = [];
  lines.forEach(line => {
    const pathPoint = getOneDirectPoints(result[result.length - 1], line)
    result.push(...pathPoint)
  });
  return result;
}
function getOneDirectPoints(startPoint = [0, 0], line) {
  const point = [ ...startPoint];
  const number = line.slice(1) - 0;
  const direct = line[0];
  const result = [];
  for(let i = 1; i <= number; i++) {
    switch(direct) {
      case 'U':
        point[1] = point[1] + 1;
        break;
      case 'D':
        point[1] = point[1] - 1;
        break;
      case 'L':
        point[0] = point[0] - 1;
        break;
      case 'R':
        point[0] = point[0] + 1;
        break;
      default:
        break;
    }
    result.push([...point]);
  }
  return result;
};
// part_1
function minManhattan(line1, line2) {
  const linePoints1 = getPathPoints(line1);
  const linePoints2 = getPathPoints(line2);
  const intersectionsPoints = getIntersection(linePoints1, linePoints2);
  const distance = intersectionsPoints.map(e => (Math.abs(e[0]) + Math.abs(e[1]) ));
  return distance.length > 0 ? Math.min(...distance) : 0;
}
const answer1 = minManhattan(line1, line2);
console.log('answer1', answer1)


//part_2
function findSteps(linePoints, destination) {
  for(let i = 1; i < linePoints.length; i++) {
    // destination 在linePoints中的数组即为步数
    if(JSON.stringify(destination) === JSON.stringify(linePoints[i])) {
      return i + 1;
    }
  }
}
function findMinStep(line1, line2) {
  const linePoints1 = getPathPoints(line1);
  const linePoints2 = getPathPoints(line2);
  const intersectionsPoints = getIntersection(linePoints1, linePoints2);
  const stepsToIntersectionPoints = intersectionsPoints.map(e => {
    const steps = findSteps(linePoints1, e) + findSteps(linePoints2, e)
    return steps;
  });
  return Math.min(...stepsToIntersectionPoints)
}
const answer2 = findMinStep(line1, line2);
console.log('answer2', answer2)
