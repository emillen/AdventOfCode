const { part1, part2 } = require(".");

describe("part1", () => {
  const testData = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
  `.trim();

  it("should work on the test data", () => {
    expect(part1(testData)).toEqual(95437);
  });
});

describe("part2", () => {
  const testData = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
  `.trim();

  it("should work on the test data", () => {
    expect(part2(testData)).toEqual(24933642);
  });
});
