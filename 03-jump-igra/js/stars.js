//klasa sa logikom za kreiranje sloja zvijezda
import { InfiniteScrollingBackground } from './InfiniteScrollingBackground.js'; //importujemo klasu za beskonacno skrolovanje pozadine
//ovdje se infinitscrolingbackground.js fajl importuje u ovaj fajl i onda mozemo da koristimo sve iz tog fajla


export class Stars extends InfiniteScrollingBackground { //klasa za zvijezde
    constructor(ctx) { //konstruktor za zvijezde


        super(ctx); //pozivamo konstruktor iz klase za beskonacno skrolovanje pozadine

        this.velocity = 1; //brzina  pozadine
        this.spritesheetUrl = 'spritesheets/stars.png'; //slika za pozadinu putanja
    }
}