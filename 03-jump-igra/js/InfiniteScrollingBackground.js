import { Sprite } from './sprite.js';

export class InfiniteScrollingBackground {

    constructor(ctx) {
        this.ctx = ctx;
        this.gameWidth = ctx.canvas.width;
        this.gameHeight = ctx.canvas.height;
        this.horizontalOffset = 1;
        this.spritesheet;
        this.sprites = [new Sprite(), new Sprite()];
        this.spritesNo = 2;
    }

    load(loadingFinished) {

        this.spritesheet = new Image();

        this.spritesheet.addEventListener('load', () => {

            this.spriteHeight = this.spritesheet.height;
            this.spriteWidth = this.spritesheet.width / this.spritesNo;

            this.sprites[0].Source.x = 0;
            this.sprites[0].Source.y = 0;
            this.sprites[0].Source.width = this.spriteWidth;
            this.sprites[0].Source.height = this.spriteHeight;

            this.sprites[1].Source.x = this.spriteWidth;
            this.sprites[1].Source.y = 0;
            this.sprites[1].Source.width = this.spriteWidth;
            this.sprites[1].Source.height = this.spriteHeight;

            loadingFinished();

        });

        this.spritesheet.src = this.spritesheetUrl;

    }

    update(speed) {

        this.horizontalOffset += this.velocity * speed;

        if (this.horizontalOffset > this.gameWidth) {
            this.horizontalOffset = this.horizontalOffset - this.gameWidth;
        }

        this.sprites[0].Destination.x = 0 - this.horizontalOffset;
        this.sprites[0].Destination.y = 0;
        this.sprites[0].Destination.width = this.gameWidth;
        this.sprites[0].Destination.height = this.gameHeight;

        this.sprites[1].Destination.x = this.gameWidth - this.horizontalOffset;
        this.sprites[1].Destination.y = 0;
        this.sprites[1].Destination.width = this.gameWidth;
        this.sprites[1].Destination.height = this.gameHeight;

    }

    draw() {

        for (let i = 0; i < this.sprites.length; i++) {

            this.ctx.drawImage(this.spritesheet,
                this.sprites[i].Source.x,
                this.sprites[i].Source.y,
                this.sprites[i].Source.width,
                this.sprites[i].Source.height,
                this.sprites[i].Destination.x,
                this.sprites[i].Destination.y,
                this.sprites[i].Destination.width,
                this.sprites[i].Destination.height);

        }

    }

}