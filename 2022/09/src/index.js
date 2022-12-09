const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const isDiagonal = (T, H) => {
  return (
    (T.x === H.x - 1 || T.x === H.x + 1) && (T.y === H.y - 1 || T.y === H.y + 1)
  );
};

const isAdjecent = (T, H) => {
  return (
    (T.x === H.x - 1 && T.y === H.y) ||
    (T.x === H.x + 1 && T.y === H.y) ||
    (T.y === H.y - 1 && T.x === H.x) ||
    (T.y === H.y + 1 && T.x === H.x)
  );
};

const isOverlapping = (T, H) => {
  return T.x === H.x && T.y === H.y;
};

const isTouching = (T, H) => {
  return isDiagonal(T, H) || isAdjecent(T, H) || isOverlapping(T, H);
};

const betweenNums = (x, x2) => {
  if (x === x2) {
    return x;
  }

  const between = x2 > x ? x + 1 : x - 1;

  return between;
};

const getNewKnotPosition = (knot, knotToFollow) => {
  const { x, y } = knot;
  const { x: x2, y: y2 } = knotToFollow;

  const betweenX = betweenNums(x, x2);
  const betweenY = betweenNums(y, y2);

  return { x: betweenX, y: betweenY };
};

const calculate = (knots, instructions) => {
  const movedKnots = instructions.reduce((knots, instruction) => {
    const { operation, steps } = instruction;

    const newKnots = [...knots];

    for (let i = 0; i < steps; i++) {
      newKnots.forEach((knot, index) => {
        if (index === 0) {
          switch (operation) {
            case "R":
              newKnots[index] = { ...knot, x: knot.x + 1 };
              return;
            case "L":
              newKnots[index] = { ...knot, x: knot.x - 1 };
              return;
            case "U":
              newKnots[index] = { ...knot, y: knot.y + 1 };
              return;
            case "D":
              newKnots[index] = { ...knot, y: knot.y - 1 };
              return;
          }
        }

        const knotBefore = newKnots[index - 1];

        if (!isTouching(knot, knotBefore)) {
          const newKnotPosition = getNewKnotPosition(knot, knotBefore);
          newKnots[index] = {
            ...newKnotPosition,
            visited: [
              ...knot.visited,
              { x: newKnotPosition.x, y: newKnotPosition.y },
            ],
          };
        }
      });
    }

    return newKnots;
  }, knots);

  const lastKnot = movedKnots[movedKnots.length - 1];

  return lastKnot.visited.filter((knot, index, self) => {
    return self.findIndex((k) => k.x === knot.x && k.y === knot.y) === index;
  }).length;
};

const part1 = (input) => {
  const lines = input.split("\n").filter((line) => line.length > 0);

  const instructions = lines.map((line) => {
    const [operation, steps] = line.split(" ");
    return { operation, steps: parseInt(steps) };
  });

  const knots = [
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
  ];

  return calculate(knots, instructions);
};
const part2 = (input) => {
  const lines = input.split("\n").filter((line) => line.length > 0);

  const instructions = lines.map((line) => {
    const [operation, steps] = line.split(" ");
    return { operation, steps: parseInt(steps) };
  });

  const knots = [
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
    { x: 0, y: 0, visited: [{ x: 0, y: 0 }] },
  ];

  return calculate(knots, instructions);
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
