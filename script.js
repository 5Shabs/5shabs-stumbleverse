document.addEventListener("DOMContentLoaded", () => {
    // Fade-in effect for all elements
    document.querySelector(".container").style.opacity = "1";

    // Social buttons hover effect
    const socialButtons = document.querySelectorAll(".social-buttons a");
    socialButtons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.1)";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });

    // "Browse Activities" button click effect
    const browseBtn = document.querySelector(".browse-btn");
    browseBtn.addEventListener("click", () => {
        browseBtn.style.transform = "scale(0.9)";
        setTimeout(() => {
            browseBtn.style.transform = "scale(1)";
        }, 200);
    });
});
