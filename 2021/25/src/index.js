const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const getLeft = (matrix, x, y) => {
  const col = x <= 0 ? matrix[y].length - 1 : x - 1;
  return { val: matrix[y][col], x: col, y };
};

const getUp = (matrix, x, y) => {
  const row = y <= 0 ? matrix.length - 1 : y - 1;
  return { val: matrix[row][x], x, y: row };
};

const deepEqualMatrix = (matrix1, matrix2) => {
  return matrix1.every((row, y) => {
    return row.every((item, x) => {
      return item === matrix2[y][x];
    });
  });
};

const deepCopy = (arr) => {
  return [...arr.map((row) => [...row])];
};

const moveCucumbers = (matrix) => {
  const afterMovingEast = deepCopy(matrix);

  matrix.forEach((row, y) => {
    row.forEach((item, x) => {
      const left = getLeft(matrix, x, y);
      if (item === ".")
        if (left.val === ">") {
          afterMovingEast[y][x] = ">";
          afterMovingEast[left.y][left.x] = ".";
        }
    });
  });

  const afterMovingSouth = deepCopy(afterMovingEast);

  afterMovingEast.forEach((row, y) => {
    row.forEach((item, x) => {
      const up = getUp(afterMovingEast, x, y);
      if (item === ".")
        if (up.val === "v") {
          afterMovingSouth[y][x] = "v";
          afterMovingSouth[up.y][up.x] = ".";
        }
    });
  });

  return afterMovingSouth;
};

const part1 = (input) => {
  let matrix = input
    .split("\n")
    .filter((line) => line)
    .map((line) => line.split("").filter((char) => char));

  let newMatrix = deepCopy(matrix);
  let times = 0;

  do {
    matrix = newMatrix;
    newMatrix = moveCucumbers(matrix);

    times++;
  } while (!deepEqualMatrix(matrix, newMatrix));

  return times;
};

const part2 = (input) => {};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
