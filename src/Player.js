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
        }
