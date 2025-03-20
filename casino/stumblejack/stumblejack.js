// Game Variables
let betAmount = 0;
let totalGems = 0; // Stored gems for the user
let playerCards = [];
let dealerCards = [];
let gameRunning = false; // Prevents actions before placing a bet

// DOM Elements
const guestDisplay = document.getElementById("guestDisplay");
const totalGemsDisplay = document.getElementById("totalGems");
const betAmountInput = document.getElementById("betAmount");
const placeBetButton = document.getElementById("placeBetButton");
const hitButton = document.getElementById("hitButton");
const standButton = document.getElementById("standButton");
const restartButton = document.getElementById("restartButton");
const dealerCardsContainer = document.getElementById("dealerCards");
const playerCardsContainer = document.getElementById("playerCards");
const dealerScoreDisplay = document.getElementById("dealerScore");
const playerScoreDisplay = document.getElementById("playerScore");
const gameStatusDisplay = document.getElementById("gameStatus");

// Initialize Game
function initializeGame() {
    // Load stored gems (fallback to 205 if nothing is saved)
    totalGems = getTotalGems();
    displayGems();

    // Set default guest name
    guestDisplay.textContent = "Guest";

    // Reset the game state
    resetGame();
}

// Function to Retrieve Gems from Local Storage
function getTotalGems() {
    return localStorage.getItem("totalGems") ? parseInt(localStorage.getItem("totalGems")) : 205;
}

// Function to Update Gems in Local Storage
function updateTotalGems(amount) {
    totalGems += amount;
    localStorage.setItem("totalGems", totalGems);
    displayGems();
}

// Function to Display Gems on the Page
function displayGems() {
    totalGemsDisplay.textContent = totalGems;
}

// Function to Reset the Game State
function resetGame() {
    betAmount = 0;
    playerCards = [];
    dealerCards = [];
    gameRunning = false;

    betAmountInput.value = "";
    dealerCardsContainer.innerHTML = "";
    playerCardsContainer.innerHTML = "";
    dealerScoreDisplay.textContent = "Score: 0";
    playerScoreDisplay.textContent = "Score: 0";
    gameStatusDisplay.textContent = "";

    hitButton.disabled = true;
    standButton.disabled = true;
    restartButton.style.display = "none";
    placeBetButton.disabled = false;
}

// Function to Place a Bet
placeBetButton.addEventListener("click", () => {
    betAmount = parseInt(betAmountInput.value);

    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Please enter a valid bet amount!");
        return;
    }

    if (betAmount > 200) {
        alert("The maximum bet limit is 200 gems!");
        return;
    }

    if (betAmount > totalGems) {
        alert("You don't have enough gems to place this bet!");
        return;
    }

    // Deduct bet amount and update gems
    updateTotalGems(-betAmount);

    // Start the game
    startGame();
});

// Start the Game
function startGame() {
    // Initialize cards and start gameplay
    playerCards = [drawCard(), drawCard()];
    dealerCards = [drawCard()];

    updateCardsDisplay();
    checkGameStatus();

    gameRunning = true;
    hitButton.disabled = false;
    standButton.disabled = false;
    placeBetButton.disabled = true;
}

// Draw a Random Card
function drawCard() {
    return Math.floor(Math.random() * 11) + 1; // Value between 1 and 11
}

// Function to Update Card Display
function updateCardsDisplay() {
    dealerCardsContainer.innerHTML = dealerCards.map(card => `<div>${card}</div>`).join("");
    playerCardsContainer.innerHTML = playerCards.map(card => `<div>${card}</div>`).join("");

    dealerScoreDisplay.textContent = `Score: ${calculateScore(dealerCards)}`;
    playerScoreDisplay.textContent = `Score: ${calculateScore(playerCards)}`;
}

// Function to Calculate Score
function calculateScore(cards) {
    return cards.reduce((a, b) => a + b, 0);
}

// Check Game Status (Blackjack or Bust)
function checkGameStatus() {
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(dealerCards);

    if (playerScore > 21) {
        endGame("You Bust! Dealer Wins.");
    } else if (playerScore === 21) {
        endGame("Blackjack! You Win.");
        rewardPlayer();
    } else if (dealerScore > 21) {
        endGame("Dealer Busts! You Win.");
        rewardPlayer();
    }
}

// Reward the Player for Winning
function rewardPlayer() {
    updateTotalGems(betAmount * 2); // Double the bet as a reward
}

// End the Game
function endGame(message) {
    gameStatusDisplay.textContent = message;
    gameRunning = false;

    hitButton.disabled = true;
    standButton.disabled = true;
    restartButton.style.display = "inline-block";
}

// Player Hits for Another Card
function playerHit() {
    if (!gameRunning) return;

    playerCards.push(drawCard());
    updateCardsDisplay();
    checkGameStatus();
}

// Player Stands
function playerStand() {
    if (!gameRunning) return;

    // Dealer's turn
    while (calculateScore(dealerCards) < 17) {
        dealerCards.push(drawCard());
    }

    updateCardsDisplay();
    determineWinner();
}

// Determine the Winner
function determineWinner() {
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(dealerCards);

    if (playerScore > dealerScore && playerScore <= 21 || dealerScore > 21) {
        endGame("You Win!");
        rewardPlayer();
    } else if (playerScore < dealerScore && dealerScore <= 21) {
        endGame("Dealer Wins!");
    } else {
        endGame("It's a Draw!");
        updateTotalGems(betAmount); // Refund the bet
    }
}

// Event Listeners
hitButton.addEventListener("click", playerHit);
standButton.addEventListener("click", playerStand);
restartButton.addEventListener("click", resetGame);

// Initialize the game
initializeGame();
