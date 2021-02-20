class Background {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.sprite = ASSET_MANAGER.getAsset("./res/marsLandscape.png");

        this.animation = new Animator(this.sprite, 0, 0, 512, 325, 1, 0.5, 0, false, true);
        this.scale = 2;
    }

    draw(ctx) {

        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x/100, this.y - this.game.camera.y, this.scale);
    }

    update() {}
}
