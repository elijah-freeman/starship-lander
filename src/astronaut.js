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
        this.facing = 1;


        this.scaleSize = 2;


    };



    loadAnimations() {
        this.animations.push(new Animator(this.spriteWalkLeft, 0, 0, 41, 54, 7, 0.2, 0, false, true));
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

        const Move = {
            LEFT: 0,
            RIGHT: 1,
            UP_RIGHT: 2,
            UP_LEFT: 3,
            DOWN_RIGHT: 4,
            DOWN_LEFT: 5,
            UP_FACE_RIGHT: 6,
            UP_FACE_LEFT: 7
        }
        const Facing = {
            LEFT: 0,
            RIGHT: 1
        }


        const WALK_VEL = 500.0;

        this.velocity.x = 0;
        this.velocity.y = 0;


        const TICK = this.game.clockTick;



        if (this.game.right && !this.game.left && !this.game.up) {
            this.velocity.x += WALK_VEL;
            this.direction = Move.RIGHT;
            this.facing = Facing.RIGHT;

        }
        else if (this.game.left && !this.game.right && !this.game.up) {
            this.velocity.x -= WALK_VEL;
            this.direction = Move.LEFT;
            this.facing = Facing.LEFT;
        }
        else if (this.game.up && !this.game.right && !this.game.left) {
            this.velocity.y -= WALK_VEL;
            if (this.facing === Facing.LEFT) {
                this.direction = Move.UP_FACE_LEFT;
            } else {
                this.direction = Move.UP_FACE_RIGHT;
            }
        }
        else if (this.game.up && this.game.right && !this.game.left) {
            this.velocity.y -= WALK_VEL;
            this.velocity.x += WALK_VEL;
            this.direction = Move.UP_RIGHT;
            this.facing = Facing.RIGHT;
        }
        else if (this.game.up && !this.game.right && this.game.left) {
            this.velocity.y -= WALK_VEL;
            this.velocity.x -= WALK_VEL;
            this.direction = Move.UP_LEFT;
            this.facing = Facing.LEFT;
        }

        // else if (this.game.down && this.game.right && !this.game.left) {
        //     this.velocity.y += WALK_VEL;
        //     this.velocity.x += WALK_VEL;
        //     this.direction = Move.DOWN_RIGHT;
        // }
        // else if (this.game.down && !this.game.right && this.game.left) {
        //     this.velocity.y -= WALK_VEL;
        //     this.velocity.x -= WALK_VEL;
        //     this.direction = Move.DOWN_LEFT;
        // }

        else if (this.game.down && !this.game.right && !this.game.left) {
            this.velocity.y += WALK_VEL;

            if (this.facing === Facing.LEFT) {
                this.direction = Move.DOWN_LEFT;
            } else {
                this.direction = Move.DOWN_RIGHT;
            }

        }


        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;

























        // if (this.game.left) {
        //     this.velocity.x -= 50.0;
        // }
        // if (this.game.right) {
        //     this.velocity.x += 50.0;
        // }
        // if (this.game.up) {
        //     this.velocity.y -= 50.0;
        // }
        // if (this.game.down) {
        //     this.velocity.y += 50.0;
        // }
        //
        // this.x += this.velocity.x * TICK * PARAMS.SCALE;
        // this.y += this.velocity.y * TICK * PARAMS.SCALE;
        // this.updateBB();
        //






    };

    draw(ctx) {

        this.animations[this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scaleSize);
        console.log(`X=${this.x} , Y=${this.y}`);


        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }

    };

}