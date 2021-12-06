const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();
const [drawnNumbersRaw, ...boardsRaw] = string.split("\n\n");

const drawnNumbers = drawnNumbersRaw
  .split(",")
  .map((num) => Number.parseInt(num));

const boards = boardsRaw.map((rawBoard) =>
  rawBoard.split("\n").map((row) =>
    row
      .split(/\s+/g)
      .filter((item) => item !== "")
      .map((num) => Number.parseInt(num))
  )
);

const findPositionsOfNumber = ({ board, number }) => {
  const positions = [];
  for (let y = 0; y < board.length; y++)
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === number) positions.push({ x, y });
    }

  return positions;
};

const isWinner = (positions) => {
  for (let i = 0; i < 5; i++) {
    if (
      positions.filter(({ x }) => x === i).length >= 5 ||
      positions.filter(({ y }) => y === i).length >= 5
    )
      return true;
  }

  return false;
};

const calcScore = ({ board, positions, number }) => {
  let score = 0;
  for (let y = 0; y < 5; y++)
    for (let x = 0; x < 5; x++) {
      if (positions.some((position) => position.x === x && position.y === y)) {
        continue;
      }

      score += board[y][x];
    }

  return score * number;
};

const scoreOfBoard = ({ drawnNumbers, board }) => {
  let allMarkedPositions = [];

  for (let round = 0; round < drawnNumbers.length; round++) {
    const positionsOfRound = findPositionsOfNumber({
      board,
      number: drawnNumbers[round],
    });

    allMarkedPositions = [...allMarkedPositions, ...positionsOfRound];

    if (isWinner(allMarkedPositions))
      return {
        round,
        number: drawnNumbers[round],
        score: calcScore({
          board,
          positions: allMarkedPositions,
          number: drawnNumbers[round],
        }),
      };
  }

  return {};
};

const winningBoardScore = ({ drawnNumbers, boards }) => {
  return boards
    .map((board) => scoreOfBoard({ drawnNumbers, board }))
    .sort((a, b) => a.round - b.round)[0].score;
};

const lastWinningBoardScore = ({ drawnNumbers, boards }) => {
  return boards
    .map((board) => scoreOfBoard({ drawnNumbers, board }))
    .sort((a, b) => b.round - a.round)[0].score;
};

module.exports = {
  boards,
  drawnNumbers,
  winningBoardScore,
  lastWinningBoardScore,
};
