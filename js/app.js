class Character {

  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  render() { // Draw the enemy on the screen, required method for game
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Enemies our player must avoid
class Enemy extends Character {

  constructor(x = 100, y = 150, speed = 3) {
    super(x,y);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x>ctx.canvas.width) {
      this.x = -50; //TODO: find out enemies width
      this.y = Math.floor(Math.random() * 200) + 10;
    }
    this.x = this.x + this.speed;
    this.x*dt;
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {

  constructor(x = 200, y = 410) {
    super(x,y);
    this.sprite = 'images/char-pink-girl.png';
  }

  update(dt) {

  }

  handleInput(key) {
    switch(key) {
      case 'up':
        if(this.y>0){
          this.y = this.y-90;
        }
        break;
      case 'down':
        if(this.y<410){//TODO: find out player width, and use ctx.canvas.height
          this.y = this.y+90;
        }
        break;
      case 'left':
        if(this.x>0){
          this.x = this.x-100;
        }
        break;
      case 'right':
        if(this.x<400){
          this.x = this.x+100;
        }
        break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let enemy1 = new Enemy(100,150);
let enemy2 = new Enemy(200,50,4);
let enemy3 = new Enemy(20,220,2);
let allEnemies = [enemy1, enemy2, enemy3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Added buttons so one can play the game on mobile

const controllersHTML = `<section class="controllers">
  <img class="btn" src="images/down.svg" alt="down">
  <img class="btn" src="images/left.svg" alt="left">
  <img class="btn" src="images/right.svg" alt="right">
  <img class="btn" src="images/up.svg" alt="up">
</section>`;

document.body.insertAdjacentHTML( 'beforeend', controllersHTML);
const controllers = document.querySelector('.controllers');

controllers.addEventListener('click', function(e) {
  if(e.target.classList.contains('btn')) {
    player.handleInput(e.target.alt);
  }
});
