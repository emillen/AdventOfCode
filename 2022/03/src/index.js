const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const charToScore = (char) => {
  if (char.toUpperCase() === char) {
    return char.charCodeAt(0) - 38;
  }
  return char.charCodeAt(0) - 96;
};

const part1 = (input) => {
  const lines = input.split("\n");
  const letters = lines
    .map((line) => {
      const chars = line.split("");
      const middleIndex = Math.floor(chars.length / 2);
      const firstHalf = chars.slice(0, middleIndex);
      const secondHalf = chars.slice(-middleIndex);

      return secondHalf.filter((char) => firstHalf.includes(char))[0];
    })
    .filter((letter) => letter);
  const scores = letters.map((letter) => charToScore(letter));
  return scores.reduce((acc, score) => acc + score, 0);
};

const splitIntoChunksOfThree = (array) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += 3) {
    chunks.push(array.slice(i, i + 3));
  }
  return chunks;
};

const part2 = (input) => {
  const lines = input.split("\n").filter((line) => line);
  const groups = splitIntoChunksOfThree(lines);

  const appearsInAllThree = groups.map((group) => {
    const first = group[0].split("");
    const second = group[1].split("");
    const third = group[2].split("");

    return first.filter(
      (char) => second.includes(char) && third.includes(char)
    )[0];
  });
  return appearsInAllThree.reduce((acc, char) => acc + charToScore(char), 0);
};

module.exports = {
  part1result: part1(string),
  part2result: part2(string),
  part1,
  part2,
};
