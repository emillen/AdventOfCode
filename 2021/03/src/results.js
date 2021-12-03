const { data, calculate, c02ScrubberRating, oxygenRating } = require(".");

const p1 = calculate(data);
console.log(`Part 1: ${p1.gamma * p1.epsilon}`);
console.log(`Part 2: ${c02ScrubberRating(data) * oxygenRating(data)}`);
