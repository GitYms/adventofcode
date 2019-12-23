// 解析指令，输出： { 指令，参数（A，B，C)的模式 }
// 模式：1-立即模式，0-位置模式
module.exports = function resolveOpcode(opcode) {
  const arr = opcode.toString().split('').map(e => Number(e));
  const leng = 5 - arr.length;
  for(let i = 0; i < leng; i++) {
    arr.unshift(0);
  }
  return { opcode: Number(arr[3].toString() + arr[4].toString()), varA: arr[2], varB: arr[1], varC: arr[0] };
}