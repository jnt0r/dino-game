class Game {
    constructor(canvas) {
        this.gameIsRunning = true;
        this.isJumping = false;

        this.dinoX = 50;
        this.dinoY = 0;
        this.dinoWidth = 20;
        this.dinoHeight = 50;

        this.obstacles = [];

        this.restartBtn = document.getElementById('resetBtn');
        this.ctx = canvas.getContext('2d');
        this.ctx.translate(0, canvas.height);
        this.ctx.scale(1, -1);

        this.registerKeyListener();

        this.startGame();
    }

    registerKeyListener() {
        window.addEventListener('keydown', (evt) => {
            if (evt.code === JUMP_KEY) {
                this.jump();
            }
        });
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.fillRect(this.dinoX, this.dinoY, this.dinoWidth, this.dinoHeight);

        this.obstacles.forEach(obstacle => obstacle.render(this.ctx));

        this.obstacles.forEach(obstacle => {
            if (obstacle.isPointInside(0 - obstacle.width, 0)) {
                this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
                return;
            }

            if (obstacle.isPointInside(this.dinoX, this.dinoY) || obstacle.isPointInside(this.dinoX + this.dinoWidth, this.dinoY)) {
                alert('Game over');
                this.gameIsRunning = false;
                this.restartBtn.disabled = false;
            }

            obstacle.move();
        });

        const lastObstacleX = Math.max.apply(Math, this.obstacles.map(function (o) { return o.x; }));

        // If no obstacle is present in canvas, create a new one at the right end of the canvas
        if (lastObstacleX === -Infinity) {
            this.obstacles.push(new Obstacle(canvas.width, 20, 25));
        } else if (canvas.width - lastObstacleX >= 100) {
            this.obstacles.push(new Obstacle(Math.floor(canvas.width + Math.random() * 600), 20, 25));
        }

        if (this.gameIsRunning) {
            window.requestAnimationFrame(() => this.gameLoop());
        }
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.dinoY = 50;
            setTimeout(() => {
                this.dinoY = 0;
                this.isJumping = false;
            }, JUMP_DURATION);
        }
    }

    startGame() {
        this.obstacles = [];
        this.gameIsRunning = true;
        this.restartBtn.disabled = true;
        window.requestAnimationFrame(() => this.gameLoop());
    }
}