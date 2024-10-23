var Penge = window.parent.globalValues.minTekst;




// Når iframe indlæses, skal vi initialisere værdierne fra window.parent
//window.onload = function() {
   // if (document.getElementById('købTeks')) {
   //     document.getElementById('købTeks').textContent = window.parent.globalValues.købTeks + " Styrke";
   // }
// }


// game.js
const state = {
    money: 0,
    daysCompleted: 0,
    hoursWorked: 0,
    isWorking: false,
    intervalId: null,
    hourlyPay: 150, // Løn per time
    workInterval: 3 // Timer per interval
};

function updateDisplay() {
    document.getElementById('money').textContent = state.money.toLocaleString();
    document.getElementById('daysCompleted').textContent = state.daysCompleted;
    document.getElementById('timeLeft').textContent = 24 - state.hoursWorked;
    document.getElementById('dailyPay').textContent = (state.hourlyPay * 24).toLocaleString();
    
    // Opdater progress bar
    const progress = (state.hoursWorked / 24) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function log(message) {
    const logElement = document.getElementById('eventLog');
    const timeStamp = new Date().toLocaleTimeString();
    logElement.innerHTML = `<div>[${timeStamp}] ${message}</div>` + logElement.innerHTML;
}

function animateMoneyEarned() {
    const moneyElement = document.getElementById('money').parentElement;
    moneyElement.classList.add('money-earned');
    setTimeout(() => moneyElement.classList.remove('money-earned'), 500);
}

function work() {
    if (!state.isWorking) return;

    state.hoursWorked += state.workInterval;

    if (state.hoursWorked >= 24) {
        // Arbejdsdag færdig
        const dailyPay = state.hourlyPay * 24;
        state.money += dailyPay; // Tilføj løn kun ved fuldført dag
        state.daysCompleted++;
        state.hoursWorked = 0;
        log(`Arbejdsdag fuldført! Du modtog din dagløn på ${dailyPay.toLocaleString()} kr.`);
        animateMoneyEarned();
        


        window.parent.globalValues.Penge += 3600;
        window.parent.opdaterTekst('Penge'," Penge " + window.parent.globalValues.Penge + " kr");
        document.getElementById('Penge').textContent = window.parent.globalValues.Penge + " kr";





    } else {
        log(`Du har arbejdet ${state.hoursWorked} timer i dag. Fortsæt arbejdet for at få din dagløn.`);
    }

    updateDisplay();
}

function toggleWork() {
    const btn = document.getElementById('startBtn');
    
    if (state.isWorking) {
        // Stop arbejde
        state.isWorking = false;
        clearInterval(state.intervalId);
        btn.textContent = 'Start Arbejde';
        btn.classList.remove('stop');
        btn.classList.add('start');
        log('Arbejde sat på pause. Du får først din løn når dagen er fuldført.');
    } else {
        // Start arbejde
        state.isWorking = true;
        state.intervalId = setInterval(work, 3000); // 3 sekunder = 3 timer i spillet
        btn.textContent = 'Stop Arbejde';
        btn.classList.remove('start');
        btn.classList.add('stop');
        log('Arbejde startet. Fuldfør dagen for at få din løn.');
    }
}

// Initial opdatering
updateDisplay();