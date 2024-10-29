class CircleGame {
    constructor() {
        this.gameContainer = document.getElementById('game-container');
        this.scoreDisplay = document.getElementById('score');
        this.timerDisplay = document.getElementById('timer');
        this.startButton = document.getElementById('start-button');
        this.restartButton = document.getElementById('restart-button');
        this.menu = document.getElementById('menu');
        this.gameOverScreen = document.getElementById('game-over');
        
        this.score = 0;
        this.timeLeft = 30;
        this.gameActive = false;
        this.activeCircles = 0;
        this.maxCircles = 5;
        
        // Cirkel timing i millisekunder
        this.timeToYellow = 800;
        this.timeToRed = 1400;
        this.timeToVanish = 2000;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.restartButton.addEventListener('click', () => this.startGame());
    }
    
    startGame() {
        this.score = 0;
        this.timeLeft = 30;
        this.activeCircles = 0;
        this.gameActive = true;
        
        this.updateDisplay();
        this.menu.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
        
        this.gameTimer = setInterval(() => this.updateTimer(), 1000);
        this.createInitialCircles();
    }
    
    createInitialCircles() {
        for (let i = 0; i < this.maxCircles; i++) {
            setTimeout(() => this.createCircle(), i * 300);
        }
    }
    
    createCircle() {
        if (!this.gameActive || this.activeCircles >= this.maxCircles) return;
        
        const circle = document.createElement('div');
        circle.className = 'circle';
        
        // Tilpas størrelse til skærmen
        const size = Math.min(window.innerWidth, window.innerHeight) * 0.12;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        
        // Placer cirklen tilfældigt
        const maxX = window.innerWidth - size;
        const maxY = window.innerHeight - size;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        circle.style.backgroundColor = '#4CAF50'; // Grøn
        
        circle.addEventListener('click', () => this.handleCircleClick(circle));
        this.gameContainer.appendChild(circle);
        this.activeCircles++;
        
        // Farveændringer
        setTimeout(() => {
            if (circle.isConnected) circle.style.backgroundColor = '#FFEB3B'; // Gul
        }, this.timeToYellow);
        
        setTimeout(() => {
            if (circle.isConnected) circle.style.backgroundColor = '#F44336'; // Rød
        }, this.timeToRed);
        
        setTimeout(() => {
            if (circle.isConnected) {
                circle.remove();
                this.activeCircles--;
                this.createCircle();
            }
        }, this.timeToVanish);
    }
    
    handleCircleClick(circle) {
        const color = circle.style.backgroundColor;
        let points = 0;
        
        if (color === 'rgb(244, 67, 54)') { // Rød
            points = 1;
        } else if (color === 'rgb(255, 235, 59)') { // Gul
            points = 3;
        } else { // Grøn
            points = 5;
        }
        
        this.score += points;
        this.updateDisplay();
        
        circle.classList.add('circle-pop');
        setTimeout(() => {
            circle.remove();
            this.activeCircles--;
            this.createCircle();
        }, 300);
    }
    
    updateTimer() {
        this.timeLeft--;
        this.updateDisplay();
        
        if (this.timeLeft <= 0) {
            this.endGame();
        }
    }
    
    updateDisplay() {
        this.scoreDisplay.textContent = `Score: ${this.score}`;
        this.timerDisplay.textContent = `Tid: ${this.timeLeft}s`;
    }
    
    endGame() {
        this.gameActive = false;
        clearInterval(this.gameTimer);
        
        document.querySelectorAll('.circle').forEach(circle => circle.remove());
        
        this.gameOverScreen.classList.remove('hidden');
        document.getElementById('final-score').textContent = this.score;
    }
}

// Start spillet når siden er loaded
document.addEventListener('DOMContentLoaded', () => {
    new CircleGame();
});