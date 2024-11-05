// Globale variabler
window.globalValues = {
    minTekst: 0,
    købTeks: 0,
    arbejdeTekst: 0,
    byenTekst: 0,
    dageGikTekst: 0,
    Penge: 0
};


function DageGik() {
    const dageGikTekst = document.getElementById('dageGikTekst');
    window.globalValues.dageGikTekst += 1;
    dageGikTekst.textContent = " Dag" + window.globalValues.dageGikTekst;
}


function Fitness() {
    //const tekstElement = document.getElementById('minTekst');
    //window.globalValues.minTekst += 1;
    //tekstElement.textContent = window.globalValues.minTekst + " Styrke";

    DageGik();


    //iframe2 = document.createElement('iframe');
    //iframe2.src = 'FitnesSpil.html';
    //iframe2.style.width = '100%';
    //iframe2.style.height = '100%';
    //iframe2.style.border = 'none';
    //iframe2.style.position = 'absolute';
    //iframe2.style.top = '50%';
    //iframe2.style.left = '50%';
    //iframe2.style.transform = 'translate(-50%, -50%)';

    //document.getElementById('spilContatiner').appendChild(iframe2);

    //var closeButton2 = document.createElement('button');
    //closeButton2.id = 'closeButton2';
    //closeButton2.textContent = 'Luk';
    //closeButton2.addEventListener('click', closeSpinWheel2);
    //document.getElementById('spilContatiner').appendChild(closeButton2);


    skjulAlleKnapper()
    visTræningsknapper()
    
}

function skjulAlleKnapper() {
    document.getElementById('ByenOverKnap').style.display = 'none';
    document.getElementById('AbejdeOverKnap').style.display = 'none';
    document.getElementById('KøbOverKnap').style.display = 'none';
    document.getElementById('FitnessOverKnap').style.display = 'none';
}

function visTræningsknapper() {
    document.getElementById('TræningsAktiv1').style.display = 'block';
    document.getElementById('TræningsAktiv2').style.display = 'block';
    document.getElementById('TræningsAktiv3').style.display = 'block';
    document.getElementById('TræningsAktiv4').style.display = 'block';
}

function visAlleKnapper() {
    document.getElementById('ByenOverKnap').style.display = 'block';
    document.getElementById('AbejdeOverKnap').style.display = 'block';
    document.getElementById('KøbOverKnap').style.display = 'block';
    document.getElementById('FitnessOverKnap').style.display = 'block';
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

function closeSpinWheel2() {
    iframe2.parentNode.removeChild(iframe2);
    this.parentNode.removeChild(this);
}

function closeSpinWheel3() {
    iframe3.parentNode.removeChild(iframe3);
    this.parentNode.removeChild(this);
}

function closeSpinWheel4() {
    iframe4.parentNode.removeChild(iframe4);
    this.parentNode.removeChild(this);
}



function Byen() {
    const byenTekst = document.getElementById('byenTekst');
    window.globalValues.byenTekst += 1;
    byenTekst.textContent = window.globalValues.byenTekst + " Byen";

    iframe3 = document.createElement('iframe');
    iframe3.src = 'Combat.html';
    iframe3.style.width = '100%';
    iframe3.style.height = '100%';
    iframe3.style.border = 'none';
    iframe3.style.position = 'absolute';
    iframe3.style.top = '50%';
    iframe3.style.left = '50%';
    iframe3.style.transform = 'translate(-50%, -50%)';
    
    document.getElementById('spilContatiner').appendChild(iframe3);
    
    var closeButton3 = document.createElement('button');
    closeButton3.id = 'closeButton3';
    closeButton3.textContent = 'Luk';
    closeButton3.addEventListener('click', closeSpinWheel3);
    document.getElementById('spilContatiner').appendChild(closeButton3);
}

function Arbejde() {
    const arbejdeTekst = document.getElementById('arbejdeTekst');
    window.globalValues.arbejdeTekst += 1;
    arbejdeTekst.textContent = window.globalValues.arbejdeTekst + " Arbejde";

    
    iframe4 = document.createElement('iframe');
    iframe4.src = 'Arbejde.html';
    iframe4.style.width = '100%';
    iframe4.style.height = '100%';
    iframe4.style.border = 'none';
    iframe4.style.position = 'absolute';
    iframe4.style.top = '50%';
    iframe4.style.left = '50%';
    iframe4.style.transform = 'translate(-50%, -50%)';
    
    document.getElementById('spilContatiner').appendChild(iframe4);
    
    var closeButton4 = document.createElement('button');
    closeButton4.id = 'closeButton4';
    closeButton4.textContent = 'Luk';
    closeButton4.addEventListener('click', closeSpinWheel4);
    document.getElementById('spilContatiner').appendChild(closeButton4);
}

// Funktion til opdatering af tekst
function opdaterTekst(id, værdi) {
    document.getElementById(id).textContent = værdi;
}
