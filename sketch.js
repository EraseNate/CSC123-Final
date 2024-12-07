let prologue;
let scene;
let game;
let startMenu;
let prologuestart = false;
let gameStarted = false;

function setup() {
  createCanvas(800, 800);
  scene = new ShowMap();
  game = new Game();
  startMenu = new StartMenu();
  prologue = new Prologue();
}

function preload(){
  startFont = loadFont('Jersey10-Regular.ttf');
  mainScreen = loadImage('mainScreen.jpg');
}

function draw() {
  if (!gameStarted) {
    startMenu.display();
  } else if (prologuestart) {
    prologue.display();
  } else {
    background(mainScreen);
    if (scene.sceneActive) {
      scene.display(); // Display map scene if active
    } else {
      game.display(); // Display battle scene if collision occurred
    }
  }
}

