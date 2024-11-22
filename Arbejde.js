// Når iframe indlæses, skal vi initialisere værdierne fra window.parent
window.onload = function() {
    loadState();
    updateDisplay();
 };
 
 // game.js
 const state = {
    money: parseInt(localStorage.getItem('money')) || 0,
    daysCompleted: parseInt(localStorage.getItem('daysCompleted')) || 0,
    hoursWorked: parseInt(localStorage.getItem('hoursWorked')) || 0,
    isWorking: false,
    intervalId: null,
    hourlyPay: 150,
    workInterval: 3
 };
 
 function loadState() {
    state.money = parseInt(localStorage.getItem('money')) || 0;
    state.daysCompleted = parseInt(localStorage.getItem('daysCompleted')) || 0;
    state.hoursWorked = parseInt(localStorage.getItem('hoursWorked')) || 0;
 }
 
 function saveState() {
    localStorage.setItem('money', state.money);
    localStorage.setItem('daysCompleted', state.daysCompleted);
    localStorage.setItem('hoursWorked', state.hoursWorked);
 }
 
 function resetState() {
    localStorage.clear();
    state.money = 0;
    state.daysCompleted = 0;
    state.hoursWorked = 0;
    state.isWorking = false;
    if (state.intervalId) {
        clearInterval(state.intervalId);
    }
    updateDisplay();
 }
 
 function updateDisplay() {
    document.getElementById('money').textContent = state.money.toLocaleString();
    document.getElementById('daysCompleted').textContent = state.daysCompleted;
    document.getElementById('timeLeft').textContent = 24 - state.hoursWorked;
    document.getElementById('dailyPay').textContent = (state.hourlyPay * 24).toLocaleString();
    
    const progress = (state.hoursWorked / 24) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    
    saveState();
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
        const dailyPay = state.hourlyPay * 24;
        state.money += dailyPay;
        state.daysCompleted++;
        state.hoursWorked = 0;
        log(`Arbejdsdag fuldført! Du modtog din dagløn på ${dailyPay.toLocaleString()} kr.`);
        animateMoneyEarned();
 
        setTimeout(() => {
            if (window.parent && window.parent.globalValues) {
                window.parent.globalValues.Penge += 3600;
                window.parent.opdaterTekst('Penge', " Penge " + window.parent.globalValues.Penge + " kr");
                window.parent.DageGik();
            }
        }, 10);
    } else {
        log(`Du har arbejdet ${state.hoursWorked} timer i dag. Fortsæt arbejdet for at få din dagløn.`);
    }
 
    updateDisplay();
 }
 
 function toggleWork() {
    const btn = document.getElementById('startBtn');
    
    if (state.isWorking) {
        state.isWorking = false;
        clearInterval(state.intervalId);
        btn.textContent = 'Start Arbejde';
        btn.classList.remove('stop');
        btn.classList.add('start');
        log('Arbejde sat på pause. Du får først din løn når dagen er fuldført.');
    } else {
        state.isWorking = true;
        state.intervalId = setInterval(work, 3000);
        btn.textContent = 'Stop Arbejde';
        btn.classList.remove('start');
        btn.classList.add('stop');
        log('Arbejde startet. Fuldfør dagen for at få din løn.');
    }
 }