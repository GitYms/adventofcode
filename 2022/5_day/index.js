import getInput from "../common/index.js";
const inputChange = getInput('./input.txt');

const inputMatrxi = ['', 'GFVHPS', 'GJFBVDZM', 'GMLJN', 'NGZVDWP', 'VRCB', 'VRSMPWLZ', 'THP', 'QRSNCHZV', 'FLGPVQJ']

/*
    输入：一个队列队列，以及一些变化
    输出： 变换后最后面的字符组合
        part 01: 一次改变多个时，需要倒序
        part 02: 一次改变多个是，顺序不变
*/

// 获取下标，[number, index1, index2]
const getIndexArr = (str) => {
    return str.split(' ').map(e => Number(e)).filter(e => e);
}

const splicingChar = ({ from, to, num, isReverse }) => {
    const chars = from.slice(from.length - num, from.length) || '';
    const newFrom = from.slice(0, from.length - num);
    const reverseChar = chars.trim().split('').reverse().toString().replaceAll(',', '');
    const newTo = isReverse ? (to.trim() + reverseChar) : (to.trim() + chars);
    return { fromStr: newFrom, toStr: newTo }
}

// console.log('test splicing', splicingChar({ from: 'FDWEGE', to: 'YILNHLJY', num: 4 }))

const changeMatrxi = (matrxi, changes, isReverse) => {
    const res = [...matrxi];
    for (let i = 0; i < changes.length; i++) {
        const [num, from, to] = getIndexArr(changes[i]);
        const { fromStr, toStr } = splicingChar({ from: res[from], to: res[to], num, isReverse });
        res[from] = fromStr;
        res[to]= toStr;
    }
    return res;
}

const getLastChars = (matrxi) => {
    let res = '';
    for (let i = 0; i < matrxi.length; i++) {
        const len = matrxi[i].length;
        res += (matrxi[i]?.charAt(len - 1) || '');
    }
    return res;
}

const getRes = (matrxi, changes, isReverse) => {
    const matrxiAfterChange = changeMatrxi(matrxi, changes, isReverse);
    return getLastChars(matrxiAfterChange);
}

console.log('part 01 input', getRes(inputMatrxi, inputChange, true))
console.log('part 02 input', getRes(inputMatrxi, inputChange, false))

