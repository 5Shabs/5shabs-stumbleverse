let score = localStorage.getItem("clickerScore") ? parseInt(localStorage.getItem("clickerScore")) : 0;
let timeLeft = 10;
let timerActive = false;

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const clickButton = document.getElementById("clicker-btn");
const resetButton = document.getElementById("reset-btn");

// Set initial values
scoreDisplay.textContent = score;
timeDisplay.textContent = timeLeft;

// Function to start the countdown timer
function startTimer() {
    if (timerActive) return; // Prevent multiple timers
    timerActive = true;

    let countdown = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            clickButton.disabled = true;
            alert("Time's up! Your final score: " + score);
        }
    }, 1000);
}

// Start the game when clicking the button
clickButton.addEventListener("click", () => {
    if (!timerActive) {
        startTimer();
    }
    if (timeLeft > 0) {
        score++;
        scoreDisplay.textContent = score;
        localStorage.setItem("clickerScore", score);
    }
});

// Reset button logic
resetButton.addEventListener("click", () => {
    score = 0;
    timeLeft = 10;
    timerActive = false;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    clickButton.disabled = false;
    localStorage.setItem("clickerScore", score);
});
