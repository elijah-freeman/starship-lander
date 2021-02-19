class AlienProjectile {
	constructor(game, x, y, width, height) {
		Object.assign(this, { game, x, y, width, height });
		this.updateBB();
	}

	update() {
		this.updateBB();
	}

	// TODO may need to update according to camera.
	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this,width, this.height);
	}

}

