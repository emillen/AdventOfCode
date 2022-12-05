const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `
v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>
  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(58);
  });
});

describe("part2", () => {
  const testData = `
  `.trim();

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(undefined);
  });
});
