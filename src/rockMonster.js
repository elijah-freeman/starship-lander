class RockMonster {
    constructor(game,  x, y) {
        Object.assign(this, {game, x, y});

        this.spriteCreation = ASSET_MANAGER.getAsset('./res/rockMonsterCreation.png');
        this.spriteCreationWidth = 585;
        this.spriteCreationHeight = 225;

        this.scale = 1;

        this.animation =  0;
        this.animations = [];
        this.loadAnimations();
    }

    loadAnimations() {
        this.animations.push(new Animator(this.spriteCreation, 0, 0, this.spriteCreationWidth, this.spriteCreationHeight, 27, 0.25, 0, false, true));
    }

    update() {
        this.updateBB();
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.spriteCreationWidth, this.spriteCreationHeight);
    }

    draw(ctx) {
        this.animations[this.animation].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.game.camera.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokestyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}