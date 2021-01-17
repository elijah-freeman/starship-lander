class Astronaut {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        // Astronaut sprite sheet animations.
        this.spriteWalkLeft = ASSET_MANAGER.getAsset("../res/astronaut/astronaut-left.png");
        this.spriteWalkRight = ASSET_MANAGER.getAsset("../res/astronaut/astronaut-right.png");
        this.spriteMoveUpRight = ASSET_MANAGER.getAsset("../res/astronaut/astronautUpRightDir.png");
        this.spriteMoveUpLeft = ASSET_MANAGER.getAsset("../res/astronaut/astronautUpLeftDir.png");
        this.spriteDownRight = ASSET_MANAGER.getAsset("../res/astronaut/astronautDownRight.png");
        this.spriteDownLeft = ASSET_MANAGER.getAsset("../res/astronaut/astronautDownLeft.png");
        this.spriteUpRight = ASSET_MANAGER.getAsset("../res/astronaut/astronautUpRight.png");
        this.spriteUpLeft = ASSET_MANAGER.getAsset("../res/astronaut/astronautUpRight.png");

        this.animations = [];

        this.direction = 1;
        this.facing = 1;
        this.velocity = {x : 0, y : 0};

        // Scalar value to determine size of astronaut.
        this.scaleSize = 2;

        this.loadAnimations();
        this.updateBB();
    };

    /**
     * Creates new animator objects for each astronaut animation and appends those animations
     * to a list of animations.
     */
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

    /**
     * Update method for astronaut bounding box.
     */
    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 42 * this.scaleSize, 54 * this.scaleSize);
    };

    /**
     * Update method for astronaut. This method is responsible for updating and controlling the astronauts
     * directions and animations according to the keyboard input. Method is also responsible for the physics for this
     * astronaut.
     */
    update() {
        // Directions that the astronaut moves in.
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
        // Directions that the astronaut faces.
        const Facing = {
            LEFT: 0,
            RIGHT: 1
        }

        // Physics
        const TICK = this.game.clockTick;
        const WALK_VEL = 500.0;
        this.velocity.x = 0;
        this.velocity.y = 0;

        // Move Right
        if (this.game.right && !this.game.left && !this.game.up) {
            this.velocity.x += WALK_VEL;
            this.direction = Move.RIGHT;
            this.facing = Facing.RIGHT;
        }
        // Move Left
        else if (this.game.left && !this.game.right && !this.game.up) {
            this.velocity.x -= WALK_VEL;
            this.direction = Move.LEFT;
            this.facing = Facing.LEFT;
        }
        // Move Up and Right
        else if (this.game.up && this.game.right && !this.game.left) {
            this.velocity.y -= WALK_VEL;
            this.velocity.x += WALK_VEL;
            this.direction = Move.UP_RIGHT;
            this.facing = Facing.RIGHT;
        }
        // Move Up and Left
        else if (this.game.up && !this.game.right && this.game.left) {
            this.velocity.y -= WALK_VEL;
            this.velocity.x -= WALK_VEL;
            this.direction = Move.UP_LEFT;
            this.facing = Facing.LEFT;
        }
        // Move Up
        else if (this.game.up && !this.game.right && !this.game.left) {
            this.velocity.y -= WALK_VEL;
            if (this.facing === Facing.LEFT) {
                this.direction = Move.UP_FACE_LEFT;
            } else {
                this.direction = Move.UP_FACE_RIGHT;
            }
        }
        // Move down
        else if (this.game.down && !this.game.right && !this.game.left) {
            this.velocity.y += WALK_VEL;
            if (this.facing === Facing.LEFT) {
                this.direction = Move.DOWN_LEFT;
            } else {
                this.direction = Move.DOWN_RIGHT;
            }
        }

        // Update the coordinates of the astronaut.
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;


        // collisions
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if ((entity instanceof MarsGround || entity instanceof GreenAlien)
                && (that.BB.bottom - that.velocity.y * TICK * that.scaleSize) <= entity.BB.top) {
                    that.y = entity.BB.top - 40;
                    that.velocity.y === 0;
                }
            }
        });



        // Update Bounding Box
        this.updateBB();
    };

    /**
     * Draw method for the astronaut. Chooses an animation from list of different animations according to the astronauts
     * direction as specified in the astronaut update method.
     * @param ctx the context.
     */
    draw(ctx) {
        // Draw animation.
        this.animations[this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scaleSize);
        // For testing purposes.
        // console.log(`X=${this.x} , Y=${this.y}`);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}