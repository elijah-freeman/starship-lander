class Starship {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        this.game.starship = this;

        this.spritesheet = ASSET_MANAGER.getAsset("./res/starship.png")

        this.updateBB();
	    this.width = 459;
	    this.height = 972;

        // States

        this.scaleSize = 1;

        // Movement
        this.velocity = {x: 0, y: 0}

        // Animations
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {

        let simpleAnimation = new Animator(this.spritesheet, 0, 0, this.width, this.height, 1, 0.33, 0, false, true);
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

        // ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y);

        // ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y);

        // ctx.drawImage(this.spritesheet, this.x, this.y);
        // console.log(`X=${this.x} , Y=${this.y}`)
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , PARAMS.CANVAS_HEIGHT - PARAMS.BLOCKWIDTH*this.scaleSize
            - this.game.camera.y, this.scaleSize);
        // this.simpleAnimation.drawFrame(this.game.clockTick, ctx, 0, 0, 1);

        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = "Red";
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    };
}
