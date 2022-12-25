const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const decimalToSnafu = (decimal) => {
  const snafuNums = ["=", "-", "0", "1", "2"];

  let divided = Math.floor((decimal + 2) / 5);
  let remainder = (decimal + 2) % 5;
  let result = snafuNums[remainder];

  while (divided > 0) {
    remainder = (divided + 2) % 5;
    divided = Math.floor((divided + 2) / 5);
    result = snafuNums[remainder] + result;
  }
  return result;
};

const snafuToDecimal = (snafu) => {
  const translations = {
    0: "0",
    1: "1",
    2: "2",
    "-": "-1",
    "=": "-2",
  };

  const decimals = snafu
    .split("")
    .map((c) => translations[c])
    .reverse();

  const values = decimals.map((d, i) => d * 5 ** i);

  return values.reduce((a, b) => a + b, 0);
};

const part1 = (input) => {
  /* lets go */
  const snafuNumbers = input.trim().split("\n");
  const decimalNumbers = snafuNumbers.map(snafuToDecimal);

  const sum = decimalNumbers.reduce((a, b) => a + b, 0);
  return decimalToSnafu(sum);
};

const part2 = (input) => {
  /* lets go */
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
  snafuToDecimal,
  decimalToSnafu,
};
