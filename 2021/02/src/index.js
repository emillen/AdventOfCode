const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();
const data = string
  .split("\n")
  .map((row) => row.trim())
  .map((row) => {
    const [cmd, amount] = row.split(" ");
    return { cmd, amount: Number.parseInt(amount) };
  });

const getPosition = (data) => {
  let horizontal = 0;
  let depth = 0;

  for (let command of data) {
    switch (command.cmd) {
      case "up":
        depth -= command.amount;
        break;
      case "down":
        depth += command.amount;
        break;
      case "forward":
        horizontal += command.amount;
        break;
    }
  }

  return { horizontal, depth };
};

const getPositionWithAim = (data) => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (let command of data) {
    switch (command.cmd) {
      case "up":
        aim -= command.amount;
        break;
      case "down":
        aim += command.amount;
        break;
      case "forward":
        horizontal += command.amount;
        depth += aim * command.amount;
        break;
    }
  }

  return { horizontal, depth };
};

module.exports = { getPosition, getPositionWithAim, data };
