// Wait for the page to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    console.log("Casino page loaded successfully!");

    // Ensure gems are displayed using global.js logic
    displayGems();

    // Update Guest Info (default for now)
    const userInfoElement = document.querySelector(".user-info");
    if (userInfoElement) {
        userInfoElement.textContent = "Guest"; // Placeholder for dynamic usernames
    }

    // Example: Add functionality or interactions for Casino Cards
    const casinoCards = document.querySelectorAll(".casino-card");
    casinoCards.forEach((card) => {
        card.addEventListener("click", (event) => {
            event.preventDefault();
            alert(`Redirecting to ${card.querySelector("h3").textContent}...`);
            window.location.href = card.getAttribute("href");
        });
    });

    // Debugging log
    console.log("Casino.js is fully functional!");
});
