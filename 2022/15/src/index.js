const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const parseReadings = (input) => {
  const lines = input.trim().split("\n").filter(Boolean);

  const readings = lines.map((line) => {
    const [sensorPart, beaconPart] = line.split(":");
    const [x, y] = sensorPart.match(/-?\d+/g).map(Number);
    const [beaconX, beaconY] = beaconPart.match(/-?\d+/g).map(Number);
    return { sensor: { x, y }, beacon: { x: beaconX, y: beaconY } };
  });
  return readings;
};

const manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const part1 = (input, rowToTest) => {
  const readings = parseReadings(input);

  const allX = readings
    .map(({ sensor, beacon }) => [sensor.x, beacon.x])
    .flat();

  const minX = Math.min(...allX);

  const maxX = Math.max(...allX);

  let count = 0;

  for (let x = minX; x <= maxX; x++) {
    for (const { sensor, beacon } of readings) {
      if (x === beacon.x && rowToTest === beacon.y) continue;

      const currentPosition = { x, y: rowToTest };
      const sensorRange = manhattanDistance(sensor, beacon);
      const distanceToSensor = manhattanDistance(sensor, currentPosition);

      const posIsInRange = distanceToSensor <= sensorRange;

      if (posIsInRange) {
        count++;
        break;
      }
    }
  }

  return count;
};

const part2 = (input, max) => {
  const readings = parseReadings(input);

  let current = { x: 0, y: 0 };

  while (current.y <= max && current.x <= max) {
    const { sensor, beacon } =
      readings.find(({ sensor, beacon }) => {
        const sensorRange = manhattanDistance(sensor, beacon);
        const distanceToSensor = manhattanDistance(current, sensor);
        const isInRange = distanceToSensor <= sensorRange;
        return isInRange;
      }) || {};

    if (!sensor) {
      return current.x * 4000000 + current.y;
    }

    const sensorRange = manhattanDistance(sensor, beacon);
    const distanceToSensor = manhattanDistance(sensor, current);
    const skippedSteps = sensorRange - distanceToSensor + 1;

    const nextX = current.x + skippedSteps;

    current = {
      x: nextX > max ? 0 : nextX,
      y: nextX > max ? current.y + 1 : current.y,
    };
  }
};

module.exports = {
  part1result: () => part1(string, 2000000),
  part2result: () => part2(string, 4000000),
  part1,
  part2,
};
