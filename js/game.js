class Game {
    constructor(canvas) {
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

        this.processJumping();
        this.render();
        this.moveObstacles();
        this.createNewObstacle();

        if (this.gameIsRunning) {
            window.requestAnimationFrame(() => this.gameLoop());
        }
    }

    render() {
        // Draw dino
        this.ctx.fillRect(this.dinoX, this.dinoY, this.dinoWidth, this.dinoHeight);
        // Draw all obstacles
        this.obstacles.forEach(obstacle => obstacle.render(this.ctx));
    }

    createNewObstacle() {
        const lastObstacleX = Math.max.apply(Math, this.obstacles.map(function (o) { return o.x; }));

        // If no obstacle is present in canvas, create a new one at the right end of the canvas
        if (lastObstacleX === -Infinity) {
            this.obstacles.push(new Obstacle(canvas.width, 20, 25));
        } else if (canvas.width - lastObstacleX >= 100) {
            this.obstacles.push(new Obstacle(Math.floor(canvas.width + Math.random() * 600), 20, 25));
        }
    }

    moveObstacles() {
        this.obstacles.forEach(obstacle => {
            if (obstacle.isPointInside(0 - obstacle.width, 0)) {
                this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
                return;
            }

            if (obstacle.isPointInside(this.dinoX, this.dinoY) || obstacle.isPointInside(this.dinoX + this.dinoWidth, this.dinoY)) {
                this.gameIsRunning = false;
                this.restartBtn.disabled = false;
                gameOverScreen.classList.remove('hidden');
            }

            obstacle.move();
        });
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
        }
    }

    processJumping() {
        if (this.isJumping) {
            // (‑((x/​2-​10)^​2))+​100
            this.dinoY = (-Math.pow(this.jumpX/2 - 10, 2)) + 100;
            this.jumpX++;
        
            if (this.jumpX > 40) {
                this.isJumping = false;
                this.jumpX = 0;
            }
        }
    }

    startGame() {
        this.gameIsRunning = true;
        this.isJumping = false;

        this.dinoX = 50;
        this.dinoY = 0;
        this.dinoWidth = 20;
        this.dinoHeight = 50;
        this.jumpX = 0;
        this.score = 0;
        this.obstacles = [];

        gameOverScreen.classList.add('hidden');
        this.restartBtn.disabled = true;
        window.requestAnimationFrame(() => this.gameLoop());
    }
}