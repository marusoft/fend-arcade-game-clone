let playerPoints = 0;
let playerLives = 3;


// start game function
let startAdventure = () => { 
    rootDiv1.classList.add("hide");
    playerPoints = 0;
}
// reload page on win or lose
let replay = () => {
    window.location.reload(true);
}
// end of game function
let gameOver = () => {
    rootDiv2.classList.add("show");
}

// check available lives
let lifeLine = () => {
    if(availableLives.length === 0) {
        gameOver();
    }
}
// victory display
let victory = () => {
    rootDiv3.classList.add("show");
}


// access the div with an #root
const rootDiv1 = document.querySelector('#root');
//  Adventure Description modal
// create a new div .startGame
const container = document.createElement('div');
container.setAttribute('class', 'startGame');
rootDiv1.appendChild(container);

const h2 = document.createElement('h2');
h2.textContent = 'How To Play Classic Arcade Game';
const p = document.createElement('p');
p.textContent = `Use Left, Right, Up and Down arrowkeys to move the player left,right,up and down postion, avoiding player collision with the bugs crossing the road.
The challenge is to try to get to the water at the top of the road as much as possible and win the game`;
// create a button
const button = document.createElement('button');
// set id for button
button.setAttribute('id', 'buttonId');
button.textContent = `Start Adventure`;
// append siblings to the container class
container.appendChild(h2);
container.appendChild(p);
container.appendChild(button);

const buttonClick1 = document.querySelector('#buttonId');
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
const buttonGameOver = document.createElement('button');
buttonGameOver.setAttribute('id', 'gameId');
buttonGameOver.textContent = `Replay`;

gameOverContainer.appendChild(h3);
gameOverContainer.appendChild(h4);
gameOverContainer.appendChild(buttonGameOver);

// access the button
const buttonClick2 = document.querySelector('#gameId');
// event listener
buttonClick2.addEventListener('click', replay);



// victory modal
const rootDiv3 = document.querySelector('#winGame')
const gameWonContainer = document.createElement('div');
gameWonContainer.setAttribute('class', 'gameWon');
rootDiv3.appendChild(gameWonContainer);

const h5 = document.createElement('h5');
h5.textContent = 'Awesome';
const h6 = document.createElement('h6');
h6.textContent = `You are a Spartan`;
const buttonGameWon = document.createElement('button');
buttonGameWon.setAttribute('id', 'gameWonId');
buttonGameWon.textContent = `Replay`;

gameWonContainer.appendChild(h5);
gameWonContainer.appendChild(h6);
gameWonContainer.appendChild(buttonGameWon);

const buttonClick3 = document.querySelector('#gameWonId');

buttonClick3.addEventListener('click', replay);


// Enemies class 
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    this.location = ( x, y);
    this.speed = speed;

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// To Update the enemy's position, required method for game-Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += 100 * this.speed * dt;
    
    // collison detection
    if (parseInt(this.x)+ 100 >= playerX && parseInt(this.x) <= playerX + 40 && this.y === playerY){  
        player.reset();
        availableLives.pop();
        playerLives -= 1
        if (playerPoints >= 50){
            playerPoints -= 50;
        }
    }
    lifeLine();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// player class
var Player = function (x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
};
var playerX
var playerY

Player.prototype.update = function(){
    playerX = this.x;
    playerY = this.y;
}

// this draws player on canvas
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// method to handleInput() 
Player.prototype.handleInput = function(pressedKeys){
    if (pressedKeys === 'left' && this.x > 33){
        this.x -= 100;
    }
    else if (pressedKeys === 'up'&& this.y > 18){
        this.y -= 80;
    }
    else if (pressedKeys === 'right' && this.x < 400){
        this.x += 100
    }
    else if (pressedKeys === 'down' && this.y < 380){
        this.y += 80
    }
};
// to reset player to original position
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 380;
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
        playerPoints += 100;
        player.reset();
    }
    if (allKeys.length == 5){
        victory();
    } 
}

// class to give player points
var Points = function(x, y, score){
    this.x = x;
    this.y = y;
    this.score = "Game Point: "+ playerPoints
}
Points.prototype.render = function(){
    ctx.font = '20px serif';
    ctx.fillText(this.score, this.x, this.y);
}
Points.prototype.update = function(){
    this.score = " Game Point: " + playerPoints
}

// possible X-axis positions on board
var columns = [ -5, -100, -200, -300, -400];
var enemyX;

// possible Y-axis positions on board
var rows = [ 60, 140, 220];
var enemyY;

var enemySpeed;

// this is to randomly pick locations for bugs
setInterval(function instances(){
    enemyX = columns[Math.floor(Math.random() * 5)],
    enemyY = rows[Math.floor(Math.random() * 3)],
    enemySpeed = Math.floor(Math.random() * 15),
    allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed)); 
},500)



// Now instantiate your objects.
// allEnemies- array of all enemy objects 
var allEnemies = [ new Enemy(-8, 60, 3), new Enemy(0, 140, 10), new Enemy(-5, 300, 15)];

// Place the player object in a variable called player
var player = new Player( 200, 380);

// instantiate lives
var availableLives = [ new Lives(10, 540), new Lives(40, 540), new Lives(70, 540)];

var allKeys = [ ];

// instantiate winning blocks
var winningblocks = [ new Winblock(0, 20), new Winblock(100, 20), new Winblock(200, 20), new Winblock(300, 20), new Winblock(400, 20)];

var points = new Points(350, 570)
 

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
