class Starship {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        // TODO - what is this doing?
        this.game.starship = this;

        // TODO - is this path specified correctly?
        this.spritesheet = ASSET_MANAGER.getAsset("../res/Starship.png")

        this.updateBB();

        // States

        // Movement
        this.velocity = {x: 0, y: 0}

        // Animations
        this.animation = [];
        this.loadAnimations();
    };

    loadAnimations() {
        // TODO - Will be more complex after we add different animations.

        this.simpleAnimation = new Animator(this.spritesheet, 100, 100, 128, 128, 1, 0.33, 0, false, true);

    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };



    update() {
        // TODO - Clock is not based on 1 second, may need to update.
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

        // update position
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.updateBB();

    };

    draw(ctx) {

        // TODO - Change location of star ship on the map.
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y - this.game.camera.y);
        console.log(`X=${this.x} , Y=${this.y}`)
        // this.simpleAnimation.drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
        // this.simpleAnimation.drawFrame(this.game.clockTick, ctx, 0, 0, 1);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}