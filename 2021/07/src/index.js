const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();
const data = string
  .trim()
  .split(",")
  .map((pos) => Number.parseInt(pos));

const leastAmountOfFuelCost1 = (data) => {
  const sorted = data.sort((a, b) => a - b);
  const mean = sorted[sorted.length / 2];
  return data.reduce((acc, elem) => acc + Math.abs(mean - elem), 0);
};

const leastAmountOfFuelCost2 = (data) => {
  const avarage = data.reduce((acc, elem) => acc + elem, 0) / data.length;

  const calcCost = (avarage) =>
    data.reduce((acc, elem) => {
      return (
        acc +
        Array(Math.abs(avarage - elem))
          .fill(0)
          .reduce((totalFuel, _, index) => totalFuel + (index + 1), 0)
      );
    }, 0);

  const ceiled = calcCost(Math.ceil(avarage));
  const floored = calcCost(Math.floor(avarage));

  return ceiled < floored ? ceiled : floored;
};

module.exports = { data, leastAmountOfFuelCost1, leastAmountOfFuelCost2 };
