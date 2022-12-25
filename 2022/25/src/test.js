const { part1, part2, snafuToDecimal, decimalToSnafu } = require(".");

describe("snafuToDecimal", () => {
  it("should work on the test data", () => {
    expect(snafuToDecimal("1=-0-2")).toEqual(1747);
    expect(snafuToDecimal("12111")).toEqual(906);
    expect(snafuToDecimal("2=0=")).toEqual(198);
    expect(snafuToDecimal("21")).toEqual(11);
    expect(snafuToDecimal("2=01")).toEqual(201);
    expect(snafuToDecimal("111")).toEqual(31);
    expect(snafuToDecimal("20012")).toEqual(1257);
    expect(snafuToDecimal("112")).toEqual(32);
    expect(snafuToDecimal("1=-1=")).toEqual(353);
    expect(snafuToDecimal("1-12")).toEqual(107);
    expect(snafuToDecimal("12")).toEqual(7);
    expect(snafuToDecimal("1=")).toEqual(3);
    expect(snafuToDecimal("122")).toEqual(37);
  });
});

describe("decimalToSnafu", () => {
  it("should work on the test data", () => {
    expect(decimalToSnafu(1747)).toEqual("1=-0-2");
    expect(decimalToSnafu(906)).toEqual("12111");
    expect(decimalToSnafu(198)).toEqual("2=0=");
    expect(decimalToSnafu(11)).toEqual("21");
    expect(decimalToSnafu(201)).toEqual("2=01");
    expect(decimalToSnafu(31)).toEqual("111");
    expect(decimalToSnafu(1257)).toEqual("20012");
    expect(decimalToSnafu(32)).toEqual("112");
    expect(decimalToSnafu(353)).toEqual("1=-1=");
    expect(decimalToSnafu(107)).toEqual("1-12");
    expect(decimalToSnafu(7)).toEqual("12");
    expect(decimalToSnafu(3)).toEqual("1=");
    expect(decimalToSnafu(37)).toEqual("122");
  });
});

describe("part1", () => {
  const testData = `
1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122
  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual("2=-1=0");
  });
});

describe("part2", () => {
  const testData = `
  `.trim();

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(undefined);
  });
});
