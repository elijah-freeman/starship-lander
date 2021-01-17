class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.x = 0;
        this.y = 0;

        this.loadLevelOne();
    };

    loadLevelOne() {
        this.x = 0;
        this.y = 0;

        // Last parameters controls the number of blocks.
        this.game.addEntity(new MarsGround(this.game, -PARAMS.CANVAS_WIDTH/2, PARAMS.CANVAS_HEIGHT - PARAMS.BLOCKWIDTH, 20 * PARAMS.BLOCKWIDTH));

        // Green Aliens
        this.game.addEntity(new GreenAlien(this.game, 1000, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0));
        this.game.addEntity(new GreenAlien(this.game, 300, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0));
        this.game.addEntity(new GreenAlien(this.game, 1200, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0));
        this.game.addEntity(new GreenAlien(this.game, 600, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0));

        // TODO - May need to change according to blockwidth, etc
        this.game.addEntity(new Starship(this.game, -PARAMS.CANVAS_WIDTH * 2 + PARAMS.BLOCKWIDTH * 10, PARAMS.CANVAS_HEIGHT));

        this.astronaut = new Astronaut(this.game, 0, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH + 30);
        this.game.addEntity(this.astronaut);

    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH /2;

        if (this.astronaut.y < 100) {
            this.y = this.astronaut.y - 100;
        }

        this.x = this.astronaut.x - midpoint;

    };

    draw(ctx) {};

}