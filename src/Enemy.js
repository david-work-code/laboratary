class Enemy {
    constructor(game, x, y, type = 'basic') {
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = type;
        this.markedForDeletion = false;

        // Default Stats
        this.width = 40;
        this.height = 40;
        this.speedY = 2;
        this.speedX = 0;
        this.color = '#ff0055';
        this.lives = 1;
        this.scoreValue = 10;

        this.applyTypeStats();
    }

    applyTypeStats() {
        if (this.type === 'fast') {
            this.color = '#ffaa00';
            this.speedY = 4;
            this.width = 30;
            this.height = 30;
            this.scoreValue = 20;
        } else if (this.type === 'heavy') {
            this.color = '#cc00ff';
            this.speedY = 1;
            this.lives = 3;
            this.width = 60;
            this.height = 60;
            this.scoreValue = 50;
        }
    }

    update(deltaTime) {
        this.y += this.speedY;
        this.x += this.speedX;

        return true; // Destroyed
    }
        return false; // Survived
    }
}
