class Game {
  constructor() {
    textFont(startFont);
    this.player = new Character(80, 350, 1000);
    this.opponent = new Enemy(480, 100, 1000, 'gray');
    this.attacks = [
      new Attack([500, 600], 50, 700, 3, "Strike"),
      new Attack([200, 250], 50, 600, 20, "Luminal Fire Ball"),
      new Attack([350, 400], 350, 700, 10, "Attack 2"),
      new Attack([250, 350], 350, 600, 12, "Attack 3"),
    ];
    this.myTurn = true;
    this.gameOver = false;
    this.wonOrLost = null;
    this.showAttackInfo = false;
    this.miniGame = new MiniGame(); // Mini-game instance
        this.enemyColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FF8800'];

  }
  setOpponent(opponentData) {
    this.opponent = new Enemy(480, 100, opponentData.health);
        const color = this.enemyColors[scene.currentOpponent % this.enemyColors.length];
        this.opponent = new Enemy(
      480, 
      100, 
      opponentData.health, 
      color
    );

  }

  display() {
    if (this.gameOver) return this.displayGameOver();

    // Display characters
    this.player.draw();
    this.opponent.draw();
    // Display mini-game if active
    if (this.miniGame.active) {
      this.miniGame.update();
      this.miniGame.draw();
    } else {
      // Display attack options
      for (let i = 0; i < this.attacks.length; i++) {
        this.attacks[i].displayButton();
      }

      this.displayTurn();
      this.displayAttackInfo();
      this.displayToggleButton();
    }
  }

  playerAttack(index) {
    if (!this.myTurn || this.gameOver) return;

    const attack = this.attacks[index];
    if (attack.usesRemaining > 0) {
      this.miniGame.increaseDifficulty(scene.currentOpponent || 0);
      const baseDamage = attack.use();

      this.miniGame.start((multiplier) => {
        // Adjusted damage calculation:
        // 1. Base minimum is now 40% of base damage
        const minimumDamage = Math.ceil(baseDamage * 0.4);
        // 2. Apply multiplier more consistently
        const calculatedDamage = round(baseDamage * (0.4 + multiplier * 0.6));
        // 3. Ensure damage stays within reasonable bounds
        const finalDamage = Math.min(
          Math.max(minimumDamage, calculatedDamage),
          attack.damageRange[1]
        );

        console.log(
          `Base damage: ${baseDamage}, Multiplier: ${multiplier}, Final damage: ${finalDamage}`
        );

        if (this.opponent) {
          this.opponent.takeDamage(finalDamage);
          console.log(`Opponent health after damage: ${this.opponent.health}`);
        }

        if (this.opponent.health <= 0) {
          this.checkGameOver();
          return;
        }

        this.myTurn = false;
        setTimeout(() => this.opponentTurn(), 2000);
      });
    }
  }

  opponentTurn() {
    if (this.myTurn || this.gameOver) return;
    const currentOpponent = scene.opponents[scene.currentOpponent];

    const damage = random(
      currentOpponent.damageRange[0],
      currentOpponent.damageRange[1]
    );
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
    textSize(100);
    textAlign(CENTER, CENTER);
    // textFont(startFont);
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
    }, 2000); // 3-second delay before returning to map scene
  }

  resetGame() {
    this.player.resetHealth();
    this.myTurn = true;
    this.gameOver = false;
    this.wonOrLost = null;
  }

  displayTurn() {
    push();
    fill(255);
    // textFont(startFont);
    textSize(50);
    text(this.myTurn ? "Your Turn" : "Opponent's Turn", 100, 150);
    pop();
  }
  displayToggleButton() {
    push();
    fill(0, 255, 0);
    rect(width - 150, height - 60, 140, 50, 10); // Draw button
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Attack Info", width - 80, height - 35); // Button label
    pop();
  }
  displayAttackInfo() {
    if (!this.showAttackInfo) return;

    push();
    fill(0, 0, 255, 150);
    rect(width / 2 - 200, height / 2 - 100, 400, 200);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);

    // Title
    textSize(20);
    text("Attack Information", width / 2, height / 2 - 80);
    textSize(16);

    for (let i = 0; i < this.attacks.length; i++) {
      const attack = this.attacks[i];
      const minDamage = Math.ceil(attack.damageRange[0] * 0.4); // Minimum possible damage
      const maxDamage = attack.damageRange[1]; // Maximum possible damage

      text(
        `${attack.name}: ${minDamage}-${maxDamage} dmg (${attack.usesRemaining}/${attack.maxUses} uses)`,
        width / 2,
        height / 2 - 40 + i * 30
      );
    }
    pop();
  }

  toggleAttackInfo() {
    this.showAttackInfo = !this.showAttackInfo; // Toggle the flag
  }
}

function mouseClicked() {
  if (!scene.sceneActive) {
    if (game.miniGame.active) {
      // Handle mini-game click
      game.miniGame.checkHit();
    } else if (game.myTurn) {
      for (let i = 0; i < game.attacks.length; i++) {
        // Check if the button is clicked and the attack has remaining uses
        if (
          game.attacks[i].isClicked(mouseX, mouseY) &&
          game.attacks[i].usesRemaining > 0
        ) {
          game.playerAttack(i);
          break;
        }
      }
    }

    // Check if the toggle button is clicked
    if (
      mouseX > width - 150 &&
      mouseX < width - 10 &&
      mouseY > height - 60 &&
      mouseY < height - 10
    ) {
      game.toggleAttackInfo();
    }
  }
}
