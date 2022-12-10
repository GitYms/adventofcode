import getInput from "../common/index.js";

const data = getInput('./input.txt');

function getMaxVal (data) {
    let max = 0;
    let sum = 0;
    let arr = [];
    for(let i = 0; i < data.length; i++) {
        const num = getNum(data[i]);
        if (num === 0) {
            max = max > sum ? max : sum;
            arr = replaceMin(sum, arr);
            sum = 0;
        } else {
            sum += getNum(data[i]);
        }
    }
    return { max, arr };
}
function replaceMin (val, arr) {
    const res = [...arr].sort((a, b) => a - b);
    if (arr.length < 3) {
        res.push(val);
    }
    if (arr[0] < val) {
        res[0] = val;
    }
    return res;
}

function getNum (val) {
    return Number(val);
}

const { max, arr } = getMaxVal(data);
const totalTop3 = arr.reduce((a, b) => a + b, 0);

console.log('day_01, max', max);
console.log('day_02, total of top 1-3', totalTop3)