class RockMonsterCreation extends Alien {
	constructor(game,  x, y, animationReverse, loopReverse) {
		super(game, x, y);
		Object.assign(this, {game, x, y, animationReverse, loopReverse});

		this.sprite = ASSET_MANAGER.getAsset('./res/rock-monster-creation.png');
		this.width = 585;
		this.height = 225;
		this.scale = 1;

		this.animation = new Animator(this.sprite, 0, 0, this.width
			, this.height, 27, 0.09, 0, this.animationReverse, this.loopReverse);
		
		if (!this.animationReverse) {
			this.animateRockMonster();
		} else {
			setTimeout(() => {
				this.removeFromWorld = true;
			}, 2200.3);
		}
		super.updateBB();
		 
		
	}

	animateRockMonster() {
		setTimeout(() => {
			let x = this.x + this.width/2 - 100;
			let y = this.y + 1;
			this.game.addEntity(new RockMonster(this.game, x, y));
			this.removeFromWorld = true;
		}, 2200.3);
	}

	update() {
		super.updateBB();
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

		this.width = 200;
		this.height = 200;
		this.scale = 1;
		this.loadSprites();
		this.loadAnimations();

		this.health = 20;
		this.fireProjectileRate = 20;
		this.fireProjectileCount = 0;
		this.isModeAttack = false;
		this.animationIndex =  1;
	}

	loadAnimations() {
		this.animations = [];
		this.animations.push(new Animator(this.aim, 0, 0, this.width
			,this.height, 11, 0.25, 0, false, false));

		this.animations.push(new Animator(this.move, 0, 0, this.width
			,this.height, 6, 0.25, 0, false, true));

		this.animations.push(new Animator(this.recoil, 0, 0, this.width
			,this.height, 6, 0.05, 0, false, true));
	}

	loadSprites() {
		this.aim = ASSET_MANAGER.getAsset('./res/rock-monster-aim.png');
		this.move = ASSET_MANAGER.getAsset('./res/rock-monster-move.png');
		this.recoil = ASSET_MANAGER.getAsset('./res/rock-monster-recoil.png');
	}

	update() {
		const ANIMATION = { AIM: 0, MOVE: 1, RECOIL: 2 };
		const speed = 25;
		const left = 0;

		if (!this.isModeAttack) {
			this.animationIndex = ANIMATION.MOVE;
			super.moveAlien(speed, left);
			setTimeout(() => {
				this.isModeAttack = true;
				}, 3000);

		} else {
			this.animationIndex = ANIMATION.RECOIL;
			if (this.fireProjectileRate === this.fireProjectileCount) {
				let y = Math.random() * 30 + this.y;
				this.game.addEntity(new RockShard(this.game, this.x, y + 35));
				this.fireProjectileCount = 0;
			}
			this.fireProjectileCount++;
		}

		if (this.isModeAttack) {
			setTimeout(() => {
				this.isModeAttack = false;
				}, 10000);
		}

		console.log(this.health);
		this.hasDied();
		super.updateBB();
		this.checkCollision(this.game.entities);

	}

	hasDied() {
		if (this.health <= 0) {
			let x = this.x - this.width/2 - 100;
			let y = this.y + 1;
			this.game.addEntity(new RockMonsterCreation(this.game, x, y, true));
			this.removeFromWorld = true;
		}
	}

	checkCollision(entities) {
		const rockMonster = this;
		entities.forEach(entity => {
			if (entity.BB && rockMonster.BB.collide(entity.BB)) {
				if (entity instanceof AstronautLaser) {
					this.health = this.health > 0 ? this.health - 1 : 0;
					entity.removeFromWorld = true;
				}
			}
		})
	}
	

	draw(ctx) {
		this.animations[this.animationIndex].drawFrame(this.game.clockTick, ctx,
			this.x - this.game.camera.x, this.y - this.game.camera.y, 
			this.scale);
		super.draw(ctx);
	}
}


class RockShard extends AlienProjectile {
	constructor(game, x, y) {
		super(game, x, y);
		Object.assign(this, {game, x, y});

		this.projectileDamage = 1;

		this.scale = 1;
		this.width = 37;
		this.height = 20;
		super.setWidth(this.width);
		super.setHeight(this.height);
		this.sprite = ASSET_MANAGER.getAsset('./res/rock-monster-bullet.png');

		this.animation = new Animator(this.sprite, 0, 0, this.width,
			this.height, 1, 0.25, 0, false, true);
	}

	update() {
		super.update();
		super.updateBB();
		super.fireProjectile(100, 0);
	}

	draw(ctx) {

		this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x,
			this.y - this.game.camera.y, this.scale);

		super.draw(ctx);
	}
}

