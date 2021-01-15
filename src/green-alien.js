class GreenAlien {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.velocity = {x: -PARAMS.BITWIDTH, y:0};
        this.spritesheetLeft = ASSET_MANAGER.getAsset("../res/Alien-left-spritesheet.png");
        this.alienspritesheet = ASSET_MANAGER.getAsset("../res/alien.png");
        this.animation = new Animator(this.alienspritesheet, 0, 0,32, 32, 7, 0.2,
            0, false, true);

        this.scaleSize  = 3;
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH)
    };

    update() {
        // TODO - Give this a proper acceleration.
        this.velocity.y += 10 * this.game.clockTick;
        this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
        this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;
        // TODO - need to consider how we are going to approach the bounding box when alien comes in contact w/ others.
        this.velocity.y = 0;
        this.updateBB();
    };

    draw(ctx) {
        // this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scaleSize);
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scaleSize);
    };






}