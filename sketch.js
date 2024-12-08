let prologue;
let scene;
let game;
let startMenu;
let epilogue;
let prologuestart = false;
let gameStarted = false;

function setup() {
  createCanvas(800, 800);
  scene = new ShowMap();
  startMenu = new StartMenu();
  prologue = new Prologue();
  epilogue = new Epilogue();
  game = new Game(epilogue);
}

function preload(){
  startFont = loadFont('Jersey10-Regular.ttf');
  mainScreen = loadImage('mainScreen.jpg');
}

function mousePressed() {
  if (epilogue.epilogueActive) {
    epilogue.handleClick(mouseX, mouseY, () => {
      prologuestart = false;
      game.resetGame();
      scene = new ShowMap(); // Reset the map and opponents
      gameStarted = false;
    });
  }
}

function draw() {
  if (!gameStarted) {
    startMenu.display();
  } else if (prologuestart) {
    prologue.display();
  } else if (epilogue.epilogueActive) { // Check if the epilogue is active
    epilogue.display();
  } else {
    background(mainScreen);
    if (scene.sceneActive) {
      scene.display(); // Display map scene if active
    } else {
      game.display(); // Display battle scene if collision occurred
    }
  }
}

