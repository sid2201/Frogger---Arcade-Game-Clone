/* app.js
 * This file contains definitions for the PLAYER and ENEMY objects
 * and also contains definitions of the update() and render() methods
 * for both of these objects.
 */
var Enemy = function() {
    /* @constructor
     * defines the enemy and its various properties
     */

    this.xRange = [-150, 600];
    this.possibleY = [60, 140, 220];
    this.speedRange = [150, 600];
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};


Enemy.prototype.update = function(dt) {
    /* Updates the enemy's position.
     * multiplying any movement by the dt parameter
     * which ensures that the game runs at the same speed
     * for all computers.
     */

    var maxPos = this.xRange[1];
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
};

Enemy.prototype.reset = function() {
    //resets the enemy's position once it reaches the end of the canvas.

    var startPos = this.xRange[0];
    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.randomSpeed();
};

Enemy.prototype.getRandomY = function() {
    //returns the random y value for the enemy reset function.

    return this.possibleY[Math.floor(Math.random() * this.possibleY.length)];
};


Enemy.prototype.randomSpeed = function() {
    //returns the random speed for the enemy reset function.

    var minSpeed = this.speedRange[0];
    var maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};


Enemy.prototype.render = function() {
    // draws the enemy on the screen.

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function() {
    /* @constructor
     * defines the player and its various properties
     */

    this.xRange = [-2, 402];
    this.yRange = [-20, 380];
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function() {
    this.checkCollisions();
};

Player.prototype.checkCollisions = function() {
    /* checks for collision between the player and the enemy
     * and resets the player to the initial position if there is collision.
     */

    if (this.y == -20) {
        this.reset();
    } else if (this.y >= 60 && this.y <= 220) {
        var playerThis = this;
        allEnemies.forEach(function(enemy) {
            if (enemy.y == playerThis.y) {
                if (enemy.x >= playerThis.x - 30 && enemy.x <= playerThis.x + 30) {
                    playerThis.reset();
                }
            }
        });
    }
}

Player.prototype.render = function() {
    //renders the player in the canvas.

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    //resets the player to the initial position

    this.x = 200;
    this.y = 380;
}


var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();

var allEnemies = [bug1, bug2, bug3];

var player = new Player();


document.addEventListener('keyup', function(e) {
    /* This listens for key presses and sends the keys to your
     * Player.handleInput() method.
     */

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.handleInput = function(key) {
    /* moves the player based on the key press.
     * also makes sure that the player does not go
     * out of bounds.
     */

    if (key === 'left') {
        this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
    } else if (key === 'right') {
        this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    } else if (key === 'up') {
        this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
    } else if (key === 'down') {
        this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
    }
}