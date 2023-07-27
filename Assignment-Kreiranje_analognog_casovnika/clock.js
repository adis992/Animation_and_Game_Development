let canvas = document.getElementById('clock');
let ctx = canvas.getContext('2d');

let clockRadius = 200;



function drawClock() {
    // Čistimo platno za svako ponovno crtanje
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Crtamo krug časovnika sa gradijentom
    let gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, clockRadius - 20, canvas.width / 2, canvas.height / 2, clockRadius);
    gradient.addColorStop(0, '#ddd');
    gradient.addColorStop(1, '#444');
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, clockRadius, 0, 2 * Math.PI);
    ctx.stroke();

    // Crtamo oznake za sate
    ctx.strokeStyle = '#fff'; // Bijela boja za oznake sati
    for (let i = 1; i <= 12; i++) {
        let angle = i * Math.PI / 6 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + (clockRadius - 20) * Math.cos(angle), canvas.height / 2 + (clockRadius - 20) * Math.sin(angle));
        ctx.lineTo(canvas.width / 2 + clockRadius * Math.cos(angle), canvas.height / 2 + clockRadius * Math.sin(angle));
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#fff'; // Bijela boja za brojeve
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i.toString(), canvas.width / 2 + (clockRadius - 30) * Math.cos(angle), canvas.height / 2 + (clockRadius - 30) * Math.sin(angle));
    }

    // Crtamo oznake za minute
    ctx.strokeStyle = '#fff'; // Bijela boja za oznake minuta
    for (let i = 0; i < 60; i++) {
        if (i % 5 != 0) { // Preskočimo oznake koje su već pokrivene oznakama sati
            let angle = i * Math.PI / 30 - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 + (clockRadius - 10) * Math.cos(angle), canvas.height / 2 + (clockRadius - 10) * Math.sin(angle));
            ctx.lineTo(canvas.width / 2 + clockRadius * Math.cos(angle), canvas.height / 2 + clockRadius * Math.sin(angle));
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    // Dobijamo trenutno vreme
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Crtamo kazaljku za sate
    ctx.beginPath();
    ctx.strokeStyle = '#336699';
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + (clockRadius / 2) * Math.sin(hours * 2 * Math.PI / 12),
        canvas.height / 2 - (clockRadius / 2) * Math.cos(hours * 2 * Math.PI / 12));
    ctx.lineWidth = 6;
    ctx.stroke();

    // Crtamo kazaljku za minute
    ctx.beginPath();
    ctx.strokeStyle = '#669933';
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + (clockRadius / 3 * 2) * Math.sin(minutes * 2 * Math.PI / 60),
        canvas.height / 2 - (clockRadius / 3 * 2) * Math.cos(minutes * 2 * Math.PI / 60));
    ctx.lineWidth = 4;
    ctx.stroke();

    // Crtamo kazaljku za sekunde
    ctx.beginPath();
    ctx.strokeStyle = '#993333';
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + clockRadius * Math.sin(seconds * 2 * Math.PI / 60),
        canvas.height / 2 - clockRadius * Math.cos(seconds * 2 * Math.PI / 60));
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Ponovo crtamo časovnik svake sekunde
setInterval(drawClock, 1000);



// Kada se stranica učita
window.onload = function () {
    // Podesi tajmer na 2 sekunde (2000 milisekundi)
    setTimeout(function () {
        // Sakrij loader
        var loader = document.getElementById('loader');
        loader.className = 'hidden';

        // Prikazuje časovnik
        var clockContainer = document.getElementById('clock-container');
        clockContainer.className = 'visible';
    }, 2000);
};