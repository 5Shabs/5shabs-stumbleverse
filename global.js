// ----- CENTRALIZED GEM MANAGEMENT ----- //

// Function to Get Total Gems
function getTotalGems() {
    return parseInt(localStorage.getItem("totalGems") || 0);
}

// Function to Update Total Gems
function updateTotalGems(amount) {
    const currentGems = getTotalGems();
    const newTotal = currentGems + amount;
    localStorage.setItem("totalGems", newTotal);
    return newTotal;
}

// Function to Initialize Gems (Optional for First-Time Users)
function initializeGems() {
    if (!localStorage.getItem("totalGems")) {
        localStorage.setItem("totalGems", 0); // Set gems to 0 for new users
    }
}

// Function to Display Gems on Pages
function displayGems() {
    const gemAmountElement = document.getElementById("gemAmount");
    if (gemAmountElement) {
        gemAmountElement.textContent = getTotalGems();
    }
}

// ----- INITIALIZATION ON PAGE LOAD ----- //
document.addEventListener("DOMContentLoaded", () => {
    // Ensure gems are initialized and display is updated
    initializeGems();
    displayGems();
});
