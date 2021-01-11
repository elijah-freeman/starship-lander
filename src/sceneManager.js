class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.x = 0;
        this.y = 0;

        this.loadLevelOne();
    };

    // TODO - what is this function doing?
    clearEntities() {
        this.game.entities = [this];
    };

    loadLevelOne() {
        // TODO - May want to change (not sure what this is doing).
        this.x = 0;

        // TODO - w controls the number of blocks
        let ground = new MarsGround(this.game, 0, PARAMS.CANVAS_HEIGHT - PARAMS.BLOCKWIDTH, 10 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(ground);


        this.greenalien = new GreenAlien(gameEngine, 1000, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30);
        gameEngine.addEntity(this.greenalien);

        // TODO - May need to change according to blockwidth, etc
        this.starship = new Starship(gameEngine, 100, 100);
        gameEngine.addEntity(this.starship);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH /2;
        this.x = this.starship.x - midpoint;
        this.y = this.starship.y - midpoint;

    };

    draw(ctx) {

    };

}