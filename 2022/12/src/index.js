const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const getAllAdjecent = (grid, x, y) => {
  const top = y > 0 && { x, y: y - 1, value: grid[y - 1][x] };
  const left = x > 0 && { x: x - 1, y, value: grid[y][x - 1] };
  const right = x < grid[0].length - 1 && {
    x: x + 1,
    y,
    value: grid[y][x + 1],
  };
  const bottom = y < grid.length - 1 && { x, y: y + 1, value: grid[y + 1][x] };

  return [top, left, right, bottom].filter((elem) => elem);
};

const getHeight = (char) => {
  if (char === "S") return getHeight("a");
  if (char === "E") return getHeight("z");

  return char.charCodeAt(0) - "a".charCodeAt(0);
};

const findPosOfChar = (grid, char) => {
  return grid.reduce((acc, row, y) => {
    const x = row.indexOf(char);
    if (x !== -1) {
      acc.x = x;
      acc.y = y;
    }
    return acc;
  }, {});
};

const bfs = (graph, start, winFunc) => {
  const visited = graph.map((row) => row.map(() => false));
  const queue = [{ x: start.x, y: start.y, amountVisited: 0 }];
  visited[start.y][start.x] = true;

  while (queue.length > 0) {
    const current = queue.shift();
    const { x, y, amountVisited } = current;

    if (winFunc(x, y)) {
      return amountVisited;
    }

    const nextPaths = graph[y][x].edges;

    for (const edge of nextPaths) {
      const hasVisited = visited[edge.y][edge.x];
      visited[edge.y][edge.x] = true;

      if (!hasVisited) {
        queue.push({ x: edge.x, y: edge.y, amountVisited: amountVisited + 1 });
      }
    }
  }
};

const part1 = (input) => {
  const lines = input.split("\n").filter((line) => line);
  const grid = lines.map((line) => line.split("").filter((char) => char));

  const S = findPosOfChar(grid, "S");
  const E = findPosOfChar(grid, "E");

  const graph = grid.map((row, y, self) => {
    const rowPaths = row.map((col, x) => {
      const adjecent = getAllAdjecent(self, x, y);

      const edges = adjecent.filter(({ value }) => {
        const height = getHeight(value);
        const currentHeight = getHeight(col);

        return currentHeight >= height - 1;
      });

      return { x, y, edges };
    });
    return rowPaths;
  });

  return bfs(graph, S, (x, y) => x === E.x && y === E.y);
};

const part2 = (input) => {
  const lines = input.split("\n").filter((line) => line);
  const grid = lines.map((line) => line.split("").filter((char) => char));

  const E = findPosOfChar(grid, "E");

  const graph = grid.map((row, y, self) => {
    const rowPaths = row.map((col, x) => {
      const adjecent = getAllAdjecent(self, x, y);

      const edges = adjecent.filter(({ value }) => {
        const height = getHeight(value);
        const currentHeight = getHeight(col);

        return currentHeight <= height + 1;
      });

      return { x, y, edges, value: col };
    });
    return rowPaths;
  });

  return bfs(graph, E, (x, y) => grid[y][x] === "a");
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
