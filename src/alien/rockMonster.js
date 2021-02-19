class RockMonsterCreation extends Alien {
	constructor(game,  x, y) {
		super(game, x, y);
		Object.assign(this, {game, x, y});

		this.sprite = ASSET_MANAGER.getAsset('./res/rockMonsterCreation.png');
		this.width = 585;
		this.height = 225;
		this.scale = 1;

		this.animation =  0;
		this.animation = new Animator(this.sprite, 0, 0, this.width,
			this.height, 27, 0.25, 0, false, true);
	}

	update() {
		this.updateBB();
	}

	updateBB() {
		super.updateBB(this.x, this.y, this.width, this.height);
	}

	draw(ctx) {
		this.animation.drawFrame(this.game.clockTick, ctx,
			this.x - this.game.camera.x, this.y - this.game.camera.y, 
			this.scale);
		super.draw(ctx);
	}
}


class RockMonster extends Alien {
	constructor(game,  x, y) {
		super(game, x, y);
		Object.assign(this, {game, x, y});

		this.scale = 1;
	}

	update() {
		this.updateBB();
	}

	updateBB() {
		super.updateBB(this.x, this.y, this.width, this.height);
	}

	draw(ctx) {
		this.animation.drawFrame(this.game.clockTick, ctx,
			this.x - this.game.camera.x, this.y - this.game.camera.y, 
			this.scale);
		super.draw(ctx);
	}
}


class RockBlast extends AlienProjectiles {
	constructor(game, x, y) {
		super(game, x, y);
		Object.assign(this, {game, x, y});
		this.projectileDamage = 1;
	}
}

