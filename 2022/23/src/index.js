const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const getElvesPositions = (chars) => {
  const listOfElvesPositions = chars
    .map((line, y) => line.map((char, x) => (char === "#" ? { x, y } : null)))
    .flat()
    .filter((x) => x);
  return listOfElvesPositions;
};
const northCheck = (directions, position) => {
  if (
    directions.includes("N") &&
    directions.includes("NE") &&
    directions.includes("NW")
  )
    return {
      originalPosition: position,
      x: position.x,
      y: position.y - 1,
      direction: "N",
    };
};
const southCheck = (directions, position) => {
  if (
    directions.includes("S") &&
    directions.includes("SE") &&
    directions.includes("SW")
  )
    return {
      originalPosition: position,
      x: position.x,
      y: position.y + 1,
      direction: "S",
    };
};
const westCheck = (directions, position) => {
  if (
    directions.includes("W") &&
    directions.includes("NW") &&
    directions.includes("SW")
  )
    return {
      originalPosition: position,
      x: position.x - 1,
      y: position.y,
      direction: "W",
    };
};

const eastCheck = (directions, position) => {
  if (
    directions.includes("E") &&
    directions.includes("NE") &&
    directions.includes("SE")
  )
    return {
      originalPosition: position,
      x: position.x + 1,
      y: position.y,
      direction: "E",
    };
};

const createProposePositions = () => {
  const checks = [northCheck, southCheck, westCheck, eastCheck];

  return (map) => {
    const elvesPositions = getElvesPositions(map);

    const emptyADjecent = elvesPositions.map((position) => {
      const { x, y } = position;
      const adjacentPositions = [
        { x: x - 1, y, direction: "W" },
        { x: x + 1, y, direction: "E" },
        { x, y: y - 1, direction: "N" },
        { x, y: y + 1, direction: "S" },
        { x: x - 1, y: y - 1, direction: "NW" },
        { x: x + 1, y: y - 1, direction: "NE" },
        { x: x - 1, y: y + 1, direction: "SW" },
        { x: x + 1, y: y + 1, direction: "SE" },
      ];
      const adjacentPositionsFree = adjacentPositions.filter(
        (position) =>
          !map[position.y] ||
          !map[position.y][position.x] ||
          map[position.y][position.x] === "."
      );
      return adjacentPositionsFree;
    });

    const proposedPositions = elvesPositions.map((position, index) => {
      const adjecents = emptyADjecent[index];

      if (adjecents.length === 8) {
        return position;
      }

      const directions = adjecents.map((a) => a.direction);

      const proposedPosition = checks
        .map((check) => check(directions, position))
        .find(Boolean) || { ...position, originalPosition: position };

      return proposedPosition;
    });

    // change the order of the check
    checks.push(checks.shift());
    return proposedPositions;
  };
};

const createSimulateRound = () => {
  const proposePositions = createProposePositions();

  return (map) => {
    const proposedPositions = proposePositions(map);
    const withoutDuplicates = proposedPositions.map((position) => {
      const firstIndex = proposedPositions.findIndex(
        (p) => p.x === position.x && p.y === position.y
      );
      const lastIndex =
        Math.abs(
          [...proposedPositions]
            .reverse()
            .findIndex((p) => p.x === position.x && p.y === position.y) -
            proposedPositions.length
        ) - 1;

      if (firstIndex !== lastIndex) {
        return position.originalPosition;
      }
      return position;
    });

    const smallestX = Math.min(
      ...withoutDuplicates.filter(Boolean).map((p) => p.x)
    );
    const smallestY = Math.min(
      ...withoutDuplicates.filter(Boolean).map((p) => p.y)
    );

    const moveToPositive = withoutDuplicates.map((position) => {
      const newPos = { ...position };
      if (smallestX < 0) {
        newPos.x = position.x + Math.abs(smallestX);
      }
      if (smallestY < 0) {
        newPos.y = position.y + Math.abs(smallestY);
      }
      return newPos;
    });

    const maxX = Math.max(...moveToPositive.filter(Boolean).map((p) => p.x));
    const maxY = Math.max(...moveToPositive.filter(Boolean).map((p) => p.y));

    const newMap = Array.from({ length: maxY + 1 }, () => {
      return Array.from({ length: maxX + 1 }, () => ".");
    });

    moveToPositive.forEach((position) => {
      newMap[position.y][position.x] = "#";
    });

    return newMap;
  };
};

const part1 = (input) => {
  /* lets go */
  const simulateRound = createSimulateRound();
  const lines = input.slice().trim().split("\n");
  const map = lines.map((line) => line.split(""));

  let mapAfterChange = [...map];

  for (let x = 0; x < 10; x++) {
    mapAfterChange = simulateRound([...mapAfterChange]);
  }

  const allIndexesOfHash = getElvesPositions(mapAfterChange);

  const smallestX = Math.min(...allIndexesOfHash.map((p) => p.x));
  const smallestY = Math.min(...allIndexesOfHash.map((p) => p.y));
  const biggestX = Math.max(...allIndexesOfHash.map((p) => p.x));
  const biggestY = Math.max(...allIndexesOfHash.map((p) => p.y));

  let dotCount = 0;
  for (let y = smallestY; y <= biggestY; y++) {
    for (let x = smallestX; x <= biggestX; x++) {
      const char = mapAfterChange[y][x];
      if (char === ".") {
        dotCount++;
      }
    }
  }

  return dotCount;
};

const part2 = (input) => {
  /* lets go */
  const simulateRound = createSimulateRound();
  const lines = input.trim().split("\n");
  const map = lines.map((line) => line.split(""));

  let mapAfterChange = [...map];

  for (let i = 0; i < 10000; i++) {
    let newMap = simulateRound([...mapAfterChange]);

    let newMapString = newMap.map((line) => line.join("")).join("\n");
    let oldMapString = mapAfterChange.map((line) => line.join("")).join("\n");

    if (newMapString === oldMapString) {
      return i + 1;
    }
    mapAfterChange = newMap;
  }
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
