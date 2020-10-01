class Obstacle {
    constructor(x, width, height) {
        this.x = x;
        this.dx = 5;
        this.width = width;
        this.height = height;
    }

    render(ctx) {
        ctx.fillRect(this.x, 0, this.width, this.height);
    }

    move() {
        this.x -= this.dx;
    }

    isPointInside(x, y) {
        if (y <= this.height && x >= this.x && x <= (this.x + this.width)) {
            return true;
        }
        return false;
    }
}