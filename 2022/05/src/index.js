const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const parseCrates = (cratesString) => {
  const crateLines = cratesString
    .split("\n")
    .reverse()
    .filter((line) => line);

  crateLines.shift();

  const matrix = crateLines.map((line) => {
    return line.match(/((\[|\]|\w){3}|\s{3})(\s|$)/g).map((match) => {
      return match.replace(/(\[|\]|\s)/g, "");
    });
  });

  let [row] = matrix;
  const stacks = row.map((_, column) => matrix.map((row) => row[column]));

  return stacks.map((stack) => stack.filter((crate) => crate));
};

const parseProcedure = (procedure) => {
  return procedure
    .split("\n")
    .filter((line) => line)
    .map((line) => {
      const match = line.match(/(\d+)/g);
      if (match) {
        const [amount, from, to] = match.map((num) => Number.parseInt(num));
        return { amount, from, to };
      } else return null;
    })
    .filter((line) => line);
};

const part1 = (input) => {
  const [cratesString, procedure] = input.split("\n\n");

  const stacks = parseCrates(cratesString);
  const procedureSteps = parseProcedure(procedure);

  procedureSteps.forEach((step) => {
    const { amount, from, to } = step;

    for (let i = 0; i < amount; i++) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  });

  return stacks.reduce((acc, stack) => {
    return acc + stack.pop();
  }, "");
};

const part2 = (input) => {
  const [cratesString, procedure] = input.split("\n\n");

  const stacks = parseCrates(cratesString);
  const procedureSteps = parseProcedure(procedure);

  procedureSteps.forEach((step) => {
    const { amount, from, to } = step;

    stacks[to - 1].push(...stacks[from - 1].splice(-amount));
  });

  return stacks.reduce((acc, stack) => {
    return acc + stack.pop();
  }, "");
};

module.exports = {
  part1result: part1(string),
  part2result: part2(string),
  part1,
  part2,
};
