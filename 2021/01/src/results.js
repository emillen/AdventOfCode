const { measurements, countIncreases, sumsOfSlidingWindows } = require(".");

console.log(`Part 1: ${countIncreases(measurements)}`);
console.log(`Part 2: ${countIncreases(sumsOfSlidingWindows(measurements))}`);
