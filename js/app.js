var playerScore = 0;
var playerLives = 3;

let gameOver = () => {

}

let lifeLine = () => {
    if(availableLives.length === 0) {
        gameOver()
    }
}

let victory = () => {

}


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

        player.reset();
        availableLives.pop();
        playerLives -= 1;

        if (playerScore >= 50) {
            playerScore -= 50;
        }

        player.x = 202;
        player.y = 405;
    }
    lifeLine();
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
};
var playerX;
var playerY;

// This class requires an update(), render() and
Player.prototype.update = function (dt) {
    playerX = this.x;
    playerY = this.y;

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

// reset the player to original position on collision with the enemy
Player.prototype.reset = function(){
    this.x = 202;
    this.y = 405;
}

// Lives class
var Lives = function(x, y){
    this.x = x;
    this.y = y
    this.sprite = 'images/Heart.png';
};
// render method for Lives class
Lives.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 28, 42);
}

// Key class
var Key = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Key.png';
}
// draws keys on the canvas
Key.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 90, 130);
}


//winning block class to figure out when a player wins
var Winblock = function(x, y){
    this.x = x;
    this.y = y
}

var winblockX
var winblockY
Winblock.prototype.update = function(){
    winblockX = this.x;
    winblockY = this.y;

    if((-Math.abs(winblockY)) == playerY && this.x == playerX){
        allKeys.push(new Key(winblockX, winblockY));
        playerScore += 100;
        player.reset();
    }
    if (allKeys.length == 5){
        console.log("You win Game");
        youWin();
    } 
}

// class to give player points
var Score = function(x, y, score){
    this.x = x;
    this.y = y;
    this.score = "Your score: "+ playerScore
}
Score.prototype.render = function(){
    ctx.font = '20px serif';
    ctx.fillText(this.score, this.x, this.y);
}
Score.prototype.update = function(){
    this.score = "Your scores: "+ playerScore
}




var allEnemies = [];
var enemyLocation = [63, 147, 230];

enemyLocation.forEach( function(locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

var player = new Player(202, 405);

// instantiate lives
var availableLives = [ new Lives(10, 540), new Lives(40, 540), new Lives(70, 540)];

var allKeys = [ ];

// instantiate winning blocks
var winningblocks = [ new Winblock(0, 20), new Winblock(100, 20), new Winblock(200, 20), new Winblock(300, 20), new Winblock(400, 20)];

var score = new Score(350, 570)


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
//  Adventure Description modal
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
button.textContent = `Start Adventure`;

container.appendChild(h2);
container.appendChild(p);
container.appendChild(button);

const buttonClick1 = document.querySelector('#buttonId');
// function to begin adventure
const startAdventure = () => {
    rootDiv.classList.add("hide");
    playerScore = 0;
}
// event listener
buttonClick1.addEventListener('click', startAdventure);



// gameOver modal
const rootDiv2 = document.querySelector('#game')
const gameOverContainer = document.createElement('div');
gameOverContainer.setAttribute('class', 'gameOver');
rootDiv2.appendChild(gameOverContainer);

const h3 = document.createElement('h3');
h3.textContent = 'End of game';
const h4 = document.createElement('h4');
h4.textContent = `You lost the game, Play another game`;
buttonGameOver = document.createElement('button');
buttonGameOver.setAttribute('id', 'gameId');
buttonGameOver.textContent = `Replay`;

gameOverContainer.appendChild(h3);
gameOverContainer.appendChild(h4);
gameOverContainer.appendChild(buttonGameOver);

const buttonClick2 = document.querySelector('#gameId');

const replay = () => {
    window.location.reload(true);
}

buttonClick2.addEventListener('click', replay);



// congratulation modal
const rootDiv3 = document.querySelector('#winGame')
const gameWonContainer = document.createElement('div');
gameWonContainer.setAttribute('class', 'gameWon');
rootDiv3.appendChild(gameWonContainer);

const h5 = document.createElement('h5');
h5.textContent = 'Awesome';
const h6 = document.createElement('h6');
h6.textContent = `You are a Spartan`;
buttonGameWon = document.createElement('button');
buttonGameWon.setAttribute('id', 'gameId');
buttonGameWon.textContent = `Replay`;

gameWonContainer.appendChild(h5);
gameWonContainer.appendChild(h6);
gameWonContainer.appendChild(buttonGameWon);

const buttonClick3 = document.querySelector('#gameId');

buttonClick3.addEventListener('click', replay);



