var Penge = window.parent.globalValues.Penge;
var deo1 = true;

window.onload = function() {
if (document.getElementById('Penge')) {
    document.getElementById('Penge').textContent = window.parent.globalValues.Penge + "  Penge";
}
}


function KøbStort() {
    if (window.parent.globalValues.Penge > 3500 && deo1) {
        // Opdater den globale værdi
        window.parent.globalValues.Penge -= 3500;
        // Opdater den lokale værdi
        Penge = window.parent.globalValues.Penge;
        
        // Opdater styrke
        window.parent.globalValues.købTeks += 100;
        window.parent.opdaterTekst('købTeks', window.parent.globalValues.købTeks + " Styrke");
        
        // Ændr billedet
        let billede = document.getElementById('Deorant1');
        billede.src = "96to8k.gif";
        deo1 = false;
        
        // Opdater tekst display i parent window hvis nødvendigt
        window.parent.opdaterTekst('Penge', window.parent.globalValues.Penge + " Penge");
    }
    else {
        alert("Du har ikke nok penge");
    }

    
    window.parent.globalValues.Penge = Penge;


    if (document.getElementById('Penge')) {
        document.getElementById('Penge').textContent = window.parent.globalValues.Penge + "  Penge";
    }
}
    



 


    
   


   


// Når iframe indlæses, skal vi initialisere værdierne fra window.parent

    
