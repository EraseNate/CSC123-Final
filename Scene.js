// Player Class
class Player {
    constructor(xPos, yPos, size) {
      this.xPos = xPos;
      this.yPos = yPos;
      this.size = size;
      this.speed = 1.5; // Speed Movement
    }
  
    draw() {
      square(this.xPos, this.yPos, this.size);
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
        this.xPos < opponent.xPos + opponent.size &&
        this.xPos + this.size > opponent.xPos &&
        this.yPos < opponent.yPos + opponent.size &&
        this.yPos + this.size > opponent.yPos
      ) {
        this.xPos += 10;
        return true;
      }
      return false;
    }
  }
  
  // Opponent Class
  class Opponent {
    constructor(xPos, yPos, size) {
      this.xPos = xPos;
      this.yPos = yPos;
      this.size = size;
      this.defeated = false;
    }
  
    draw() {
      if (!this.defeated) {
        square(this.xPos, this.yPos, this.size);
        line(0, this.yPos + this.size, width, this.yPos + this.size);
      }
    }
  }
  
  // ShowMap Class
  class ShowMap {
    constructor() {
      this.player = new Player(200, 20, 20);
      this.opponents = [
        new Opponent(50, 100, 20),
        new Opponent(50, 200, 20),
        new Opponent(50, 300, 20),
        new Opponent(50, 400, 20),
        new Opponent(50, 500, 20),
        new Opponent(50, 600, 20),
        new Opponent(50, 700, 20),
      ];
      this.sceneActive = true; // Track if the map scene is active
      this.currentOpponent = null;
    }
  
    display() {
      if (!this.sceneActive) return; // Exit if collision detected and scene is inactive
  
      this.player.draw();
      this.player.update();
      for (let i = 0; i < this.opponents.length; i++) {
        if (!this.opponents[i].defeated) {
          // Only draw active opponents
          this.opponents[i].draw();
          if (this.player.checkCollision(this.opponents[i])) {
            console.log("Collision detected with " + i);
            this.currentOpponent = i; // Track the index of the current opponent
            this.sceneActive = false; // Stop showing map on collision
            break;
          }
        }
      }
    }
  
    markOpponentDefeated(index) {
      if (index >= 0 && index < this.opponents.length) {
        this.opponents[index].defeated = true;
      }
    }
  }