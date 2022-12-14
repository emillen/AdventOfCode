const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(24);
  });
});

describe("part2", () => {
  const testData = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
  `.trim();

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(93);
  });
});
