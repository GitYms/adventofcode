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
  const result = [];
  linePoints1.forEach(pointA => {
    linePoints2.forEach(pointB => {
      if(JSON.stringify(pointA) === JSON.stringify(pointB)) {
        result.push(pointB);
      }
    } )
  })
  return result;
}
function minManhattan(data) {
  const intersectionsPoints = findIntersection(data[0], data[1]);
  const distance = intersectionsPoints.map(e => Math.abs(e[0] + Math.abs(e[1])));
  return Math.min(...distance)
}
const answer1 = minManhattan(data);
const data2 = ['L992','D463','R10','D791','R312','D146','R865','D244','L364','D189','R35',
  'U328','R857','D683','L660','D707','L908','D277','R356','U369','R197','D35','R625','D862',
  'L769','U705','L728','U999','R938','U233','L595','U266','L697','U966','L536','D543','L669',
  'D829','R910','U693','R753','D389','L647','U603','L660','D787','L138','D119','L131','D266',
  'R268','D917','R776','U290','R920','U904','L46','D139','L341','D19','R982','U790','L981',
  'U791','L147','U30','L246','U677','R343','D492','R398','D234','R76','D423','L709','D392',
  'R741','U408','R878','U29','R446','U36','R806','U78','L76','D813','R584','U682','L187','U666',
  L340,D301,L694,U15,R800,U276,L755,U558,R366,D309,R571,U976,L286,D833,R318,U365,L864,U408,L352,D61,R284,D272,R240,D845,L206,U721,R367,D541,R628,U581,L750,D680,R695,D30,R849,U743,L214,U605,R533,U493,R803,D783,R168,U877,L61,D726,L794,D116,R717,U44,R964,U674,L291,D372,L381,D523,L644,U438,R983,D390,R520,D471,R556,D693,L919,D863,R84,D629,L264,D429,R82,U64,R835,D801,R93,U770,R441,D152,L718,D788,L797,U699,L82,U206,L40,U952,R902,U570,L759,D655,L131,D901,L470,D804,L407,U458,L922,D21,L171,U841,L237,D301,R192,D293,R984,U243,R846,U139,L413,U162,R925,D235,L115,U443,L884,D910,R335,U274,L338,U160,R125,D775,R824,D821,R531,D761,L189,U822,L602,D732,R473,U149,L128,U30,R77,D957,R811,D154,L988,D237,R425,D855,R482,D571,R134,D731,L905,U869,R916,D689,L17,U24,R353,D996,R832,U855,L76,U659,R581,D483,R821,D145,R199,D344,R487,D436,L92,U491,R365,D909,L17,D148,R307,U57,R666,U660,R195,D767,R612,D902,L594,D299,R670,D881,L583,D793,R58,U89,L99,D355,R394,D350,R920,U544,R887,U564,L238,U979,L565,D914,L95,U150,R292,U495,R506,U475,R813,D308,L797,D484,R9]