class Alien {
	constructor(game, x, y, width,  height, scale) {
		Object.assign(this, { game, x, y, width, height, scale });
	}

	update() {
		this.updateBB();
	}

	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.width * this.scale,
			this.height * this.scale);
	}

	setWidth(width) {
		this.width = width;
	}

	setHeight(height) {
		this.height = height;
	}

	setScale(scale) {
		this.scale = scale;
	}

	draw(ctx) {
		this.drawBoundingBox(ctx);
	}

	drawBoundingBox(ctx) {	
		if (PARAMS.DEBUG) {
			ctx.strokestyle = 'Red';
			ctx.strokeRect(this.BB.x - this.game.camera.x,
				this.BB.y - this.game.camera.y,	this.BB.width, this.BB.height);
		}
	}

	moveAlien(speed, direction) {
		let velocity = this.getVelocity(speed, direction);
		this.x += this.game.clockTick * velocity;
	}

	getVelocity(speed, direction) {
		return direction <= 0 ? -speed : speed;
	}
}
