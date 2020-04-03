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
				break;
			case gamePlaying:
				// draw game play screen
				game.currentState = gamePlaying;
				break;
		}
	});

	// Key Listener
	window.addEventListener('keydown', function(event) {
		switch (game.currentState) {
			case gameOver:
				if (event.keyCode === keyCodeBtn.R) {
					game.currentState = gamePlaying;
				}
				break;
		}
	});
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
	game.context.font = '36px Arial';
	game.context.fillText('Game Over :(', game.canvas.width / 2 - 100, game.canvas.height / 2);

	game.context.font = '24px Arial';
	game.context.fillText('Press R to Restart!', game.canvas.width / 2 - 95, game.canvas.height / 2 + 50);
};
