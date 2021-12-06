const { fishesAfter80days, fishesAfter256days } = require(".");

describe("part1", () => {
  const testData = [3, 4, 3, 1, 2];

  it("should work with the test data", () => {
    expect(fishesAfter80days(testData)).toBe(5934);
  });
});

describe("part2", () => {
  const testData = [3, 4, 3, 1, 2];

  it("should work on the test data", () => {
    expect(fishesAfter256days(testData)).toEqual(26984457539);
  });
});
