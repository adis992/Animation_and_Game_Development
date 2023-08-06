import { Sprite } from './sprite.js';

export class Runner {        //ovo je klasa za trkača tacnije znaci za animaciju trkača i njegovo kretanje

    constructor(ctx) {  //konstruktor je funkcija koja se poziva kada se kreira objekat klase
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


    load(loadingFinished) {  //

        this.spritesheet = new Image();

        this.spritesheet.addEventListener('load', () => {

            this.spriteHeight = this.spritesheet.height;
            this.spriteWidth = this.spritesheet.width / this.NO_SPRITES;

            this.initialY = this.gameHeight - this.spriteHeight - parseInt(this.gameHeight * 0.12);
            this.jumpY = this.initialY;   //ovo je pozicija trkača u vazduhu
            this.jumpLimit = this.spriteHeight * 1.2;  //ovo je maximalna visina skoka trkača znaci koliko moze da skoci 

            loadingFinished();

        });

        this.spritesheet.src = this.spritesheetUrl;

    }


    update(speed) {

        speed = 3 + speed - 3 * Math.sqrt(speed);  //ovo je brzina trkača 

        switch (this.runnerState) {//ovo je switch case koji nam govori u kom stanju se trkač nalazi
            //imamo 3 stanja trkača: stoji, trči i skače

            //ovo je stanje kada trkač stoji
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

                break;  //break je da se ne bi izvrsavalo sledece stanje
            //ovo je stanje kada trkač trči
            //znaci mi smo svakom stanju odradili od kojeg do kojeg sprite-a da se izvrsava npr u runing ce biti od 2 do 5 sprite-a
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


            //ovo je stanje kada trkač skače
            case this.RUNNER_STATE.JUMPING:

                //raise The Runner
                if (this.jumpState <= this.JUMP_DURATION / 3) {  //uslov za skok trkača , tacnije da ne moze da trajee duze od 3 sekunde

                    this.currentSpriteIndex = 7;  //posto imamo u spritesheetovima samo 1 uzlaznu fazu skoka i 1 silaznu fazu skoka mi smo stavili da je 7 sprite u skoku uzlazna faza skoka


                    this.Sprite.Source.x = Math.floor(this.currentSpriteIndex) * this.spriteWidth;
                    this.Sprite.Source.y = 0;
                    this.Sprite.Source.width = this.spriteWidth;
                    this.Sprite.Source.height = this.spriteHeight;

                    this.jumpY = this.jumpY - Math.abs(this.jumpLimit * (1 - (this.JUMP_DURATION / 3 - this.jumpState) / (this.JUMP_DURATION / 3)));  //ovo je brzina skoka
                    //tacnije ovo je formula za brzinu skoka koja nam govori da ako je brzina skoka 1 da je onda brzina skoka 1-1/3

                    if (this.jumpY < this.initialY - this.jumpLimit) {
                        this.jumpY = this.initialY - this.jumpLimit;
                    }


                    //raise up the Runner, postavljamo poziciju trkača na ekranu spremnu za skok
                    this.Sprite.Destination.x = 25;
                    this.Sprite.Destination.y = this.jumpY;
                    this.Sprite.Destination.width = this.spriteWidth;
                    this.Sprite.Destination.height = this.spriteHeight;


                    //hold ovdje cekamo da trkač bude u vazduhu
                } else if (this.jumpState > this.JUMP_DURATION / 3 && this.jumpState < this.JUMP_DURATION / 3 * 2) {


                    this.jumpY = this.initialY - this.jumpLimit;  //ovo je pozicija trkača u vazduhu

                    this.Sprite.Destination.x = 25;
                    this.Sprite.Destination.y = this.jumpY;
                    this.Sprite.Destination.width = this.spriteWidth;
                    this.Sprite.Destination.height = this.spriteHeight;

                    //low down The Runner //ovo je kada trkač pada
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

                this.jumpState += speed;   //ovo je brzina skoka
                break;

        }

    }

    draw() {  //ovo je funkcija za crtanje trkača
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

    jump() {   //ovo je funkcija za skok trkača i ona nam govori da ako je trkač u stanju trčanja da može da skoči
        if (this.runnerState == this.RUNNER_STATE.RUNNING) {    //=== je operator za poredjenje
            this.runnerState = this.RUNNER_STATE.JUMPING;
            return true;
        }

        return false;
    }

    startRunning() {   //ovo je funkcija za pokretanje trkača
        this.currentSpriteIndex = 2;   //dajemo mu da krene od drugog sprite-a
        this.runnerState = this.RUNNER_STATE.RUNNING;  //dajemo mu da je u stanju trčanja
    }

    stopRunning() {   //ovo je funkcija za zaustavljanje trkača
        this.currentSpriteIndex = 0;
        this.runnerState = this.RUNNER_STATE.STANDING;
    }

}