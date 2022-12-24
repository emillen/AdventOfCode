const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();
const [LEFT_WIND, RIGHT_WIND, UP_WIND, DOWN_WIND, WALL, EMPTY] = [
  "<",
  ">",
  "^",
  "v",
  "#",
  ".",
];

const parse = (input) => {
  const mapOfStrings = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const map = mapOfStrings.map((row) => row.map((cell) => [cell]));

  const upperNonWall = {
    y: 0,
    x: mapOfStrings[0].findIndex((c) => c !== WALL),
  };
  const lowerNonWall = {
    y: mapOfStrings.length - 1,
    x: mapOfStrings[mapOfStrings.length - 1].findIndex((c) => c !== WALL),
  };

  return { map, entrance: { ...upperNonWall }, exit: { ...lowerNonWall } };
};

const addToCell = (cell, c) => {
  let newCell = [...cell, c];

  if (newCell.length > 1) {
    newCell = newCell.filter((c) => c !== EMPTY);
  }

  return newCell;
};

const moveWinds = (map) => {
  const height = map.length;
  const width = map[0].length;

  const newMap = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => [EMPTY])
  );

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      cell.forEach((c) => {
        const leftIndex = x - 1 > 0 ? x - 1 : width - 2;
        const rightIndex = x + 1 < width - 1 ? x + 1 : 1;
        const upIndex = y - 1 > 0 ? y - 1 : height - 2;
        const downIndex = y + 1 < height - 1 ? y + 1 : 1;

        switch (c) {
          case LEFT_WIND:
            newMap[y][leftIndex] = addToCell(newMap[y][leftIndex], c);
            break;
          case RIGHT_WIND:
            newMap[y][rightIndex] = addToCell(newMap[y][rightIndex], c);
            break;

          case UP_WIND:
            newMap[upIndex][x] = addToCell(newMap[upIndex][x], c);
            break;

          case DOWN_WIND:
            newMap[downIndex][x] = addToCell(newMap[downIndex][x], c);
            break;
          case WALL:
            newMap[y][x] = [WALL];
        }
      });
    });
  });

  return newMap;
};

const getPossibleSteps = (map, { x, y }) => {
  const possibleSteps = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
    { x, y },
  ]
    .filter(
      ({ x, y }) => x > 0 && x < map[0].length - 1 && y >= 0 && y < map.length
    )
    .filter(({ x, y }) => map[y][x].includes(EMPTY));

  return possibleSteps;
};

const moveMapRounds = (map, rounds) => {
  let newMap = [...map];
  for (let i = 0; i < rounds; i++) {
    newMap = moveWinds(newMap);
  }

  return newMap;
};

const fastestTime = (entrance, exit, map) => {
  /* lets go */

  const currentPos = { ...entrance };

  const queue = [{ ...currentPos, minute: 0 }];

  const visited = new Set();
  const minuteCache = [map];

  const getMap = (minute) => {
    if (minuteCache[minute]) return minuteCache[minute];

    const newMap = moveWinds(getMap(minute - 1));
    minuteCache[minute] = newMap;
    return newMap;
  };

  while (queue.length) {
    const { x, y, minute } = queue.shift();

    if (visited.has(JSON.stringify({ x, y, minute }))) continue;
    visited.add(JSON.stringify({ x, y, minute }));

    let movedMap = getMap(minute + 1);

    const possibleSteps = getPossibleSteps(movedMap, { x, y }, entrance);

    if (x === exit.x && y === exit.y) {
      return minute;
    }

    possibleSteps.forEach((step) => {
      queue.push({ ...step, minute: minute + 1 });
    });
  }

  return -1;
};

const part1 = (input) => {
  /* lets go */

  const { entrance, exit, map } = parse(input);

  return fastestTime(entrance, exit, map);
};

const part2 = (input) => {
  /* lets go */

  const { entrance, exit, map } = parse(input);

  const thereTime = fastestTime(entrance, exit, map);
  const mapAfterThere = moveMapRounds(map, thereTime);

  const backTime = fastestTime(exit, entrance, mapAfterThere);
  const mapAfterGoingBack = moveMapRounds(map, thereTime + backTime);

  const lastTime = fastestTime(entrance, exit, mapAfterGoingBack);

  return thereTime + backTime + lastTime;
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
