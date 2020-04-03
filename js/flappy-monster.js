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

	// Bind Events
	game.bindEvents();

	// Create game objects
	game.createObjects();
}

FlappyMonster.prototype.createObjects = function() {
	// Base
	let game = this;
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
	game.context.fillText('Click to start!', game.canvas.width / 2 - 100, game.canvas.height / 2);
};

FlappyMonster.prototype.drawGamePlayingScreen = function() {
	// Base
	let game = this;

	// Draw

	// Background
	game.context.fillStyle = '#000';
	game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

	// Text
	game.context.fillStyle = '#fff';
	game.context.font = '36px Arial';
	game.context.fillText('Game playing', game.canvas.width / 2 - 100, game.canvas.height / 2);
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
