class Rock {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.sprite = ASSET_MANAGER.getAsset("../res/Rocks.png");

    }

    draw(ctx) {

    }

    update() {

    }
}