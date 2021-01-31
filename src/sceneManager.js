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

        // Background
        this.game.addEntity(new Background(this.game, -1024, 0,"./res/marsLandscape.png"));
        this.game.addEntity(new Background(this.game, 0, 0, "./res/marsLandscape.png"));
        this.game.addEntity(new Background(this.game, 1024, 0, "./res/marsLandscape.png"));
        this.game.addEntity(new Background(this.game, 2048, 0, "./res/marsLandscape.png"));

        // Rocks
        this.game.addEntity(new Rock(this.game, 100, PARAMS.CANVAS_HEIGHT - 100, 0));
        this.game.addEntity(new Rock(this.game, 200, PARAMS.CANVAS_HEIGHT - 100, 1));
        this.game.addEntity(new Rock(this.game, 250, PARAMS.CANVAS_HEIGHT - 115, 2));
        this.game.addEntity(new Rock(this.game, 150, PARAMS.CANVAS_HEIGHT - 90, 3));
        this.game.addEntity(new Rock(this.game, 200, PARAMS.CANVAS_HEIGHT - 100, 12));
        this.game.addEntity(new Rock(this.game, 350, PARAMS.CANVAS_HEIGHT - 100, 10));
        this.game.addEntity(new Rock(this.game, 300, PARAMS.CANVAS_HEIGHT - 100, 4));
        this.game.addEntity(new Rock(this.game, 400, PARAMS.CANVAS_HEIGHT - 100, 11));
        this.game.addEntity(new Rock(this.game, 500, PARAMS.CANVAS_HEIGHT - 100, 5));
        this.game.addEntity(new Rock(this.game, 600, PARAMS.CANVAS_HEIGHT - 100, 6));
        this.game.addEntity(new Rock(this.game, 900, PARAMS.CANVAS_HEIGHT - 100, 7));
        this.game.addEntity(new Rock(this.game, 1000, PARAMS.CANVAS_HEIGHT - 100, 8));
        this.game.addEntity(new Rock(this.game, 550, PARAMS.CANVAS_HEIGHT - 100, 9));

        this.game.addEntity(new Rock(this.game, 100, PARAMS.CANVAS_HEIGHT - 50, 11));
        this.game.addEntity(new Rock(this.game, 200, PARAMS.CANVAS_HEIGHT - 60, 5));
        this.game.addEntity(new Rock(this.game, 250, PARAMS.CANVAS_HEIGHT - 70, 3));
        this.game.addEntity(new Rock(this.game, 350, PARAMS.CANVAS_HEIGHT - 90, 3));
        this.game.addEntity(new Rock(this.game, 300, PARAMS.CANVAS_HEIGHT - 90, 6));
        this.game.addEntity(new Rock(this.game, 400, PARAMS.CANVAS_HEIGHT - 80, 6));
        this.game.addEntity(new Rock(this.game, 500, PARAMS.CANVAS_HEIGHT - 60, 12));
        this.game.addEntity(new Rock(this.game, 700, PARAMS.CANVAS_HEIGHT - 90, 5));
        this.game.addEntity(new Rock(this.game, 600, PARAMS.CANVAS_HEIGHT - 90, 0));
        this.game.addEntity(new Rock(this.game, 900, PARAMS.CANVAS_HEIGHT - 95, 1));
        this.game.addEntity(new Rock(this.game, 300, PARAMS.CANVAS_HEIGHT - 85, 2));
        this.game.addEntity(new Rock(this.game, 1000, PARAMS.CANVAS_HEIGHT - 90, 6));
        this.game.addEntity(new Rock(this.game, 550, PARAMS.CANVAS_HEIGHT - 50, 7));




        this.game.addEntity(new Rock(this.game, 1000, PARAMS.CANVAS_HEIGHT - 100, 0));
        this.game.addEntity(new Rock(this.game, 1000, PARAMS.CANVAS_HEIGHT - 120, 11));
        this.game.addEntity(new Rock(this.game, 1010, PARAMS.CANVAS_HEIGHT - 100, 2));
        this.game.addEntity(new Rock(this.game, 1100, PARAMS.CANVAS_HEIGHT - 100, 12));
        this.game.addEntity(new Rock(this.game, 1050, PARAMS.CANVAS_HEIGHT - 125, 1));
        this.game.addEntity(new Rock(this.game, 1070, PARAMS.CANVAS_HEIGHT - 135, 3));

        this.game.addEntity(new Rock(this.game, 1200, PARAMS.CANVAS_HEIGHT - 100, 11));
        this.game.addEntity(new Rock(this.game, 1250, PARAMS.CANVAS_HEIGHT - 100, 12));
        this.game.addEntity(new Rock(this.game, 1260, PARAMS.CANVAS_HEIGHT - 125, 9));
        this.game.addEntity(new Rock(this.game, 1290, PARAMS.CANVAS_HEIGHT - 135, 8));




        this.game.addEntity(new Rock(this.game, 1340, PARAMS.CANVAS_HEIGHT - 150, 0));
        this.game.addEntity(new Rock(this.game, 1330, PARAMS.CANVAS_HEIGHT - 150, 11));
        this.game.addEntity(new Rock(this.game, 1350, PARAMS.CANVAS_HEIGHT - 190, 2));
        this.game.addEntity(new Rock(this.game, 1340, PARAMS.CANVAS_HEIGHT - 200, 12));
        this.game.addEntity(new Rock(this.game, 1400, PARAMS.CANVAS_HEIGHT - 125, 1));
        this.game.addEntity(new Rock(this.game, 1450, PARAMS.CANVAS_HEIGHT - 135, 3));
        this.game.addEntity(new Rock(this.game, 1430, PARAMS.CANVAS_HEIGHT - 130, 3));
        this.game.addEntity(new Rock(this.game, 1500, PARAMS.CANVAS_HEIGHT - 150, 9));
        this.game.addEntity(new Rock(this.game, 1600, PARAMS.CANVAS_HEIGHT - 115, 12));
        this.game.addEntity(new Rock(this.game, 1700, PARAMS.CANVAS_HEIGHT - 120, 6));
        this.game.addEntity(new Rock(this.game, 1900, PARAMS.CANVAS_HEIGHT - 125, 9));
        this.game.addEntity(new Rock(this.game, 1750, PARAMS.CANVAS_HEIGHT - 160, 3));
        this.game.addEntity(new Rock(this.game, 1800, PARAMS.CANVAS_HEIGHT - 170, 1));



        for (let i = 0; i < 5000; i++) {
            let xPosition = Math.floor(Math.random() * 10000 + 2200);
            let yPosition = Math.floor(PARAMS.CANVAS_HEIGHT - Math.random() * 150 - 50);
            let type = Math.floor(Math.random() * 13);

            console.log(yPosition);

            this.game.addEntity(new Rock(this.game, xPosition, yPosition, type));
        }

        this.game.addEntity(new Boulder(this.game, 1500, PARAMS.CANVAS_HEIGHT - 350));


        for (let i = 0; i < 2000; i++) {
            let xPosition = Math.floor(Math.random() * 5000 + 10000);
            let yPosition = Math.floor(PARAMS.CANVAS_HEIGHT - Math.random() * 150 - 50);
            let type = Math.floor(Math.random() * 13);

            console.log(yPosition);

            this.game.addEntity(new Rock(this.game, xPosition, yPosition, type));
        }









        this.game.addEntity(new MarsRoverConcept(this.game, 5000, PARAMS.CANVAS_HEIGHT - 325));



        // Green Aliens
        this.game.addEntity(new GreenAlien(this.game, 1000, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0));
        this.game.addEntity(new GreenAlien(this.game, 300, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0));
        this.game.addEntity(new GreenAlien(this.game, 1200, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0));
        this.game.addEntity(new GreenAlien(this.game, 600, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH+30, 0));


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