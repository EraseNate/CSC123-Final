let playState;
let instState;
let exitState;
var startFont; //name of font

const DEFAULT = 0;
const HOVER = 1;
const CLICK = 2;

 class StartMenu {
    constructor() {
      this.playButton = new playButton();
      this.instButton = new instButton();
      this.prologue= new Prologue()
    }

    display() {
      push();
      background(mainScreen);
      fill(255);
      textSize(150);
      textFont(startFont);
      textAlign(CENTER, CENTER);
      text("ETHERLAND", width/2, height/4);
      pop();
      
      this.playButton.checkCollision();
      this.instButton.checkCollision();
      
    if (this.playButton.gameActive) {
      prologuestart = true;
      gameStarted = true;
    }
       if (this.instButton.instActive) {
      this.instButton.exitDisplay();
    }
    }
  }
class playButton {
  constructor() {
    this.gameActive = false;
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(80);
    rect(width / 2, height / 2, 200, 100);
    textFont(startFont); 
    text("PLAY", width / 2, height / 2);
    pop();
  }

  checkCollision() {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(80);
    rect(width / 2, height / 2, 200, 100);

    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 - 50 &&
      mouseY < height / 2 + 50
    ) {
      if (mouseIsPressed) {
        playState = CLICK;
        this.gameActive = true;
      } else {
        playState = HOVER;
      }
    } else {
      playState = DEFAULT;
    }

    this.playState();
    rect(width / 2, height / 2, 200, 100);
    fill(255);
    textFont(startFont); 
    text("PLAY", width / 2, height / 2);
    fill(255);
    pop();
  }

  playState() {
    if (playState == DEFAULT) {
      fill('#147373');
    } else if (playState == HOVER) {
      fill(245,154,35);
    } else if (playState == CLICK) {
      fill(255);
    }
  }
}

class instButton {
  constructor() {
    this.instActive = false;
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(40);
    rect(width / 2, (3 * height) / 4, 200, 100);
    textFont(startFont); 
    text("How To Play", width / 2, (3 * height) / 4);
    pop();
  }

  checkCollision() {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    rect(width / 2, (3 * height) / 4, 200, 100);

    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > (3 * height) / 4 - 50 &&
      mouseY < (3 * height) / 4 + 50
    ) {
      if (mouseIsPressed) {
        instState = CLICK;
        this.instActive = true;
      } else {
        instState = HOVER;
      }
    } else {
      instState = DEFAULT;
    }

    this.instState();
    rect(width / 2, (3 * height) / 4, 200, 100);
    fill(255);
    textSize(40);
    textFont(startFont); 
    text("How To Play", width / 2, (3 * height) / 4);
    fill(255);
    pop();
  }

  instState() {
    if (instState == DEFAULT) {
      fill('#147373');
    } else if (instState == HOVER) {
      fill(245,154,35);
    } else if (instState == CLICK) {
      fill(255);
    }
  }

  exitDisplay() {
    push();
    fill(0);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    rect(width / 2, height / 2, 700, 700);
    textSize(50);
    fill(255);
    textFont(startFont); 
    text("HOW TO PLAY \n \n  - Use WASD controls to \n move around \n - Enter through each portal \n to battle \n - Use attacks to fight Ethers \n Get to final boss ", width / 2, 380);
    this.exitCollision();
    pop();
  }

  exitCollision() {
    push();
    rect(740, 60, 20, 20);
    if (mouseX > 730 && mouseX < 750 && mouseY > 50 && mouseY < 70) {
      if (mouseIsPressed) {
        exitState = CLICK;
        this.instActive = false;
      } else {
        exitState = HOVER;
      }
    } else {
      exitState = DEFAULT;
    }

    this.exitState();
    rect(740, 60, 20, 20);
    textSize(15);
    fill(0);
    text("X", 740, 60);
    pop();
  }

  exitState() {
    if (exitState == DEFAULT) {
      fill('#147373');
    } else if (exitState == HOVER) {
      fill(245,154,35);
    } else if (exitState == CLICK) {
      fill(255);
    }
  }
}

