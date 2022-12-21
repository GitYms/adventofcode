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

const getTailPath = ({ headPoint, tailPoint, pathTailGo, moveInfo }) => {
  const pointsThrough = new Set([...pathTailGo]);
  const [direction, num] = moveInfo.split(' ');
  const goNum = Number(num);
  let hPoint = headPoint;
  let tPoint = tailPoint;
  for (let i = 0; i < goNum; i++) {
    hPoint = headChange(hPoint, direction);
    const touch = isTouch(hPoint, tPoint);
    if (!touch) {
      tPoint = tailChange(hPoint, tPoint);
      const [x, y] = tPoint;
      pointsThrough.add(`${x} ${y}`);
    }
  }
  return { headPoint: hPoint, tailPoint: tPoint, paths: [...pointsThrough]  };
}

const getPositionNum = (input) => {
  let pathTailGo = ['0 0'];
  let headPoint = [0, 0];
  let tailPoint = [0, 0];
  for (let i = 0; i < input.length; i++) {
    const moveInfo = input[i];
    const res = getTailPath({ headPoint, tailPoint, pathTailGo, moveInfo });
    headPoint = res.headPoint;
    tailPoint = res.tailPoint;
    pathTailGo = res.paths;
  }
  return pathTailGo.length;
}

const getTailsPath = ({ headPoint, tailPoint, pathTailGo, tailMovedNum, lastPaths, moveInfo }) => {
  const pointsThrough = [...pathTailGo];
  const aimPaths = new Set([...lastPaths]);
  const [direction, num] = moveInfo.split(' ');
  const goNum = Number(num);
  let hPoint = headPoint;
  let tPoint = tailPoint;
  let tailsNum = tailMovedNum;
  for (let i = 0; i < goNum; i++) {
    hPoint = headChange(hPoint, direction);
    const touch = isTouch(hPoint, tPoint);
    if (!touch) {
      tPoint = tailChange(hPoint, tPoint);
      tailsNum += 1;
      pointsThrough.push(`${tPoint[0]} ${tPoint[1]}`);
      if (tailsNum === 8) {
        const [x, y] = pointsThrough[aimPaths.length];
        aimPaths.add(`${x} ${y}`);
        tailsNum = 0;
      }
    }
  }
  return { headPoint: hPoint, tailPoint: tPoint, tailsNum, allPaths: pointsThrough, uniPaths: [...aimPaths] };
}

const getLastTails = (input) => {
  let paths1Go = ['0 0'];
  let paths9G0 = [];
  let hPoint = [0, 0];
  let tPoint1 = [0, 0];
  let tailMoved = 0;
  for (let i = 0; i < input.length; i ++) {
    const moveInfo = input[i];
    const parms = {
      headPoint: hPoint,
      tailPoint: tPoint1,
      pathTailGo: paths1Go,
      tailMoved,
      moveInfo,
      lastPaths: paths9G0
    }
    const { allPaths, headPoint, tailPoint, uniPaths, tailsNum } = getTailsPath(parms);
    paths1Go = allPaths;
    hPoint = headPoint;
    tPoint1 = tailPoint;
    paths9G0 = uniPaths;
    tailMoved = tailsNum;
  }
  return paths9G0.length;
}

// console.log('part 01', getPositionNum(input));
console.log('part 02:', getLastTails(input));

