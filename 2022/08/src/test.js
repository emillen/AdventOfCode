const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `
30373
25512
65332
33549
35390
  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(21);
  });
});

describe("part2", () => {
  const testData = `
30373
25512
65332
33549
35390
  `.trim();

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(8);
  });
});
