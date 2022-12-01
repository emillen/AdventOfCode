const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();
const renameMe = string.split("\n").map((row) => row.trim());

const part1 = (input) => {};
const part2 = (input) => {};

module.exports = {
  part1result: part1(renameMe),
  part2result: part2(renameMe),
  part1,
  part2,
};
