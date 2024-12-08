 const preDefault = 0;
  const preHover= 1;
  const PreClick = 2; 

class Prologue {
    constructor() {
      this.buttonstate =preDefault;

     this.prologuestart=false 
    }
    display() {
      this.prologuebackground();
      this.prologueupdadate();
      this.nextbuttoncollision()
      this.Button();
    }
    prologuebackground() {
      push();
      fill('black');
      rect(100, 100, 600, 600);
      pop();
      push();
      fill('white')
      textSize(50);
      text("Welcome to Etherland!", 200, 180);
      pop();
      push();
      fill('white')
      textSize(25);
      text('A magical town in the Antoria region, Etherland used to be a \n vibrant center for citizens and their Luminals. \n \n Now, it has been overrun by vicious beasts called Ethers, \n whose only goal is to destory what was once the wonderful \n Etherland. \n \n It is up to you, player, to fight these dangerous Ethers \n alongside your Luminal. Please help us regain control of \n Etherland and bring it back to life! \n \n Are you ready for the challenge?', 130, 250);
      pop()
    }
    prologueupdadate() {
      if (this.buttonstate == PreClick) {
        prologuestart= !true 
      }
    }
    Button() {
      push();
  
      if (this.buttonstate == preHover) {
        fill("orange");
      } else if (this.buttonstate == preDefault) {
        fill("red");
      }
      rect(530, 600, 150, 60, 20);
      pop();
      push();
      fill(255);
      textFont(startFont);
      textSize(35);
      text("I'm Ready!",550,640);
      pop();
    }
    nextbuttoncollision() {
      if (mouseX > 540 && mouseX < 690 && mouseY > 600 && mouseY < 660) {
        if (mouseIsPressed) {
          this.buttonstate = PreClick;
        } else {
          this.buttonstate = preHover;
        }
      } else {
        this.buttonstate = preDefault;
      }
    }
  }



// Player Class
class Player {
  constructor(xPos, yPos, size) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.speed = 4; // Speed Movement
  }

  draw(){
    push()
    fill(255,255,20)
    square(this.xPos, this.yPos, this.size); //main char. on levels
    circle(this.xPos, this.yPos, this.size)
    pop()
  }

  update() {
    let newXPos = this.xPos;
    let newYPos = this.yPos;

    if (keyIsDown(87)) newYPos -= this.speed; // 'W' key (move up)
    if (keyIsDown(83)) newYPos += this.speed; // 'S' key (move down)
    if (keyIsDown(65)) newXPos -= this.speed; // 'A' key (move left)
    if (keyIsDown(68)) newXPos += this.speed; // 'D' key (move right)

    // Check canvas boundaries
    if (newXPos < 0 || newXPos > width - this.size) newXPos = this.xPos;
    if (newYPos < 0 || newYPos > height - this.size) newYPos = this.yPos;

    // Check for collisions with opponent lines
    for (let opponent of scene.opponents) {
      if (!opponent.defeated) {
        let opponentLineY = opponent.yPos + opponent.size;

        // Block player from moving past the opponent's line
        if (this.yPos >= opponentLineY && newYPos < opponentLineY) {
          newYPos = this.yPos; // Prevent moving up past the line
        } else if (
          this.yPos + this.size <= opponentLineY &&
          newYPos + this.size > opponentLineY
        ) {
          newYPos = this.yPos; // Prevent moving down past the line
        }
      }
    }

    this.xPos = newXPos;
    this.yPos = newYPos;
  }

  checkCollision(opponent) {
    // Check if player's bounding box intersects with opponent's bounding box
    if (
      this.xPos < opponent.xPos + opponent.size &&this.xPos + this.size -30 > opponent.xPos &&
      this.yPos < opponent.yPos + opponent.size &&this.yPos + this.size +50 > opponent.yPos
    ) {
      this.xPos += 10;
      return true;
    }
    return false;
  }
}