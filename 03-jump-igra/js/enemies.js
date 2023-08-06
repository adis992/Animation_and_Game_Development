import { Enemy } from './enemy.js';

export class Enemies {

    constructor(ctx) {
        this.ctx = ctx;
        this.gameWidth = ctx.canvas.width;
        this.gameHeight = ctx.canvas.height;
        this.images = ['spritesheets/obstacle1.png',
            'spritesheets/obstacle2.png',
            'spritesheets/obstacle3.png',
            'spritesheets/obstacle4.png',
            'spritesheets/obstacle5.png'
        ];

        this.list = [];
        this.loaderCounter = 0;
        this.notifyLoaded;

        this.accumulator = 0;
        this.obstacleTrigger;
    }

    load(loaded) {

        this.notifyLoaded = loaded;

        for (let i = 0; i < this.images.length; i++) {

            let enemy = new Enemy(this.ctx, this.images[i]);
            this.list.push(enemy);

            enemy.load(loaded);

        }

    }


    loaded() {
        this.loaderCounter++;

        if (this.loaderCounter < 5)
            return;

        this.notifyLoaded();
    }



    update(speed) {

        this.accumulator += speed;

        //obstacleTrigger determines when new obstacle is going to be created
        if (!this.obstacleTrigger) {
            this.obstacleTrigger = this.randomNumber(200, 600);
        }

        //when is time to show new obstacle
        if (this.accumulator > this.obstacleTrigger) {

            //create new obstacle and add it to obstacle list
            let enemy = this.list[this.randomNumber(0, 4)];
            enemy.isActive = true;

            //reset control variable and frame counter for next obstacle creation
            this.obstacleTrigger = undefined;
            this.accumulator = 0;

        }

        //update every obstacle on screen
        //loop trough obstacle list and update
        for (let i = 0; i < this.list.length; i++) {
            //if obstacle is visible call update method
            if (this.list[i].isActive) {
                this.list[i].update(speed);
            }
        }
    }


    draw() {
        //update every obstacle on screen
        //loop trough obstacle list and update
        for (let i = 0; i < this.list.length; i++) {
            //if obstacle is visible call update method
            if (this.list[i].isActive) {
                this.list[i].draw();
            }
        }
    }

    reset() {
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].reset();
        }

        this.accumulator = 0;
        this.obstacleTrigger;
    }


    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}