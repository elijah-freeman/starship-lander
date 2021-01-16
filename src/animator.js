class Animator {

    /**
     * Instantiates our animator with our sprite sheet, and associated metrics.
     * The elapsed time represents how long our animation has been running. Use the elapsed time
     * total time, and frame duration to determine the current frame.
     *
     * @param spritesheet the sprite we are animating.
     * @param xStart the x coordinate of the starting point of our sprite in the sprite sheet (origin (0, 0) - top left).
     * @param yStart the y coordinate of the starting point of our sprite in the sprite sheet (origin (0, 0) - top left).
     * @param width the width of our sprite in pixels.
     * @param height the height of our sprite in pixels.
     * @param frameCount the number of frames required to animate our sprite.
     * @param frameDuration the duration of each frame in our sprite animation.
     * @param framePadding the number of pixels that pad each frame in our sprite sheet.
     * @param reverse true to run our animation in reverse, false otherwise.
     * @param loop true to have our animation loop, false otherwise.
     */
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding,
                                    reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;
    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime; // get back to original frame.
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1; // Calculate a new frame.

        ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart,
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration); // How many frames have gone by to get to this point
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
}
