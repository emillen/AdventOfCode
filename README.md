# Advent of Code

My solutions for adventofcode. I never do all of them :D

## How to use it

1. Copy `./template` to the correct date folder (`./YYYY/DD`), and cd into it
   ```bash
   cp -r ./template ./2022/23
   cd ./2022/23
   npm install
   ```
2. You start the tests
   ```bash
   npm run test
   ```
3. Fill in the example on the assignment i the test in `./src/test.js`
4. Put your input string in `./src/input.txt`
5. Make the test pass
6. Get the result
   ```bash
   npm run result    # get both answers
   npm run result p1 # get only part 1
   npm run result p2 # get only part 2
   ```
