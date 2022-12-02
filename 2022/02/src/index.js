const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const part1 = (input) => {
  const outcomes = {
    "A X": 3 + 1,
    "A Y": 6 + 2,
    "A Z": 0 + 3,
    "B X": 0 + 1,
    "B Y": 3 + 2,
    "B Z": 6 + 3,
    "C X": 6 + 1,
    "C Y": 0 + 2,
    "C Z": 3 + 3,
  };
  return input
    .split("\n")
    .map((row) => outcomes[row])
    .filter((score) => Number.isInteger(score))
    .reduce((acc, score) => acc + score, 0);
};

const part2 = (input) => {
  const outcomes = {
    "A X": 0 + 3,
    "A Y": 3 + 1,
    "A Z": 6 + 2,
    "B X": 0 + 1,
    "B Y": 3 + 2,
    "B Z": 6 + 3,
    "C X": 0 + 2,
    "C Y": 3 + 3,
    "C Z": 6 + 1,
  };

  return input
    .split("\n")
    .map((row) => outcomes[row])
    .filter((score) => Number.isInteger(score))
    .reduce((acc, score) => acc + score, 0);
};

module.exports = {
  part1result: part1(string),
  part2result: part2(string),
  part1,
  part2,
};
