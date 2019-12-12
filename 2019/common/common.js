// 获取数组中的相同值
function getIntersection(arr, brr) {
  const result = [];
  const temp = [];
  for(let i = 0; i < arr.length; i++) {
    temp[arr[i]] = true;
  };
  for(let j = 0; j < brr.length; j++) {
    if(temp[brr[j]]) {
      result.push(JSON.parse(brr[j]))
    }
  }
  return result;
}

export default getIntersection;