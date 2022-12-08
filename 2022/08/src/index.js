const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const isEdge = (grid, x, y) => {
  return (
    x === 0 || y === 0 || x === grid[0].length - 1 || y === grid.length - 1
  );
};

const part1 = (input) => {
  const rows = input.split("\n");
  const grid = rows
    .map((row) => row.split("").map((num) => parseInt(num)))
    .filter((row) => row.length > 0);

  const amountVisible = grid.reduce((acc, row, y) => {
    return (
      acc +
      row.reduce((acc, num, x) => {
        if (isEdge(grid, x, y)) return acc + 1;

        const col = grid.map((row) => row[x]);

        const visibleToRight = row.slice(x + 1).every((n) => num > n);
        const visibleToLeft = row.slice(0, x).every((n) => num > n);
        const visibleBelow = col.slice(y + 1).every((n) => num > n);
        const visibleAbove = col.slice(0, y).every((n) => num > n);

        if (visibleToRight || visibleToLeft || visibleBelow || visibleAbove) {
          return acc + 1;
        }

        return acc;
      }, 0)
    );
  }, 0);

  return amountVisible;
};
const part2 = (input) => {
  const rows = input.split("\n");
  const grid = rows
    .map((row) => row.split("").map((num) => parseInt(num)))
    .filter((row) => row.length > 0);

  const scores = grid.map((row, y) => {
    return row.map((num, x) => {
      if (isEdge(grid, x, y)) return 0;

      const col = grid.map((row) => row[x]);

      const rightOfNum = row.slice(x + 1);
      const leftOfNum = row.slice(0, x);
      const belowNum = col.slice(y + 1);
      const aboveNum = col.slice(0, y);

      const rightIndex = rightOfNum.findIndex((n) => num <= n);
      const leftIndex = leftOfNum.reverse().findIndex((n) => num <= n);
      const belowIndex = belowNum.findIndex((n) => num <= n);
      const aboveIndex = aboveNum.reverse().findIndex((n) => num <= n);

      const rightScore = rightIndex === -1 ? rightOfNum.length : rightIndex + 1;
      const leftScore = leftIndex === -1 ? leftOfNum.length : leftIndex + 1;
      const belowScore = belowIndex === -1 ? belowNum.length : belowIndex + 1;
      const aboveScore = aboveIndex === -1 ? aboveNum.length : aboveIndex + 1;

      return rightScore * leftScore * belowScore * aboveScore;
    });
  });

  return scores.flat().reduce((acc, score) => (score > acc ? score : acc), 0);
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
