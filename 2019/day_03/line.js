const fs = require('fs')
const data = fs.readFileSync("./input",{ encoding: "utf8" }).split("\n")
// const line1 = data[0];
// const line2 = data[1];

/*
  INPUT: 两条线
  part_01: 
    note: R, D, L, U分别表示向右、下、左、上移动，方向后为移动的距离（L20, 向左移动20）
    result: 起点(x1, y1)与最近的交点(x2, y2)的曼哈顿距离(|x1 - x2| + |y1 - y2|)
  part_02: 
*/
const line1 = ['R75','D30','R83','U83','L12','D49','R71','U7','L72'];
const line2 = ['U62','R66','U55','R34','D71','R55','D58','R83'];
// const line1 = ['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'];
// const line2 = ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7'];
function getPath(lines) {
  const result = [];
  lines.forEach(line => {
    const pathPoint = getPoint(result[result.length - 1], line)
    result.push(...pathPoint)
  });
  return result;
}
function getPoint(startPoint = [0, 0], line) {
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
function findIntersection(a, b) {
  const linePoints1 = getPath(a);
  const linePoints2 = getPath(b);
  // linePoints1 & linePoints1相同的点即为交点
}

