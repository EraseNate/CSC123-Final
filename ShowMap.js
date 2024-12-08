// ShowMap Class
class ShowMap {
  constructor() {
    this.player = new Player(200, 20, 20);
    this.opponents = [
      new Opponent(75, 100, 20, 350, [50, 100], "#FF0000"),
      new Opponent(650, 200, 20, 450, [75, 100], "#00FF00"),
      new Opponent(250, 300, 20, 550, [120, 150], "#0000FF"),
      new Opponent(550, 400, 20, 650, [150, 200], "#FFFF00"),
      new Opponent(50, 500, 20, 850, [200, 300], "#FF00FF"),
      new Opponent(650, 600, 20, 950, [300, 350], "#00FFFF"),
      new Opponent(400, 700, 20, 1000, [350, 400], "#FF8800"),
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
          game.setOpponent({ health: this.opponents[i].health });
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