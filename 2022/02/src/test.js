const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `A Y
B X
C Z`;

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(15);
  });
});

describe("part2", () => {
  const testData = `A Y
B X
C Z`;

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(12);
  });
});
