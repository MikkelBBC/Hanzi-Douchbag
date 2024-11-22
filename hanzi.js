let ifram6true = false;
let ifram5true = false;

// Globale variabler
window.globalValues = {
    minTekst: 0,
    købTeks: 0,
    arbejdeTekst: 0,
    byenTekst: 0,
    dageGikTekst: 0,
    Penge: 0
};

// Tilføj dette i starten af din hanzi.js fil

// Array med stier til dine billeder
const introBilleder = [
    '1.jpg',  // Erstat med dine faktiske billednavne
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg'
];

let currentBilledeIndex = 0;
const billedeContainer = document.getElementById('intro-billeder');

// Funktion til at vise næste billede
function visBillede() {
    if (currentBilledeIndex < introBilleder.length) {
        // Fjern tidligere billede hvis det findes
        billedeContainer.innerHTML = '';
        
        // Opret nyt billede
        const img = document.createElement('img');
        img.src = introBilleder[currentBilledeIndex];
        img.style.maxWidth = '80%';
        img.style.maxHeight = '80vh';
        img.style.display = 'block';
        img.style.margin = 'auto';
        img.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        
        // Tilføj billede til containeren
        billedeContainer.appendChild(img);
        
        // Gå til næste billede efter 5 sekunder
        currentBilledeIndex++;
        setTimeout(() => {
            if (currentBilledeIndex < introBilleder.length) {
                visBillede();
            } else {
                // Fjern container når alle billeder er vist
                billedeContainer.remove();
            }
        }, 100);
    }
}

// Start billedvisningen når siden indlæses
window.addEventListener('load', function() {
    visBillede();
});


function DageGik() {
    const dageGikTekst = document.getElementById('dageGikTekst');
    window.globalValues.dageGikTekst += 1;
    dageGikTekst.textContent = " Dag" + window.globalValues.dageGikTekst;
}




function Fitness() {

     ifram6true = false;
     ifram5true = false;

    var closeButton5 = document.createElement('button');
    closeButton5.id = 'closeButton5';
    closeButton5.textContent = 'Luk';
    closeButton5.addEventListener('click', closeSpinWheel5);
    document.getElementById('spilContatiner').appendChild(closeButton5);
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

function skjulTræningsknapper() {
    document.getElementById('TræningsAktiv1').style.display = 'none';
    document.getElementById('TræningsAktiv2').style.display = 'none';
    document.getElementById('TræningsAktiv3').style.display = 'none';
    document.getElementById('TræningsAktiv4').style.display = 'none';
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

function closeSpinWheel5() {
    skjulTræningsknapper()
    visAlleKnapper()
    this.parentNode.removeChild(this);
    
    if(ifram5true){
        iframe5.parentNode.removeChild(iframe5);
    }
    if(ifram6true){
    
    
   
        iframe6.parentNode.removeChild(iframe6);
    }
   



   
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

var iframe5;

function Træning1(){
    iframe5 = document.createElement('iframe');
    iframe5.src = 'Lykkehjul.html';
    iframe5.style.width = '100%';
    iframe5.style.height = '100%';
    iframe5.style.border = 'none';
    iframe5.style.position = 'absolute';
    iframe5.style.top = '50%';
    iframe5.style.left = '50%';
    iframe5.style.transform = 'translate(-50%, -50%)';

    document.getElementById('spilContatiner').appendChild(iframe5);
    ifram5true = true;

   
}

var iframe6;

function Træning2(){
    iframe6 = document.createElement('iframe');
    iframe6.src = 'Lykkehjul.html';
    iframe6.style.width = '100%';
    iframe6.style.height = '100%';
    iframe6.style.border = 'none';
    iframe6.style.position = 'absolute';
    iframe6.style.top = '50%';
    iframe6.style.left = '50%';
    iframe6.style.transform = 'translate(-50%, -50%)';

    document.getElementById('spilContatiner').appendChild(iframe6);
    ifram6true = true;
    
}