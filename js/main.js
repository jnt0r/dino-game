const canvas = document.getElementById('game');
const gameOverScreen = document.getElementsByClassName('game-over-screen')[0];

const JUMP_KEY = 'Space';
const JUMP_DURATION = 333;

const game = new Game(canvas);