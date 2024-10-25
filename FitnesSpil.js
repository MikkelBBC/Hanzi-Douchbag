const arrow = document.getElementById('arrow');
const scoreElement = document.getElementById('score');
let direction = 1;
let position = 0;
let score = 0;
var styrke = window.parent.globalValues.købTeks;





function moveArrow() {
    position += direction * 4;
    if (position >= 275 || position <= 0) {
        direction *= -1;
    }
    arrow.style.left = position + 'px';
}

function checkHit() {
    const center = 150;
    const arrowCenter = position + 12.5;
    let points = 0;

    if (arrowCenter >= 140 && arrowCenter <= 160) { // Grøn zone
        points = 10;
        window.parent.globalValues.købTeks += 100;
        window.parent.opdaterTekst('købTeks', window.parent.globalValues.købTeks + " Styrke");
    } else if (arrowCenter >= 100 && arrowCenter <= 200) { // Gul zone
        points = 5;
        window.parent.globalValues.købTeks += 100;
        window.parent.opdaterTekst('købTeks', window.parent.globalValues.købTeks + " Styrke");
    } else if (arrowCenter >= 50 && arrowCenter <= 250) { // Orange zone
        points = 2;
        window.parent.globalValues.købTeks += 100;
        window.parent.opdaterTekst('købTeks', window.parent.globalValues.købTeks + " Styrke");
    } else { // Rød zone
        points = 1;
        window.parent.globalValues.købTeks += 100;
        window.parent.opdaterTekst('købTeks', window.parent.globalValues.købTeks + " Styrke");
    }

    score += points;
    scoreElement.textContent = 'Point: ' + score;

    window.parent.globalValues.købTeks += 1;
    window.parent.opdaterTekst('købTeks', window.parent.globalValues.købTeks + " Styrke");
    document.getElementById('købTeks').textContent = window.parent.globalValues.købTeks + " Styrke";
}



 
   


   

// Når iframe indlæses, skal vi initialisere værdierne fra window.parent
window.onload = function() {
    if (document.getElementById('købTeks')) {
        document.getElementById('købTeks').textContent = window.parent.globalValues.købTeks + " Styrke";
    }
}


setInterval(moveArrow, 10);

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        checkHit();
    }
});

document.addEventListener('click', checkHit);