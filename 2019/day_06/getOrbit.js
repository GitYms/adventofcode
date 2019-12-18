const getIntersection = require('../common/getIntersection')
const fs = require('fs');
const data = fs.readFileSync("./input.txt", { encoding: "utf8" }).split('\n');

const test = ['I)SAN', 'K)YOU', 'COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L']; // 42
// part_1 
function analysisMap(input) {
  const planets = new Set();
  const maps = input.map(element => {
    const node = element.split(')');
    const name = node[1];
    const parent = node[0]; 
    planets.add(parent);
    planets.add(name)
    return { name, parent };
  });
  return { maps, planets }
}
function getPlanetOribits(planetName, maps, endPlanetName= 'COM', total = 0, path = []) {
  const planet = maps.filter(e => e.name === planetName)[0];
  if(planetName === endPlanetName) {
    return { total, path };
  }
  path.push(planet.name)
  return getPlanetOribits(planet.parent, maps, endPlanetName, total + 1, path);
}
function getOribits(input) {
  const start = new Date().getTime();
  let result = 0;
  const { maps, planets } = analysisMap(input);
  // node中父节点的个数  的总和
  planets.forEach(planet => {
    const { total: planetOribits } = getPlanetOribits(planet, maps, 'COM');
    result += planetOribits;
  });
  console.log('part1 spend time(ms):', new Date().getTime() - start)
  return result;
}
const answer1 = getOribits(data);
console.log('answer1', answer1)

// part_2   
function getTransferOribits(input, planetA, planetB) {
  const start = new Date().getTime();
  const { maps } = analysisMap(input);
  const startPlanet = maps.filter(e => e.name === planetA)[0];
  const endPlanet = maps.filter(e => e.name === planetB)[0];
  // 找到start & end一直向上找parent的交点X  result = (X--start) + (X--end)
  const { total: total1, path: path1 } = getPlanetOribits(startPlanet.parent, maps, 'COM');
  const { total: total2, path: path2 } = getPlanetOribits(endPlanet.parent, maps, 'COM');
  const result = total1 + total2 - (2 * getIntersection(path1, path2).length);
  console.log('part2 spend time(ms):', new Date().getTime() - start)
  return result;
}
const answer2 = getTransferOribits(data, 'YOU', 'SAN');
console.log('answer2', answer2);