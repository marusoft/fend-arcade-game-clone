// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // enemies reappears randomly once off the canvas
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }
    // checks for collisions between the player and the enemies
    if (player.x < this.x + 80 && 
        player.x + 80 > this.x && 
        player.y < this.y + 60 && 
        60 + player.y > this.y) {

        player.x = 202;
        player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class on both x and y axis
var Player = function(x, y){
    // move along x and y axis
    this.x = x;
    this.y = y;
    // image of the player
    this.player = 'images/char-princess-girl.png';
}

// This class requires an update(), render() and
Player.prototype.update = function (dt) {
    
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function (keyPress) {
  
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };

    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };
  
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 600);

    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyLocation = [63, 147, 230];

enemyLocation.forEach( function(locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

var player = new Player(202, 405);


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

// access the div with an #root
const rootDiv = document.querySelector('#root');
// create a new div .startGame
const container = document.createElement('div');
container.setAttribute('class', 'startGame');
rootDiv.appendChild(container);

const h2 = document.createElement('h2');
h2.textContent = 'How To Play Classic Arcade Game';
const p = document.createElement('p');
p.textContent = `Use Left, Right, Up and Down arrowkeys to move the player left,right,up and down postion, avoiding player collision with the bugs crossing the road.
The challenge is to try to get to the water at the top of the road as much as possible and win the game`;

const button = document.createElement('button');
button.setAttribute('id', 'buttonId');
button.textContent = `Start the Adventure`;

container.appendChild(h2);
container.appendChild(p);
container.appendChild(button);

const buttonClick = document.querySelector('#buttonId');
console.log(buttonClick);


const startAdventure = () => {
    rootDiv.classList.add("hide");
}

buttonClick.addEventListener('click', startAdventure);

