// Globale variabler
window.globalValues = {
    minTekst: 0,
    købTeks: 0,
    arbejdeTekst: 0,
    byenTekst: 0
};

function Fitness() {
    const tekstElement = document.getElementById('minTekst');
    window.globalValues.minTekst += 1;
    tekstElement.textContent = window.globalValues.minTekst + " Styrke";
}

function Køb() {
    iframe = document.createElement('iframe');
    iframe.src = 'spil.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '50%';
    iframe.style.left = '50%';
    iframe.style.transform = 'translate(-50%, -50%)';

    document.getElementById('spilContatiner').appendChild(iframe);

    var closeButton = document.createElement('button');
    closeButton.id = 'closeButton';
    closeButton.textContent = 'Luk';
    closeButton.addEventListener('click', closeSpinWheel);
    document.getElementById('spilContatiner').appendChild(closeButton);
}

function closeSpinWheel() {
    iframe.parentNode.removeChild(iframe);
    this.parentNode.removeChild(this);
}

function Byen() {
    const byenTekst = document.getElementById('byenTekst');
    window.globalValues.byenTekst += 1;
    byenTekst.textContent = window.globalValues.byenTekst + " Byen";
}

function Arbejde() {
    const arbejdeTekst = document.getElementById('arbejdeTekst');
    window.globalValues.arbejdeTekst += 1;
    arbejdeTekst.textContent = window.globalValues.arbejdeTekst + " Arbejde";
}

// Funktion til opdatering af tekst
function opdaterTekst(id, værdi) {
    document.getElementById(id).textContent = værdi;
}
