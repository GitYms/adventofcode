import getInput from "../common/index.js";
const input = getInput('./input.txt');

/*
    a-z: 代表数字 1-26；A-Z：代表数字 27-52
*/

const averageSliceStr = (str) => {
    const half = str.length / 2
    const str1 = str.slice(0, half);
    const str2 = str.slice(half, str.length);
    return [str1, str2];
}

// str分为两部分，找出重复的字符
const getRepeatChar = ([str1, str2]) => {
    for (let i = 0; i < str1.length; i++) {
        const res = str1.charAt(i);
        if (str2.includes(res)) {
            return res;
        }
    }
}

// 输入数组，找出数组中每项中都存在的字符
const getRepeatCharFromArr = (arr) => {
    // 获取最短的字符
    let minStr = arr[0], index = 0;
    for (let i = 1; i < arr.length; i++) {
        if (minStr.length > arr[i].length) {
            minStr = arr[i];
            index = i;
        }
    }
    const arrs = arr.filter((e, i) => i !== index);
    for (let h = 0; h < minStr.length; h++) {
        const char = minStr.charAt(h);
        if (arrs[0].includes(char) && arrs[1].includes(char)) {
            return char;
        }
    }
}

const test = ['JPqvjJmmqvSLmPtpZdcftdmtfdCC',
    'swwhDRwBBHjFFBtBfZ',
    'RRzNQDwznDsDwWJjLNlrSPLSTr']

const getNumByChar = (char) => {
    const num = char?.charCodeAt(0) || 0; // a-z:97-122, A-Z:65-90
    if (num < 95) { // 大写
        return num - 38;
    } else { // 小写
        return num - 96;
    }
}

const getOnlyChars = (arr) => {
    let chars = [];
    for (let i = 0; i < arr.length; i++) {
        const strArr = averageSliceStr(arr[i]);
        const char = getRepeatChar(strArr);
        chars.push(char);
    }
    return chars;
}

const getTotalByString = (arr) => {
    const charArr = getOnlyChars(arr);
    return getTotalByChar(charArr);
}

const getTotalByChar = (charArr) => {
    let res = 0;
    for (let i = 0; i < charArr.length; i++) {
        res += getNumByChar(charArr[i]);
    }
    return res;
}

const getTotalByArr = (arr) => {
    const charArr = [];
    let shortArr = [];
    for (let i = 0; i < arr.length; i++) { // 3个为一组，找重复的值
        shortArr.push(arr[i]);
        if (shortArr.length === 3) {
            const char = getRepeatCharFromArr(shortArr);
            charArr.push(char);
            shortArr = [];
        }
    }
    const total = getTotalByChar(charArr);
    return total;
}

console.log('part 01 toalScore', getTotalByString(input));
console.log('part 02 toalScore', getTotalByArr(input));