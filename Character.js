// Character Class
class Character {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.maxHealth = health;
  }

  draw() {
    push();
    rect(this.x, this.y, 200, 200); // Draw character on battle
    circle(this.x, this.y, 20);
    this.drawHealthBar(); // runs the function that draws the healthbar
    pop();
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

// Character Class
class Enemy {
  constructor(x, y, health, color = "gray") {
    this.x = x;
    this.y = y;
    this.health = health;
    this.maxHealth = health;
    this.color = color;
  }

  draw() {
    push()
    fill(this.color);
    noStroke();
    rect(this.x + 50, this.y + 90, 120, 150);
    square(this.x, this.y, 130);
    beginShape();
    
    //legss
      push()
        translate(this.x-380,this.y-430);
        curveVertex(100, 500);
        curveVertex(500, 650);
        curveVertex(400, 730);
        curveVertex(600, 800);
        endShape();
    
        beginShape()
        curveVertex(100,500)
        curveVertex(500,600)
        curveVertex(500,750)
        curveVertex(600,800)
        endShape()
     
        beginShape()
        curveVertex(100,500)
        curveVertex(500,600)
        curveVertex(550,750)
        curveVertex(600,800)
        endShape()
      pop()
    
    //arms
      push()
        translate(this.x-390,this.y-403);
        beginShape()
        curveVertex(100,500)
        curveVertex(450,500)
        curveVertex(400,630)
        curveVertex(600,600)
        endShape()
  
        beginShape()
        curveVertex(100,500)
        curveVertex(500,460)
        curveVertex(620,650)
        curveVertex(600,1000)
        endShape()
      pop()
    
    push()
      fill(0)
      translate(this.x-400,this.y-400);
      triangle(420,440,420,460,460,460);
      triangle(510,440,510,460,470,460);
  
      fill(0);
      circle(430, 380, 80);
      circle(500, 380, 80);

      fill('#092E37');
      circle(440, 370, 65);
      circle(490, 370, 65);
    pop()
    
    this.drawHealthBar(); // runs the function that draws the healthbar
    pop();
  }

  drawHealthBar() {
    push();
    fill(255, 0, 0);
    textSize(20);
    const displayHealth = Math.round(this.health);
    text(`Health = ${displayHealth}`, this.x + 170, this.y - 30);
    rect(
      this.x + 170,
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
    this.currentSpeed = this.baseSpeed * (1 + opponentIndex * 0.3);

    const baseHitZoneWidth = 40;
    const newHitZoneWidth = Math.max(
      20,
      baseHitZoneWidth - opponentIndex * 1.5
    );

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
