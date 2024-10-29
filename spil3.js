class Game {
    constructor() {
        this.container = document.getElementById('game-container');
        this.player = document.getElementById('player');
        this.scoreElement = document.getElementById('score');
        this.menu = document.getElementById('menu');
        this.gameOver = document.getElementById('game-over');
        
        // Definer de to baner
        this.leftPosition = 100;
        this.rightPosition = 300;
        this.currentPosition = this.leftPosition;
        
        this.score = 0;
        this.speed = 3;
        this.gameActive = false;
        this.obstacles = [];
        
        // Spawn kontrol
        this.spawnInterval = 2000; // Start med 2 sekunder mellem hver spawn
        this.lastSpawnTime = 0;
        this.difficultyIncreaseInterval = 10000; // Øg sværhedsgrad hver 10. sekund
        this.gameStartTime = 0;
        
        this.setupControls();
        this.positionPlayer();
    }
    
    setupControls() {
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.startGame());
        document.getElementById('left-btn').addEventListener('click', () => this.movePlayer('left'));
        document.getElementById('right-btn').addEventListener('click', () => this.movePlayer('right'));
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.movePlayer('left');
            if (e.key === 'ArrowRight') this.movePlayer('right');
        });
    }
    
    startGame() {
        this.gameActive = true;
        this.score = 0;
        this.speed = 3;
        this.spawnInterval = 2000;
        this.currentPosition = this.leftPosition;
        this.gameStartTime = Date.now();
        this.lastSpawnTime = this.gameStartTime;
        
        this.obstacles.forEach(obs => obs.remove());
        this.obstacles = [];
        
        this.menu.classList.add('hidden');
        this.gameOver.classList.add('hidden');
        this.updateScore();
        this.positionPlayer();
        
        this.gameLoop();
    }
    
    movePlayer(direction) {
        if (!this.gameActive) return;
        
        if (direction === 'left' && this.currentPosition === this.rightPosition) {
            this.currentPosition = this.leftPosition;
        } else if (direction === 'right' && this.currentPosition === this.leftPosition) {
            this.currentPosition = this.rightPosition;
        }
        
        this.positionPlayer();
    }
    
    positionPlayer() {
        this.player.style.left = `${this.currentPosition}px`;
    }
    
    createObstacle() {
        if (!this.gameActive) return;
        
        // Tjek eksisterende forhindringers positioner
        const existingObstaclePositions = this.obstacles
            .filter(obs => parseInt(obs.style.top) < 100) // Kun tjek forhindringer nær toppen
            .map(obs => parseInt(obs.style.left));
        
        // Hvis der allerede er en forhindring i begge baner nær toppen, vent
        if (existingObstaclePositions.includes(this.leftPosition) && 
            existingObstaclePositions.includes(this.rightPosition)) {
            return;
        }
        
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        
        // Vælg position der sikrer mindst én åben bane
        let position;
        if (existingObstaclePositions.includes(this.leftPosition)) {
            position = this.rightPosition;
        } else if (existingObstaclePositions.includes(this.rightPosition)) {
            position = this.leftPosition;
        } else {
            position = Math.random() < 0.5 ? this.leftPosition : this.rightPosition;
        }
        
        obstacle.style.left = `${position}px`;
        obstacle.style.top = '-40px';
        
        this.container.appendChild(obstacle);
        this.obstacles.push(obstacle);
    }
    
    gameLoop = () => {
        if (!this.gameActive) return;
        
        const currentTime = Date.now();
        const gameTime = currentTime - this.gameStartTime;
        
        // Øg sværhedsgrad hver 10. sekund
        if (gameTime > 0 && gameTime % this.difficultyIncreaseInterval < 16) {
            this.speed += 0.2;
            this.spawnInterval = Math.max(500, this.spawnInterval - 100);
        }
        
        // Spawn nye forhindringer baseret på interval
        if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
            this.createObstacle();
            this.lastSpawnTime = currentTime;
        }
        
        // Opdater forhindringer
        this.obstacles.forEach((obstacle, index) => {
            const top = parseInt(obstacle.style.top);
            
            if (top > this.container.offsetHeight) {
                obstacle.remove();
                this.obstacles.splice(index, 1);
                this.score++;
                this.updateScore();
            } else {
                obstacle.style.top = `${top + this.speed}px`;
                
                if (this.checkCollision(obstacle)) {
                    this.endGame();
                    return;
                }
            }
        });
        
        requestAnimationFrame(this.gameLoop);
    }
    
    checkCollision(obstacle) {
        const playerRect = this.player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
        
        return !(
            playerRect.right < obstacleRect.left + 10 || 
            playerRect.left > obstacleRect.right - 10 || 
            playerRect.bottom < obstacleRect.top || 
            playerRect.top > obstacleRect.bottom
        );
    }
    
    updateScore() {
        this.scoreElement.textContent = `Score: ${this.score}`;
    }
    
    endGame() {
        this.gameActive = false;
        document.getElementById('final-score').textContent = this.score;
        this.gameOver.classList.remove('hidden');
    }
}

// Start spillet når siden er loaded
window.addEventListener('load', () => {
    new Game();
});