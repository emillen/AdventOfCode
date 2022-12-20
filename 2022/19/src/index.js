const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();

const collect = (state) => {
  const isBuilding = state.isBuilding;

  const newState = {
    ...state,
    wallet: {
      ore: state.wallet.ore + state.robots.ore,
      clay: state.wallet.clay + state.robots.clay,
      obsidian: state.wallet.obsidian + state.robots.obsidian,
      geode: state.wallet.geode + state.robots.geode,
    },
    minute: state.minute + 1,
    isBuilding: null,
  };

  if (isBuilding) {
    newState.wallet[isBuilding] = newState.wallet[isBuilding] - 1;
  }

  return newState;
};

const buyRobot = (state, robotType, blueprint) => {
  const costs = blueprint[`${robotType}Robot`];

  const newState = {
    ...state,
    wallet: {
      ore: state.wallet.ore - costs.ore,
      clay: state.wallet.clay - costs.clay,
      obsidian: state.wallet.obsidian - costs.obsidian,
      geode: state.wallet.geode - costs.geode,
    },
    robots: {
      ...state.robots,
      [robotType]: state.robots[robotType] + 1,
    },
    isBuilding: robotType,
  };

  return newState;
};

const canAfford = (state, robotType, blueprint) => {
  const costs = blueprint[`${robotType}Robot`];
  const canAfford =
    state.wallet.ore >= costs.ore &&
    state.wallet.clay >= costs.clay &&
    state.wallet.obsidian >= costs.obsidian &&
    state.wallet.geode >= costs.geode;

  return canAfford;
};

const shouldBuy = (state, robotType, blueprint) => {
  const isAffordable = canAfford(state, robotType, blueprint);

  const maxCost = blueprint[`${robotType}MaxCost`];
  const hasMax = state.robots[robotType] >= maxCost;

  return isAffordable && !hasMax;
};

const needToMineMore = (state, blueprint) => {
  const { wallet } = state;
  const needMoreOre = wallet.ore < blueprint.oreMaxCost;

  return needMoreOre;
};

const runBluePrint = (blueprint, amountOfMinutes) => {
  let states = [
    {
      wallet: {
        ore: 0,
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
      robots: {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
      minute: 0,
    },
  ];

  for (let minute = 0; minute < amountOfMinutes; minute++) {
    const newStates = [];
    for (const oldState of states) {
      const newState = collect(oldState);

      if (needToMineMore(newState, blueprint)) {
        newStates.push(newState);
      }
      if (shouldBuy(newState, "ore", blueprint)) {
        newStates.push(buyRobot(newState, "ore", blueprint));
      }
      if (shouldBuy(newState, "clay", blueprint)) {
        newStates.push(buyRobot(newState, "clay", blueprint));
      }
      if (shouldBuy(newState, "obsidian", blueprint)) {
        newStates.push(buyRobot(newState, "obsidian", blueprint));
      }
      if (shouldBuy(newState, "geode", blueprint)) {
        newStates.push(buyRobot(newState, "geode", blueprint));
      }
    }

    const fitnesses = newStates.map((state) => {
      return (
        (state.wallet.geode + (amountOfMinutes - minute) * state.robots.geode) *
          100000 +
        state.wallet.obsidian * 10000 +
        state.wallet.clay * 100 +
        state.wallet.ore
      );
    });

    states = newStates
      .map((state, i) => ({ state, fitness: fitnesses[i] }))
      .sort((a, b) => b.fitness - a.fitness)
      .map((fitness) => fitness.state)
      .slice(0, 20000);
  }
  states.sort((a, b) => b.wallet.geode - a.wallet.geode);

  const best = states[0].wallet.geode;

  return { best, blueprint };
};

const parse = (input) => {
  const blueprintStrings = input.trim().split("\n").filter(Boolean);

  const blueprints = blueprintStrings.map((line) => {
    const number = line.match(/\d+/g).map((num) => parseInt(num));

    const blueprint = {
      id: number[0],
      oreRobot: {
        ore: number[1],
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
      clayRobot: {
        ore: number[2],
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
      obsidianRobot: {
        ore: number[3],
        clay: number[4],
        obsidian: 0,
        geode: 0,
      },
      geodeRobot: {
        ore: number[5],
        clay: 0,
        obsidian: number[6],
        geode: 0,
      },
    };

    const oreMaxCost = Math.max(
      blueprint.oreRobot.ore,
      blueprint.clayRobot.ore,
      blueprint.obsidianRobot.ore,
      blueprint.geodeRobot.ore
    );

    const clayMaxCost = Math.max(
      blueprint.oreRobot.clay,
      blueprint.clayRobot.clay,
      blueprint.obsidianRobot.clay,
      blueprint.geodeRobot.clay
    );

    const obsidianMaxCost = Math.max(
      blueprint.oreRobot.obsidian,
      blueprint.clayRobot.obsidian,
      blueprint.obsidianRobot.obsidian,
      blueprint.geodeRobot.obsidian
    );

    return {
      ...blueprint,
      oreMaxCost,
      clayMaxCost,
      obsidianMaxCost,
      geodeMaxCost: Infinity,
    };
  });

  return blueprints;
};

const part1 = (input) => {
  const blueprints = parse(input);

  const results = blueprints
    .map((blueprint) => runBluePrint(blueprint, 24))
    .reduce((a, b) => a + b.best * b.blueprint.id, 0);

  return results;
};

const part2 = (input) => {
  const blueprints = parse(input);
  const firstThreeBluePrints = blueprints.slice(0, 3);

  const results = firstThreeBluePrints
    .map((blueprint) => runBluePrint(blueprint, 32))
    .reduce((a, b) => {
      return a * b.best;
    }, 1);

  return results;
};

module.exports = {
  part1result: () => part1(string),
  part2result: () => part2(string),
  part1,
  part2,
};
