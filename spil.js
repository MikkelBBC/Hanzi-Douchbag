var Penge = window.parent.globalValues.minTekst;

function KøbStort() {


    
 if (Penge >= 10) {

    penges = Penge - 10;

    window.parent.globalValues.købTeks += 1;
    window.parent.opdaterTekst('købTeks', window.parent.globalValues.købTeks + " Styrke");
    document.getElementById('købTeks').textContent = window.parent.globalValues.købTeks + " Styrke";

 }
   


   
}

// Når iframe indlæses, skal vi initialisere værdierne fra window.parent
window.onload = function() {
    if (document.getElementById('købTeks')) {
        document.getElementById('købTeks').textContent = window.parent.globalValues.købTeks + " Styrke";
    }
}
