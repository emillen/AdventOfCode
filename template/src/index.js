const fs = require("fs");

const buffer = fs.readFileSync("./src/input.txt");
const string = buffer.toString();
const renameMe = string.split("\n").map((row) => row.trim());

module.exports = {};
