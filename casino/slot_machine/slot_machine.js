// Game Variables
let betAmount = 0;
let totalBetsPlaced = 0; // Tracks total bets placed
let remainingSpins = 0; // Tracks spins allowed by bets
let autospinActive = false; // Tracks if Autospin is running
let autospinInterval = null; // Holds the interval ID for Autospin
let gameRunning = false; // Prevents overlapping spins
let skipTimeout = null; // Tracks the 2-second pause timeout for Skip button sync

// DOM Elements
const spinButton = document.getElementById("spinButton");
const autospinButton = document.getElementById("autospinButton");
const placeBetButton = document.getElementById("placeBetButton");
const betInput = document.getElementById("betAmount");
const gemAmountDisplay = document.getElementById("gemAmount");
const resultMessage = document.getElementById("resultMessage");
const winAmountDisplay = document.getElementById("winAmount");
const reels = document.querySelectorAll(".reel");
const betCounterDisplay = document.createElement("div"); // Added dynamically
const skipButton = document.createElement("button"); // Skip Button for Pause

// Add Bet Counter Display to the UI
betCounterDisplay.id = "betCounterDisplay";
betCounterDisplay.textContent = "Remaining Spins: 0";
document.querySelector(".container").appendChild(betCounterDisplay);

// Add Skip Button to the UI
skipButton.id = "skipButton";
skipButton.textContent = "Skip";
skipButton.style.display = "none"; // Initially hidden
document.querySelector(".container").appendChild(skipButton);

// Reel Symbols
const symbols = ["🍒", "⭐", "💎", "🍋", "🔔"];

// Function to Place a Bet
placeBetButton.addEventListener("click", () => {
    betAmount = parseInt(betInput.value);

    if (betAmount <= 0 || isNaN(betAmount)) {
        resultMessage.textContent = "Please enter a valid bet amount!";
        return;
    }

    const currentGems = getTotalGems();

    if (betAmount > currentGems) {
        resultMessage.textContent = "Insufficient gems to place this bet!";
        return;
    }

    // Deduct the bet amount and update counters
    updateTotalGems(-betAmount);
    totalBetsPlaced++;
    remainingSpins++;
    displayGems();
    updateBetCounter();

    // Enable the Spin button
    spinButton.disabled = false;
    resultMessage.textContent = "Bet placed! You can now spin the reels!";
});

// Function to Update Bet Counter Display
function updateBetCounter() {
    betCounterDisplay.textContent = `Remaining Spins: ${remainingSpins}`;
}

// Function to Spin the Reels
function spinReels() {
    if (gameRunning || remainingSpins <= 0) {
        resultMessage.textContent = remainingSpins <= 0
            ? "No spins remaining! Place more bets to spin again."
            : "Please wait for the current spin to finish.";
        return;
    }

    gameRunning = true;
    remainingSpins--;
    updateBetCounter();
    resultMessage.textContent = "Spinning...";
    winAmountDisplay.textContent = "Gems Won: 0";

    // Sequential Reel Spinning Logic
    spinSingleReel(reels[0], () => {
        spinSingleReel(reels[1], () => {
            spinSingleReel(reels[2], () => {
                calculateResults(); // Calculate results after the last reel stops
            });
        });
    });
}

// Function to Spin a Single Reel
function spinSingleReel(reel, callback) {
    let spinCount = 20; // Number of spins before stopping
    const spinInterval = setInterval(() => {
        reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        spinCount--;

        if (spinCount <= 0) {
            clearInterval(spinInterval);
            callback(); // Call the next reel spin or finish
        }
    }, 100); // Speed of spinning
}

// Function to Calculate Spin Results
function calculateResults() {
    const reelSymbols = Array.from(reels).map((reel) => reel.textContent);
    const [symbol1, symbol2, symbol3] = reelSymbols;

    let gemsWon = 0;

    if (symbol1 === symbol2 && symbol2 === symbol3) {
        // All three symbols match
        gemsWon = betAmount * 3; // Triple the bet
        resultMessage.textContent = `Jackpot! All three matched (${symbol1})!`;
    } else if (symbol1 === symbol2 || symbol1 === symbol3 || symbol2 === symbol3) {
        // Two symbols match
        gemsWon = betAmount * 2; // Double the bet
        resultMessage.textContent = `Nice! Two symbols matched (${symbol1}, ${symbol2}, ${symbol3})!`;
    } else {
        resultMessage.textContent = `No match. Better luck next time!`;
    }

    // Update total gems and display
    updateTotalGems(gemsWon);
    displayGems();

    // Show the win amount
    winAmountDisplay.textContent = `Gems Won: ${gemsWon}`;

    // Pause Autospin for 2 seconds if active and something is won
    if (autospinActive && gemsWon > 0) {
        clearInterval(autospinInterval); // Pause Autospin
        skipButton.style.display = "block"; // Show Skip Button

        skipTimeout = setTimeout(() => {
            skipButton.style.display = "none"; // Hide Skip Button after 2 seconds
            // Resume Autospin automatically after 2 seconds
            if (autospinActive && remainingSpins > 0) {
                resumeAutospin();
            }
        }, 2000);
    }

    gameRunning = false; // Mark the game as not running
}

// Skip Button Functionality
skipButton.addEventListener("click", () => {
    clearTimeout(skipTimeout); // Clear the 2-second timeout
    skipButton.style.display = "none"; // Hide Skip Button immediately
    if (autospinActive && remainingSpins > 0) {
        resumeAutospin();
    }
});

// Function to Resume Autospin
function resumeAutospin() {
    autospinInterval = setInterval(() => {
        if (!gameRunning && remainingSpins > 0) spinReels();
        if (remainingSpins <= 0) {
            clearInterval(autospinInterval);
            autospinActive = false;
            autospinButton.textContent = "Start Autospin";
            resultMessage.textContent = "Autospin stopped. Out of spins.";
        }
    }, 2100); // Resume Autospin with proper interval
}

// Autospin Functionality
autospinButton.addEventListener("click", () => {
    if (remainingSpins <= 0) {
        resultMessage.textContent = "No spins remaining! Place more bets to use Autospin.";
        return;
    }

    if (autospinActive) {
        // Stop Autospin after the current spin
        autospinButton.textContent = "Stopping Autospin...";
        clearInterval(autospinInterval);

        setTimeout(() => {
            autospinActive = false;
            autospinButton.textContent = "Start Autospin";
            resultMessage.textContent = "Autospin stopped.";
        }, 2000); // Matches the spin duration
    } else {
        // Start Autospin
        autospinActive = true;
        autospinButton.textContent = "Stop Autospin";
        resultMessage.textContent = "Autospin started.";

        autospinInterval = setInterval(() => {
            if (!gameRunning && remainingSpins > 0) spinReels();
            if (remainingSpins <= 0) {
                clearInterval(autospinInterval);
                autospinActive = false;
                autospinButton.textContent = "Start Autospin";
                resultMessage.textContent = "Autospin stopped. Out of spins.";
            }
        }, 2100); // Slightly longer than spin duration
    }
});

// Event Listener for Spin Button
spinButton.addEventListener("click", spinReels);
