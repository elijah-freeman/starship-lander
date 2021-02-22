class SceneManager {
	constructor(game) {
		this.game = game;
		this.game.camera = this;

		this.x = 0;
		this.y = 0;

		this.isSpawnReady = true;
		this.loadLevelOne();
	}

	loadLevelOne() {
		this.x = 0;
		this.y = 0;

		// Background
		this.game.addEntity(new Background(this.game, -1024, 0,"./res/mars-landscape.png"));
		this.game.addEntity(new Background(this.game, 0, 0, "./res/mars-landscape.png"));
		this.game.addEntity(new Background(this.game, 1024, 0, "./res/mars-landscape.png"));
		this.game.addEntity(new Background(this.game, 2048, 0, "./res/mars-landscape.png"));

		// Rocks
		for (let i = 0; i < 1000; i++) {
			let xPosition = Math.floor(Math.random() * 5000);
			let yPosition = Math.floor(PARAMS.CANVAS_HEIGHT - Math.random() * 150 - 50);
			let type = Math.floor(Math.random() * 13);

			this.game.addEntity(new Rock(this.game, xPosition, yPosition, type));
		}

		for (let i = 0; i < 4000; i++) {
			let xPosition = Math.floor(Math.random() * 5000 + 2200);
			let yPosition = Math.floor(PARAMS.CANVAS_HEIGHT - Math.random() * 150 - 50);
			let type = Math.floor(Math.random() * 13);

			this.game.addEntity(new Rock(this.game, xPosition, yPosition, type));
		}

		this.game.addEntity(new Boulder(this.game, 1500, PARAMS.CANVAS_HEIGHT - 350));


		//Add Pickups
		for (let i = 0; i < 10; i++) {
			let xPosition = Math.floor(Math.random() * 7500 + 2200);
			let yPosition = PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH + 50;
			this.game.addEntity(new Battery(this.game, xPosition, yPosition));
		}

		for (let i = 0; i < 5; i++) {
			let xPosition = Math.floor(Math.random() * 7500 + 2200);
			let yPosition = PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH + 50;
			this.game.addEntity(new Oxygen(this.game, xPosition, yPosition));
		}

		for (let i = 0; i < 10; i++) {
			let xPosition = Math.floor(Math.random() * 7500 + 2200);
			let yPosition = PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH + 50;
			this.game.addEntity(new Jetpack(this.game, xPosition, yPosition));
		}

		// Vehicles
		this.game.addEntity(new MarsRoverConcept(this.game, 5000, PARAMS.CANVAS_HEIGHT - 325));
		this.game.addEntity(new PerseveranceRover(this.game, 6500, PARAMS.CANVAS_HEIGHT - 325));

		// Monsters
		this.game.addEntity(new MarsTurtle(this.game, 5200, PARAMS.CANVAS_HEIGHT - 325, 0));
		this.game.addEntity(new MarsTurtle(this.game, 8600, PARAMS.CANVAS_HEIGHT - 305, 1));


		this.game.addEntity(new SmallColonyHub(this.game, 7000, PARAMS.CANVAS_HEIGHT - 350));

		// Player
		this.astronaut = new Astronaut(this.game, 0, PARAMS.CANVAS_HEIGHT - 2 * PARAMS.BLOCKWIDTH + 30);
		this.game.addEntity(this.astronaut);

		this.game.addEntity(new Starship(this.game, -450, -270));
		this.game.addEntity(new LargeColonyHub(this.game, 7200, PARAMS.CANVAS_HEIGHT - 350));
		this.game.addEntity(new SmallColonyHub(this.game, 7000, PARAMS.CANVAS_HEIGHT - 150));
	}

	update() {
		PARAMS.DEBUG = document.getElementById("debug").checked;
		let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH /2;
		if (this.astronaut.y < 100) {
			this.y = this.astronaut.y - 100;
		}
		this.x = this.astronaut.x - midpoint;

		if (this.x >= 2200) {
			if (this.isSpawnReady) {
					this.game.addEntity(new RockMonsterCreation(this.game
						,this.x + 500, PARAMS.CANVAS_HEIGHT - 300));
				this.isSpawnReady = false;

				setTimeout(() => {
					this.isSpawnReady = true;
				}, 10000);
			}
		}

	}

	draw(ctx) {
		if (this.astronaut.isGameOver) {
			ctx.font = 40 + 'px "Orbitron"'
			ctx.fillStyle = "Black";
			ctx.fillText("Congratulations. You have ", 200, 100);
			ctx.fillText("safely reached the Mars base.", 200, 150);
			ctx.fillText("More challenges to come", 200, 300);
			ctx.fillText("in future updates", 200, 360);
		}
	};

}
