let title, scene, game, start, instruction, w, h, medievalFont;

function preload() 
  {
    medievalFont = loadFont('CSS Fonts/MedievalSharp-Book.ttf'); 
  }
function setup() {
  createCanvas(800, 800);
  
  w = width;
  h = height;
  
  title = new Title();
  start = new playButton();
  scene = new ShowMap();
  game = new Game();
  instruction = new instButton();
}

function draw() {
  background(225);
  title.display();
  if (instruction.instActive)
    {
      instruction.exitDisplay()
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
    instruction.checkCollision();
    start.checkCollision();
  }
}
