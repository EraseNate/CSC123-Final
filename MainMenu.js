let playState;
let instState;
let exitState;

const DEFAULT = 0;
const HOVER = 1;
const CLICK = 2; 


class playButton 
{
    constructor()
        {
            rectMode(CENTER);
            textAlign(CENTER,CENTER);
            textSize(50);
            this.gameActive = false;
            rect(width/2, height/2, 200, 100);
            text("PLAY", width/2, height/2);
        }

    checkCollision()
        {
          textSize(50);
          rect(width/2,height/2,200,100);
            if (mouseX > (width/2) - 100 && mouseX < (width/2)+100 && mouseY > height/2-50 && mouseY < (height/2)+50)
            {
                if (mouseIsPressed)
                {
                    playState = CLICK;
                    this.gameActive = true;
                }
                else 
                {
                    playState = HOVER;
                }
            }
            else
            {
                playState = DEFAULT;
            }
            this.playState();
            rect(width/2,height/2,200,100)
            fill(0);
            text("PLAY", width/2, height/2);
            fill(255);
        }

    playState()
        {
            if (playState == DEFAULT) {
                fill(128, 0, 0);
              } else if (playState == HOVER) {
                fill(0, 0, 128);
              } else if (playState == CLICK) {
                fill(255);
              }
        }
}

class instButton
  {
    constructor()
      {
        rectMode(CENTER);
        textAlign(CENTER,CENTER);
        textSize(35);
        this.instActive = false;
        rect(width/2, 3*height/4, 200, 100);
        text("How To Play", width/2, 3*height/4);
      }
    checkCollision()
      {
        rect(width/2,3*height/4,200,100);
        if (mouseX > (width/2) - 100 && mouseX < (width/2)+100 && mouseY > (3*height/4) - 50 && mouseY < (3*height/4) + 50)
          {
            if (mouseIsPressed)
              {
                instState = CLICK;
                this.instActive = true;
              }
            else 
              {
                instState = HOVER;
              }
          }
          else
            {
              instState = DEFAULT;
            }
          this.instState();
          rect(width/2,3*height/4,200,100)
          fill(0);
          textSize(35);
          text("How To Play", width/2, 3*height/4);
          fill(255);
        }

    instState()
        {
            if (instState == DEFAULT) {
                fill(128, 0, 0);
              } else if (instState == HOVER) {
                fill(0, 0, 128);
              } else if (instState == CLICK) {
                fill(255);
              }
        }
    exitDisplay()
        {
            fill(180);
            rect(width/2, height/2, 700, 700);
            textSize(15);
            fill(255);
            text("This is how you play the game!", width/2, height/2);
            this.exitCollision();
        }
    exitCollision()
        {
            rect(740, 60, 20, 20);
            if (mouseX > 730 && mouseX < 750 && mouseY > 60 && mouseY < 80)
                {
                  if (mouseIsPressed)
                    {
                      exitState = CLICK;
                      this.instActive = false;
                    }
                  else 
                    {
                      exitState = HOVER;
                    }
                }
                else
                  {
                    exitState = DEFAULT;
                  }
            this.exitState();
            rect(740, 60, 20, 20);
            textSize(15);
            fill(0);
            text("X", 740, 60);
        }
    exitState()
        {
            if (exitState == DEFAULT) {
                fill(180, 0, 0);
              } else if (exitState == HOVER) {
                fill(180, 0, 0, 50);
              } else if (exitState == CLICK) {
                fill(255);
              }   
        }
  }

