class InputHandler {
    constructor() {
        this.keys = [];
        this.touchY = null;
        this.touchThreshold = 30;
    }

    setupListeners() {
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === ' ' ||
                e.code === 'Space')
                && this.keys.indexOf(e.key) === -1) {

                // Normalize Space
                const key = e.code === 'Space' ? 'Space' : e.key;
                if (this.keys.indexOf(key) === -1) {
                    this.keys.push(key);
                }
            }
        });

        window.addEventListener('keyup', e => {
            const key = e.code === 'Space' ? 'Space' : e.key;
            const index = this.keys.indexOf(key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
        });
    }
}
