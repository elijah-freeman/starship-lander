class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.x = 0;


        this.loadLevelOne();
    };

    // TODO - what is this function doing?
    clearEntities() {
        this.game.entities = [this];
    };

    loadLevelOne() {
        // TODO - May want to change (not sure what this is doing).
        this.x = 0;

        // TODO - May need to change according to blockwidth, etc
        this.starship = new Starship(gameEngine, 100, 100);
        gameEngine.addEntity(this.starship);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;

    };

    draw(ctx) {

    };

}