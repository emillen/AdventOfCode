const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const getCaloriesPerElf = (input) => {
  const elves = input.split("\n\n").map((row) => row.trim());
  const caloriesPerElf = elves.map((elf) => {
    const calories = elf.split("\n");
    return calories.reduce((acc, calorie) => {
      const parsed = parseInt(calorie);
      return acc + parsed;
    }, 0);
  });

  return caloriesPerElf;
};

const part1 = (input) => {
  const caloriesPerElf = getCaloriesPerElf(input);
  const largestCalorie = Math.max(...caloriesPerElf);
  return largestCalorie;
};

const part2 = (input) => {
  const caloriesPerElf = getCaloriesPerElf(input);
  const decending = (a, b) => b - a;
  const caloriesSorted = caloriesPerElf.sort(decending);
  const firstThree = caloriesSorted.slice(0, 3);
  const firstThreeSum = firstThree.reduce((acc, calorie) => acc + calorie, 0);
  return firstThreeSum;
};

module.exports = {
  part1result: part1(string),
  part2result: part2(string),
  part1,
  part2,
};
