// game.js
var styrke = window.parent.globalValues.købTeks;




const state = {
    playerHp: 100,
    enemyHp: 100,
    isPlayerTurn: true,
    isDefending: false,
    gameOver: false
};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateHealth() {
    document.getElementById('playerHp').textContent = state.playerHp;
    document.getElementById('enemyHp').textContent = state.enemyHp;
    document.getElementById('playerHealthBar').style.width = `${state.playerHp}%`;
    document.getElementById('enemyHealthBar').style.width = `${state.enemyHp}%`;
}

function log(message) {
    const gameLog = document.getElementById('gameLog');
    gameLog.innerHTML += `<div>${message}</div>`;
    gameLog.scrollTop = gameLog.scrollHeight;
}

function checkGameOver() {
    if (state.playerHp <= 0) {
        state.gameOver = true;
        log('Spillet er slut - Computeren vandt!');
        disableButtons(true);
        return true;
    }
    if (state.enemyHp <= 0) {
        state.gameOver = true;
        log('Tillykke! Du vandt!');
        disableButtons(true);
        return true;
    }
    return false;
}

function disableButtons(disabled) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = disabled);
}

const actions = {
    attack: {
        chance: 0.8,
        execute: () => {
            const damage = random(10, styrke);
            return { damage, message: `Angreb gjorde ${damage} skade!` };
        }
    },
    heavyAttack: {
        chance: 0.5,
        execute: () => {
            const damage = random(20, 30);
            return { damage, message: `Kraftigt angreb gjorde ${damage} skade!` };
        }
    },
    heal: {
        chance: 0.7,
        execute: () => {
            const amount = random(15, 25);
            return { heal: amount, message: `Healede ${amount} HP!` };
        }
    },
    defend: {
        chance: 0.9,
        execute: () => {
            return { defend: true, message: 'Forbereder forsvar mod næste angreb!' };
        }
    }
};

async function performAction(actionType) {
    if (state.gameOver || !state.isPlayerTurn) return;
    
    disableButtons(true);
    const action = actions[actionType];
    
    if (Math.random() <= action.chance) {
        const result = action.execute();
        log('Spiller: ' + result.message);
        
        if (result.damage) {
            state.enemyHp = Math.max(0, state.enemyHp - result.damage);
        } else if (result.heal) {
            state.playerHp = Math.min(100, state.playerHp + result.heal);
        } else if (result.defend) {
            state.isDefending = true;
        }
        
        updateHealth();
        
        if (!checkGameOver()) {
            state.isPlayerTurn = false;
            await computerTurn();
        }
    } else {
        log('Spiller: Handlingen mislykkedes!');
        state.isPlayerTurn = false;
        await computerTurn();
    }
}

async function computerTurn() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const actions = ['attack', 'heavyAttack', 'heal', 'defend'];
    const actionType = actions[Math.floor(Math.random() * actions.length)];
    
    if (Math.random() <= 0.7) { // Computer har 70% chance for at ramme
        switch(actionType) {
            case 'attack':
                const damage = random(10, 20);
                const actualDamage = state.isDefending ? Math.floor(damage / 2) : damage;
                state.playerHp = Math.max(0, state.playerHp - actualDamage);
                log(`Computer: Angreb gjorde ${actualDamage} skade!${state.isDefending ? ' (Reduceret af forsvar)' : ''}`);
                break;
            case 'heavyAttack':
                const heavyDamage = random(20, 30);
                const actualHeavyDamage = state.isDefending ? Math.floor(heavyDamage / 2) : heavyDamage;
                state.playerHp = Math.max(0, state.playerHp - actualHeavyDamage);
                log(`Computer: Kraftigt angreb gjorde ${actualHeavyDamage} skade!${state.isDefending ? ' (Reduceret af forsvar)' : ''}`);
                break;
            case 'heal':
                const heal = random(15, 25);
                state.enemyHp = Math.min(100, state.enemyHp + heal);
                log(`Computer: Healede ${heal} HP!`);
                break;
            case 'defend':
                log('Computer: Forbereder forsvar mod næste angreb!');
                break;
        }
    } else {
        log('Computer: Handlingen mislykkedes!');
    }
    
    state.isDefending = false;
    updateHealth();
    
    if (!checkGameOver()) {
        state.isPlayerTurn = true;
        disableButtons(false);
    }
}



// Initialiser health bars
updateHealth();