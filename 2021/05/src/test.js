const { overlappingPoints, overlappingPoints2 } = require(".");

describe("part1", () => {
  const testData = [
    { x1: 0, y1: 9, x2: 5, y2: 9 },
    { x1: 8, y1: 0, x2: 0, y2: 8 },
    { x1: 9, y1: 4, x2: 3, y2: 4 },
    { x1: 2, y1: 2, x2: 2, y2: 1 },
    { x1: 7, y1: 0, x2: 7, y2: 4 },
    { x1: 6, y1: 4, x2: 2, y2: 0 },
    { x1: 0, y1: 9, x2: 2, y2: 9 },
    { x1: 3, y1: 4, x2: 1, y2: 4 },
    { x1: 0, y1: 0, x2: 8, y2: 8 },
    { x1: 5, y1: 5, x2: 8, y2: 2 },
  ];

  it("should work with the test data", () => {
    expect(overlappingPoints(testData)).toBe(5);
  });
});

describe("part2", () => {
  const testData = [
    { x1: 0, y1: 9, x2: 5, y2: 9 },
    { x1: 8, y1: 0, x2: 0, y2: 8 },
    { x1: 9, y1: 4, x2: 3, y2: 4 },
    { x1: 2, y1: 2, x2: 2, y2: 1 },
    { x1: 7, y1: 0, x2: 7, y2: 4 },
    { x1: 6, y1: 4, x2: 2, y2: 0 },
    { x1: 0, y1: 9, x2: 2, y2: 9 },
    { x1: 3, y1: 4, x2: 1, y2: 4 },
    { x1: 0, y1: 0, x2: 8, y2: 8 },
    { x1: 5, y1: 5, x2: 8, y2: 2 },
  ];
  it("should work on the test data", () => {
    expect(overlappingPoints2(testData)).toBe(12);
  });
});
