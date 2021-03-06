// initial scenario
// game playing scenario
// game over scenario

const initial = 1;
const gamePlaying = 2;
const gameOver = 3;

let keyCodeBtn = {
	R: 82
};

function FlappyMonster(canvas) {
	// Base
	let game = this;

	// Global Attributes
	game.canvas = canvas;
	game.context = game.canvas.getContext('2d');

	// Game State
	game.currentState = initial;

	// velocity
	game.velocity = 5;

	// Bind Events
	game.bindEvents();

	// Create game objects
	game.createObjects();
}

FlappyMonster.prototype.createObjects = function() {
	// Base
	let game = this;

	game.background1 = new GameBackground('../images/back.png', game.canvas);
	game.background2 = new GameBackground('../images/back.png', game.canvas);
	game.background2.x = game.canvas.width;

	// Score
	game.gameScore = new GameScore(game.canvas);
	game.gameScore.x = game.canvas.width - 130;
	game.gameScore.y = 70;

	// wall factory
	game.wallFactory = new WallFactory(game.canvas);

	// monster
	game.monster = new Monster('../images/monster.png', game.canvas);
};

FlappyMonster.prototype.bindEvents = function() {
	// Base
	let game = this;

	// Mouse listener
	game.canvas.addEventListener('click', function(evenet) {
		switch (game.currentState) {
			case initial:
				// draw initial screen
				game.currentState = gamePlaying;
				game.wallFactory.generateWalls();
				break;
			case gamePlaying:
				// draw game play screen
				game.monster.vy = -1 * game.velocity;
				break;
		}
	});

	// Key Listener
	window.addEventListener('keydown', function(event) {
		switch (game.currentState) {
			case gameOver:
				if (event.keyCode === keyCodeBtn.R) {
					game.reset();
					game.currentState = gamePlaying;
				}
				break;
		}
	});
};

FlappyMonster.prototype.reset = function() {
	// Base
	let game = this;

	// reset states
	game.gameScore.start = new Date();
	game.gameScore.score = 0;
	game.wallFactory.walls = [];
	game.monster.x = 115;
	game.monster.y = 115;
};

FlappyMonster.prototype.start = function() {
	// Base
	let game = this;

	// start game
	window.requestAnimationFrame(function() {
		game.runGameLoop();
	});
};

FlappyMonster.prototype.runGameLoop = function() {
	// Base
	let game = this;

	// game state
	switch (game.currentState) {
		case initial:
			// draw initial screen
			game.drawInitialScreen();
			break;
		case gamePlaying:
			// draw game play screen
			game.drawGamePlayingScreen();
			break;
		case gameOver:
			// draw game over screen
			game.drawGameOverScreen();
			break;
	}

	window.requestAnimationFrame(function() {
		game.runGameLoop();
	});
};

FlappyMonster.prototype.drawInitialScreen = function() {
	// Base
	let game = this;

	// Draw

	// Background
	game.context.fillStyle = '#000';
	game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

	// Text
	game.context.fillStyle = '#fff';
	game.context.font = '36px Arial';
	game.context.fillText('Click to start!', game.canvas.width / 2 - 120, game.canvas.height / 2);
};

FlappyMonster.prototype.drawGamePlayingScreen = function() {
	// Base
	let game = this;

	// clear canvas
	game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);

	// Draw bakground
	game.animateBackground();

	// draw score
	game.gameScore.draw();

	// draw walls
	game.drawWalls();

	// draw monster
	game.monster.draw();

	// collision check
	game.checkCollisions();
};

FlappyMonster.prototype.checkCollisions = function() {
	// Base
	let game = this;

	let walls = game.wallFactory.walls;

	for (let i = 0; i < walls.length; i++) {
		if (game.isCollded(game.monster, walls[i])) {
			game.currentState = gameOver;
		}
	}
};

FlappyMonster.prototype.isCollded = function(monster, wall) {
	// Base
	let game = this;

	let isCollided = true;

	// Monster coords
	let monsterTop = game.monster.y;
	let monsterBottom = game.monster.y + game.monster.h;
	let monsterLeft = game.monster.x;
	let monsterRight = game.monster.x + game.monster.w;

	// walls coords
	let wallTop = wall.y + wall.h + wall.gap; // top of lower wall
	let wallBottom = wall.y + wall.h; // bottom of bottom wall
	let wallRight = wall.x + wall.w;
	let wallLeft = wall.x;

	if ((monsterBottom < wallTop && monsterTop > wallBottom) || monsterLeft > wallRight || monsterRight < wallLeft) {
		isCollided = false;
	}

	return isCollided;
};

FlappyMonster.prototype.drawWalls = function() {
	// Base
	let game = this;

	// draw walls
	let walls = game.wallFactory.walls;

	for (let i = 0; i < walls.length; i++) {
		walls[i].draw();
		walls[i].x = walls[i].x - game.velocity;
	}

	game.removeExtraWalls();
};

FlappyMonster.prototype.removeExtraWalls = function() {
	// Base
	let game = this;

	// draw walls
	let walls = game.wallFactory.walls;

	for (let i = 0; i < walls.length; i++) {
		if (walls[i].x + walls[i].w < 0) {
			// remove
			walls.shift();
		}
	}
};

FlappyMonster.prototype.animateBackground = function() {
	// Base
	let game = this;

	// bg 1
	game.background1.draw();

	if (Math.abs(game.background1.x) > game.canvas.width) {
		game.background1.x = game.canvas.width - game.velocity;
	}

	game.background1.x = game.background1.x - game.velocity;

	// bg 2
	game.background2.draw();

	if (Math.abs(game.background2.x) > game.canvas.width) {
		game.background2.x = game.canvas.width - game.velocity;
	}

	game.background2.x = game.background2.x - game.velocity;
};

FlappyMonster.prototype.drawGameOverScreen = function() {
	// Base
	let game = this;

	// Draw

	// Background
	game.context.fillStyle = '#000';
	game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

	// Text
	game.context.fillStyle = '#fff';
	game.context.font = '54px Arial';
	game.context.fillText(
		'Your score : ' + game.gameScore.score,
		game.canvas.width / 2 - 180,
		game.canvas.height / 2 - 100
	);

	game.context.fillStyle = '#fff';
	game.context.font = '36px Arial';
	game.context.fillText('Game Over :(', game.canvas.width / 2 - 100, game.canvas.height / 2);

	game.context.font = '24px Arial';
	game.context.fillText('Press R to Restart!', game.canvas.width / 2 - 95, game.canvas.height / 2 + 50);
};
