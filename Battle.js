// Character Class
class Character {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.maxHealth = health;
  }

  draw() {
    rect(this.x, this.y, 200, 200); // Draw character
    this.drawHealthBar(); // runs the function that draws the healthbar
  }

  drawHealthBar() {
    push();
    fill(255, 0, 0);
    textSize(20);
    const displayHealth = Math.round(this.health);
    text(`Health = ${displayHealth}`, this.x + 50, this.y - 30);
    rect(
      this.x + 45,
      this.y - 25,
      map(this.health, 0, this.maxHealth, 0, 100),
      20,
      10
    ); // Dynamic health bar the use of map is used to constatnly change the size as the variables for health and max change as the player takes damage
    pop();
  }

  takeDamage(amount) {
    this.health = max(0, this.health - amount); // Fixes the bug where the players health goes belows 0 and still runs a turn fixed it lol
  }
  resetHealth() {
    this.health = this.maxHealth; // this resets the health after a battle
  }
}

// Attack Class
class Attack {
  constructor(damageRange, x, y, maxUses, name) {
    this.damageRange = damageRange;
    this.x = x;
    this.y = y;
    this.width = 250;
    this.height = 50;
    this.maxUses = maxUses;
    this.usesRemaining = maxUses;
    this.name = name;
  }

  use() {
    if (this.usesRemaining > 0) {
      this.usesRemaining--;
      // Calculate normal damage using weighted average I literally do not know how I got this to work do not touch it and still kinda fucking sucks cuz even if you're slightly in the green you still get a good damge attack but this I got it to work so don't touch it. Its also 3 am and I don't think i can do this anymore
      const minDamage = this.damageRange[0];
      const maxDamage = this.damageRange[1];
      // Use weighted average: 70% min damage + 30% random bonus up to max
      const baseDamage = minDamage + random(0, maxDamage - minDamage) * 0.3;
      return round(baseDamage);
    }
  }

  displayButton() {
    push();

    // Makes sure the button doesn't work anymore if no uses remaining
    if (this.usesRemaining > 0) {
      fill(50, 150, 255);
    } else {
      fill(200); // For polish make the button white out so players know that the button can no longer by used
      rect(this.x, this.y, this.width, this.height, 5); // Draws the button again
    }

    rect(this.x, this.y, this.width, this.height, 5);
    fill(255);
    textSize(16);
    text(
      `${this.name} (${this.usesRemaining}/${this.maxUses})`,
      this.x + this.width / 2,
      this.y + this.height / 2
    );

    pop();
  }

  // This checks if the button is being clicked or not
  isClicked(mx, my) {
    return (
      mx > this.x &&
      mx < this.x + this.width &&
      my > this.y &&
      my < this.y + this.height
    );
  }
}

// This class handles the minigame element that we are using
class MiniGame {
  constructor() {
    this.barX = 300;
    this.barY = 500;
    this.barWidth = 200;
    this.barHeight = 30;

    this.sliderX = 300;
    this.sliderWidth = 20;
    this.direction = 2;

    const hitZoneWidth = 40;
    const hitZoneStart = this.barX + (this.barWidth - hitZoneWidth) / 2;
    this.hitZone = [hitZoneStart, hitZoneStart + hitZoneWidth];

    this.active = false;
    this.damageMultiplier = 0;
    this.callback = null;
    this.minimumMultiplier = 0.2;
    this.baseSpeed = 2;
    this.currentSpeed = this.baseSpeed;
  }
  // This function starts the
  start(callback) {
    this.active = true;
    this.sliderX = this.barX;
    this.direction = Math.abs(this.currentSpeed);
    this.callback = callback;
  }

  increaseDifficulty(opponentIndex) {
    this.currentSpeed = this.baseSpeed * (1 + opponentIndex * 0.5);

    const baseHitZoneWidth = 40;
    const newHitZoneWidth = Math.max(20, baseHitZoneWidth - opponentIndex * 3);

    const hitZoneStart = this.barX + (this.barWidth - newHitZoneWidth) / 2;
    this.hitZone = [hitZoneStart, hitZoneStart + newHitZoneWidth];
  }

  update() {
    if (!this.active) return;

    this.sliderX += this.direction;

    if (this.sliderX <= this.barX) {
      this.sliderX = this.barX;
      this.direction = Math.abs(this.currentSpeed);
    } else if (this.sliderX >= this.barX + this.barWidth - this.sliderWidth) {
      this.sliderX = this.barX + this.barWidth - this.sliderWidth;
      this.direction = -Math.abs(this.currentSpeed);
    }
  }

  draw() {
    if (!this.active) return;

    push();
    // Draw the background bar
    fill(200);
    rect(this.barX, this.barY, this.barWidth, this.barHeight);

    // Draw the hit zone
    fill(0, 255, 0);
    rect(
      this.hitZone[0],
      this.barY,
      this.hitZone[1] - this.hitZone[0],
      this.barHeight
    );

    // Draw the slider
    fill(255, 0, 0);
    rect(this.sliderX, this.barY, this.sliderWidth, this.barHeight);

    // Draw the multiplier value for feedback
    if (this.damageMultiplier > 0) {
      fill(0);
      textAlign(CENTER);
      textSize(16);
      text(
        `${round(this.damageMultiplier * 100)}%`,
        this.barX + this.barWidth / 2,
        this.barY - 10
      );
    }
    pop();
  }

  checkHit() {
    if (!this.active) return;

    const center = (this.hitZone[0] + this.hitZone[1]) / 2;
    const sliderCenter = this.sliderX + this.sliderWidth / 2;
    const distanceFromCenter = abs(sliderCenter - center);

    // Calculate the maximum possible distance from center
    const maxPossibleDistance = this.barWidth / 2;

    // Calculate zones
    const perfectZone = (this.hitZone[1] - this.hitZone[0]) / 2;
    const goodZone = perfectZone * 2;
    const fairZone = perfectZone * 3;

    // Calculate multiplier based on zones
    if (distanceFromCenter <= perfectZone) {
      // Perfect hit - 100% damage
      this.damageMultiplier = 1;
    } else if (distanceFromCenter <= goodZone) {
      // Good hit - 60-99% damage
      this.damageMultiplier = map(
        distanceFromCenter,
        perfectZone,
        goodZone,
        0.99,
        0.6
      );
    } else if (distanceFromCenter <= fairZone) {
      // Fair hit - 40-59% damage
      this.damageMultiplier = map(
        distanceFromCenter,
        goodZone,
        fairZone,
        0.59,
        0.4
      );
    } else {
      // Poor hit - 20-39% damage
      this.damageMultiplier = map(
        distanceFromCenter,
        fairZone,
        maxPossibleDistance,
        0.39,
        this.minimumMultiplier
      );
    }

    // Ensure multiplier stays within bounds
    this.damageMultiplier = constrain(
      this.damageMultiplier,
      this.minimumMultiplier,
      1
    );

    this.end();
  }

  end() {
    this.active = false;
    if (this.callback) {
      const finalMultiplier = this.damageMultiplier;
      this.callback(finalMultiplier);
      this.callback = null;
      this.damageMultiplier = 0;
    }
  }
}

// Game Class
class Game {
  constructor() {
    this.player = new Character(80, 350, 1000);
    this.opponent = new Character(480, 100, 1000);
    this.attacks = [
      new Attack([250, 400], 50, 700, 1, "Strike"),
      new Attack([150, 300], 50, 600, 20, "IDK"),
      new Attack([100, 200], 350, 700, 20, "IDK"),
      new Attack([50, 150], 350, 600, 20, "idk"),
    ];
    this.myTurn = true;
    this.gameOver = false;
    this.wonOrLost = null;
    this.showAttackInfo = false;
    this.miniGame = new MiniGame(); // Mini-game instance
  }
  setOpponent(opponentData) {
    this.opponent = new Character(480, 100, opponentData.health);
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
      this.displayMouseCoordinates();
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
    }, 2000); // 3-second delay before returning to map scene
  }

  resetGame() {
    this.player.resetHealth();
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
