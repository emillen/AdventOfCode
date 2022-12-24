const { part1result, part2result } = require(".");

if (
  process.argv[2] === "part1" ||
  process.argv[2] === "p1" ||
  process.argv[2] === "both" ||
  process.argv[2] === undefined
) {
  console.time("Part 1 performance");
  const p1res = part1result();
  console.timeEnd("Part 1 performance");
  console.log(`Part 1 result: ${p1res}`);
}

console.log();

if (
  process.argv[2] === "part2" ||
  process.argv[2] === "p2" ||
  process.argv[2] === "both" ||
  process.argv[2] === undefined
) {
  console.time("Part 2 performance");
  const p2res = part2result();
  console.timeEnd("Part 2 performance");
  console.log(`Part 2 result: ${p2res}`);
}
