//Selectors for accessing vrious parts of the game in the DOM 
const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('#btn'),
    win: document.querySelector('.win')
};


//Generate the game board with cards
const generateGame = () => {
    const dimensions = parseInt(selectors.board.getAttribute('data-dimension'), 10);
    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.");
}
// Emoji icons//
const emojis =['assets/images/camel.png', 'assets/images/cat.png', 'assets/images/corgi.png', 'assets/images/donkey.png','assets/images/elephant.png', 'assets/images/frog.png', 'assets/images/horse.png', 'assets/images/kangaroo.png', 'assets/images/pig.png', 'assets/images/zebra.png'];
const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
const items = shuffle([...picks, ...picks]);
selectors.board.innerHTML = ''; // Clear existing board
selectors.board.style.gridTemplateColumns = `repeat(${dimensions}, 1fr)`; //Create Grid
const cards = items.map(item =>`
    <div class="card">
        <div class="card-front"></div>
        <div class="card-back">${item}</div>
    </div>
`).join('');
    selectors.board.innerHTML = cards;
    selectors.board.style.gridTemplateColumns = `repeat(${dimensions}, auto)`;

};

// shuffle to randomize the cards on the board
const shuffle = array => {
    const clonedArray = [...array];
    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [clonedArray[index], clonedArray[randomIndex]] = [clonedArray[randomIndex], clonedArray[index]];
    }
    return clonedArray;
};
//Pick random items from an array
const pickRandom = (array, items) => {
    const clonedArray = [...array];
    const randomPicks = [];
    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        randomPicks.push(clonedArray.splice(randomIndex, 1)[0]);
    }
    return randomPicks;
};

// Starts the game, initializes timer, and disables start button
const startGame = () => {
    state.gameStarted = true;
    selectors.start.classList.add('disabled');
    msg.style.display = "block";
    msgText.innerHTML = "Game has been Started";
    setTimeout(() => msg.style.display = "none", 1500);
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