// Wait for the page to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    console.log("Activities Hub Loaded Successfully!");

    // Display gems dynamically using global.js
    displayGems();

    // Update Guest Info (default for now)
    const userInfoElement = document.getElementById("userInfo");
    if (userInfoElement) {
        userInfoElement.textContent = "Guest"; // Placeholder for dynamic user profiles
    }

    // Add hover effect for activity cards
    const activityCards = document.querySelectorAll(".activity-card");
    activityCards.forEach((card) => {
        card.addEventListener("mouseover", () => {
            card.style.transform = "scale(1.05)";
            card.style.transition = "0.2s ease-in-out";
        });

        card.addEventListener("mouseout", () => {
            card.style.transform = "scale(1)";
        });
    });

    // Debugging log
    console.log("activities.js is fully functional!");
});
