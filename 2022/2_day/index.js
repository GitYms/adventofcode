import getInput from "../common/index.js";

const input = getInput('./input.txt');
/*
    Rock(A/X) defeats Scissors(C/Z), 
    Scissors(C/Z) defeats Paper(B/Y), 
    Paper(B/Y) defeats Rock(A/X).
    共同规则： 赢了+6，平局+3，输了+0; 选X +1，Y +2，Z +3
    part 01:
        计算总分
    part 02:
        X: need loose
        Y: need draw
        Z: need win
        基于上面的规则的总分
*/

const strageScore = {
    'A X': 4,
    'A Y': 8,
    'A Z': 3,
    'B X': 1,
    'B Y': 5,
    'B Z': 9,
    'C X': 7,
    'C Y': 2,
    'C Z': 6,
}

// 真实对应的策略，B 的值不用转换
const stragesMap = {
    'A X': 'A Z',
    'A Y': 'A X',
    'A Z': 'A Y',
    'C X': 'C Y',
    'C Y': 'C Z',
    'C Z': 'C X'
}

function getScore(data, hasStrages) {
    let res = 0;
    for (let i = 0; i < data.length; i++) {
        let strage = data[i];
        if (hasStrages) {
            strage = stragesMap[strage] || strage;
        }
        res += strageScore[strage];
    }
    return res;
}

console.log('part 01, score', getScore(input, false));
console.log('part 01, score', getScore(input, true));
