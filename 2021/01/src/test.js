const { countIncreases, sumsOfSlidingWindows } = require(".");

describe("part1", () => {
  const testData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  it("should work on the testData", () => {
    const answer = countIncreases(testData);
    expect(answer).toBe(7);
  });
});

describe("part2", () => {
  const testData = [607, 618, 618, 617, 647, 716, 769, 792];

  it("should work on the testData", () => {
    const answer = countIncreases(sumsOfSlidingWindows(testData));
    expect(answer).toEqual(5);
  });

  describe("sumsOfSlidingWindows", () => {
    it("should create sums of the sliding windows", () => {
      const result = sumsOfSlidingWindows([
        1, //A
        2, //A B
        3, //A B C
        4, //  B C
        5, //    C
      ]);

      expect(result).toEqual([6, 9, 12]);
    });
  });
});
