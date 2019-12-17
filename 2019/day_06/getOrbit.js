const fs = require('fs');
const data = fs.readFileSync("./input.txt", { encoding: "utf8" }).split('\n');
// consoles.log(data)
// part_1 
const test1 = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L']; // 42
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
function getPlanetOribits(planet, maps) {
  const node = maps.filter(e => e.name === planet)[0]
  if(planet === 'COM') {
    return 0;
  }
  return 1 + getPlanetOribits(node.parent, maps);
}
function getOribits(input) {
  let result = 0;
  const { maps, planets } = analysisMap(input);
  // node中父节点的个数  的总和
  planets.forEach(planet => {
    const planetOribits = getPlanetOribits(planet, maps);
    result += planetOribits;
  });
  return result;
}
const answer1 = getOribits(data);
console.log('answer1', answer1)