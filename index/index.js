// Wait for the page to fully load before running scripts
document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    // Ensure gems are displayed correctly using global.js
    displayGems();

    // Smooth redirection for 'Browse Activities' button
    document.querySelector(".browse-activities a").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default anchor behavior
        window.location.href = "activities/activities.html"; // Redirect to Activities Page
    });

    // Smooth redirection for 'Casino' button
    document.querySelector(".casino-button a").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "casino/casino.html"; // Redirect to Casino Page
    });

    // Add hover animation for all anchor tags
    document.querySelectorAll("a").forEach((button) => {
        button.addEventListener("mouseover", () => {
            button.style.transform = "scale(1.05)";
            button.style.transition = "0.2s ease";
        });

        button.addEventListener("mouseout", () => {
            button.style.transform = "scale(1)";
        });
    });

    // Function to add gems manually (future use or testing)
    function addGems(amount) {
        updateTotalGems(amount); // Use global.js to update gems
        displayGems(); // Refresh gem display
    }

    // Debugging log
    console.log("Index.js fully loaded and working with global.js!");
});
