class Starship {
	constructor(game, x, y) {
		Object.assign(this, {game, x, y});
		this.spritesheet = ASSET_MANAGER.getAsset("./res/Starship.png")

		this.updateBB();
		this.width = 459;
		this.height = 972;
		this.velocity = {x: 0, y: 0}
	}

	updateBB() {
		this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
	}

	update() {};

	draw(ctx) {
		ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y);
	}
}
