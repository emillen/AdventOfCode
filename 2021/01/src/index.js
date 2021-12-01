const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();
const measurements = string
  .split("\n")
  .map((measurement) => measurement.trim())
  .map((measurement) => Number.parseInt(measurement));

const sumsOfSlidingWindows = (data) => {
  let results = [];
  for (let window = 0; window < data.length - 2; window += 1) {
    const sumOfWindow = data[window] + data[window + 1] + data[window + 2];
    results = [...results, sumOfWindow];
  }

  return results;
};

const countIncreases = (data) => {
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) count++;
  }

  return count;
};

module.exports = { countIncreases, sumsOfSlidingWindows, measurements };
