import { Sprite } from './sprite.js';

export class Enemy {

    constructor(ctx, imageUrl) {
        this.ctx = ctx;
        this.gameWidth = ctx.canvas.width;
        this.gameHeight = ctx.canvas.height;
        this.horizontalOffset = 1;
        this.imageUrl = imageUrl;
        this.x;
        this.y;

        this.velocity = 2;

        this.isActive = false;
    }

    load(loadingFinished) {

        this.image = new Image();

        this.image.addEventListener('load', () => {

            this.height = this.image.height;
            this.width = this.image.width;

            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height - parseInt(this.gameHeight * 0.12);

            loadingFinished();

        });

        this.image.src = this.imageUrl;
    }

    update(speed) {

        this.x -= this.velocity * speed;

        if (this.x < 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.isActive = false;
        this.x = this.gameWidth;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y);
    }
}