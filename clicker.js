let score = 0;
let timeLeft = 10;
let timer;

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const clickButton = document.getElementById("clicker-btn");

// Function to start the countdown timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            clickButton.disabled = true;
            alert("Time's up! Your score: " + score);
        }
    }, 1000);
}

// Start the game when the button is clicked for the first time
clickButton.addEventListener("click", () => {
    if (timeLeft === 10) {
        startTimer();
    }
    score++;
    scoreDisplay.textContent = score;
});
