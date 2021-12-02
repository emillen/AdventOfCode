const { data, getPosition, getPositionWithAim } = require(".");

const p1 = getPosition(data);
const p2 = getPositionWithAim(data);

console.log(`Part 1: ${p1.horizontal * p1.depth}`);
console.log(`Part 2: ${p2.horizontal * p2.depth}`);
