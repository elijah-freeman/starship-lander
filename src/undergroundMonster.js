class UndergroundMonster {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y, type});

        this.spriteAttack = ASSET_MANAGER.getAsset('./res/undergroundMonsterAttack.png');
        this.widthAttack = 278;
        this.heightAttack = 167;

        this.spriteWalk = ASSET_MANAGER.getAsset('./res/undergroundMonsterWalking.png');
        this.widthWalk = 276;
        this.heightWalk = 171;

        this.scale = 3;
        this.velocity = {x, y};
        this.isAttack = false;
	    this.health = 100;

        this.animation = this.type;
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    }

    loadAnimations() {
        this.animations.push(new Animator(this.spriteWalk, 0, 0, this.widthWalk, this.heightWalk, 8, .25, 0, false, true));
        this.animations.push(new Animator(this.spriteAttack, 0, 0, this.widthAttack, this.heightAttack, 6, 0.25, 0, false, true));
    }

    update() {

        const TICK = this.game.clockTick;
        const speed = 100;
        this.velocity.x = 0;


        if (!this.isAttack) {
            this.animation = 0;
            this.velocity.x -= speed;

            setTimeout(() => {
               this.animation = 1;
               this.isAttack = true;
            },  10000);

        } else {
            this.animation = 1;

        }

        if (this.isAttack) {

            setTimeout(() => {
                this.isAttack = false;
                this.animation = 0;
            }, 10000);
        }

        // Update the coordinates of the astronaut.
        this.x += this.velocity.x * TICK * PARAMS.SCALE;

        if (this.health === 0 && this.y < PARAMS.CANVAS_HEIGHT - 250 && this.animation === 0) {
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
        }


        this.updateBB();

	    this.checkCollision(this.game.entities);

    }

	checkCollision(entities) {
		const undergroundMonster = this;

		entities.forEach(entity => {
			if (entity.BB && undergroundMonster.BB.collide(entity.BB)) {
				if (entity instanceof AstronautLaser) {
					this.health = this.health > 0 ? this.health - 1 : 0;
					console.log(`UndergroundMonster health: ${this.health}`);
					entity.removeFromWorld = true;
				}
			}
		})
	}
			
			

    updateBB() {
        if (this.animation) { // Attack animation
            this.BB = new BoundingBox(this.x, this.y, this.widthAttack * this.scale, this.heightAttack * this.scale);
        } else {
            this.BB = new BoundingBox(this.x, this.y, this.widthWalk * this.scale, this.heightWalk * this.scale);
        }
        // console.log(this.BB);
    }

    draw(ctx) {
        this.animations[this.animation].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokestyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }



}
