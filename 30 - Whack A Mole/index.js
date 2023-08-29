const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('#start')
let lastHole
let timeUp = false
let score = 0

function randTime(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
    //   console.log('Ah nah thats the same one bud');
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randTime(200, 1000)
    const hole = randomHole(holes)
    // console.log(time, hole)
    hole.classList.add('up')
    
    setTimeout(() => {
        hole.classList.remove('up')
        if(!timeUp) peep()
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false
    score = 0
    peep()
    // game will end after 10sec
    setTimeout(() => {
        timeUp = true
    }, 10000);
}

function bang(e) {
    if (!e.isTrusted) return 
    score++
    this.classList.remove('up')
    scoreBoard.textContent = score
}

startBtn.addEventListener('click', startGame)

moles.forEach(mole => mole.addEventListener('click', bang))