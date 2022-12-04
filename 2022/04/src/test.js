const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(2);
  });
});

describe("part2", () => {
  const testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`.trim();

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(4);
  });
});
