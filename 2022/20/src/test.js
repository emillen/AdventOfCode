const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `
1
2
-3
3
-2
0
4  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(3);
  });
});

describe("part2", () => {
  const testData = `
1
2
-3
3
-2
0
4  `.trim();

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(1623178306);
  });
});
