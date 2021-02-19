class GreenAlien extends Alien {
    constructor(game, x, y, facing) {
	    super(game, x, y);
        Object.assign(this, {game, x, y, facing});

        // Green Alien sprite sheet animations.
        this.spritesheetLeft = ASSET_MANAGER.getAsset("./res/alien-left.png");
        this.spritesheetRight = ASSET_MANAGER.getAsset("./res/alien-right.png");
        this.animation = [];

        // Green Alien Physics
        this.velocity = {x: -PARAMS.BITWIDTH, y:0};

        // Scalar value to determine size of Green Alien.
        this.scaleSize  = 3;


        this.updateBB();
        this.loadAnimations();
    };

    /**
    * Creates new animator objects for each astronaut animation and appends those animations
    * to a list of animations.
    */
    loadAnimations() {
        this.animation.push(new Animator(this.spritesheetLeft, 0, 0,32, 32, 7, 0.2,
            0, false, true));
        this.animation.push(new Animator(this.spritesheetRight, 0, 0,32, 32, 7, 0.2,
            0, false, true));
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * this.scaleSize, 32 * this.scaleSize);
    };

    /**
     * Updates the movement and the direction that the Green Alien moves in.
     */
    update() {

        // Reverse alien if they come in contact with the canvas border
        if (this.BB.left <= 0 && this.facing === 0) {
            this.velocity.x = -this.velocity.x;
            this.facing = (this.facing + 1) % 2;
        }
        if (this.BB.right >= PARAMS.CANVAS_WIDTH && this.facing === 1) {
            this.velocity.x = -this.velocity.x;
            this.facing = (this.facing + 1) % 2;
        }

        // Update x, y coordinates of Green Alien.
        this.x += this.game.clockTick * this.velocity.x * PARAMS.SCALE;
        this.y += this.game.clockTick * this.velocity.y * PARAMS.SCALE;

        // Update velocity of Green Alien.
        this.velocity.y += 10 * this.game.clockTick;
        this.velocity.y = 0;

        // Update bounding box.
        this.updateBB();
    };

    /**
     * Draw method to animate Green Alien.
     * @param ctx the context.
     */
    draw(ctx) {
        // Animate Green Alien.
        this.animation[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y-this.game.camera.y, this.scaleSize);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };

}

class LaserBeam extends AlienProjectile {
	constructor(game, x, y) {
		super(game, x, y);
		Object.assign(this, {game, x, y});
	        this.projectileDamage = 1;
	}
}

