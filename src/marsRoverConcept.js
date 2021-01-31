class MarsRoverConcept {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.sprite = ASSET_MANAGER.getAsset("./res/MarsRoverConcept.png");

        this.width = 122;
        this.height = 58;
        this.scale = 3;
        this.animation = new Animator(this.sprite, 0, 0, this.width, this.height, 1, 0.5, 0, false, true);
    }



    update() {
        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width * this.scale, this.height * this.scale);
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokestyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }



}