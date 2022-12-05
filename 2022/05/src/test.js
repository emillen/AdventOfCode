const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
  `;

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual("CMZ");
  });
});

describe("part2", () => {
  const testData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
  `;

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual("MCD");
  });
});
