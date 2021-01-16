class Chutulu {

    constructor(game, x, y) {
        Object.assign(this, {game, x, y});


        this.spritesheetChutulu = ASSET_MANAGER.getAsset("../res/chutulu.png");

        this.animation = [];
        this.animation.push(new Animator(this.spritesheetChutulu, 0, 0, 270, 245, 10,
            0.2, false, true, true));


        this.updateBB();
        this.scaleSize = 2;
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH)
    };

    update() {

        this.updateBB();
    };

    draw(ctx) {
        this.animation[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scaleSize);

        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);;
        // }
    };
}