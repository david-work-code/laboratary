class Layer {
    constructor(game, speedModifier) {
        this.game = game;
        this.speedModifier = speedModifier;
        this.stars = [];
        this.init();
    }

    init() {
        const numberOfStars = 50;
        for (let i = 0; i < numberOfStars; i++) {
            this.stars.push({
                x: Math.random() * this.game.width,
                y: Math.random() * this.game.height,
                size: Math.random() * 2 + 0.5
            });
        }
    }

    update(deltaTime) {
        this.stars.forEach(star => {
            star.y += this.game.speed * this.speedModifier;
            if (star.y > this.game.height) {
                star.y = 0 - star.size;
                star.x = Math.random() * this.game.width;
            }
        });
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        this.stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

class Background {
    constructor(game) {
        this.game = game;
        this.layers = [
            new Layer(game, 0.2), // Distant stars (slow)
            new Layer(game, 0.5), // Mid-distance stars
            new Layer(game, 1.0)  // Close stars (fast)
        ];
    }

    update(deltaTime) {
        this.layers.forEach(layer => layer.update(deltaTime));
    }

    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx));
    }
}
