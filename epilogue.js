class Epilogue {
    constructor() {
      this.epilogueActive = false; // Controls whether the epilogue is displayed
      this.didWin = null; // Tracks if the player won (true), lost (false), or is undefined
    }
  
    setOutcome(didWin) {
      this.didWin = didWin; // Set the win/lose status
    }
  
    display() {
      push();
      background(0); // Black background for dramatic effect
      fill(255);
      textAlign(CENTER, CENTER);
  
      if (this.didWin === true) {
        // Winning screen
        textSize(50);
        text("Congratulations!", width / 2, height / 4);
        textSize(25);
        text(
          "You have successfully defeated all the Ethers\nand restored peace to Etherland.\n\n" +
          "The citizens rejoice as Etherland regains its former glory.\n\n" +
          "Thank you for playing!",
          width / 2,
          height / 2
        );
      } else if (this.didWin === false) {
        // Losing screen
        textSize(50);
        text("Game Over", width / 2, height / 4);
        textSize(25);
        text(
          "The Ethers have overrun Etherland.\n\n" +
          "Your journey has ended, but the fight is not over.\n\n" +
          "Thank you for trying.",
          width / 2,
          height / 2
        );
      }
  
      // Draw the "Play Again" button
      fill(50, 150, 255);
      rect(width / 2 - 100, height - 100, 200, 50, 10);
      fill(255);
      textSize(20);
      text("Play Again?", width / 2, height - 75);
  
      pop();
    }
  
    checkButtonClick(mouseX, mouseY) {
      // Check if the mouse click is within the button's boundaries
      if (
        mouseX > width / 2 - 100 &&
        mouseX < width / 2 + 100 &&
        mouseY > height - 100 &&
        mouseY < height - 50
      ) {
        return true;
      }
      return false;
    }
  
    handleClick(mouseX, mouseY, resetGame) {
      if (this.checkButtonClick(mouseX, mouseY)) {
        // Perform reset actions
        this.epilogueActive = false; // Deactivate epilogue
        this.didWin = null;          // Reset win/lose status
        resetGame();                 // Call the provided reset function
      }
    }
  }