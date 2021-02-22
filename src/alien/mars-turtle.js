class MarsTurtle extends Alien {
	constructor(game, x, y, type) {
		super(game, x, y);
		Object.assign(this, {game, x, y, type});

		this.spriteAttack = ASSET_MANAGER.getAsset('./res/mars-turtleAttack.png');
		this.widthAttack = 278;
		this.heightAttack = 167;

		this.spriteWalk = ASSET_MANAGER.getAsset('./res/mars-turtleWalking.png');
		this.widthWalk = 276;
		this.heightWalk = 171;

		this.scale = 1;
		this.velocity = {x, y};
		this.isModeAttack = false;
		this.health = 100;

		this.animation = this.type;
		this.animations = [];
		this.loadAnimations();
		this.updateBB();
	}

	loadAnimations() {
		this.animations.push(new Animator(this.spriteWalk, 0, 0, this.widthWalk,
			this.heightWalk, 8, .25, 0, false, true));
		this.animations.push(new Animator(this.spriteAttack, 0, 0, this.widthAttack,
			this.heightAttack, 6, 0.25, 0, false, true));
	}

	update() {
		const speed = 10;
		const left = 0;

		if (!this.isModeAttack) {
			this.animation = 0;
			super.moveAlien(speed, left);
			setTimeout(() => {
				this.isModeAttack = true;
				this.animation = 1;
				}, 10000);

		} else {
			this.animation = 1;
		}

		if (this.isModeAttack) {
			setTimeout(() => {
				this.isModeAttack = false;
				this.animation = 0;
				}, 10000);
		}


		this.updateBB();
		this.checkCollision(this.game.entities);
	}

	checkCollision(entities) {
		const marsTurtle = this;

		entities.forEach(entity => {
			if (entity.BB && marsTurtle.BB.collide(entity.BB)) {
				if (entity instanceof AstronautLaser) {
					this.health = this.health > 0 ? this.health - 1 : 0;
					entity.removeFromWorld = true;
				}
			}
		})
	}
		
	updateBB() {
		if (this.animation) { // Attack animation
			super.setWidth(this.widthAttack);
			super.setHeight(this.heightAttack);
			super.updateBB();
		} else {
			super.setWidth(this.widthWalk);
			super.setHeight(this.heightWalk);
			super.updateBB();
		}
	}

	draw(ctx) {
		this.animations[this.animation].drawFrame(this.game.clockTick, ctx,
			this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
		super.draw(ctx);
	}
}



class BigFormBlast extends AlienProjectile {
	constructor(game, x, y) {
		super(game, x, y);
		Object.assign(this, {game, x, y});
		this.projectileDamage = 1;
	}
}
