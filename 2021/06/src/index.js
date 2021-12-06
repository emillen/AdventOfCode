const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();
const fishes = string
  .trim()
  .split(",")
  .map((num) => Number.parseInt(num));

const oneDay = (fishes) => {
  const oldFishesWithNewNumbers = fishes.map((fish) =>
    fish === 0 ? 6 : fish - 1
  );
  const newFishes = fishes.filter((fish) => fish === 0).map((_) => 8);

  return [...oldFishesWithNewNumbers, ...newFishes];
};

const fishesAfter80days = (fishes) => {
  let newFishes = fishes;
  for (let i = 0; i < 80; i++) {
    newFishes = oneDay(newFishes);
  }

  return newFishes.length;
};

const fishesAfter256days = (fishes) => {
  const fishCountPerTimerValue = fishes.reduce(
    (acc, fish) => {
      if (acc[fish]) return { ...acc, [fish]: acc[fish] + 1 };
      return { ...acc, [fish]: 1 };
    },
    { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 }
  );

  for (let day = 0; day < 256; day++) {
    const fishesThatAreGivingBirth = fishCountPerTimerValue[0];

    for (let i = 0; i <= 8; i++) {
      fishCountPerTimerValue[i] = fishCountPerTimerValue[i + 1];
    }
    fishCountPerTimerValue[8] = fishesThatAreGivingBirth;
    fishCountPerTimerValue[6] += fishesThatAreGivingBirth;
  }

  return Object.keys(fishCountPerTimerValue).reduce((acc, key) => {
    return acc + fishCountPerTimerValue[key];
  }, 0);
};

module.exports = { fishes, fishesAfter80days, fishesAfter256days };
