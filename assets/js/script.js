/* jshint esversion: 6*/

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

//state: centralized game state to manage game status, sores and timing
const state = {
    gameStarted: false,
    gameEnded: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
};
//shuffle: randomize array elements used for shuffling
const shuffle = array => {
    const clonedArray = [...array];

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const original = clonedArray[index];

        clonedArray[index] = clonedArray[randomIndex];
        clonedArray[randomIndex] = original;
    }

    return clonedArray;
};
//PickRandom: selecets a randosm subset of elements from an array, use dto select a random set of cards
const pickRandom = (array, items) => {
    const clonedArray = [...array];
    const randomPicks = [];

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        
        randomPicks.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }

    return randomPicks;
};
//GenerateGame: Initializes the game board with shuffled cards
const generateGame = () => {

//validates board dimensions and prepares with game baord HTML
    const dimensions = selectors.board.getAttribute('data-dimension');
//Ensures an even number of cards for pairing
    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.");
    }

// Emoji icons//
const emojis =['assets/images/camel.png', 'assets/images/cat.png', 'assets/images/corgi.png', 'assets/images/donkey.png','assets/images/elephant.png', 'assets/images/frog.png', 'assets/images/horse.png', 'assets/images/kangaroo.png', 'assets/images/pig.png', 'assets/images/zebra.png'];
const picks = pickRandom(emojis, (dimensions * dimensions) / 2); 
const items = shuffle([...picks, ...picks]);

// Generate card HTML and replace existing board
const cards = `
    <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
        ${items.map(item => `
            <div class="card">
                <div class="card-front"></div>
                <div class="card-back"><img src="${item}" alt="Memory card image" class ="card-image"></div>
            </div>
        `).join('')}
   </div>
`;

const parser = new DOMParser().parseFromString(cards, 'text/html');

selectors.board.replaceWith(parser.querySelector('.board'));
};

// start game and timer //
const startGame = () => {
state.gameStarted = true;
selectors.start.classList.add('disabled');

startBtn.classList.add("lock");
startBtn.innerText = "Started";
msg.style.display = "block";
msgText.innerHTML = `Game has been Started`;

setTimeout(function() {
     msg.style.display = "none";
}, 4000); // <-- time in milliseconds

//setup game timer
state.loop = setInterval(() => {
    state.totalTime++;

    selectors.moves.innerText = `${state.totalFlips} moves`;
    selectors.timer.innerText = `time: ${state.totalTime} sec`;
}, 1000);

//stop the timer after 40 seconds
    setTimeout(stopTimer, 40000); // 40 seconds in milliseconds
};

//stop timer: stope the game timer and triggers the end-of-game logic
const stopTimer = () => {
    clearInterval(state.loop);
    state.gameEnded = true;
    msg.style.display = "block";
    msgText.innerHTML = `Your Time's Up!`;
    selectors.start.classList.remove("lock");
    selectors.start.classList.remove("disabled");
    selectors.start.innerText = "Restart";

};

// reset game: resets game to initial state, clearing any game data and UI chnages
const resetGame = () => {
    clearInterval(state.loop);
    state.gameStarted = false;
    state.gameEnded = false;
    state.flippedCards = 0;
    state.totalFlips = 0;
    state.totalTime = 0;
    selectors.moves.innerHTML = '0 moves';
    selectors.timer.innerText = 'time: 0 sec';
    selectors.start.classList.remove('disabled', 'lock');
    selectors.start.innerText = 'Start';
    msg.style.display = 'none';

    document.querySelectorAll ('.card').forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
};


//flip card logic
const flipBackCards = () => {
document.querySelectorAll('.card:not(.matched)').forEach(card => {
    card.classList.remove('flipped');
});
    state.flippedCards = 0;
};

// FlipCard: Handles the logic for flipping a card and checking for matches
const flipCard = card => {
    if (state.gameEnded){return;}

   
// Increment counters for flipped cards and total flips
state.flippedCards++;
state.totalFlips++;

if (!state.gameStarted) {
    startGame();
}
// Allow flipping if there are less than 2 cards flipped in this turn
if (state.flippedCards <= 2) {
    card.classList.add('flipped');
}
// Check for a match if 2 cards are flipped
if (state.flippedCards === 2) {
    const flippedCards = document.querySelectorAll('.flipped:not(.matched)');

// Check if the two flipped cards match
    if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
    }
// Regardless of a match, flip the cards back after a short delay
    setTimeout(() => {
        flipBackCards();
    }, 1000);
}

// If there are no more cards that we can flip, we won the game
if (!document.querySelectorAll('.card:not(.flipped)').length) {
    setTimeout(() => {
        selectors.boardContainer.classList.add('flipped');
        selectors.win.innerHTML = `
            <span class="win-text">
                You won!<br />
                with <span class="highlight">${state.totalFlips}</span> moves<br />
                under <span class="highlight">${state.totalTime}</span> seconds
            </span>
        `;
        startBtn.classList.remove("lock");
        startBtn.style.color = "white";
        startBtn.innerText = "Replay";
        startBtn.addEventListener("click", event => {
            window.location.reload();
        });

        clearInterval(state.loop);
    }, 1000);
}
};


//event listeners for start and reset
const attachEventListeners = () => {
document.addEventListener('click', event => {
    const eventTarget = event.target;
    const eventParent = eventTarget.parentElement;
// Start or restart the game based on the button's current state
    if (eventTarget.id === 'btn') { 
        if (eventTarget.innerText === "Restart") {
            resetGame();

        } else if 
        (!eventTarget.classList.contains('disabled')) {
        startGame();
    }
    // Flip a card if it's clicked and the game has not ended
    } else if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped') && !state.gameEnded) {
        flipCard(eventParent);
    }
});
};
//Initial game setup
generateGame();
attachEventListeners();