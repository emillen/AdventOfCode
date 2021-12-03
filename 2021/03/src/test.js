const { calculate, oxygenRating, c02ScrubberRating } = require(".");

describe("part1", () => {
  const testData = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];
  it("should work with the test data", () => {
    const result = calculate(testData);

    expect(result).toStrictEqual({
      gamma: 22,
      epsilon: 9,
    });
  });
});

describe("part2", () => {
  const testData = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];

  describe("oxygenrating", () => {
    it("should work on the test data", () => {
      const result = oxygenRating(testData);

      expect(result).toBe(23);
    });
  });
  describe("c02ScrubberRating", () => {
    it("should work on the test data", () => {
      const result = c02ScrubberRating(testData);

      expect(result).toBe(10);
    });
  });
});
