class LargeColonyHub {
	constructor(game, x, y) {
		Object.assign(this, {game, x, y});
		this.sprite = ASSET_MANAGER.getAsset("./res/colony-hub-large.png")
		this.width = 535;
		this.height = 165;
		this.scale = 2;
		this.animation = new Animator(this.sprite, 0, 0, this.width
						,this.height, 1, 0.5, 0, false, true);
		this.updateBB();
	}

	update() {}

	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.width * this.scale
						,this.height * this.scale );
	}

	draw(ctx) {
		this.animation.drawFrame(this.game.clockTick, ctx
				,this.x - this.game.camera.x, this.y - this.game.camera.y
				,this.scale);

		if (PARAMS.DEBUG) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x - this.game.camera.x
				    ,this.BB.y - this.game.camera.y, this.BB.width
				    ,this.BB.height);
		}
	}

}


class SmallColonyHub {
	constructor(game, x, y) {
		Object.assign(this, {game, x, y});
		this.sprite = ASSET_MANAGER.getAsset("./res/colony-hub-small.png")
		this.width = 328;
		this.height = 88;
		this.scale = 2;
		this.animation = new Animator(this.sprite, 0, 0, this.width
						,this.height, 1, 0.5, 0, false, true);
		this.updateBB();
	}

	update() {}

	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.width * this.scale
						,this.height * this.scale );
	}

	draw(ctx) {
		this.animation.drawFrame(this.game.clockTick, ctx
				,this.x - this.game.camera.x, this.y - this.game.camera.y
				,this.scale);

		if (PARAMS.DEBUG) {
			ctx.strokeStyle = 'Red';
			ctx.strokeRect(this.BB.x - this.game.camera.x
				    ,this.BB.y - this.game.camera.y, this.BB.width
				    ,this.BB.height);
		}
	}

}
