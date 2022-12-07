const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const cmd = (line, { dirSizes, dirStack }) => {
  const [_, cmd, arg] = line.split(" ");
  if (cmd === "cd")
    switch (arg) {
      case "/":
        return { dirSizes, dirStack: ["/"] };
      case "..":
        const [_, ...newDirStack] = dirStack;
        return { dirSizes, dirStack: [...newDirStack] };
      default:
        return { dirSizes, dirStack: [arg, ...dirStack] };
    }
  return { dirSizes, dirStack };
};

const cmdOutput = (line, { dirStack, dirSizes }) => {
  const [first, _] = line.split(" ");

  if (!isNaN(parseInt(first))) {
    const dirSizeChanges = [...dirStack]
      .reverse()
      .reduce((acc, _, index, self) => {
        const dirName = self.slice(0, index + 1).join("/");
        const currentValue = dirSizes[dirName] || 0;
        return { ...acc, [dirName]: currentValue + parseInt(first) };
      }, {});
    return { dirStack, dirSizes: { ...dirSizes, ...dirSizeChanges } };
  }
  return { dirStack, dirSizes };
};

const getDirSizes = (input) => {
  const lines = input.split("\n").filter((row) => row);

  const { dirSizes } = lines.reduce(
    (acc, line) => {
      if (line.startsWith("$")) return cmd(line, acc);
      else return cmdOutput(line, acc);
    },
    { dirStack: [], dirSizes: [] }
  );

  return dirSizes;
};

const part1 = (input) => {
  const dirSizes = getDirSizes(input);

  const sizesLessThan100k = Object.values(dirSizes).filter(
    (size) => size <= 100000
  );

  return sizesLessThan100k.reduce((acc, elem) => acc + elem, 0);
};

const part2 = (input) => {
  const dirSizes = getDirSizes(input);

  const sorted = Object.values(dirSizes).sort((a, b) => a - b);
  const total = 70000000;
  const amountUsed = sorted[sorted.length - 1];
  const amountNeeded = 30000000;

  return sorted.find((size) => total - amountUsed + size > amountNeeded);
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
