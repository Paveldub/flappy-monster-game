function Monster(src, canvas) {
	// base
	let monster = this;

	// global attr
	monster.canvas = canvas;
	monster.context = monster.canvas.getContext('2d');

	// specs
	monster.x = 115;
	monster.y = 115;
	monster.w = 115;
	monster.h = 115;
	monster.vy = 0;
	monster.g = 0.1;
	monster.src = src;
	monster.img = null;
	monster.frame = 0;

	// create monster tile image
	monster.create();
}

Monster.prototype.create = function() {
	// base
	let monster = this;

	// create image
	monster.img = new Image();
	monster.img.src = monster.src;
};

Monster.prototype.draw = function() {
	// Base
	let monster = this;

	// Draw
	if (monster.img !== null) {
		monster.vy += monster.g;
		monster.y += monster.vy;

		if (monster.y + monster.h > monster.canvas.height) {
			monster.y = monster.canvas.height - monster.h;
			monster.vy = 0;
		} else if (monster.y < 0) {
			monster.y = 0;
			monster.vy = 0;
		}

		monster.context.drawImage(
			monster.img,
			monster.frame * 115,
			0,
			115,
			100,
			monster.x,
			monster.y,
			monster.w,
			monster.h
		);
		monster.frame++;
		monster.frame %= 4;
	}
};
