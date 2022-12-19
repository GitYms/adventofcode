import getInput from "../common/index.js";
const input = getInput('./input.txt');
const input1 = getInput('./input1.txt');

const MAX_SIZE = 100000;
const SIZE_NEED = 30000000;
const TOTAL = 70000000;
/*
  输入： 文件操作指令以及相关结果， dir a(文件夹a),
  输出：
    part01: 不超过 MAX_SIZE 的所有文件的总和（可能有重复的） 
      文件夹 A下有文件夹B， 则分别算A、B的值（A的值： B + 其他）
    part02: 删除一个文件，满足使空余空间 >= SIZE_NEED, 这个文件的大小
*/

const getFileNum = (str) => {
  const info = str.split(' ');
  const firtItem = info[0];
  const specialChar = ['$', 'dir'];
  if (specialChar.includes(firtItem)) {
    return 0;
  }
  return Number(firtItem);
}

const getNumCanAdd = (num) => (num > MAX_SIZE) ? 0 : num;

const insideFolder = (info) => info.includes('$ cd') && info !== '$ cd ..';

const getFolderSizeArr = (input, folders) => {
  let size = 0;
  for(let i = 0; i < input.length; i++) {
    const info = input[i];
    // 文件大小
    size += getFileNum(info);
    // 内部文件夹大小
    const isSecondFolder = insideFolder(info);
    if (isSecondFolder) {
      let commandNum = 0;
      let deep = 1;
      const folderInfo = [];
      for (let j = i + 1; j < input.length; j++) {
        commandNum += 1;
        folderInfo.push(input[j]);
        if (insideFolder(input[j])) {
          deep += 1;
        }
        if (input[j] === '$ cd ..') {
          deep -= 1;
        }
        if (deep === 0) {
          break;
        }
      }
      const folderArr = getFolderSizeArr(folderInfo, folders);
      size += folderArr[folderArr.length - 1];
      input.splice(i + 1, commandNum);
    }
  }
  folders.push(size);
  return folders;
}

const folderSizeArr = getFolderSizeArr(input, []);

// 获取 没有大于限制的总和
const getFolderTotal = (folders) => {
  let res = 0;
  for (let i = 0; i < folders.length; i++) {
    res += getNumCanAdd(folders[i]);
  }
  return res;
}

const getSize = (folders) => {
  const orderedFolders = folders.sort((a, b) => a - b);
  const sizeExist = folders[folders.length - 1]; // 最后的值为根目录的大小
  const needSize = SIZE_NEED - (TOTAL - sizeExist);
  for (let i = 0; i < orderedFolders.length; i++) {
    const size = orderedFolders[i]
    if (size >= needSize) {
      return size;
    }
  }
}

console.log('part 01: ', getFolderTotal(folderSizeArr));
console.log('part 02: ', getSize(folderSizeArr));