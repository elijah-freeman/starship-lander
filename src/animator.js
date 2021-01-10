/*
Pick out frames that we want to animate and then call drawImage with prototype.

What frame are we on? Then paint frame.
 */
class Animator {
    /*
    Spritesheet - images
    xStart - where in the spritesheet does our animation start? - top left corner (0, 0).
    yStart - '' top left corner (0, 0).
    width, height - of the particular frame
    frameCount - how many frames are there (mario walk animation is a 3 frame animation)
    frameDuration - how long should each frame be painted on the canvas before we switch to the next frame (speed up/down anim.).
    framePadding - There might be empty whitespace between images in the spritesheet, important so that can get correct image.
    reverse - (boolean) should animation run in reverse?
    loop - (boolean) should animation loop? Walking animation is a looping animation. Jump animation may not be on loop. (same w/ shooting).
     */
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0; // The time that this animation has been running
        this.totalTime = this.frameCount * this.frameDuration;

        // Elapsed Time, Total Time, & Frame Duration is how we are going to determine what frame we are one.

    };

    drawFrame(tick, ctx, x, y, scale) {
        // We advance our elapsed time by one tick (our tick is 1 tick of the timer).
        this.elapsedTime += tick;

        // If we are done and loop then we will loop back to the beginning so we have to subtract off the total time.
        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime; // get back to original frame.
            } else {
                return; // Return if we are not looping. - code never triggers line.
                // Warning, if our code triggers this line than that means that we are calling drawFrame on an
                // animation that is finished. Since this is a return then nothing will be drawn at all (maybe a flicker).
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1; // Calculate a new frame.

        /*
        this.xStart + frame * (this.width + this.framePadding), this.yStart,

        If we are at the first frame then frame = 0 and we get the first frame starting at point xStart, yStart.
        yStart doesn't change throughout because of the way the spritesheet is set up, all frames of a particular
        example are located horizontally on the same row. If they were not on the same row then will need to modify
        yStart in the same way as xStart.

        If we are at frame 1 (the second frame) then we have to move over in the spritesheet by the width of the frame
        as well as the padding beyond xStart. (Multiply by how many frames we want to shift over).
         */
        ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            x, y,
            this.width * scale, // We can modify the size of the frame using this scale. Multiply height and width by same ratio.
            this.height * scale);

        // TODO - DEBUG feature not implemented
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Green';
        //     ctx.strokeRect(x, y, this.width * scale, this.height * scale);
        // }
    };

    /*
    With 0 based indexing.
     */
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration); // How many frames have gone by to get to this point.
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};
