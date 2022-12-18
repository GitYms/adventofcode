import getInput from "../common/index.js";
const input = getInput('./input.txt');
const input1 = getInput('./input1.txt');

const MAX_SIZE = 100000;
/*
  输入： 文件操作指令以及相关结果， dir a(文件夹a),
  输出：
    part01: 不超过 MAX_SIZE 的所有文件的总和（可能有重复的） 
      文件夹 A下有文件夹B， 则分别算A、B的值（A的值： B + 其他）
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

//每次循环传入一个文件夹下的所有文件
const getFolderSize = (input,obj) => {
  var num = 0;
  for (let i = 0; i < input.length; i++) {
    //当的文件
    num += getFileNum(input[i]);
    //进入目录
    if(input[i].startsWith("$ cd") && input[i] != "$ cd .."){
      var arr = []; //里层文件夹目录
      var deep = 1; //用于标记找出字文件夹从开始到结束的命令，发生一次“cd 文件夹名”层级加一次，发生一次“cd ..”，层级减1，当层级等于0或者到数组最后，表示结尾
      var count = 0;
      for(var k = i+1;k < input.length;k++){
        arr.push(input[k])
        count++;
        if(input[k].startsWith("$ cd") && input[k] != "$ cd .."){
          deep += 1;
        }
        if(input[k] == "$ cd .."){
          deep -= 1;
        }
        if(deep == 0){
          break;
        }
      }
      num +=  getFolderSize(arr,obj)
      //里层已经使用递归计算出结果为并添加到num中了，将里层的语句从元数据中删除
      input.splice(i+1,count)
    }
  }
  //循环结束，本层所有文件和文件夹大小都累计到num中了，进行判断，是否累加到total
  obj.total += num;
  console.log('num',num)
  return num;
}
var obj = {};
obj.total = 0;
input.splice(0,1)
//引用传递，因为每次循环要返回每层文件夹的大小给上一层，所以不能返回total，只能使用引用传递，将满足条件的值加到obj.total中
getFolderSize(input1,obj)
console.log('part 01: total File size',obj, obj.total);