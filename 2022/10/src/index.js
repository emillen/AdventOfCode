const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const doCycles = (instructions) => {
  const cycles = instructions.reduce(
    (acc, instruction) => {
      const { operation, arg } = instruction;
      const lastCycle = acc[acc.length - 1];
      const noopCycle = { x: lastCycle.x, cycles: lastCycle.cycles + 1 };

      switch (operation) {
        case "noop":
          return [...acc, noopCycle];
        case "addx":
          return [
            ...acc,
            noopCycle,
            {
              x: lastCycle.x + arg,
              cycles: lastCycle.cycles + 2,
              operation,
              arg,
            },
          ];
      }
    },
    [{ x: 1, cycles: 0 }]
  );

  return cycles;
};

const part1 = (input) => {
  const instructions = input
    .trim()
    .split("\n")
    .map((line) => {
      const [operation, arg] = line.split(" ");
      return {
        operation,
        arg: operation === "noop" ? null : parseInt(arg),
      };
    })
    .filter((instruction) => instruction.operation);

  const cycles = doCycles(instructions);

  const result = [20, 60, 100, 140, 180, 220].reduce((acc, cycle) => {
    // because addx operations set x 'after' the cycle, not during
    const currentCycle =
      cycles[cycle].operation === "addx" ? cycles[cycle - 1] : cycles[cycle];

    return acc + currentCycle.x * cycle;
  }, 0);
  return result;
};

const crtString = (input) => {
  const instructions = input
    .trim()
    .split("\n")
    .map((line) => {
      const [operation, arg] = line.split(" ");
      return {
        operation,
        arg: operation === "noop" ? null : parseInt(arg),
      };
    })
    .filter((instruction) => instruction.operation);

  const cycles = doCycles(instructions);

  cycles.shift();

  return cycles.reduce((acc, cycle, index) => {
    // because addx operations set x 'after' the cycle, not during
    const positionOfSprite =
      cycle.operation === "addx" ? cycles[index - 1].x : cycle.x;

    const positionBeingDrawn = index % 40;

    const isCoveredBySprite =
      positionBeingDrawn >= positionOfSprite - 1 &&
      positionBeingDrawn <= positionOfSprite + 1;

    if (isCoveredBySprite) {
      return acc + "#";
    } else {
      return acc + ".";
    }
  }, "");
};

function chunkString(str, length) {
  return str.match(new RegExp(".{1," + length + "}", "g"));
}

const part2 = (input) => {
  const string = crtString(input);

  const chunks = chunkString(string, 40);

  return `
${chunks.join("\n")}
`;
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  doCycles,
  crtString,
  part1,
  part2,
};
