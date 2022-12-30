import getInput from "../common/index.js";
const input = getInput('./input.txt');
const testInput = getInput('./test.txt');

/**
 * 描述：
 *    沙子从坐标（500， 0）向下掉落，以向下、左下、右下方向流动，当被沙子或岩石挡住则静止；
 *  静止后产生新的沙子；输入为岩石的存在的路径；
 *    没有岩石的其他地方为深渊，沙子溢出后会流向深渊；
 * 输出：
 *    part 01：沙子开始流向深渊时，产生了多少沙子
 */