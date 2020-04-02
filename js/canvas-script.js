window.onload = function() {
	// canvas definition
	let canvas = document.getElementById('flappy-monster-game');

	// game object
	let flappyMonster = new this.FlappyMonster(canvas);
	flappyMonster.start();
};
