class Pickups {
	constructor(game, x, y, spriteAsset, scale, width, height) {
		Object.assign(this, {game, x, y, spriteAsset, scale, width, height});

		this.sprite = ASSET_MANAGER.getAsset(this.spriteAsset);

		this.animation = new Animator(this.sprite, 0, 0, this.width, this.height, 1, 0.33, 0, false, true);

		this.updateBB();
	}

	update() {
		this.updateBB();
	}

	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
	}
    
	draw(ctx) {
		this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
	}
}
		


class Jetpack extends Pickups {
    constructor(game, x, y) {
        super(game, x, y, './res/jetpack.png', 2, 10, 20);
    }
}

class Oxygen extends Pickups {
    constructor(game, x, y) {
	    super(game, x, y, './res/oxygen.png', 2, 19, 26);
    }
}

class Battery extends Pickups {
    constructor(game, x, y) {
	    super(game, x, y, './res/battery.png', 2, 25, 12);
	    
        Object.assign(this, {game, x, y});

        this.scale = 2;
        this.width = 25;
        this.height = 12;
        this.sprite = ASSET_MANAGER.getAsset('./res/battery.png');

        this.animation = new Animator(this.sprite, 0, 0, this.width, this.height, 10, 0.33, 0, false, true);
	    
    }
	
    draw(ctx) {
	this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
    }
}
