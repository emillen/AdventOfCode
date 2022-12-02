const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const part1 = (input) => {
  const responseScores = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  const outcomes = {
    "A X": 3,
    "A Y": 6,
    "A Z": 0,
    "B X": 0,
    "B Y": 3,
    "B Z": 6,
    "C X": 6,
    "C Y": 0,
    "C Z": 3,
  };
  return input
    .split("\n")
    .map((row) => {
      const [_, response] = row.split(" ");

      const score = outcomes[row] + responseScores[response];
      return score;
    })
    .filter((score) => Number.isInteger(score))
    .reduce((acc, score) => acc + score, 0);
};

const part2 = (input) => {
  const responseScores = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
  };

  const outcomes = {
    "A X": 0 + responseScores["SCISSORS"],
    "A Y": 3 + responseScores["ROCK"],
    "A Z": 6 + responseScores["PAPER"],
    "B X": 0 + responseScores["ROCK"],
    "B Y": 3 + responseScores["PAPER"],
    "B Z": 6 + responseScores["SCISSORS"],
    "C X": 0 + responseScores["PAPER"],
    "C Y": 3 + responseScores["SCISSORS"],
    "C Z": 6 + responseScores["ROCK"],
  };
  return input
    .split("\n")
    .map((row) => {
      const score = outcomes[row];
      return score;
    })
    .filter((score) => Number.isInteger(score))
    .reduce((acc, score) => acc + score, 0);
};

module.exports = {
  part1result: part1(string),
  part2result: part2(string),
  part1,
  part2,
};
