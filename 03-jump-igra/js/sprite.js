//logika za spriteove


//dodat cemo za svaku sliku koju ucitamo da ima svoj objekt sa klasama i metodama

//EXPORTAMO KLASU ZA SPRITEOVE i on koristi es6 sintaksu
//a export nam pomaze da mozemo da koristimo ovu klasu u drugim fajlovima i da je importamo tamo gdje nam treba i da je koristimo
export class Sprite {   //klasa za spriteove ovo pravimo da bi mogli da imamo vise spriteova i da imamo metode za svaki posebno, tacnije ovo je niz objekata
    constructor() {     //konstruktor za spriteove koji ce da ima svoje koordinate i velicinu za svaki posebno
        this.Source = {          //
            x: 0,   //
            y: 0,   //
            width: 0,   //  
            height: 0   //
        }
        this.Destination = {   //
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    }
}