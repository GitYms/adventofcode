import getInput from "../common/index.js";
const input = getInput('./input.txt');

/*
    输入：2-4，4-5 
    输出： part 01: 完全包含的数量（前者包含后者或者后者包含前者）
           part 02: 有交集的数量总和
*/

const isInclusion = (a, b) => {
    const [a1, a2] = a.split('-').map(e => Number(e));
    const [b1, b2] = b.split('-').map(e => Number(e));
    if (b1 >= a1 && b2 <= a2) {
        return true;
    }
    if (a1 >= b1 && a2 <= b2) {
        return true;
    }
    return false;
}

const hasIntersection = (a, b) => {
    const [a1, a2] = a.split('-').map(e => Number(e));
    const [b1, b2] = b.split('-').map(e => Number(e));
    if (a2 < b1 || b2 < a1) {
        return false;
    }
    return true;
}

const getTotal = (input, fun) => {
    let res = 0;
    for (let i = 0; i < input.length; i++) {
        const [a, b] = input[i].split(',');
        if (fun(a, b)) {
            res += 1;
        }
    }
    return res;
}

const getInclusionTotal = (input) => getTotal(input, isInclusion);

const getIntresectionTotal = (input) => getTotal(input, hasIntersection);

const test = ['2-4,6-8', '2-3,4-5', '5-7,7-9', '2-8,3-7', '6-6,4-6', '2-6,4-8'];

console.log('part 01, getInclusionTotal: ', getInclusionTotal(input))
console.log('part 01, getIntresectionTotal: ', getIntresectionTotal(input))
