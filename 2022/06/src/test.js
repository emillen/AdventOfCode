const { part1, part2 } = require(".");

describe("part1", () => {
  it("should work on the test data", () => {
    expect(part1("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toEqual(7);
    expect(part1("bvwbjplbgvbhsrlpgdmjqwftvncz")).toEqual(5);
    expect(part1("nppdvjthqldpwncqszvftbrmjlhg")).toEqual(6);
    expect(part1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toEqual(10);
    expect(part1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toEqual(11);
  });
});

describe("part2", () => {
  it("should work on the test data", () => {
    expect(part2("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toEqual(19);
    expect(part2("bvwbjplbgvbhsrlpgdmjqwftvncz")).toEqual(23);
    expect(part2("nppdvjthqldpwncqszvftbrmjlhg")).toEqual(23);
    expect(part2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toEqual(29);
    expect(part2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toEqual(26);
  });
});
