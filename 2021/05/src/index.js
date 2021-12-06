const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();
const data = string.split("\n").map((row) => {
  const [left, right] = row.split(" -> ");
  const [x1, y1] = left.split(",");
  const [x2, y2] = right.split(",");

  return {
    x1: Number.parseInt(x1),
    y1: Number.parseInt(y1),
    x2: Number.parseInt(x2),
    y2: Number.parseInt(y2),
  };
});

const numbersBetween = (a, b) => {
  const [big, small] = a >= b ? [a, b] : [b, a];

  const nums = [];
  for (let i = small; i <= big; i++) nums.push(i);

  return a >= b ? nums.reverse() : nums;
};

const overlappingPoints = (data) => {
  const horizontalAndVertical = data.filter(
    (line) => line.x1 === line.x2 || line.y1 === line.y2
  );

  const map = {};

  horizontalAndVertical.forEach((line) => {
    const horizontalPoints = numbersBetween(line.x1, line.x2);
    const verticalPoints = numbersBetween(line.y1, line.y2);

    for (let verticalPoint of verticalPoints) {
      for (horizontalPoint of horizontalPoints) {
        map[`${horizontalPoint}:${verticalPoint}`] = map[
          `${horizontalPoint}:${verticalPoint}`
        ]
          ? map[`${horizontalPoint}:${verticalPoint}`] + 1
          : 1;
      }
    }
  });

  return Object.keys(map).filter((key) => map[key] >= 2).length;
};

const overlappingPoints2 = (data) => {
  const horizontalAndVertical = data.filter(
    (line) => line.x1 === line.x2 || line.y1 === line.y2
  );

  const diagonal = data.filter(
    (line) =>
      numbersBetween(line.x1, line.x2).length ===
      numbersBetween(line.y1, line.y2).length
  );
  const map = {};

  horizontalAndVertical.forEach((line) => {
    const horizontalPoints = numbersBetween(line.x1, line.x2);
    const verticalPoints = numbersBetween(line.y1, line.y2);

    for (let verticalPoint of verticalPoints) {
      for (horizontalPoint of horizontalPoints) {
        map[`${horizontalPoint}:${verticalPoint}`] = map[
          `${horizontalPoint}:${verticalPoint}`
        ]
          ? map[`${horizontalPoint}:${verticalPoint}`] + 1
          : 1;
      }
    }
  });

  diagonal.forEach((line) => {
    const horizontalPoints = numbersBetween(line.x1, line.x2);
    const verticalPoints = numbersBetween(line.y1, line.y2);

    for (let i = 0; i < horizontalPoints.length; i++) {
      map[`${horizontalPoints[i]}:${verticalPoints[i]}`] = map[
        `${horizontalPoints[i]}:${verticalPoints[i]}`
      ]
        ? map[`${horizontalPoints[i]}:${verticalPoints[i]}`] + 1
        : 1;
    }
  });

  return Object.keys(map).filter((key) => map[key] >= 2).length;
};

module.exports = { data, overlappingPoints, overlappingPoints2 };
