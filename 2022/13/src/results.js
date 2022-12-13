const { part1result, part2result } = require(".");

console.time("Part 1 performance");
const p1res = part1result();
console.timeEnd("Part 1 performance");

console.time("Part 2 performance");
const p2res = part2result();
console.timeEnd("Part 2 performance");

console.log();
console.log(`Part 1 result: ${p1res}`);
console.log(`Part 2 result: ${p2res}`);
