const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5
  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(64);
  });
});

describe("part2", () => {
  it("should work on the test data", () => {
    const testData = `
    2,2,2
    1,2,2
    3,2,2
    2,1,2
    2,3,2
    2,2,1
    2,2,3
    2,2,4
    2,2,6
    1,2,5
    3,2,5
    2,1,5
    2,3,5
    `.trim();
    expect(part2(testData)).toEqual(58);
  });
});
