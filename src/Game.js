class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        this.input = new InputHandler();
        this.player = new Player(this);
        this.background = new Background(this);

        this.enemies = [];
        this.projectiles = [];
        this.particles = [];

        this.score = 0;
        this.lives = 3;
        this.stage = 1;
        this.enemiesDestroyed = 0;
        this.gameOver = false;
        this.gameActive = false;

        this.speed = 1;

        this.lastTime = 0;
        this.enemyTimer = 0;
        this.enemyInterval = 1000;

        // UI Elements
        this.scoreEl = document.getElementById('score');
        this.livesEl = document.getElementById('lives');
        this.stageEl = document.getElementById('stage');
        this.startScreen = document.getElementById('start-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.finalScoreEl = document.getElementById('final-score');
    }

    start() {
        this.input.setupListeners();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;

        if (this.gameActive && !this.gameOver) {
            this.update(deltaTime);
            this.draw();
        } else {
            this.handleMenuState();
            if (!this.gameActive) {
                this.ctx.fillStyle = '#050510';
                this.ctx.fillRect(0, 0, this.width, this.height);
                this.background.update(deltaTime);
                this.background.draw(this.ctx);
            }
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    handleMenuState() {
        if (this.input.keys.includes('Space')) {
            if (this.gameOver) {
                this.resetGame();
            } else if (!this.gameActive) {
                this.startGame();
            }
        }
    }

    startGame() {
        this.gameActive = true;
        this.startScreen.classList.add('hidden');
        this.startScreen.classList.remove('active');
    }

    resetGame() {
        this.score = 0;
        this.lives = 3;
        this.stage = 1;
        this.enemiesDestroyed = 0;
        this.enemyInterval = 1000;
        this.gameOver = false;
        this.gameActive = true;
        this.enemies = [];
        this.projectiles = [];
        this.particles = [];
        this.player.reset();
        this.updateUI();

        this.gameOverScreen.classList.add('hidden');
        this.gameOverScreen.classList.remove('active');
    }

    update(deltaTime) {
        this.background.update(deltaTime);
        this.player.update(deltaTime);

        // Enemies
        if (this.enemyTimer > this.enemyInterval) {
            this.spawnEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }

        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
            if (enemy.markedForDeletion) {
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
        });

        // Projectiles
        this.projectiles.forEach(projectile => {
            projectile.update(deltaTime);
            if (projectile.markedForDeletion) {
                this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
            }
        });

        // Particles
        this.particles.forEach(particle => {
            particle.update(deltaTime);
            if (particle.markedForDeletion) {
                this.particles.splice(this.particles.indexOf(particle), 1);
            }
        });

        this.checkCollisions();
        this.checkStageProgression();
    }

    draw() {
        this.ctx.fillStyle = '#050510';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.background.draw(this.ctx);
        this.player.draw(this.ctx);

        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.projectiles.forEach(projectile => projectile.draw(this.ctx));
        this.particles.forEach(particle => particle.draw(this.ctx));
    }

    spawnEnemy() {
        const x = Math.random() * (this.width - 50);
        let type = 'basic';

        // Difficulty Logic
        const random = Math.random();
        if (this.stage > 1 && random > 0.7) type = 'fast';
        if (this.stage > 2 && random > 0.9) type = 'heavy';

        this.enemies.push(new Enemy(this, x, -60, type));
    }

    createExplosion(x, y, color) {
        for (let i = 0; i < 10; i++) {
            this.particles.push(new Particle(this, x, y, color));
        }
    }

    checkCollisions() {
        // Projectiles hitting Enemies
        this.projectiles.forEach(projectile => {
            this.enemies.forEach(enemy => {
                if (this.checkCollision(projectile, enemy)) {
                    projectile.markedForDeletion = true;
                    if (enemy.takeDamage()) {
                        this.score += enemy.scoreValue;
                        this.enemiesDestroyed++;
                        this.createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
                        this.updateUI();
                    } else {
                        // Hit effect but not destroyed
                        this.createExplosion(projectile.x, projectile.y, 'white');
                    }
                }
            });
        });

        // Enemies hitting Player
        this.enemies.forEach(enemy => {
            if (this.checkCollision(enemy, this.player)) {
                enemy.markedForDeletion = true;
                this.createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
                this.lives--;
                this.updateUI();
                if (this.lives <= 0) {
                    this.setGameOver();
                }
            }
        });
    }

    checkStageProgression() {
        const threshold = this.stage * 10; // 10 kills per stage
        if (this.enemiesDestroyed >= threshold) {
            this.stage++;
            this.enemiesDestroyed = 0;
            // Increase difficulty
            if (this.enemyInterval > 400) this.enemyInterval -= 100;
            this.updateUI();
        }
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y
        );
    }

    updateUI() {
        this.scoreEl.innerText = this.score;
        this.livesEl.innerText = this.lives;
        this.stageEl.innerText = this.stage;
    }

    setGameOver() {
        this.gameOver = true;
        this.finalScoreEl.innerText = this.score;
        this.gameOverScreen.classList.remove('hidden');
        this.gameOverScreen.classList.add('active');
    }
}
