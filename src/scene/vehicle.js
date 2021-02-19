class Vehicle {
	constructor(game, x, y) {
		Object.assign(this, { game, x, y });
	}

	update() {
		this.updateBB();
	}

	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.width * this.scale , this.height * this.scale);
	}

	draw(ctx) {
	
		if (PARAMS.DEBUG) {
		    ctx.strokestyle = 'Red';
		    ctx.strokeRect(this.BB.x - this.game.camera.x,
			    this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}
