class UndergroundMonster {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y, type});

        this.spriteAttack = ASSET_MANAGER.getAsset('./res/undergroundMonsterAttack.png');
        this.widthAttack = 278;
        this.heightAttack = 167;

        this.spriteWalk = ASSET_MANAGER.getAsset('./res/undergroundMonsterWalking.png');
        this.widthWalk = 276;
        this.heightWalk = 171;

        this.animation = this.type;
        this.scale = 3;

        this.animations = [];
        this.loadAnimations();
    }

    loadAnimations() {
        this.animations.push(new Animator(this.spriteWalk, 0, 0, this.widthWalk, this.heightWalk, 8, .25, 0, false, true));
        this.animations.push(new Animator(this.spriteAttack, 0, 0, this.widthAttack, this.heightAttack, 6, 0.25, 0, false, true));
    }

    update() {
        this.updateBB();
    }

    updateBB() {
        if (this.animation) { // Attack animation
            this.BB = new BoundingBox(this.x, this.y, this.widthAttack * this.scale, this.heightAttack * this.scale);
        } else {
            this.BB = new BoundingBox(this.x, this.y, this.widthWalk * this.scale, this.heightWalk * this.scale);
        }
    }

    draw(ctx) {
        this.animations[this.animation].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokestyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }



}