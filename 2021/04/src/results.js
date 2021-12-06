const {
  winningBoardScore,
  lastWinningBoardScore,
  boards,
  drawnNumbers,
} = require(".");

console.log(`Part 1: ${winningBoardScore({ boards, drawnNumbers })}`);
console.log(`Part 2: ${lastWinningBoardScore({ boards, drawnNumbers })}`);
