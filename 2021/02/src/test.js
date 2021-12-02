const { getPosition, getPositionWithAim } = require(".");

describe("part1", () => {
  const testData = [
    { cmd: "forward", amount: 5 },
    { cmd: "down", amount: 5 },
    { cmd: "forward", amount: 8 },
    { cmd: "up", amount: 3 },
    { cmd: "down", amount: 8 },
    { cmd: "forward", amount: 2 },
  ];

  it("should work with the test data", () => {
    const position = getPosition(testData);

    expect(position).toStrictEqual({ horizontal: 15, depth: 10 });
  });
});

describe("part2", () => {
  const testData = [
    { cmd: "forward", amount: 5 },
    { cmd: "down", amount: 5 },
    { cmd: "forward", amount: 8 },
    { cmd: "up", amount: 3 },
    { cmd: "down", amount: 8 },
    { cmd: "forward", amount: 2 },
  ];
  it("should work on the test data", () => {
    const position = getPositionWithAim(testData);

    expect(position).toStrictEqual({ horizontal: 15, depth: 60 });
  });
});
