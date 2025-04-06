document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.getElementById("theme-switch");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const icon = menuToggle.querySelector("i");

    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        themeButton.textContent = document.body.classList.contains("light-mode") ? "🌞" : "🌙";
    });

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove("active");
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        });
    });

    const texts = [
        "Finding bugs before users find them.",
        "Ensuring software quality through manual and automation testing.",
        "I love solving problems.",
        "Breaking code to build perfection."
    ];

    let index = 0;
    let charIndex = 0;
    let currentText = "";
    let isDeleting = false;

    function typeEffect() {
        const subtitle = document.getElementById("typing-text");

        if (isDeleting) {
            currentText = texts[index].substring(0, charIndex--);
        } else {
            currentText = texts[index].substring(0, charIndex++);
        }

        subtitle.textContent = `"${currentText}"`;

        if (!isDeleting && charIndex === texts[index].length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % texts.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    typeEffect();
});