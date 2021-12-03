const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();
const data = string.split("\n").map((row) => row.trim());

const calculate = (data) => {
  let gamma = "";
  let epsilon = "";

  for (let x = 0; x < data[0].length; x++) {
    let oneCount = 0;
    let zeroCount = 0;

    for (let y = 0; y < data.length; y++) {
      if (data[y][x] === "1") {
        oneCount++;
        continue;
      }
      if (data[y][x] === "0") {
        zeroCount++;
        continue;
      }
    }

    if (oneCount > zeroCount) {
      gamma += "1";
      epsilon += "0";
    } else {
      epsilon += "1";
      gamma += "0";
    }
  }

  return {
    gamma: Number.parseInt(gamma, 2),
    epsilon: Number.parseInt(epsilon, 2),
  };
};

const seperateRows = ({ data, pos }) => {
  const rowsWithOnes = data.filter((elem) => elem[pos] === "1");
  const rowsWithZeroes = data.filter((elem) => elem[pos] === "0");

  return { rowsWithOnes, rowsWithZeroes };
};

const oxygenRating = (data) => {
  let result = [...data];

  for (let bit = 0; bit <= result[0].length; bit++) {
    if (result.length <= 1) break;

    const { rowsWithOnes, rowsWithZeroes } = seperateRows({
      data: result,
      pos: bit,
    });

    if (rowsWithOnes.length >= rowsWithZeroes.length) {
      result = rowsWithOnes;
    } else {
      result = rowsWithZeroes;
    }
  }

  return Number.parseInt(result[0], 2);
};

const c02ScrubberRating = (data) => {
  let result = [...data];

  for (let bit = 0; bit <= result[0].length; bit++) {
    if (result.length <= 1) break;

    const { rowsWithOnes, rowsWithZeroes } = seperateRows({
      data: result,
      pos: bit,
    });

    if (rowsWithOnes.length >= rowsWithZeroes.length) {
      result = rowsWithZeroes;
    } else {
      result = rowsWithOnes;
    }
  }

  return Number.parseInt(result[0], 2);
};

module.exports = {
  data,
  calculate,
  oxygenRating,
  c02ScrubberRating,
};
