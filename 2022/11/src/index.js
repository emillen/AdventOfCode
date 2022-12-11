const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const getMonkeys = (input) => {
  const monkeys = input
    .trim()
    .split("\n\n")
    .map((monkey) => {
      return monkey.split("\n").reduce((acc, line, index) => {
        switch (index) {
          case 0:
            return { ...acc, id: line.split(" ")[1].slice(0, -1) };
          case 1:
            const [_, nums] = line.split(": ");

            return {
              ...acc,
              items: nums.split(", ").map((item) => parseInt(item)),
            };
          case 2:
            const [, calc] = line.split("= ");
            const [, op, arg] = calc.split(" ");
            const argIsNum = !isNaN(parseInt(arg));
            return {
              ...acc,
              operation: { op, arg: argIsNum ? parseInt(arg) : null },
            };
          case 3:
            const [disibleBy] = line.split(" ").reverse();
            return { ...acc, divisibleBy: parseInt(disibleBy) };
          case 4:
          case 5:
            const word = line.split(" ").filter((word) => word !== "");

            const [, when] = word;
            const [throwTo] = word.reverse();

            const capitlizeWhen =
              when[0].toUpperCase() + when.slice(1, when.length - 1);

            return {
              ...acc,
              [`when${capitlizeWhen}`]: { throwTo: parseInt(throwTo) },
            };
          default:
            return acc;
        }
      }, {});
    });

  return monkeys;
};

const getMonkeyToThrowTo = (monkey, item) => {
  if (item % monkey.divisibleBy === 0) {
    return monkey.whenTrue.throwTo;
  }

  return monkey.whenFalse.throwTo;
};

const part1 = (input) => {
  const monkeys = getMonkeys(input);
  const monkeyBusiness = Array(20).fill(0);

  for (let round = 0; round < 20; round++) {
    for (const monkey of monkeys) {
      for (
        let item = monkey.items.pop();
        item !== undefined;
        item = monkey.items.pop()
      ) {
        monkeyBusiness[monkey.id] = monkeyBusiness[monkey.id] + 1;

        let worryLevel = item;
        const arg = monkey.operation.arg ? monkey.operation.arg : worryLevel;

        switch (monkey.operation.op) {
          case "*":
            worryLevel = worryLevel * arg;
            break;
          case "+":
            worryLevel = worryLevel + arg;
            break;
        }
        worryLevel = Math.floor(worryLevel / 3);

        const monkeyToThrowTo = getMonkeyToThrowTo(monkey, worryLevel);

        monkeys[monkeyToThrowTo].items.push(worryLevel);
      }
    }
  }

  return monkeyBusiness
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, elem) => acc * elem, 1);
};
const part2 = (input) => {
  const monkeys = getMonkeys(input);
  const monkeyBusiness = Array(20).fill(0);

  const divisor = monkeys.reduce((acc, monkey) => {
    return acc * monkey.divisibleBy;
  }, 1);

  for (let round = 0; round < 10000; round++) {
    for (const monkey of monkeys) {
      for (
        let item = monkey.items.pop();
        item !== undefined;
        item = monkey.items.pop()
      ) {
        monkeyBusiness[monkey.id] = monkeyBusiness[monkey.id] + 1;

        let worryLevel = item;
        const arg = monkey.operation.arg ? monkey.operation.arg : worryLevel;

        switch (monkey.operation.op) {
          case "*":
            worryLevel = worryLevel * arg;
            break;
          case "+":
            worryLevel = worryLevel + arg;
            break;
        }
        const monkeyToThrowTo = getMonkeyToThrowTo(monkey, worryLevel);

        monkeys[monkeyToThrowTo].items.push(worryLevel % divisor);
      }
    }
  }

  return monkeyBusiness
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, elem) => acc * elem, 1);
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
