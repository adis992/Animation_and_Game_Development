import { Sprite } from './sprite.js';

export class Runner {

    constructor(ctx) {
        this.ctx = ctx;
        this.spritesheetUrl = 'spritesheets/runner.png';
        this.gameWidth = ctx.canvas.width;
        this.gameHeight = ctx.canvas.height;

        this.velocity = 0.1;

        this.NO_SPRITES = 9;
        this.currentSpriteIndex = 0;

        this.RUNNER_STATE = {
            STANDING: 'standing',
            RUNNING: 'running',
            JUMPING: 'jumping'
        }

        this.Sprite = new Sprite();

        this.runnerState = this.RUNNER_STATE.STANDING;

        this.JUMP_DURATION = 80;
        this.jumpState = 0;
    }


    load(loadingFinished) {

        this.spritesheet = new Image();

        this.spritesheet.addEventListener('load', () => {

            this.spriteHeight = this.spritesheet.height;
            this.spriteWidth = this.spritesheet.width / this.NO_SPRITES;

            this.initialY = this.gameHeight - this.spriteHeight - parseInt(this.gameHeight * 0.12);
            this.jumpY = this.initialY;
            this.jumpLimit = this.spriteHeight * 1.2;

            loadingFinished();

        });

        this.spritesheet.src = this.spritesheetUrl;

    }


    update(speed) {

        speed = 3 + speed - 3 * Math.sqrt(speed);

        switch (this.runnerState) {

            case this.RUNNER_STATE.STANDING:

                //cycle trough 2 sprites
                this.currentSpriteIndex = this.currentSpriteIndex + (this.velocity * speed);

                if (this.currentSpriteIndex >= 2) {
                    this.currentSpriteIndex = 0;
                }

                //set running sprite
                this.Sprite.Source.x = Math.floor(this.currentSpriteIndex) * this.spriteWidth;
                this.Sprite.Source.y = 0;
                this.Sprite.Source.width = this.spriteWidth;
                this.Sprite.Source.height = this.spriteHeight;

                //set sprite position on screen
                this.Sprite.Destination.x = 25;
                this.Sprite.Destination.y = this.initialY;
                this.Sprite.Destination.width = this.spriteWidth;
                this.Sprite.Destination.height = this.spriteHeight;

                break;
            case this.RUNNER_STATE.RUNNING:

                //cycle trough 4 sprites
                this.currentSpriteIndex = this.currentSpriteIndex + (this.velocity * speed);

                if (this.currentSpriteIndex > 5) {
                    this.currentSpriteIndex = 2;
                }

                //set running sprite
                this.Sprite.Source.x = Math.floor(this.currentSpriteIndex) * this.spriteWidth;
                this.Sprite.Source.y = 0;
                this.Sprite.Source.width = this.spriteWidth;
                this.Sprite.Source.height = this.spriteHeight;

                //set sprite position on screen
                this.Sprite.Destination.x = 25;
                this.Sprite.Destination.y = this.initialY;
                this.Sprite.Destination.width = this.spriteWidth;
                this.Sprite.Destination.height = this.spriteHeight;

                break;
            case this.RUNNER_STATE.JUMPING:

                //raise The Runner
                if (this.jumpState <= this.JUMP_DURATION / 3) {

                    this.currentSpriteIndex = 7;

                    this.Sprite.Source.x = Math.floor(this.currentSpriteIndex) * this.spriteWidth;
                    this.Sprite.Source.y = 0;
                    this.Sprite.Source.width = this.spriteWidth;
                    this.Sprite.Source.height = this.spriteHeight;

                    this.jumpY = this.jumpY - Math.abs(this.jumpLimit * (1 - (this.JUMP_DURATION / 3 - this.jumpState) / (this.JUMP_DURATION / 3)));

                    if (this.jumpY < this.initialY - this.jumpLimit) {
                        this.jumpY = this.initialY - this.jumpLimit;
                    }


                    //raise up the Runner
                    this.Sprite.Destination.x = 25;
                    this.Sprite.Destination.y = this.jumpY;
                    this.Sprite.Destination.width = this.spriteWidth;
                    this.Sprite.Destination.height = this.spriteHeight;


                    //hold
                } else if (this.jumpState > this.JUMP_DURATION / 3 && this.jumpState < this.JUMP_DURATION / 3 * 2) {


                    this.jumpY = this.initialY - this.jumpLimit;

                    this.Sprite.Destination.x = 25;
                    this.Sprite.Destination.y = this.jumpY;
                    this.Sprite.Destination.width = this.spriteWidth;
                    this.Sprite.Destination.height = this.spriteHeight;

                    //low down The Runner
                } else if (this.jumpState >= this.JUMP_DURATION / 3 * 2 && this.jumpState < this.JUMP_DURATION) {
                    //set second jump frame

                    this.currentSpriteIndex = 8;

                    this.Sprite.Source.x = Math.floor(this.currentSpriteIndex) * this.spriteWidth;
                    this.Sprite.Source.y = 0;
                    this.Sprite.Source.width = this.spriteWidth;
                    this.Sprite.Source.height = this.spriteHeight;


                    this.jumpY = this.jumpY + Math.abs(this.jumpLimit * ((this.jumpState - this.JUMP_DURATION / 3 * 2) / this.JUMP_DURATION / 3));

                    if (this.jumpY > this.initialY) {
                        this.jumpY = this.initialY;
                    }

                    //raise up the Runner
                    this.Sprite.Destination.x = 25;
                    this.Sprite.Destination.y = this.jumpY;
                    this.Sprite.Destination.width = this.spriteWidth;
                    this.Sprite.Destination.height = this.spriteHeight;

                    //jump is finished, return to running
                } else {
                    this.jumpState = 0;
                    this.jumpY = this.initialY;
                    this.runnerState = this.RUNNER_STATE.RUNNING;
                }

                this.jumpState += speed;
                break;

        }

    }

    draw() {
        this.ctx.drawImage(this.spritesheet,
            this.Sprite.Source.x,
            this.Sprite.Source.y,
            this.Sprite.Source.width,
            this.Sprite.Source.height,
            this.Sprite.Destination.x,
            this.Sprite.Destination.y,
            this.Sprite.Destination.width,
            this.Sprite.Destination.height);
    }

    jump() {
        if (this.runnerState == this.RUNNER_STATE.RUNNING) {
            this.runnerState = this.RUNNER_STATE.JUMPING;
            return true;
        }

        return false;
    }

    startRunning() {
        this.currentSpriteIndex = 2;
        this.runnerState = this.RUNNER_STATE.RUNNING;
    }

    stopRunning() {
        this.currentSpriteIndex = 0;
        this.runnerState = this.RUNNER_STATE.STANDING;
    }

}