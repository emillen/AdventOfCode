const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const mix = (list) => {
  let mixedList = [...list];

  for (let i = 0; i < mixedList.length; i++) {
    const { num } = mixedList.find((item) => item.originalIndex === i);
    const indexToMove = mixedList.findIndex((item) => item.originalIndex === i);

    const [toBeMoved] = mixedList.splice(indexToMove, 1);

    const indexSum = indexToMove + num;
    const fixNegative = num >= 0 ? 0 : mixedList.length;

    const newIndex = (indexSum + fixNegative) % mixedList.length;

    mixedList.splice(newIndex, 0, toBeMoved);
  }

  return mixedList;
};
const part1 = (input) => {
  const lines = input.trim().split("\n");
  const nums = lines.map((line) => parseInt(line));

  let list = nums.map((num, index) => {
    return { num, originalIndex: index };
  });

  const mixedList = mix(list);

  const zero = mixedList.findIndex((item) => item.num === 0);

  const num1000 = mixedList[(zero + 1000) % mixedList.length];
  const num2000 = mixedList[(zero + 2000) % mixedList.length];
  const num3000 = mixedList[(zero + 3000) % mixedList.length];

  return num1000.num + num2000.num + num3000.num;
};
const part2 = (input) => {
  const KEY = 811589153;
  const lines = input.trim().split("\n");
  const nums = lines.map((line) => parseInt(line) * KEY);

  let mixedList = nums.map((num, index) => {
    return { num, originalIndex: index };
  });

  for (let times = 0; times < 10; times++) {
    mixedList = mix(mixedList);
  }

  const zero = mixedList.findIndex((item) => item.num === 0);

  const num1000 = mixedList[(zero + 1000) % mixedList.length];
  const num2000 = mixedList[(zero + 2000) % mixedList.length];
  const num3000 = mixedList[(zero + 3000) % mixedList.length];

  return num1000.num + num2000.num + num3000.num;
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
