const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(13);
  });
});

describe("part2", () => {
  it("should work on the test data", () => {
    const testData = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
    `.trim();

    expect(part2(testData)).toEqual(36);
  });

  it("should work on the test data", () => {
    const testData = `
  R 4
  U 4
  L 3
  D 1
  R 4
  D 1
  L 5
  R 2
    `.trim();
    expect(part2(testData)).toEqual(1);
  });
});

// a.b
