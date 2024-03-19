//Generate the game board with cards
const generateGame = () => {
    const dimensions = parseInt(selectors.board.getAttribute('data-dimension'), 10);
    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.");
}
// Emoji icons//
const emojis =['assets/images/camel.png', 'assets/images/cat.png', 'assets/images/corgi.png', 'assets/images/donkey.png','assets/images/elephant.png', 'assets/images/frog.png', 'assets/images/horse.png', 'assets/images/kangaroo.png', 'assets/images/pig.png', 'assets/images/zebra.png'];

};