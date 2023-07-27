let canvas = document.getElementById('clock');
let ctx = canvas.getContext('2d');

let clockRadius = 200;

function drawClock() {
    // Čistimo platno za svako ponovno crtanje
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Crtamo krug časovnika
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, clockRadius, 0, 2 * Math.PI);
    ctx.stroke();

    // Crtamo oznake za sate i brojeve
    for (let i = 1; i <= 12; i++) {
        let angle = i * Math.PI / 6 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + (clockRadius - 20) * Math.cos(angle), canvas.height / 2 + (clockRadius - 20) * Math.sin(angle));
        ctx.lineTo(canvas.width / 2 + clockRadius * Math.cos(angle), canvas.height / 2 + clockRadius * Math.sin(angle));
        ctx.stroke();

        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i.toString(), canvas.width / 2 + (clockRadius - 30) * Math.cos(angle), canvas.height / 2 + (clockRadius - 30) * Math.sin(angle));
    }

    // Crtamo oznake za sekunde
    for (let i = 0; i < 60; i++) {
        let angle = i * Math.PI / 30 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + (clockRadius - 10) * Math.cos(angle), canvas.height / 2 + (clockRadius - 10) * Math.sin(angle));
        ctx.lineTo(canvas.width / 2 + clockRadius * Math.cos(angle), canvas.height / 2 + clockRadius * Math.sin(angle));
        ctx.stroke();
    }

    // Dobijamo trenutno vreme
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Crtamo kazaljku za sate
    ctx.beginPath();
    ctx.strokeStyle = '#333';
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + (clockRadius / 2) * Math.sin(hours * 2 * Math.PI / 12),
        canvas.height / 2 - (clockRadius / 2) * Math.cos(hours * 2 * Math.PI / 12));
    ctx.lineWidth = 6;
    ctx.stroke();

    // Crtamo kazaljku za minute
    ctx.beginPath();
    ctx.strokeStyle = '#666';
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + (clockRadius / 3 * 2) * Math.sin(minutes * 2 * Math.PI / 60),
        canvas.height / 2 - (clockRadius / 3 * 2) * Math.cos(minutes * 2 * Math.PI / 60));
    ctx.lineWidth = 4;
    ctx.stroke();

    // Crtamo kazaljku za sekunde
    ctx.beginPath();
    ctx.strokeStyle = '#f00';
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + clockRadius * Math.sin(seconds * 2 * Math.PI / 60),
        canvas.height / 2 - clockRadius * Math.cos(seconds * 2 * Math.PI / 60));
    ctx.lineWidth = 2;
    ctx.stroke();

    // Resetujemo lineWidth i strokeStyle za markere
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
}

// Ponovo crtamo časovnik svake sekunde
setInterval(drawClock, 1000);
