import { Enemy } from './enemy.js';



//OVO PRAVI KLASU ZA PREPREKE I ONA CE DA SADRZI LISTU PREPREKA I METODE ZA NJIHOVO AZURIRANJE I ISCRTAVANJE DOK JE ENEMY KLASA ZA JEDNOG NEPRIJATELJA
export class Enemies {  //ovo je klasa za prepreke i ona ce da sadrzi listu prepreka i metode za njihovo azuriranje i iscrtavanje

    constructor(ctx) {
        this.ctx = ctx;
        this.gameWidth = ctx.canvas.width;
        this.gameHeight = ctx.canvas.height;
        this.images = ['spritesheets/obstacle1.png',   //ovo je niz slika za prepreke
            'spritesheets/obstacle2.png',
            'spritesheets/obstacle3.png',
            'spritesheets/obstacle4.png',
            'spritesheets/obstacle5.png'
        ];

        this.list = [];
        this.loaderCounter = 0;
        this.notifyLoaded;

        this.accumulator = 0;   //ovo je promenljiva koja nam govori koliko je vremena proslo od poslednjeg kreiranja prepreke
        this.obstacleTrigger;   //  ovo je promenljiva koja nam govori kada je vreme da se kreira nova prepreka
    }

    load(loaded) {   //

        this.notifyLoaded = loaded;   //ovim smo rekli da je notifyLoaded jednako loaded

        for (let i = 0; i < this.images.length; i++) {  //ako je index manji od duzine niza slika onda se povecava index za 1

            let enemy = new Enemy(this.ctx, this.images[i]);  //ovo je instanca klase Enemy i ona ce da sadrzi listu prepreka i metode za njihovo azuriranje i iscrtavanje
            this.list.push(enemy);  //ovo je push metoda koja dodaje novi element na kraj niza

            enemy.load(loaded);   //ovo je funkcija koja se poziva kada se ucita jedna prepreka

        }

    }


    loaded() {   //ovo je funkcija koja se poziva kada se ucita jedna prepreka
        this.loaderCounter++;  //ovo je brojac koji nam govori koliko je prepreka ucitano

        if (this.loaderCounter < 5) //ovo je uslov koji nam govori da li su sve prepreke ucitane
            return;  //ako nisu sve prepreke ucitane onda se izlazi iz funkcije

        this.notifyLoaded(); //ovo je funkcija koja se poziva kada se ucitaju sve prepreke
    }



    update(speed) {  //ZASTO na svakom js fajlu smo imali update i draw metode? Odgovor je da bi se svaki objekat posebno azurirao i iscrtavao u svojem vremenskom intervalu

        this.accumulator += speed;  //accumulator je promenljiva koja nam govori koliko je vremena proslo od poslednjeg kreiranja prepreke

        //obstacleTrigger determines when new obstacle is going to be created
        if (!this.obstacleTrigger) {   //ovo je kontrolna promenljiva koja nam govori kada je vreme da se kreira nova prepreka
            this.obstacleTrigger = this.randomNumber(200, 600);  //ovo je vreme u milisekundama kada ce se kreirati nova prepreka i on se stvara nasumicno
        }

        //when is time to show new obstacle
        //obstacleTrigger  je promenljiva koja nam govori kada je vreme da se kreira nova prepreka
        if (this.accumulator > this.obstacleTrigger) {

            //create new obstacle and add it to obstacle list
            let enemy = this.list[this.randomNumber(0, 4)];
            enemy.isActive = true;

            //reset control variable and frame counter for next obstacle creation
            //resetujemo kontrolnu promenljivu i brojac frejmova za sledecu kreaciju prepreke
            this.obstacleTrigger = undefined;
            this.accumulator = 0;

        }

        //update every obstacle on screen
        //loop trough obstacle list and update
        //ovo je petlja koja prolazi kroz sve prepreke i azurira ih

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


    randomNumber(min, max) {  //ovo je funkcija koja nam vraca nasumicni broj izmedju min i max i koristimo je za kreiranje prepreka
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}