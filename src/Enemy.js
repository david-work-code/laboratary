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

        if (this.y > this.game.height) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        if (this.type === 'basic') {
            // TIE Fighter
            ctx.fillStyle = '#aaa';
            // Cockpit
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.fill();
            // Wing Struts
            ctx.fillRect(-15, -2, 30, 4);
            // Wings (Hexagonal panels)
            ctx.fillStyle = '#444';
            ctx.fillRect(-18, -15, 4, 30); // Left
            ctx.fillRect(14, -15, 4, 30);  // Right
        } else if (this.type === 'fast') {
            // TIE Interceptor
            ctx.fillStyle = '#aaa';
            ctx.beginPath();
            ctx.arc(0, 0, 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#444';
            // Left Wing (Pointy)
            ctx.beginPath();
            ctx.moveTo(-8, 0);
            ctx.lineTo(-20, -15);
            ctx.lineTo(-15, 0);
            ctx.lineTo(-20, 15);
            ctx.fill();
            // Right Wing
            ctx.beginPath();
            ctx.moveTo(8, 0);
            ctx.lineTo(20, -15);
            ctx.lineTo(15, 0);
            ctx.lineTo(20, 15);
            ctx.fill();
        } else if (this.type === 'heavy') {
            // TIE Bomber
            ctx.fillStyle = '#aaa';
            // Double Hull
            ctx.beginPath();
            ctx.arc(-6, 0, 8, 0, Math.PI * 2); // Pod 1
            ctx.arc(6, 0, 8, 0, Math.PI * 2);  // Pod 2
            ctx.fill();

            // Wings (Bent)
            ctx.fillStyle = '#444';
            ctx.beginPath();
            ctx.moveTo(-20, -10);
            ctx.lineTo(-12, 0);
            ctx.lineTo(-20, 10);
            ctx.lineTo(-25, 0);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(20, -10);
            ctx.lineTo(12, 0);
            ctx.lineTo(20, 10);
            ctx.lineTo(25, 0);
            ctx.fill();
        }

        // Engine Glow (Red)
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(0, 2, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    takeDamage() {
        this.lives--;
        if (this.lives <= 0) {
            this.markedForDeletion = true;
            return true; // Destroyed
        }
        return false; // Survived
    }
}
