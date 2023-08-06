//OVO SU UVOZI MODULA KOJI SE NALAZE SVAKI U SVOM JS FAJLU I ONI SU ZA POZADINU IGRE

import { Ground } from './ground.js';
import { Stars } from './stars.js'; //importujemo klasu za zvijezde iz stars.js
import { MountainsLow } from './mountainsLow.js';
import { MountainsHigh } from './mountainsHigh.js';
import { Runner } from './runner.js';
import { Enemies } from './enemies.js';

window.onload = init;  //pozivamo funkciju init kada se ucita stranica

let ctx; //globalna varijabla za canvas kontekst
let delta;
let previousTime;

let speed;   //brzina igre ovo smo napravili da bih isto mogli da uticemo na korisnikov PC da ne koristi previse cpu-a nego da se na svim uredjajima brzina odvija isto
//ovo cemo porapviti kada damo base speed i u main funkciji podijelimo odnosno speed = speedFactor * delta / BASE_SPEED; i onda cemo u main funkciji povecavati speedFactor i onda ce se igra ubrzavati
let speedFactor = 5; //globalna brzina nase animacije
let BASE_SPEED = 16;  //ovo je brzina igre u milisekundama moze biri i const jer se ne mijenja



let stars; //globalna varijabla za zvijezde
let mountainsHigh; //globalna varijabla za planine visoke
let mountainsLow; //globalna varijabla za planine niske
let ground; //globalna varijabla za zemlju
let runner;
let enemies;



//modul je dio koda koji ima svoju funkcionalnost i koji se moze koristiti u drugim dijelovima koda, to jeste izvozi dok ovaj glavni game fajl je ulazna tacka u igru i on poziva sve ostale module i oni se izvrsavaju u njemu
function init() {
    let canvas = document.getElementById("my-canvas");

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        //PRVI RESURS KOJI SE UCITAVA JE POZADINA
        stars = new Stars(ctx); //kreiramo objekat za zvijezde
        stars.load(loaded);  //pozivamo funkciju za ucitavanje slike za pozadinu


        //DRUGI RESURS KOJI SE UCITAVA JE POZADINA-PLANINE VISOKE
        //instanciranje objekta za planine visoke
        mountainsHigh = new MountainsHigh(ctx); //kreiramo objekat za planine visoke
        mountainsHigh.load(loaded); //pozivamo funkciju za ucitavanje slike za pozadinu

        //STATICKI DIO IGRE KOJI SE NE KRECE NITI MIJENJA
        //pozadina slike canvasa u gradijentu sa tamnog na svijetlo poslije polovine canvasa (vertikalno)


        mountainsLow = new MountainsLow(ctx); //kreiramo objekat za planine niske
        mountainsLow.load(loaded); //pozivamo funkciju za ucitavanje slike za pozadinu


        ///ovo jos zovemo i INSTANCIRANJE KLASSE
        ground = new Ground(ctx); //kreiramo objekat za zemlju
        ground.load(loaded); //pozivamo funkciju za ucitavanje slike za pozadinu

        runner = new Runner(ctx);
        runner.load(loaded);

        enemies = new Enemies(ctx);
        enemies.load(loaded);


        //oco je nacin da se na klik misa ili na space dugme pokrene igra
        document.body.onkeyup = function (e) {
            if (e.keyCode == 32) {     //space dugme je 32, a ako je kliknuto onda se poziva funkcija za pokretanje igre a naziva se handleUserAction
                //ostali keycode su na linku https://keycode.info/
                handleUserAction();
            }
        }

        canvas.onclick = handleUserAction;

        loadAudio();

    } else {
        alert("Canvas is not supported.");
    }
}

let loaderCounter = 0;          //brojac za ucitavanje slike za pozadinu 

function loaded() { //funkcija kada je ucitana slika za pozadinu i tada se poziva main funkcija koja je glavna funkcija za crtanje i brisanje canvasa u milisekundama
    loaderCounter++; //povecavamo brojac za ucitavanje slike za pozadinu
    if (loaderCounter < 4)  //ako je brojac za ucitavanje slike za pozadinu manji od 1 onda se vracamo iz funkcije, a ako je veci od 1 onda se poziva main funkcija
        //ako imamo vise resursa povecavamo broj prvo je bilo 1 pa smo dodali planine i dizemo na 2
        return; //vracamo se iz funkcije
    previousTime = performance.now(); //pozivamo funkciju za vrijeme koje je potrebno za ubrzavanje igre
    //main(); //poziva se funkcija main koja je glavna funkcija za crtanje i brisanje canvasa, i ona se stalno poziva svakih 16ms
    window.requestAnimationFrame(main);  //iskljucili smo direct main radi ucitavanja redoslijeda

}

let running = false;




//Nakon slika dodali smo CurrentTime koji je parametar za funkciju main i on je u milisekundama i on se stalno povecava i onda se stalno poziva funkcija main i ona se stalno poziva svakih 16ms
//Currenttime ce nam trebati za animaciju koja ce biljeziti vrijeme koje ce nam biti potrebno za ubrzavanje igre, kako se igra bude ubrzavala tako ce se i vrijeme povecavati
function main(currentTime) {
    //clear, update, and draw

    if (running) {
        window.requestAnimationFrame(main); //ova funkcija radi animaciju koja se ponavlja i izvrsa se 60 puta u sekundi...kada se funkcija pozove ona sama sebe poziva
    }

    delta = parseInt(currentTime - previousTime);
    //delta je razlika izmedju trenutnog vremena i prethodnog vremena
    //delta nam dodje vrijeme igranja igre i ona se stalno povecava i onda se stalno poziva funkcija main i ona se stalno poziva svakih 16ms
    speed = Math.abs(speedFactor * delta / BASE_SPEED);

    clearCanvas();  //poziva se funkcija za brisanje canvasa ova ispod i ovdje dodajemo isto i za update pozivanje jer se ova funkcija cijela poziva stalno i onda se sve stalno brise i crta
    update(); //poziva se funkcija za update pozadine
    draw(); //poziva se funkcija za crtanje pozadine
    showStats(); //poziva se funkcija za prikaz FPS-a

    previousTime = currentTime;

    if (speed < 14) {
        speedFactor += 0.001;
    }

}

function clearCanvas() {
    let linearGradient = ctx.createLinearGradient(ctx.canvas.width / 2, 0, ctx.canvas.width / 2, ctx.canvas.height);
    linearGradient.addColorStop(0, '#0D0E20');
    linearGradient.addColorStop(0.5, '#26303E');
    linearGradient.addColorStop(1, '#445664');
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}


function update() {         //metoda za update pozadine
    stars.update(speed);  //pozivamo funkciju za update zvijezda

    //kako smo dodali novi resurs u gradnju projekta (planine) moramo i update izmjenu
    mountainsHigh.update(speed);
    mountainsLow.update(speed);
    ground.update(speed);
    runner.update(speed);
    enemies.update(speed);

    detectCollision();
}


function draw() {          //metoda za crtanje pozadine
    stars.draw();
    //kako smo dodali novi resurs u gradnju projekta (planine) moramo i update izmjenu
    mountainsHigh.draw();
    mountainsLow.draw();
    ground.draw();
    runner.draw();
    enemies.draw();

    if (running) {
        drawScore();
    }

    if (isGameOver) {
        gameOver();
    }

}


function showStats() {    //kreiranje FRAME RATE-a odnosno broja slika u sekundi ili FPS-a
    let fpsSpan = document.getElementById("fps");
    let speedSpan = document.getElementById("speed");
    let fps;
    if (delta != 0) {            // != znaci razlicito ili nije jednako
        fps = parseInt(1000 / delta);
    }
    fpsSpan.innerHTML = fps;
    speedSpan.innerHTML = speed;
}




function showIntroMessage(ctx) {



}

function handleUserAction() {

    if (!running) {
        resetGame();
        window.requestAnimationFrame(main);
        runner.startRunning();
        startSound.play();
    } else {
        if (runner.jump()) {
            jumpSound.play();
        }
    }
}

let startSound;
let jumpSound;
let endSound;

function loadAudio() {
    startSound = new Sound("sounds/click.wav");
    jumpSound = new Sound("sounds/jump.wav");
    endSound = new Sound("sounds/fail.wav");
}

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");

    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


function detectCollision() {

    for (let i = 0; i < enemies.list.length; i++) {
        if (enemies.list[i].isActive) {

            let circle1 = {
                radius: runner.Sprite.Destination.width * 0.4,
                x: runner.Sprite.Destination.x + runner.Sprite.Destination.width / 2,
                y: runner.Sprite.Destination.y + runner.Sprite.Destination.height / 2
            };
            let circle2 = {
                radius: enemies.list[i].width * 0.4,
                x: enemies.list[i].x + enemies.list[i].width / 2,
                y: enemies.list[i].y + enemies.list[i].height / 2
            };

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circle1.radius + circle2.radius) {
                isGameOver = true;
            }

        }
    }
}


function resetGame() {
    running = true;
    isGameOver = false;
    score = 0;
    speedFactor = 5;
    enemies.reset();
    previousTime = performance.now();
}


let score = 0;

function drawScore() {

    score += speed;

    let scoreText = "Score: " + parseInt(score);

    ctx.font = 'bold 36px Luckiest Guy';
    ctx.fillStyle = "white";

    let text = ctx.measureText(scoreText);

    ctx.fillText(scoreText, 50, 50);

}

let isGameOver = false;

function gameOver() {

    endSound.play();

    running = false;

    ctx.font = 'bold 80px Luckiest Guy';
    ctx.fillStyle = "white";

    let text = ctx.measureText('Game Over');

    ctx.fillText('Game Over', ctx.canvas.width / 2 - text.width / 2, ctx.canvas.height / 2);

}