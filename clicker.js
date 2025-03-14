let score = localStorage.getItem("clickerScore") ? parseInt(localStorage.getItem("clickerScore")) : 0;
let timeLeft = 10;
let timer;

const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const clickButton = document.getElementById("clicker-btn");

// Set the initial score from storage
scoreDisplay.textContent = score;

// Function to start the countdown timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            clickButton.disabled = true;
            alert("Time's up! Your final score: " + score);
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
    localStorage.setItem("clickerScore", score); // Save score in LocalStorage
});
