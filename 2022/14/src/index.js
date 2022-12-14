const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const getGrid = (input) => {
  const lines = input.split("\n").filter((line) => line.length > 0);

  const paths = lines.map((line) =>
    line.split(" -> ").map((point) => {
      const [x, y] = point.split(",").map((n) => parseInt(n));
      return { x, y };
    })
  );

  const maxX = paths
    .flat()
    .map((p) => p.x)
    .reduce((a, b) => Math.max(a, b));

  const maxY = paths
    .flat()
    .map((p) => p.y)
    .reduce((a, b) => Math.max(a, b));

  const grid = Array.from({ length: maxY + 1 }, () =>
    Array.from({ length: maxX * 2 }, () => ".")
  );

  const drawPath = (path) => {
    const [start, end, ...rest] = path;
    if (end === undefined) return;

    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2 } = end;

    const xRange = Array.from(
      { length: Math.abs(x2 - x1) + 1 },
      (_, i) => Math.min(x1, x2) + i
    );

    const yRange = Array.from(
      { length: Math.abs(y2 - y1) + 1 },
      (_, i) => Math.min(y1, y2) + i
    );

    if (x1 === x2) {
      yRange.forEach((y) => (grid[y][x1] = "#"));
    }

    if (y1 === y2) {
      xRange.forEach((x) => (grid[y1][x] = "#"));
    }

    drawPath([end, ...rest]);
  };

  paths.forEach((path) => drawPath(path));

  return grid;
};

const nextSandPoisition = (grid) => {
  let currentPos = { x: 500, y: 0 };

  if (grid[currentPos.y][currentPos.x] === "0") return null;

  while (currentPos.y < grid.length - 1) {
    const below = grid[currentPos.y + 1][currentPos.x];
    const diagonalLeft = grid[currentPos.y + 1][currentPos.x - 1];
    const diagonalRight = grid[currentPos.y + 1][currentPos.x + 1];

    if (below === ".") {
      currentPos = { x: currentPos.x, y: currentPos.y + 1 };
      continue;
    }

    if (diagonalLeft === ".") {
      currentPos = { x: currentPos.x - 1, y: currentPos.y + 1 };
      continue;
    }

    if (diagonalRight === ".") {
      currentPos = { x: currentPos.x + 1, y: currentPos.y + 1 };
      continue;
    }

    return currentPos;
  }

  return currentPos;
};

const part1 = (input) => {
  const grid = getGrid(input);

  let rounds = 0;

  while (true) {
    const pos = nextSandPoisition(grid);

    if (pos.y > grid.length - 2) {
      return rounds;
    }

    grid[pos.y][pos.x] = "0";
    rounds++;
  }
};
const part2 = (input) => {
  const grid = getGrid(input);
  const fullLineOfDots = grid[0].map(() => ".");
  const fullLineOfHashes = grid[0].map(() => "#");
  const newGrid = [...grid, fullLineOfDots, fullLineOfHashes];

  let rounds = 0;

  while (true) {
    const pos = nextSandPoisition(newGrid);

    if (pos === null) {
      return rounds;
    }

    newGrid[pos.y][pos.x] = "0";
    rounds++;
  }
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
