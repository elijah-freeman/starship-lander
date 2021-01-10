var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

// TODO - is path specified correctly?
ASSET_MANAGER.queueDownload("../res/Starship.png");

ASSET_MANAGER.downloadAll(function () {
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	var canvas = document.getElementById('gameWorld');

	var ctx = canvas.getContext('2d');

	// Getting the width of our canvas (adding to our params object).
	PARAMS.CANVAS_WIDTH = canvas.width;

	gameEngine.init(ctx);

	gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.start();
});
