const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const part1 = (input) => {
  const chars = input.split("");

  return chars.findIndex((_, index) => {
    if (index >= 4) {
      const slice = chars.slice(index - 4, index);
      return slice.every((c, i) => slice.indexOf(c) === i);
    }
  });
};
const part2 = (input) => {
  const chars = input.split("");

  return chars.findIndex((_, index) => {
    if (index >= 14) {
      const slice = chars.slice(index - 14, index);
      return slice.every((c, i) => slice.indexOf(c) === i);
    }
  });
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
