const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let board = [...cardValues, ...cardValues]; // Duplicate to make pairs
board = shuffleArray(board);

let flippedCards = [];
let moveCount = 0;

const gameBoard = document.getElementById("game-board");
const moveCountDisplay = document.getElementById("move-count");
const resetButton = document.getElementById("reset-btn");

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(value) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-value", value);
    card.addEventListener("click", flipCard);
    return card;
}

function flipCard(event) {
    const card = event.target;

    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.textContent = card.getAttribute("data-value");
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moveCount++;
            moveCountDisplay.textContent = moveCount;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.textContent === card2.textContent) {
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card2.textContent = '';
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

function setupGame() {
    gameBoard.innerHTML = '';
    board.forEach(value => {
        const card = createCard(value);
        gameBoard.appendChild(card);
    });
}

function resetGame() {
    flippedCards = [];
    moveCount = 0;
    moveCountDisplay.textContent = moveCount;
    setupGame();
}

resetButton.addEventListener("click", resetGame);

setupGame();
