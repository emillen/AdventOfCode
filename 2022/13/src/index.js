const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const compare = ([left, right]) => {
  const leftIsNum = typeof left === "number";
  const rightIsNum = typeof right === "number";

  const leftIsArray = Array.isArray(left);
  const rightIsArray = Array.isArray(right);

  if (leftIsNum && rightIsNum) {
    if (left > right) return false;

    if (left < right) return true;
  }

  if (leftIsArray && rightIsArray) {
    const smallestLength =
      left.length < right.length ? left.length : right.length;

    for (let i = 0; i < smallestLength; i++) {
      let result = compare([left[i], right[i]]);
      if (result != undefined) return result;
    }

    if (left.length < right.length) return true;
    else if (left.length > right.length) return false;
  }

  if ((leftIsNum && rightIsArray) || (leftIsArray && rightIsNum)) {
    const newLeft = leftIsNum ? [left] : left;
    const newRight = rightIsNum ? [right] : right;

    return compare([newLeft, newRight]);
  }
};

const part1 = (input) => {
  const pairStrings = input.split("\n\n").filter((value) => value !== "");

  const pairs = pairStrings.map((pairString) => {
    const [left, right] = pairString.split("\n");
    return [JSON.parse(left), JSON.parse(right)];
  });

  const result = pairs
    .map(compare)
    .map((isInCorrectOrder, index) => isInCorrectOrder && index + 1)
    .filter(Boolean)
    .reduce((acc, value) => acc + value, 0);

  return result;
};

const part2 = (input) => {
  const lines = input
    .trim()
    .split("\n")
    .filter((value) => value !== "");

  const packets = lines.map((line) => JSON.parse(line));

  const sortedPackets = [[[2]], [[6]], ...packets].sort((a, b) => {
    const result = compare([a, b]);
    if (result === true) return -1;
    if (result === false) return 1;
  });

  const result = sortedPackets
    .map((packet, index) => ({
      index: index + 1,
      value: JSON.stringify(packet),
    }))
    .filter(({ value }) => {
      return value === "[[6]]" || value === "[[2]]";
    })
    .reduce((acc, { index }) => acc * index, 1);

  return result;
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
