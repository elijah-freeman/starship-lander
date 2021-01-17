class Starship {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        // TODO - what is this doing?
        this.game.starship = this;

        // TODO - is this path specified correctly?
        this.spritesheet = ASSET_MANAGER.getAsset("../res/Starship.png")

        this.updateBB();

        // States

        this.scaleSize = 8;

        // Movement
        this.velocity = {x: 0, y: 0}

        // Animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        // TODO - Will be more complex after we add different animations.

        let simpleAnimation = new Animator(this.spritesheet, 0, 0, 128, 128, 1, 0.33, 0, false, true);
        this.animations.push(simpleAnimation);
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };



    update() {
        // TODO - Clock is not based on 1 second, may need to update.
        // this.velocity.x = 0;
        // this.velocity.y = 0;
        // const TICK = this.game.clockTick;
        //
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
        // // update position
        // this.x += this.velocity.x * TICK * PARAMS.SCALE;
        // this.y += this.velocity.y * TICK * PARAMS.SCALE;
        // this.updateBB();

    };

    draw(ctx) {

        // TODO - Change location of star ship on the map.
        // ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y);

        // ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y);

        // ctx.drawImage(this.spritesheet, this.x, this.y);
        console.log(`X=${this.x} , Y=${this.y}`)
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , PARAMS.CANVAS_HEIGHT - PARAMS.BLOCKWIDTH*this.scaleSize
            - this.game.camera.y, this.scaleSize);
        // this.simpleAnimation.drawFrame(this.game.clockTick, ctx, 0, 0, 1);

        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = "Red";
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    };
}