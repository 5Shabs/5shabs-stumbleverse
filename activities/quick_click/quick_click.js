// Game Variables
let score = 0;
let timeLeft = 15; // Game duration in seconds
let gameRunning = false;
let gemPayout = 0;
const gemCap = 5; // Max gems a player can earn

// DOM Elements
const startButton = document.getElementById("startButton");
const gameBoard = document.getElementById("gameBoard");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const gemDisplay = document.getElementById("gemDisplay");

// Function to Start the Game
function startGame() {
    // Reset game variables
    score = 0;
    timeLeft = 15;
    gameRunning = true;
    gemPayout = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gemDisplay.textContent = `Gems Earned: ${gemPayout}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    // Clear the game board
    gameBoard.innerHTML = "";

    // Start the timer
    const timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    // Spawn the first skin
    spawnSkin();
}

// Function to End the Game
function endGame() {
    gameRunning = false;
    timerDisplay.textContent = "Time's Up!";
    calculateGems();
    gemDisplay.textContent = `Gems Earned: ${gemPayout}`;
    gameBoard.innerHTML = "<p>Game Over!</p>";

    // Update and Display Gems via global.js
    updateTotalGems(gemPayout);
    displayGems();
}

// Function to Calculate Gems Earned
function calculateGems() {
    if (score <= 3) {
        gemPayout = 0;
    } else if (score >= 4 && score <= 6) {
        gemPayout = 1;
    } else if (score >= 7 && score <= 9) {
        gemPayout = 2;
    } else if (score >= 10 && score <= 12) {
        gemPayout = 3;
    } else if (score >= 13 && score <= 14) {
        gemPayout = 4;
    } else if (score >= 15) {
        gemPayout = gemCap; // Maximum payout is 5 gems
    }
}

// Function to Spawn a Skin
function spawnSkin() {
    if (!gameRunning) return;

    // Clear any existing skins to ensure only one is present
    gameBoard.innerHTML = "";

    // Create a Ronaldo skin element
    const skin = document.createElement("div");
    skin.classList.add("ronaldo-skin");

    // Randomize position
    const x = Math.random() * (gameBoard.offsetWidth - 50); // Subtract skin size to avoid overflow
    const y = Math.random() * (gameBoard.offsetHeight - 50);
    skin.style.left = `${x}px`;
    skin.style.top = `${y}px`;

    // Append to the game board
    gameBoard.appendChild(skin);

    // Event Listener for Click
    skin.addEventListener("click", () => {
        if (gameRunning) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            spawnSkin(); // Immediately spawn a new skin
        }
    });
}

// Event Listener for Start Button
startButton.addEventListener("click", startGame);
