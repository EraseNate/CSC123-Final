class Epilogue
    {
        constructor()
            {
              this.epilogueActive = false;  
            }
        display()
            {
                push();

                background(0);
                fill(255);
                textAlign(CENTER, CENTER);
                textSize(50);
                text("Congratulations!", width/2, height/4);
                textSize(25);
                text(
                    "You have successfully defeated all the Ethers and restored peace to Etherland. \n\n" + 
                    "The citizens rejoice as Etherland regains it's former glory. \n\n" +
                    "Thank you for playing!",
                    width/2,
                    height/2
                    );
                fill(50, 150, 255);
                rect(width/2 - 100, height - 100, 200, 50, 10);
                fill(255);
                textSize(20);
                text("Play Again?", width/2, height - 75);

                pop();
            }
        checkButtonClick(mouseX, mouseY)
            {
                if (
                        mouseX > width / 2 - 100 &&
                        mouseX < width / 2 + 100 &&
                        mouseY > height - 100    &&
                        mouseY < height - 50
                   )
                   {
                    return true;
                   }
                return false;
            }
        clickHandler(mouseX, mouseY, resetGame)
            {
                if (this.checkButtonClick(mouseX, mouseY))
                {
                    this.epilogueActive = false;
                    resetGame();
                }
            }
    }
