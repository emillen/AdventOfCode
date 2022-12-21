const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `
root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(152);
  });
});

describe("part2", () => {
  const testData = `
root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
  `.trim();

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(301);
  });
});
