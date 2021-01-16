class Astronaut {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.spriteWalkLeft = ASSET_MANAGER.getAsset("../res/astronaut/astronaut-left.png");
        this.spriteWalkRight = ASSET_MANAGER.getAsset("../res/astronaut/astronaut-right.png");
        this.spriteMoveUpRight = ASSET_MANAGER.getAsset("../res/astronaut/astronautUpRightDir.png");
        this.spriteMoveUpLeft = ASSET_MANAGER.getAsset("../res/astronaut/astronautUpLeftDir.png");
        this.spriteDownRight = ASSET_MANAGER.getAsset("../res/astronaut/astronautDownRight.png");
        this.spriteDownLeft = ASSET_MANAGER.getAsset("../res/astronaut/astronautDownLeft.png");
        this.spriteUpRight = ASSET_MANAGER.getAsset("../res/astronaut/astronautUpRight.png");
        this.spriteUpLeft = ASSET_MANAGER.getAsset("../res/astronaut/astronautUpRight.png");


        this.velocity = {x : 0, y : 0};

        this.animations = [];
        this.loadAnimations();

        this.updateBB();

        this.direction = 0;

        this.scaleSize = 2;
    };

    loadAnimations() {
        this.animations.push(new Animator(this.spriteWalkLeft, 0, 0, 41, 54, 7, 0.02, 0, false, true));
        this.animations.push(new Animator(this.spriteWalkRight, 0, 0, 41, 54, 7, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteMoveUpRight, 0, 0, 42, 51, 4, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteMoveUpLeft, 0, 0, 42, 51, 4, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteDownRight, 0, 0, 41, 52, 5, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteDownLeft, 0, 0, 41, 52, 5, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteUpRight, 0, 0, 41, 52, 4, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteUpLeft, 0, 0, 41, 52, 4, 0.2, 0, false, true));

    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    update() {
        this.velocity.x = 0;
        this.velocity.y = 0;

        const TICK = this.game.clockTick;

        if (this.game.left) {
            this.velocity.x -= 50.0;
        }
        if (this.game.right) {
            this.velocity.x += 50.0;
        }
        if (this.game.up) {
            this.velocity.y -= 50.0;
        }
        if (this.game.down) {
            this.velocity.y += 50.0;
        }

        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.updateBB();
    };

    draw(ctx) {

        this.animations[2].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scaleSize);
        console.log(`X=${this.x} , Y=${this.y}`);


        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }

    };

}