class Rock {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y, type});
        this.sprite = ASSET_MANAGER.getAsset("./res/Rocks.png");

        this.width = 35;
        this.height = 15;
        this.scale = 2;

        this.animations = [];
        this.loadAnimations();

    }

    loadAnimations() {
        this.animations.push(new Animator(this.sprite, 0, 0, this.width, this.height, 1, 0.5,0, false, true));
        this.animations.push(new Animator(this.sprite, this.width, 0, this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*2, 0,this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*3,0, this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*4, 0,this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*5, 0, this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*6, 0,this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*7, 0,this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*8, 0,this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*9, 0,this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*10, 0,this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*11, 0,this.width, this.height, 1, 0.5, 0, false, true));
        this.animations.push(new Animator(this.sprite, this.width*12, 0,this.width, this.height, 1, 0.5, 0, false, true));
    }

    draw(ctx) {
        this.animations[this.type].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

    }

    update() {

    }
}
