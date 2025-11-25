class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 15;
        this.speed = 10;
        this.markedForDeletion = false;
        this.color = '#33ff00'; // Terminal green
    }

    update(deltaTime) {
        this.y -= this.speed;
        if (this.y < -this.height) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Add a glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}
