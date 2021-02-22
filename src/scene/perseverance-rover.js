class PerseveranceRover extends Vehicle {
	constructor(game, x, y) {
		super(game, x, y);
		Object.assign(this, {game, x, y});

		this.sprite = ASSET_MANAGER.getAsset("./res/perseverance-rover.png");
		this.width = 156;
		this.height = 76;
		this.scale = 2;

		this.animation = new Animator(this.sprite, 0, 0, this.width, this.height, 10, 0.3, 0, false, true);
	}

	update() {
		let left = 0;
		let right = 1;
		let speed = 10;
		if (!this.x < 2500) {
			super.moveVehicle(speed, left);
		} else {
			super.moveVehicle(speed, right);
		}
		this.updateBB();
	}

	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
	}

	draw(ctx) {
		this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x,
			this.y - this.game.camera.y, this.scale);

		this.drawBoundingBox(ctx);
	}

	drawBoundingBox(ctx) {
		if (PARAMS.DEBUG) {
			ctx.strokestyle = 'Red';
			ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y,
				this.BB.width, this.BB.height);
		}
	}
}
