const { leastAmountOfFuelCost1, leastAmountOfFuelCost2 } = require(".");

describe("part1", () => {
  const testData = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

  it("should work with the test data", () => {
    expect(leastAmountOfFuelCost1(testData)).toBe(37);
  });
});

describe("part2", () => {
  const testData = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

  it("should work on the test data", () => {
    expect(leastAmountOfFuelCost2(testData)).toBe(168);
  });
});
