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
        let ground = new MarsGround(this.game, 0, PARAMS.CANVAS_HEIGHT - PARAMS.BLOCKWIDTH, 10 * PARAMS.BLOCKWIDTH);
        this.game.addEntity(ground);

        // Green Aliens
        this.greenalien = new GreenAlien(this.game, 1000, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0);
        this.game.addEntity(this.greenalien);
        this.greenalien = new GreenAlien(this.game, 300, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0);
        this.game.addEntity(this.greenalien);
        this.greenalien = new GreenAlien(this.game, 1200, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0);
        this.game.addEntity(this.greenalien);
        this.greenalien = new GreenAlien(this.game, 600, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0);
        this.game.addEntity(this.greenalien);

        //chutulu
        this.chutulu = new Chutulu(this.game, 700, 20);
        this.game.addEntity(this.chutulu);

        // TODO - May need to change according to blockwidth, etc
        this.starship = new Starship(this.game, 100, 100);
        this.game.addEntity(this.starship);

        this.astronaut = new Astronaut(this.game, 0, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH + 30);
        this.game.addEntity(this.astronaut);

    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH /2;

        this.x = this.astronaut.x - midpoint;
        this.y = this.astronaut.y - midpoint;
    };

    draw(ctx) {};

}