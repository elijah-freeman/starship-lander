const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./res/Starship.png");
ASSET_MANAGER.queueDownload("./res/alien-left.png");
ASSET_MANAGER.queueDownload("./res/alien-right.png");
ASSET_MANAGER.queueDownload("./res/chutulu.png");
ASSET_MANAGER.queueDownload("./res/astronaut/astronaut-left.png");
ASSET_MANAGER.queueDownload("./res/astronaut/astronaut-right.png");
ASSET_MANAGER.queueDownload("./res/astronaut/astronautUpRightDir.png");
ASSET_MANAGER.queueDownload("./res/astronaut/astronautUpLeftDir.png");
ASSET_MANAGER.queueDownload("./res/astronaut/astronautDownRight.png");
ASSET_MANAGER.queueDownload("./res/astronaut/astronautDownLeft.png");
ASSET_MANAGER.queueDownload("./res/astronaut/astronautUpRight.png");
ASSET_MANAGER.queueDownload("./res/astronaut/astronautUpLeft.png");
ASSET_MANAGER.queueDownload("./res/marsLandscape.png");
ASSET_MANAGER.queueDownload("./res/Rocks.png");
ASSET_MANAGER.queueDownload("./res/Boulder.png");
ASSET_MANAGER.queueDownload("./res/MarsRoverConcept.png");



ASSET_MANAGER.downloadAll(function () {
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	const canvas = document.getElementById('gameWorld');

	const ctx = canvas.getContext('2d');

	// Getting the width of our canvas (adding to our params object).
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	// console.log(`Canvas height: ${PARAMS.CANVAS_HEIGHT}`)

	gameEngine.init(ctx);

	gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.start();
});
