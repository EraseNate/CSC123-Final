// Character Class
class Character {
    constructor(x, y, health) {
      this.x = x;
      this.y = y;
      this.health = health;
    }
  
    draw() {
      rect(this.x, this.y, 200, 200); // Draw character
      this.drawHealthBar();
    }
  
    drawHealthBar() {
      push();
      fill(255, 0, 0);
      textSize(20);
      text(`Health = ${this.health}`, this.x + 50, this.y - 30);
      rect(this.x + 45, this.y - 25, map(this.health, 0, 1000, 0, 100), 20, 10); // Dynamic health bar
      pop();
    }
  
    takeDamage(amount) {
      this.health = max(0, this.health - amount); // Ensure health does not go below zero
    }
  }
  
  // Attack Class
  class Attack {
    constructor(damageRange, x, y) {
      this.damageRange = damageRange;
      this.x = x;
      this.y = y;
      this.width = 250;
      this.height = 50;
    }
  
    use() {
      return round(random(this.damageRange[0], this.damageRange[1]));
    }
  
    displayButton() {
      rect(this.x, this.y, this.width, this.height, 5);
    }
  
    isClicked(mx, my) {
      return (
        mx > this.x &&
        mx < this.x + this.width &&
        my > this.y &&
        my < this.y + this.height
      );
    }
  }
  
  // Game Class
  class Game {
    constructor() {
      this.player = new Character(80, 350, 1000);
      this.opponent = new Character(480, 100, 1000);
      this.attacks = [
        new Attack([300, 500], 50, 700),
        new Attack([300, 500], 50, 600),
        new Attack([20, 20], 350, 700),
        new Attack([20, 100], 350, 600),
      ];
      this.myTurn = true;
      this.gameOver = false;
      this.wonOrLost = null;
    }
  
    display() {
      if (this.gameOver) return this.displayGameOver();
  
      // Display characters
      this.player.draw();
      this.opponent.draw();
  
      // Display attack options
      for (let i = 0; i < this.attacks.length; i++) {
        this.attacks[i].displayButton();
      }
  
      this.displayTurn();
      this.displayMouseCoordinates();
    }
  
    playerAttack(index) {
      if (!this.myTurn || this.gameOver) return;
  
      const damage = this.attacks[index].use();
      this.opponent.takeDamage(damage);
  
      // Immediately check for game over after the attack
      if (this.opponent.health <= 0) {
        this.checkGameOver();
        return;
      }
  
      this.myTurn = false;
  
      setTimeout(() => this.opponentTurn(), 5000); // 5-second delay
    }
  
    opponentTurn() {
      if (this.myTurn || this.gameOver) return;
  
      const damage = random([100, 200, 300, 400]);
      this.player.takeDamage(damage);
  
      this.myTurn = true;
      this.checkGameOver();
    }
  
    checkGameOver() {
      if (this.opponent.health <= 0) {
        this.gameOver = true;
        this.wonOrLost = true;
  
        // Mark the opponent as defeated in the map
        if (scene.currentOpponent !== null) {
          scene.markOpponentDefeated(scene.currentOpponent);
        }
      } else if (this.player.health <= 0) {
        this.gameOver = true;
        this.wonOrLost = false;
      }
      console.log(this.wonOrLost);
    }
  
    displayGameOver() {
      push();
      background(0);
      fill(255);
      textSize(25);
      textAlign(CENTER, CENTER);
      text(
        this.player.health <= 0 ? "YOU LOST!" : "YOU WON!",
        width / 2,
        height / 2
      );
      pop();
  
      // Reset game state after 3 seconds and return to the map scene
      setTimeout(() => {
        this.resetGame();
        scene.sceneActive = true; // Switch back to the map scene
      }, 3000); // 3-second delay before returning to map scene
    }
  
    resetGame() {
      this.player.health = 1000;
      this.opponent.health = 1000;
      this.myTurn = true;
      this.gameOver = false;
      this.wonOrLost = null;
    }
  
    displayMouseCoordinates() {
      push();
      fill(0);
      text(`X: ${mouseX} | Y: ${mouseY}`, 10, height - 20);
      pop();
    }
  
    displayTurn() {
      push();
      textSize(30);
      text(this.myTurn ? "Your Turn" : "Opponent's Turn", 480, 370);
      pop();
    }
  }
  function mouseClicked() {
    if (game.myTurn && !scene.sceneActive) {
      for (let i = 0; i < game.attacks.length; i++) {
        if (game.attacks[i].isClicked(mouseX, mouseY)) {
          game.playerAttack(i);
          break;
        }
      }
    }
  }