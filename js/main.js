const canvas = document.getElementById('game');
const gameOverScreen = document.getElementsByClassName('game-over-screen')[0];

const JUMP_KEY = 'Space';
const JUMP_DURATION = 333;
const SCORE_PER_FRAME = 0.1;

const game = new Game(canvas);

/** Converts number to string and fills with starting zeros to given length */
function zfill(num, len) {return (Array(len).join("0") + num).slice(-len);}