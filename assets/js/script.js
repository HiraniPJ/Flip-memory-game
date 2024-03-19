//Selectors for accessing vrious parts of the game in the DOM 
const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
};
let msg = document.querySelector('.msg');
let msgText = document.querySelector('.msg p');
let startBtn = document.querySelector('#btn');

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

//Generate the game board with cards
const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension')
    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.");
}
// Emoji icons//
const emojis =['assets/images/camel.png', 'assets/images/cat.png', 'assets/images/corgi.png', 'assets/images/donkey.png','assets/images/elephant.png', 'assets/images/frog.png', 'assets/images/horse.png', 'assets/images/kangaroo.png', 'assets/images/pig.png', 'assets/images/zebra.png'];
const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
const items = shuffle([...picks, ...picks]);
const cards = `
    <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
        <div class="card">
        <div class="card-front"></div>
        <div class="card-back">${item}</div>
    </div>
`).join('')}
</div>
`
const parser = new DOMParser().parseFromString(cards, 'text/html')

selectors.board.replaceWith(parser.querySelector('.board'))
}

// shuffle to randomize the cards on the board
const shuffle = array => {
    const clonedArray = [...array];
    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }
    return clonedArray;
};
//Pick random items from an array
const pickRandom = (array, items) => {
    const clonedArray = [...array];
    const randomPicks = [];
    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }
    return randomPicks
};

// Starts the game, initializes timer, and disables start button
const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    startBtn.classList.add("lock");
    startBtn.innerText = "Started";
    msg.style.display = "block";
    msgText.innerHTML = `Game has been Started`;
    
    setTimeout(function() { msg.style.display = "none"}, 1500); //time in milliseconds
    
    
    state.loop = setInterval(() => {
        state.totalTime++;
        selectors.moves.innerText = `${state.totalFlips} moves`;
        selectors.timer.innerText = `time: ${state.totalTime} sec`;
    }, 1000);
};

//event listeners for game interaction
document.addEventListener('DOMContentLoaded', () => {
    selectors.board.addEventListener('click', event => {
        if (event.target.closest('.card') && !event.target.closest('.card').classList.contains('flipped')) {
            flipCard(event.target.closest('.card'));
        }
    });
    selectors.start.addEventListener('click', () => {
// Start game when start button is clicked
        if (!selectors.start.classList.contains('disabled')) {
            startGame();
        }
    });
    generateGame();
});