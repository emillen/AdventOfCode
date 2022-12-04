const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const range = (a, b) => {
  const length = b - a + 1;
  return [...Array(length).keys()].map((i) => i + a);
};

const splitPairIntoRanges = (pair) => {
  const [first, second] = pair.split(",");
  const [firstStart, firstEnd] = first.split("-").map((elem) => parseInt(elem));
  const [secondStart, secondEnd] = second
    .split("-")
    .map((elem) => parseInt(elem));

  const firstRange = range(firstStart, firstEnd);
  const secondRange = range(secondStart, secondEnd);

  return [firstRange, secondRange];
};

const part1 = (input) => {
  const lines = input.split("\n").filter((line) => line);

  return lines.map(splitPairIntoRanges).filter(([firstRange, secondRange]) => {
    return (
      firstRange.every((num) => secondRange.includes(num)) ||
      secondRange.every((num) => firstRange.includes(num))
    );
  }).length;
};
const part2 = (input) => {
  const lines = input.split("\n").filter((line) => line);

  return lines
    .map(splitPairIntoRanges)
    .filter(([firstRange, secondRange]) =>
      firstRange.some((num) => secondRange.includes(num))
    ).length;
};

module.exports = {
  part1result: part1(string),
  part2result: part2(string),
  part1,
  part2,
};
