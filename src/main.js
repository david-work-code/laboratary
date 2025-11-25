window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    // Set canvas resolution to match CSS size for 1:1 pixel mapping
    canvas.width = 600;
    canvas.height = 800;

    const game = new Game(canvas);
    game.start();
});
