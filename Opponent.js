// Opponent Class
class Opponent {
  constructor(xPos, yPos, size, health, damageRange, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.size = size;
    this.health = health;
    this.damageRange = damageRange;
    this.defeated = false;
    this.color = color;
  }

  draw() {
    if (!this.defeated) {
      push();
      fill(this.color);
      push();
      square(this.xPos, this.yPos, this.size); //opponent on levels
      translate(this.xPos-100, this.yPos - 160, this.size);
      noStroke();
      fill(0);
      rect(100, 100, 30, 15);
      rect(85, 115, 15, 50);
      rect(130, 115, 15, 50);
      rect(85, 165, 60, 15);
      triangle(85, 115, 100, 100, 115, 115);
      triangle(130, 100, 130, 115, 145, 115);

      fill(this.color);
      rect(110, 115, 20, 10);
      rect(100, 135, 10, 20);
      square(120, 135, 10);
      square(110, 145, 10);
      square(110, 155, 10);

      fill("#147373");
      rect(100, 115, 10, 20);
      square(120, 125, 10);
      rect(110, 125, 10, 20);
      rect(120, 145, 10, 20);
      square(100, 155, 10);
      pop();

      strokeWeight(2);
      line(0, this.yPos + this.size, width, this.yPos + this.size);
      pop();
    }
  }
}
