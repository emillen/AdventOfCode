const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(31);
  });
});

describe("part2", () => {
  const testData = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
  `.trim();

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(29);
  });
});
