class RockMonsterCreation extends Alien {
	constructor(game,  x, y) {
		super(game, x, y);
		Object.assign(this, {game, x, y});

		this.sprite = ASSET_MANAGER.getAsset('./res/rock-monster-creation.png');
		this.width = 585;
		this.height = 225;
		this.scale = 1;

		this.animation = new Animator(this.sprite, 0, 0, this.width,
			this.height, 27, 0.09, 0, false, false);

		setTimeout(() => {
			let x = this.x + this.width/2 - 60;
			this.game.addEntity(new RockMonster(this.game, x, this.y));
		}, 2400.3);
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

		this.fireProjectileRate = 20;
		this.fireProjectileCount = 0;
		this.isModeAttack = false;
		this.animationIndex =  1;
	}

	loadAnimations() {
		this.animations = [];
		this.animations.push(new Animator(this.aim, 0, 0, this.width,
			this.height, 11, 0.25, 0, false, false));

		this.animations.push(new Animator(this.move, 0, 0, this.width,
			this.height, 6, 0.25, 0, false, true));

		this.animations.push(new Animator(this.recoil, 0, 0, this.width,
			this.height, 6, 0.05, 0, false, true));
	}

	loadSprites() {
		this.aim = ASSET_MANAGER.getAsset('./res/rock-monster-aim.png');
		this.move = ASSET_MANAGER.getAsset('./res/rock-monster-move.png');
		this.recoil = ASSET_MANAGER.getAsset('./res/rock-monster-recoil.png');
	}

	update() {
		const ANIMATION = { AIM: 0, MOVE: 1, RECOIL: 2 };
		const speed = 50;
		const left = 0;

		if (!this.isModeAttack) {
			this.animationIndex = ANIMATION.MOVE;
			super.moveAlien(speed, left);
			setTimeout(() => {
				this.isModeAttack = true;
				}, 10000);

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
				}, 100000);
		}

		super.updateBB();
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

