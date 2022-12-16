import getInput from "../common/index.js";
const input = getInput('./input.txt');
const testInput = getInput('./test.txt');

const isTouch = (headPoint, tailPoint) => {
  const [hx, hy] = headPoint;
  const [tx, ty] = tailPoint;
  const x = Math.abs(hx - tx);
  const y = Math.abs(hy - ty);
  if (x > 1 || y > 1) {
    return false;
  }
  return true;
}

// console.log('is touch:', isTouch([4,2], [2,0]))

const headChange = (point, dire) => {
  const [x, y] = point;
  const directMap = {
    'U': [x, y + 1],
    'D': [x, y - 1],
    'R': [x + 1, y],
    'L': [x - 1, y],
  };
  return directMap[dire];
}

const tailChange = (hPoint, tPoint) => {
  const [hx, hy] = hPoint;
  const [tx, ty] = tPoint;
  // 同行或同列
  if (hy === ty) {
    return [hx > tx ? tx + 1 : tx -1, ty];
  }
  if (hx === tx) {
    return [tx, hy > ty ? ty + 1 : ty - 1];
  }
  // 对角线,
  if (hx > tx && hy > ty) { // 右上
    return [tx + 1, ty + 1];
  }
  if (hx > tx && hy < ty) { // 右下
    return [tx + 1, ty - 1];
  }
  if (hx < tx && hy < ty) { // 左下
    return [tx - 1, ty - 1];
  }
  return [tx - 1, ty + 1]; // 左上
}

const getPath = ({ headPoint, tailPoint, pathTailGo, moveInfo }) => {
  const pointsThrough = new Set([...pathTailGo]);
  const [direction, num] = moveInfo.split(' ');
  const goNum = Number(num);
  let hPoint = headPoint;
  let tPoint = tailPoint;
  for (let i = 0; i < goNum; i++) {
    const touch = isTouch(hPoint, tPoint);
    if (!touch) {
      tPoint = tailChange(hPoint, tPoint, direction);
      const [x, y] = tPoint;
      pointsThrough.add(`${x} ${y}`);
    }
    hPoint = headChange(hPoint, direction);
  }
  return { headPoint: hPoint, tailPoint: tPoint, paths: [...pointsThrough]  };
}

const getPositionNum = (input) => {
  let pathTailGo = ['0 0'];
  let headPoint = [0, 0];
  let tailPoint = [0, 0];
  for (let i = 0; i < input.length; i++) {
    const moveInfo = input[i];
    const res = getPath({ headPoint, tailPoint, pathTailGo, moveInfo });
    headPoint = res.headPoint;
    tailPoint = res.tailPoint;
    pathTailGo = res.paths;
  }
  console.log('pathTailGo', pathTailGo.length)
  return pathTailGo;
}

// getPositionNum(testInput)
console.log('part o1', getPositionNum(input));

