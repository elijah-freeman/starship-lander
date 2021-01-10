// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.showOutlines = false;
        this.ctx = null;

        // TODO - For mouse control
        // this.click = null;
        // this.mouse = null;
        // this.wheel = null;
        // this.surfaceWidth = null;
        // this.surfaceHeight = null;


        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        var that = this;


        // Go to canvas and add a listener to function and listen for "keydown" event. When that
        // event is triggered it will pass in the event to the anonymous function for execution.
        this.ctx.canvas.addEventListener("keydown", function (e) {
            console.log(e);
            switch (e.code) {
                // Set up in this way so that user can use WASD or arrow keys.
                case "ArrowLeft":
                case "KeyA":
                    that.left = true; // left is a property in defined in our gameengine constructor
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
            }
        }, false);

        // This lets us know when the key is released.
        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
            }
        }, false);






        // TODO - The following commented code is for mouse input.
        // var getXandY = function (e) {
        //     var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        //     var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;
        //
        //     return { x: x, y: y };
        // }
        //
        // this.ctx.canvas.addEventListener("mousemove", function (e) {
        //     //console.log(getXandY(e));
        //     that.mouse = getXandY(e);
        // }, false);
        //
        // this.ctx.canvas.addEventListener("click", function (e) {
        //     //console.log(getXandY(e));
        //     that.click = getXandY(e);
        // }, false);
        //
        // this.ctx.canvas.addEventListener("wheel", function (e) {
        //     //console.log(getXandY(e));
        //     that.wheel = e;
        //     //       console.log(e.wheelDelta);
        //     e.preventDefault();
        // }, false);
        //
        // this.ctx.canvas.addEventListener("contextmenu", function (e) {
        //     //console.log(getXandY(e));
        //     that.rightclick = getXandY(e);
        //     e.preventDefault();
        // }, false);

    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.save();
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
    };

    update() {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            // TODO - Remove after implementing below if-statement
            entity.update();

            // TODO - Currently do not have this function (found in enemies class - supermariobros)
            // if (!entity.removeFromWorld) {
            //     entity.update();
            // }
        }

        // TODO - Currently do not have this function (found in enemies class - supermariobros)
        // for (var i = this.entities.length - 1; i >= 0; --i) {
        //     if (this.entities[i].removeFromWorld) {
        //         this.entities.splice(i, 1);
        //     }
        // }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};