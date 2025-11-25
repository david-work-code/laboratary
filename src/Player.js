class Player {
    constructor(game) {
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = game.width / 2 - this.width / 2;
        this.y = game.height - this.height - 20;
        this.speed = 5;
        this.color = '#00f3ff';

        this.shootTimer = 0;
        this.shootInterval = 200; // 200ms cooldown
    }

    update(deltaTime) {
        // Movement
        if (this.game.input.keys.includes('ArrowLeft')) this.x -= this.speed;
        if (this.game.input.keys.includes('ArrowRight')) this.x += this.speed;
        if (this.game.input.keys.includes('ArrowUp')) this.y -= this.speed;
        if (this.game.input.keys.includes('ArrowDown')) this.y += this.speed;

        // Boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

        // Shooting
        if (this.shootTimer > this.shootInterval) {
            if (this.game.input.keys.includes('Space')) {
                this.game.projectiles.push(new Projectile(this.game, this.x + this.width / 2 - 2, this.y));
                this.shootTimer = 0;
            }
        } else {
            this.shootTimer += deltaTime;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

        // X-Wing Body
        ctx.fillStyle = '#ddd';
        ctx.fillRect(-4, -20, 8, 40); // Fuselage
        ctx.beginPath();
        ctx.moveTo(-4, -20);
        ctx.lineTo(0, -35); // Nose
        ctx.lineTo(4, -20);
        ctx.fill();

        // Wings (Top/Bottom pairs flattened for 2D)
        ctx.fillStyle = '#ccc';
        // Left Wing
        ctx.beginPath();
        ctx.moveTo(-4, -5);
        ctx.lineTo(-25, 10);
        ctx.lineTo(-25, 5);
        ctx.lineTo(-4, -15);
        ctx.fill();
        // Right Wing
        ctx.beginPath();
        ctx.moveTo(4, -5);
        ctx.lineTo(25, 10);
        ctx.lineTo(25, 5);
        ctx.lineTo(4, -15);
        ctx.fill();

        // Engines
        ctx.fillStyle = '#999';
        ctx.fillRect(-6, 10, 4, 8);
        ctx.fillRect(2, 10, 4, 8);

        // Engine Glow
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.arc(-4, 18, 3, 0, Math.PI * 2);
        ctx.arc(4, 18, 3, 0, Math.PI * 2);
        ctx.fill();

        // Cockpit
        ctx.fillStyle = '#333';
        ctx.fillRect(-2, -10, 4, 8);

        ctx.restore();
    }

    reset() {
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - this.height - 20;
    }
}
