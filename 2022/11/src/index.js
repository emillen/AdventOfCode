const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const getMonkeys = (input) => {
  const monkeys = input
    .trim()
    .split("\n\n")
    .map((monkey) => {
      return monkey.split("\n").reduce((acc, line, index, self) => {
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
              operation: (n) => {
                switch (op) {
                  case "*":
                    return n * (argIsNum ? parseInt(arg) : n);
                  case "+":
                    return n + (argIsNum ? parseInt(arg) : n);
                }
              },
            };
          case 3:
            const [disibleBy] = line.split(" ").reverse();
            return { ...acc, divisibleBy: parseInt(disibleBy) };
          case 4:
            const lineAfter = self[index + 1];

            const [throwToIfTrue] = line.split(" ").reverse();
            const [throwToIfFalse] = lineAfter.split(" ").reverse();

            const parsedThrowToIfTrue = parseInt(throwToIfTrue);
            const parsedThrowToIfFalse = parseInt(throwToIfFalse);

            return {
              ...acc,
              getMonkeyToThrowTo: (n) => {
                if (n % acc.divisibleBy === 0) {
                  return parsedThrowToIfTrue;
                }

                return parsedThrowToIfFalse;
              },
            };
          default:
            return acc;
        }
      }, {});
    });

  return monkeys;
};

const doMonkeyBusiness = ({ monkeys, withRelief = false, rounds }) => {
  const monkeyBusiness = Array(20).fill(0);

  const divisor = monkeys.reduce((acc, monkey) => {
    return acc * monkey.divisibleBy;
  }, 1);

  for (let round = 0; round < rounds; round++) {
    for (const monkey of monkeys) {
      for (
        let worryLevel = monkey.items.pop();
        worryLevel !== undefined;
        worryLevel = monkey.items.pop()
      ) {
        monkeyBusiness[monkey.id] = monkeyBusiness[monkey.id] + 1;

        worryLevel = monkey.operation(worryLevel);

        worryLevel = withRelief ? Math.floor(worryLevel / 3) : worryLevel;

        const monkeyToThrowTo = monkey.getMonkeyToThrowTo(worryLevel);

        monkeys[monkeyToThrowTo].items.push(worryLevel % divisor);
      }
    }
  }

  return monkeyBusiness
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, elem) => acc * elem, 1);
};

const part1 = (input) => {
  const monkeys = getMonkeys(input);

  return doMonkeyBusiness({ monkeys, withRelief: true, rounds: 20 });
};
const part2 = (input) => {
  const monkeys = getMonkeys(input);

  return doMonkeyBusiness({ monkeys, rounds: 10000 });
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
