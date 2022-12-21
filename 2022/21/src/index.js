const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const parse = (input) => {
  const lines = input.trim().split("\n");

  const monkeys = lines
    .map((line) => {
      const [monkeyName, rest] = line.split(": ");
      return { monkeyName, rest };
    })
    .map(({ monkeyName, rest }) => {
      if (isNaN(parseInt(rest))) {
        const [first, op, second] = rest.split(" ");
        return { monkeyName, operation: { first, second, op } };
      }

      return { monkeyName, num: parseInt(rest) };
    });
  return monkeys;
};

const bfs = (monkeys, resultMap, initial) => {
  const queue = [...initial];

  while (queue.length) {
    const monkey = queue.shift();

    if (monkey === undefined) {
      continue;
    }

    const thisResult = resultMap[monkey.monkeyName];

    if (thisResult !== undefined) {
      continue;
    }

    const { first, second, op } = monkey.operation;
    const firstMonkeyResult = resultMap[first];
    const secondMonkeyResult = resultMap[second];

    const firstMonkey = monkeys.find((monkey) => monkey.monkeyName === first);
    const secondMonkey = monkeys.find((monkey) => monkey.monkeyName === second);

    if (firstMonkeyResult === undefined || secondMonkeyResult === undefined) {
      queue.push(firstMonkey);
      queue.push(secondMonkey);
      continue;
    }

    switch (op) {
      case "+":
        resultMap[monkey.monkeyName] = firstMonkeyResult + secondMonkeyResult;
        break;
      case "-":
        resultMap[monkey.monkeyName] = firstMonkeyResult - secondMonkeyResult;
        break;
      case "*":
        resultMap[monkey.monkeyName] = firstMonkeyResult * secondMonkeyResult;
        break;
      case "/":
        resultMap[monkey.monkeyName] = firstMonkeyResult / secondMonkeyResult;
        break;
    }
  }
};

const part1 = (input) => {
  /* lets go */

  const monkeys = parse(input);
  const resultMap = monkeys.reduce((acc, monkey) => {
    if (monkey.num !== undefined)
      return { ...acc, [monkey.monkeyName]: monkey.num };
    return acc;
  }, {});

  const queue = monkeys.filter((monkey) => monkey.operation);

  while (!resultMap.root) {
    bfs(monkeys, resultMap, queue);
  }

  return resultMap.root;
};

const getDirection = (resultMap, monkeys, theOneWeNeed) => {
  const firstPassMap = { ...resultMap, humn: 1 };

  while (firstPassMap[theOneWeNeed] === undefined) {
    bfs(monkeys, firstPassMap, [
      monkeys.find((m) => m.monkeyName === theOneWeNeed),
    ]);
  }
  const firstPass = firstPassMap[theOneWeNeed];

  const secondPassMap = { ...resultMap, humn: 2 };
  while (secondPassMap[theOneWeNeed] === undefined) {
    bfs(monkeys, secondPassMap, [
      monkeys.find((m) => m.monkeyName === theOneWeNeed),
    ]);
  }

  const secondPass = secondPassMap[theOneWeNeed];

  return firstPass < secondPass;
};

const part2 = (input) => {
  /* lets go */

  const monkeys = parse(input).filter(
    ({ monkeyName }) => monkeyName !== "humn"
  );

  const resultMap = monkeys.reduce((acc, monkey) => {
    if (monkey.num !== undefined)
      return { ...acc, [monkey.monkeyName]: monkey.num };
    return acc;
  }, {});

  const hasFoundResult = () => {
    const root = monkeys.find((m) => m.monkeyName === "root");

    const first = resultMap[root.operation.first];
    const second = resultMap[root.operation.second];

    return first !== undefined || second !== undefined;
  };

  while (!hasFoundResult()) {
    let queue = monkeys
      .filter((monkey) => monkey.operation)
      .filter((monkey) => monkey.monkeyName === "root")
      .map((root) => {
        const { first, second } = root.operation;
        const firstMonkey = monkeys.find(
          (monkey) => monkey.monkeyName === first
        );
        const secondMonkey = monkeys.find(
          (monkey) => monkey.monkeyName === second
        );
        return [firstMonkey, secondMonkey];
      })
      .flat();

    bfs(monkeys, resultMap, queue);
  }

  const root = monkeys.find((m) => m.monkeyName === "root");

  const first = resultMap[root.operation.first];
  const second = resultMap[root.operation.second];

  const theOneWeNeed =
    first === undefined ? root.operation.first : root.operation.second;

  let GOAL = first || second;

  let low = 0;
  let high = GOAL * 10;
  let mid = 0;

  const isAscending = getDirection(resultMap, monkeys, theOneWeNeed);

  while (high - low > 1) {
    mid = Math.floor((high + low) / 2);
    const newResultMap = { ...resultMap, humn: mid };

    while (newResultMap[theOneWeNeed] === undefined) {
      bfs(
        monkeys,
        newResultMap,
        monkeys.filter((monkey) => monkey.monkeyName === theOneWeNeed)
      );
    }
    const result = newResultMap[theOneWeNeed];

    if (isAscending ? result < GOAL : result > GOAL) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return mid;
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
