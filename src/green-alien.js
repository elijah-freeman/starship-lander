class GreenAlien {
    constructor(game, x, y, facing) {
        Object.assign(this, {game, x, y, facing});
        this.velocity = {x: -PARAMS.BITWIDTH, y:0};
        // this.velocity = {x: Math.pow(-1, this.facing) * PARAMS.BITWIDTH, y: 0};
        this.spritesheetLeft = ASSET_MANAGER.getAsset("../res/alien-left.png");
        this.spritesheetRight = ASSET_MANAGER.getAsset("../res/alien-right.png");
        this.animation = [];

        this.animation.push(new Animator(this.spritesheetLeft, 0, 0,32, 32, 7, 0.2,
            0, false, true));
        this.animation.push(new Animator(this.spritesheetRight, 0, 0,32, 32, 7, 0.2,
            0, false, true));

        this.updateBB();
        this.scaleSize  = 3;
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH)
    };

    update() {
        let that = this;
        // TODO - Give this a proper acceleration.
        this.velocity.y += 10 * this.game.clockTick;
        this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
        this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;
        // TODO - need to consider how we are going to approach the bounding box when alien comes in contact w/ others.
        this.velocity.y = 0;

  //       Reverse alien if they come in contact with the canvas border
        if (that.BB.left <= 0 && this.facing === 0) {
            that.velocity.x = -that.velocity.x;
            that.facing = (that.facing + 1) % 2;
        }

        if (that.BB.right >= PARAMS.CANVAS_WIDTH && this.facing === 1) {
            that.velocity.x = -that.velocity.x;
            that.facing = (that.facing + 1) % 2;
        }


        this.updateBB();
    };

    draw(ctx) {
        // this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scaleSize);
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scaleSize);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };






}