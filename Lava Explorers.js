/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Lava Explorers
@author: Cameron G
@tags: [Adventure, Puzzle, Casual]
@addedOn: 2024-00-00
*/

const player = "p"
const lava = "l"
const wall = "w"
const goal = "g"
var lose = false;
var score = 0;


setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [lava, bitmap`
3333399999933333
3333999999993333
3339999999999333
3399999999999933
3999999999999993
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
3999999999999993
3399999999999933
3339999999999333
3333999999993333
3333399999933333`],
  [goal, bitmap`
................
................
.....666666.....
....66666666....
...6666666666...
..666666666666..
..6666....6666..
..6666.66.6666..
..6666.66.6666..
..6666....6666..
..666666666666..
...6666666666...
....66666666....
.....666666.....
................
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
)

setSolids([player, wall])

let level = 0
const levels = [
  map`
pwlw.
..w..
.....
.....
....g`
]

setMap(levels[level])

setPushables({
  [player]: []
})
onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("s", () => {
  console.log("test");
  getFirst(player).y += 1;
})
onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});

afterInput(() => {
  const tilesWithLava = tilesWith(player, lava).length;

  const tilesWithGoal = tilesWith(player, goal).length;

  const totalGoals = tilesWith(player, goal).length;

  let goals = new Array(getAll(goal, map`
pwlw.
..w..
.....
.....
....g`));
  for (let goalObject of goals) {
    if (tilesWith(player, goal) > 0 && goalObject.y == getFirst(player).y && goalObject.x == getFirst(player).x) {
      console.log("removing object")
      goalObject.remove()
      score++
    }
  }
  if (tilesWithLava >= 1) {
    lose = true;
  }
  if (tilesWithGoal > 0) {

  }
})