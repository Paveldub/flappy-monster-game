function GameBackground(src, canvas) {
	// Base
	let bg = this;

	// Global attributes
	bg.canvas = canvas;
	bg.context = bg.canvas.getContext('2d');

	// Specifications
	bg.x = 0;
	bg.y = 0;
	bg.w = bg.canvas.width;
	bg.h = bg.canvas.height;
	bg.src = src;
	bg.img = null;

	// create bg image
	bg.create();
}

GameBackground.prototype.create = function() {
	// Base
	let bg = this;

	// create image
	bg.img = new Image();
	bg.img.src = bg.src;
};

GameBackground.prototype.draw = function() {
	// Base
	let bg = this;

	// Draw
	if (bg.img !== null) {
		bg.context.drawImage(bg.img, bg.x, bg.y, bg.w, bg.h);
	}
};
