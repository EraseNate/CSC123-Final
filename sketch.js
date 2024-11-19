let scene;
let game;
let start;
let instruction;

function setup() {
  createCanvas(800, 800);
  start = new playButton();
  scene = new ShowMap();
  game = new Game();
  instruction = new instButton();
}

function draw() {
  background(225);
  if (instruction.instActive)
  {

  }
  else if (start.gameActive)
  {
    if (scene.sceneActive) {
        scene.display(); // Display map scene if active
      } else {
        game.display(); // Display battle scene if collision occurred
      }
  }
  else
  {
    inst.checkCollision();
    start.checkCollision();
  }

}