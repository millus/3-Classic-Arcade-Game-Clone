// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = 5;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x>ctx.canvas.width){
      this.x = -50; //TODO: find out enemies width
      this.y = Math.floor(Math.random() * 200) + 10;
    }
    this.x = this.x + this.speed;

    this.x*dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player () {
  this.x = 200;
  this.y = 420;
  this.sprite = 'images/char-pink-girl.png';
  this.update = function(dt) {
  }
  this.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  this.handleInput = function(key) {
    switch(key) {
      case 'up':
        if(this.y>0){
          this.y = this.y-50;
        }
        break;
      case 'down':
        if(this.y<420){//TODO: find out player width, and use ctx.canvas.height
          this.y = this.y+50;
        }
        break;
      case 'left':
        if(this.x>0){
          this.x = this.x-50;
        }
        break;
      case 'right':
        if(this.x<400){
          this.x = this.x+50;
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
let enemy2 = new Enemy(200,50);
let enemy3 = new Enemy(20,220);
let allEnemies = [enemy1, enemy2, enemy3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
