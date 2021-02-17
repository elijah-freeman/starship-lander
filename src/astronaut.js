class Astronaut {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});

        // Astronaut sprite sheet animations.
        this.spriteWalkLeft = ASSET_MANAGER.getAsset("./res/astronaut/astronaut-left.png");
        this.spriteWalkRight = ASSET_MANAGER.getAsset("./res/astronaut/astronaut-right.png");
        this.spriteMoveUpRight = ASSET_MANAGER.getAsset("./res/astronaut/astronautUpRightDir.png");
        this.spriteMoveUpLeft = ASSET_MANAGER.getAsset("./res/astronaut/astronautUpLeftDir.png");
        this.spriteDownRight = ASSET_MANAGER.getAsset("./res/astronaut/astronautDownRight.png");
        this.spriteDownLeft = ASSET_MANAGER.getAsset("./res/astronaut/astronautDownLeft.png");
        this.spriteUpRight = ASSET_MANAGER.getAsset("./res/astronaut/astronautUpRight.png");
        this.spriteUpLeft = ASSET_MANAGER.getAsset("./res/astronaut/astronautUpRight.png");

        this.animations = [];

        this.orientation = 1;
        this.facing = 1;
        this.velocity = {x : 0, y : 0};
        this.state = 0;

	    this.health = 10;
	    this.jetpackFuel = 5;
	    this.isFuelDecreasing = true;
	    this.oxygen = 10;

	    this.totalLife = 10;
	    this.damage = 1;

        // Scalar value to determine size of astronaut.
        this.scaleSize = 2;

        // needs to be dynamic
        this.width = 41 * this.scaleSize;
        this.height = 54 * this.scaleSize;

        this.laserPosition = this.x - this.game.camera.x + this.width + 63 - 27;
        this.isFireReady = true;


        this.loadAnimations();
        this.updateBB();
    };

    /**
     * Creates new animator objects for each astronaut animation and appends those animations
     * to a list of animations.
     */
    loadAnimations() {
        this.animations.push(new Animator(this.spriteWalkLeft, 0, 0, 41, 54, 7, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteWalkRight, 0, 0, 41, 54, 7, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteMoveUpRight, 0, 0, 42, 51, 4, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteMoveUpLeft, 0, 0, 42, 51, 4, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteDownRight, 0, 0, 41, 52, 5, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteDownLeft, 0, 0, 41, 52, 5, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteUpRight, 0, 0, 41, 52, 4, 0.2, 0, false, true));
        this.animations.push(new Animator(this.spriteUpLeft, 0, 0, 41, 52, 4, 0.2, 0, false, true));
    };

    /**
     * Update method for astronaut bounding box.
     */
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 42 * this.scaleSize, 54 * this.scaleSize);
    };

    /**
     * Update method for astronaut. This method is responsible for updating and controlling the astronauts
     * directions and animations according to the keyboard input. Method is also responsible for the physics for this
     * astronaut.
     */
    update() {

        // this.laserPosition = this.x - this.game.camera.x + this.width + 63 - 27;
        // Directions that the astronaut moves in.
        const Orientation = {
            LEFT: 0,
            RIGHT: 1,
            UP_RIGHT: 2,
            UP_LEFT: 3,
            DOWN_RIGHT: 4,
            DOWN_LEFT: 5,
            UP_FACE_RIGHT: 6,
            UP_FACE_LEFT: 7
        }
        // Directions that the astronaut faces.
        const Facing = {
            LEFT: 0,
            RIGHT: 1
        }

        // Current state of astronaut
        const State = {
            NEUTRAL : 0,
            FALLING : 1

        }

        // Physics
        const TICK = this.game.clockTick;
        const WALK_VELOCITY = 300.0;
        const FLY_VELOCITY = 900;
        const DECELERATE_VELOCITY = 500;
        const FALL_ACCELERATION = 600;

        this.velocity.x = 0;
        this.velocity.y = 0;

        // Orientation Right
        if (this.game.right && !this.game.left && !this.game.up) {
            this.velocity.x += WALK_VELOCITY;
            this.orientation = Orientation.RIGHT;
            this.facing = Facing.RIGHT;
            this.state = State.FALLING;
        }
        // Orientation Left
        else if (this.game.left && !this.game.right && !this.game.up) {
            this.velocity.x -= WALK_VELOCITY;
            this.orientation = Orientation.LEFT;
            this.facing = Facing.LEFT;
            this.state = State.FALLING;
	    this.startFuelTimeout();
        }
        // Orientation Up and Right
        else if (this.game.up && this.game.right && !this.game.left) {
            this.velocity.y -= FLY_VELOCITY;
            this.velocity.x += FLY_VELOCITY;
            this.orientation = Orientation.UP_RIGHT;
            this.facing = Facing.RIGHT;
            this.state = State.FALLING;
	    this.startFuelTimeout();
        }
        // Orientation Up and Left
        else if (this.game.up && !this.game.right && this.game.left) {
            this.velocity.y -= FLY_VELOCITY;
            this.velocity.x -= FLY_VELOCITY;
            this.orientation = Orientation.UP_LEFT;
            this.facing = Facing.LEFT;
            this.state = State.FALLING;
	    this.startFuelTimeout();
        }
        // Orientation Up
        else if (this.game.up && !this.game.right && !this.game.left) {
            this.velocity.y -= FLY_VELOCITY;
            if (this.facing === Facing.LEFT) {
                this.orientation = Orientation.UP_FACE_LEFT;
            } else {
                this.orientation = Orientation.UP_FACE_RIGHT;
            }
            this.state = State.FALLING;
	    this.startFuelTimeout();
        }
        // Orientation down
        else if (this.game.down && !this.game.right && !this.game.left) {
            if (this.y <= PARAMS.CANVAS_HEIGHT - PARAMS.GROUND_LEVEL) {
                this.velocity.y -= DECELERATE_VELOCITY;
            }

            if (this.facing === Facing.LEFT) {
                this.orientation = Orientation.DOWN_LEFT;
            } else {
                this.orientation = Orientation.DOWN_RIGHT;
            }
        }
        // Not moving
        else {
            this.state = State.FALLING;
            if (this.facing === Facing.LEFT) {
                this.orientation = Orientation.LEFT;
            } else {
                this.orientation = Orientation.RIGHT;
            }
        }

        // If you are are not moving up then fall until you reach ground level.
        if (this.state === State.FALLING && this.y < PARAMS.CANVAS_HEIGHT - PARAMS.GROUND_LEVEL ) {
            this.velocity.y += FALL_ACCELERATION;
        }

	    if (this.state === State.FALLING && this.y < PARAMS.CANVAS_HEIGHT - PARAMS.GROUND_LEVEL && !this.isFuelRemaining()) {
		    this.velocity.y += FALL_ACCELERATION;
	    }

	    console.log(this.isFuelRemaining());


        // Update the coordinates of the astronaut.
        this.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;
        this.updateBB();

        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {

                if (that.velocity.y > 0) {
                    if ((entity instanceof Boulder) && (that.lastBB.bottom) <= entity.BB.top) {
                        that.y = entity.BB.top - 110;
                        that.velocity.y = 0;
                        that.updateBB();
                    }
                }

                if ((entity instanceof Boulder) && that.BB.bottom > entity.BB.top) {
                    if (that.BB.right >= entity.BB.left && that.x <= entity.BB.left) {
                        that.x = entity.BB.left - 84;
                        if (that.velocity.x > 0) that.velocity.x = 0;
                    } else {
                        that.x = entity.BB.right;
                        if (that.velocity.x < 0) that.velocity.x = 0;
                    }
                    that.updateBB();
                }
            }
        });

        if (this.game.fire && this.isFireReady) {
            if (this.facing) {
                this.game.addEntity(new AstronautLaser(this.game, this.x - this.game.camera.x + this.width - 3 , this.y - this.game.camera.y + this.height/2 - 2, 1, this.facing));
            } else {
                this.game.addEntity(new AstronautLaser(this.game, this.x - this.game.camera.x - this.width/2 - 10, this.y - this.game.camera.y + this.height/2 - 2, 1, this.facing));

            }


            this.laserPosition = this.x - this.game.camera.x + this.width + 63 - 27;
            this.isFireReady = false;
            setTimeout(() => {
                this.isFireReady = true;
            }, 300);
        }

	    this.checkCollision(this.game.entities);
	    console.log(this.jetpackFuel);
    }

	checkCollision(entities) {
		let astronaut = this;
		entities.forEach(entity => {
			if (entity.BB && astronaut.BB.collide(entity.BB)) {
				if (entity instanceof UndergroundMonster) {
					this.health = this.health > 0 ? this.health - 1 : 0;

				} else if (entity instanceof Pickups) {
					// Determine what pickups
					this.determinePickup(entity);
					entity.removeFromWorld = true;
				}
			}
		})
	}

	determinePickup(entity) {

		if (entity instanceof Battery) {
			this.health += 1;
		} else if (entity instanceof Jetpack) {
			this.jetpackFuel += 1;
		} else if (entity instanceof Oxygen) {
			this.oxygen += 1;
		} 

	}

	isFuelRemaining() {
		let isJetpack = true;
		if (this.jetpackFuel <= 0) {
			isJetpack = false;
			this.jetpackFuel = 0;
		} 
		return isJetpack;
	}


	startFuelTimeout() {
		if (this.isFuelDecreasing) {
			this.isFuelDecreasing = false;
			this.jetpackFuel--;
			setTimeout(() => {
				this.isFuelDecreasing = true;
			}, 300);
		}
	}
			

    /**
     * Draw method for the astronaut. Chooses an animation from list of different animations according to the astronauts
     * direction as specified in the astronaut update method.
     * @param ctx the context.
     */
    draw(ctx) {
        // Draw animation.
        this.animations[this.orientation].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scaleSize);


	    ctx.fillStyle = "black";
	    ctx.fillRect(10, 10, 150, 15);
	    ctx.fillStyle = "blue";
	    ctx.fillRect(10, 10, 150, 10);
	    ctx.stroke();
	    

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}


class AstronautLaser {
    constructor(game, x, y, type, direction) {
        Object.assign(this, {game, x, y, type, direction});
        this.sprite = ASSET_MANAGER.getAsset('./res/astronautLaser.png');

        this.scale = 1;

        this.laserWidth = 63;
        this.laserHeight = 12;

        this.velocity = {x, y};
        this.animation = type;
        this.animations = [];
        this.animations.push(new Animator(this.sprite, 9, 0, this.laserWidth - 9, this.laserHeight, 1, 0.1, false, false, true));
        this.animations.push(new Animator(this.sprite, this.laserWidth, 0, this.laserWidth, this.laserHeight, 1, 1, false, false, true));
        this.updateBB();

    }


    updateBB() {
        this.BB = new BoundingBox(this.x + this.game.camera.x, this.y, this.laserWidth, this.laserHeight);
    }

    update() {
        const TICK = this.game.clockTick;
        const bulletSpeed = 100;

        this.velocity.x = 0;

        if (this.direction) {
            this.velocity.x += bulletSpeed;
        } else {
            this.velocity.x -= bulletSpeed;
        }

        this.x += this.velocity.x * TICK * this.scale;


        // TODO - may need some corrections.
        if (this.x > 10000 || this.x < -2000) {
            this.removeFromWorld = true;
        }

        this.updateBB();
    }

    draw(ctx) {
        this.animations[this.animation].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);



        if (PARAMS.DEBUG) {
            ctx.strokestyle = 'Red';
            ctx.strokeRect(this.BB.x , this.BB.y, this.BB.width, this.BB.height);
        }
    }

}
