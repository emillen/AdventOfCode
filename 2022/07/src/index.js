const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const part1 = (input) => {
  const lines = input.split("\n").filter((row) => row);

  let folderStack = [];
  const folderSizes = {};

  const cmd = (line) => {
    const [_, cmd, arg] = line.split(" ");
    if (cmd === "cd")
      switch (arg) {
        case "/":
          folderStack = ["/"];
          break;
        case "..":
          folderStack.pop();
          break;
        default:
          folderStack.push(arg);
          break;
      }
  };

  const cmdOutput = (line) => {
    const [first, _] = line.split(" ");

    if (!isNaN(parseInt(first))) {
      folderStack.forEach((_, index) => {
        const folderName = folderStack.slice(0, index + 1).join("/");

        const currentValue = folderSizes[folderName] || 0;
        folderSizes[folderName] = currentValue + parseInt(first);
      });
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("$")) return cmd(line);
    else return cmdOutput(line);
  });

  const sizesLessThan100k = Object.values(folderSizes).filter(
    (size) => size <= 100000
  );

  return sizesLessThan100k.reduce((acc, elem) => acc + elem, 0);
};

const part2 = (input) => {
  const lines = input.split("\n").filter((row) => row);

  let folderStack = [];
  const folderSizes = {};

  const cmd = (line) => {
    const [_, cmd, arg] = line.split(" ");
    if (cmd === "cd")
      switch (arg) {
        case "/":
          folderStack = ["/"];
          break;
        case "..":
          folderStack.pop();
          break;
        default:
          folderStack.push(arg);
          break;
      }
  };

  const cmdOutput = (line) => {
    const [first, _] = line.split(" ");

    if (!isNaN(parseInt(first))) {
      folderStack.forEach((_, index) => {
        const folderName = folderStack.slice(0, index + 1).join("/");

        const currentValue = folderSizes[folderName] || 0;
        folderSizes[folderName] = currentValue + parseInt(first);
      });
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("$")) return cmd(line);
    else return cmdOutput(line);
  });

  const sorted = Object.values(folderSizes).sort((a, b) => a - b);
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
