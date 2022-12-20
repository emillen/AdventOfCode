const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const getAdjecent = (grid, x, y, z) => {
  const up = grid[x]?.[y - 1]?.[z];
  const down = grid[x]?.[y + 1]?.[z];
  const left = grid[x - 1]?.[y]?.[z];
  const right = grid[x + 1]?.[y]?.[z];
  const front = grid[x]?.[y]?.[z - 1];
  const back = grid[x]?.[y]?.[z + 1];

  return [up, down, left, right, front, back].filter(Boolean);
};

const getAdjecentCoordinates = (grid, x, y, z) => {
  const left = x > 0 ? [x - 1, y, z] : null;
  const right = x < grid.length - 1 ? [x + 1, y, z] : null;
  const up = y > 0 ? [x, y - 1, z] : null;
  const down = y < grid[x].length - 1 ? [x, y + 1, z] : null;
  const front = z > 0 ? [x, y, z - 1] : null;
  const back = z < grid[x][y].length - 1 ? [x, y, z + 1] : null;

  return [up, down, left, right, front, back].filter((elem) => elem !== null);
};

const generateGrid = (readings, fill) => {
  const allX = readings.map(({ x }) => x);
  const allY = readings.map(({ y }) => y);
  const allZ = readings.map(({ z }) => z);

  // make it a bit bigger to ensure flood fill works
  const maxX = Math.max(...allX) + 1;
  const maxY = Math.max(...allY) + 1;
  const maxZ = Math.max(...allZ) + 1;

  const grid = Array.from({ length: maxX + 1 }, () =>
    Array.from({ length: maxY + 1 }, () =>
      Array.from({ length: maxZ + 1 }, () => fill)
    )
  );

  return grid;
};

const parseReadings = (input) => {
  const readings = input
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [x, y, z] = line.split(",").map((num) => parseInt(num));
      return { x, y, z };
    });
  return readings;
};

const part1 = (input) => {
  const readings = parseReadings(input);
  const grid = generateGrid(readings, false);

  for (const { x, y, z } of readings) {
    grid[x][y][z] = true;
  }

  let sidesExposed = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      for (let z = 0; z < grid[x][y].length; z++) {
        if (grid[x][y][z]) {
          const adjecent = getAdjecent(grid, x, y, z);
          const adjecentCount = adjecent.filter(Boolean).length;

          sidesExposed += 6 - adjecentCount;
        }
      }
    }
  }

  return sidesExposed;
};
const part2 = (input) => {
  const [LAVA, WATER, AIR] = ["LAVA", "WATER", "AIR"];

  const readings = parseReadings(input);
  const grid = generateGrid(readings, AIR);

  for (const { x, y, z } of readings) {
    grid[x][y][z] = LAVA;
  }

  const queue = [{ x: 0, y: 0, z: 0 }];

  while (queue.length) {
    const { x, y, z } = queue.shift();
    if (grid[x][y][z] === LAVA || grid[x][y][z] === WATER) {
      continue;
    }
    if (grid[x][y][z] === AIR) {
      grid[x][y][z] = WATER;
    }
    const adjecents = getAdjecentCoordinates(grid, x, y, z);
    for (const adjecentCoord of adjecents) {
      const [adjecentX, adjecentY, adjecentZ] = adjecentCoord;
      queue.push({ x: adjecentX, y: adjecentY, z: adjecentZ });
    }
  }

  let surface = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      for (let z = 0; z < grid[x][y].length; z++) {
        if (grid[x][y][z] === LAVA) {
          const adjecent = getAdjecent(grid, x, y, z);
          const adjecentCount = adjecent.filter(
            (elem) => elem === AIR || elem === LAVA
          ).length;

          surface += 6 - adjecentCount;
        }
      }
    }
  }

  return surface;
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
