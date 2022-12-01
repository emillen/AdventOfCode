const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

  it("should work with test data", () => {
    expect(part1(testData)).toEqual(24000);
  });
});

describe("part2", () => {
  const testData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

  it("should work with test data", () => {
    expect(part2(testData)).toEqual(45000);
  });
});
