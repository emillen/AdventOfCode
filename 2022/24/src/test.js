const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(18);
  });
});

describe("part2", () => {
  const testData = `
#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#  `.trim();

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(54);
  });
});
