class MarsGround {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.spritesheet = ASSET_MANAGER.getAsset("../res/MarsGround.png");
        this.BB = new BoundingBox(this.x, this.y, this.w, PARAMS.BLOCKWIDTH * 2);
        this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
        this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2);
    };

    update() {};

    draw(ctx) {
        let groundCount = this.w / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < groundCount; i++) {
            ctx.drawImage(this.spritesheet, 0, 0, 128, 128, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        }
    };

}