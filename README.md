<h1><b>Animal Flip Card Memory Game</h1>
<h2>Description</h2>
<p>Animal Flip Card Memory Game is a fun and engaging way to test your memory skills! This interactive game challenges players to match pairs of cards featuring adorable animals. Designed with JavaScript, it offers a smooth and enjoyable experience for both kids and adults. Perfect for improving concentration and memory through play.</p>

<h1>Script Breakdown</h1>
<h2>Selectors and Global Variables</h2>

const selectors = { ... };
let msg = document.querySelector('.msg');<br>
let msgText = document.querySelector('.msg p');<br>
let startBtn = document.querySelector('#btn');<br>

<p><b>Purpose:</b> These selectors cache important DOM elements for easy access throughout the script. Caching improves performance by reducing the need to repeatedly query the DOM for these elements. The `msg` and `msgText` are used for displaying messages to the player, while `startBtn` is the game's start/restart button.</p>

<h2>State Object</h2>

const state = { ... };<br>

<p><b>Purpose:</b> The `state` object centralizes the game's state, tracking whether the game has started or ended, the number of cards currently flipped, total flips made, total time elapsed, and the timer's loop. This design pattern helps manage the game's status and facilitates updates to the game's UI based on state changes.</p>

<h2>Utility Functions: `shuffle` and `pickRandom`</h2>

const shuffle = array => { ... };<br>
const pickRandom = (array, items) => { ... };<br>

<p><b>Purpose:</b> These functions enhance the game's randomness and replayability. `shuffle` randomly shuffles the cards each game, ensuring a unique experience. `pickRandom` selects a subset of cards to use in the game, allowing for varied card sets in different game sessions.</p>

<h2>Game Initialization: `generateGame`</h2>

const generateGame = () => { ... };<br>

<p><b>Purpose:</b> Initializes the game board with shuffled cards. This function dynamically creates the card elements based on the selected card set and arranges them in a grid. It ensures the game board is ready and populated with cards at the start of each game.</p>

<h2>Game Control Functions: `startGame` and `stopTimer`</h2>

const startGame = () => { ... };<br>
const stopTimer = () => { ... };<br>

<p><b>Purpose:</b> `startGame` sets up the game to start or restart, including disabling the start button and setting up a timer to track the game duration. `stopTimer` stops the game timer and handles the end-of-game logic, such as displaying the "time's up" message and enabling the restart option.</p>

<h2>Gameplay Logic: `flipCard` and `flipBackCards`</h2>

const flipCard = card => { ... };<br>
const flipBackCards = () => { ... };<br>

<p><b>Purpose:</b>`flipCard` manages the core gameplay mechanic of flipping cards and checking for matches. It ensures players can only flip two cards at a time and checks for matches among flipped cards. `flipBackCards` flips non-matched cards back to their default state, allowing the player to try again.</p>

<h2>Event Listeners: `attachEventListeners`</h2>

const attachEventListeners = () => { ... };<br>

<p><b>Purpose:</b>Sets up the event listeners for the game, handling card clicks and start/restart button clicks. This function is crucial for interactive gameplay, enabling players to interact with the game by flipping cards and starting new games.</p>

<h2>Initialization Call</h2>

generateGame();<br>
attachEventListeners();<br>

<p><b>Purpose:</b>These calls initialize the game board and set up the necessary event listeners when the script loads. This ensures the game is ready for the player to start playing immediately upon loading the page.</p>

<h2>Reset Game Logic</h2>

const resetGame = () => { ... };<br>

<p><b>Purpose:</b>Resets the game to its initial state. This function is critical for enabling players to start a new game after finishing one. It resets the game's state (`state` object), clears the game board of any flipped or matched cards, and prepares the start/restart button for a new game session. This ensures a fresh start without needing to reload the page.</p>

<h2>Game-Ending Condition Check</h2>

if (!document.querySelectorAll('.card:not(.flipped)').length) { ... }<br>

<p><b>Purpose:</b>This checks if all cards on the board have been flipped and matched, indicating the player has successfully found all pairs. When this condition is met, the game displays a winning message and provides options for restarting the game. It’s a crucial part of the game’s flow, marking the transition from gameplay to completion.</p>

<h2>Handling of Start/Restart Button Clicks:</h2>

if (eventTarget.id === 'btn') { ... }<br>

<p>In the `attachEventListeners` function, there's logic to handle clicks on the start/restart button differently based on the game's state:</p>

<p><b>Purpose:</b>Differentiates between starting a new game and restarting an ongoing or completed game. It ensures the appropriate action is taken, whether initializing the game state for first-time players or resetting it for players wishing to play again. This responsiveness enhances the user experience by making the game more interactive and accessible.</p>





<h2>Usage</h2>
<p>To play the game, open index.html in your web browser. Click on two cards to flip them over. The goal is to find all pairs of matching animals with the fewest flips possible and within the time range.</p>

<h2> <h2></h2> <h2></h2> <h2></h2>
<h3></h3>
<h3></h3>
<h3></h3>

<h1>Testing</h1>

<h2>Validator Testing</h2>
<p>We are committed to ensuring that our website is accessible to everyone. Regular accessibility testing is conducted to guarantee that users with disabilities can navigate our site with the same ease as all other users. For this we used lighthouse.</p>

<img src="assets/readmeImages/lighthouse performance.JPG" alt="performance">

W3C Validator
<img src="assets/readmeImages/w3 validator test.png" alt="html validator">

W3C CSS validator
<img src="assets/readmeImages/w3 css validation test.png" alt="css validator">

JShint javascript validator
   <ul>
   <li>There are 18 functions in this file.</li>
    <li>Function with the largest signature take 2 arguments, while the median is 0.</li>
    <li>Largest function has 16 statements in it, while the median is 5.</li>
    <li>The most complex function has a cyclomatic complexity value of 7 while the median is 1.</li>
    </ul>



<p></p>
<p></p>
<h1>Deployment</h1>
<h2>Cloning & Forking</h2>

<h3>Fork</h3>
<ol type="1.">
<li>On GitHub.com, navigate to the HiraniPJ/Flip-memory-game repository.</li>
<li>In the top-right corner of the page, click Fork.</li>
<li>By default, forks are named the same as their parent repositories. You can change the name of the fork to distinguish it further.</li>
<li>Add a description to your fork to indicate that this is your personal copy or a place where you're planning to propose changes.</li>
<li>Click Create fork.</li>

<h3>Clone</h3>
<ol type="1.">
<li>Above the list of files, click the button that says 'Code'.</li>
<li>Copy the URL for the repository.</li>
<li>Open Terminal. Change the directory to the location where you want the cloned directory.</li>
<li>Type git clone, and then paste the URL you copied earlier.</li>
<li>Press Enter.</li>

<h3>Local Deployment</h3>
<ol type="1.">
<li>Sign up to Gitpod or any other online IDE that suits your development needs.</li>
<li>Download the Gitpod browser extension for easy access.</li>
<li>On GitHub.com, navigate to the HiraniPJ/lip-memory-game repository.</li>
<li>Above the list of files, click the button that says 'Gitpod'.</li>
<li>This will open a new Gitpod workspace with your cloned repository ready to use.</li>

<h1>Credits</h1>

<h2>content</h2>
<ul>
<li>HTML, CSS and Javascript code help was taken from w3schools - <a href = "https://www.w3schools.com/js/default.asp"></a></li>
<li>Found some helpful guidannce of alot of codes from stack overflow - <a href ="https://stackoverflow.design/product/guidelines/javascript/"></a></li>
<li>I got alot of guidance from youtube video tutorials <a href = "https://www.youtube.com/watch?v=M5GBvIioUTY"></a> </li>
<li></li>