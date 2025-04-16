document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.getElementById("theme-switch");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const icon = menuToggle?.querySelector("i");

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
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        });
    });

    const texts = [
        "Finding bugs before users find them.",
        "Ensuring software quality through manual and automated testing.",
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

    const slider = document.querySelector('.projects-slider');
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const cardWidth = document.querySelector('.project-card').offsetWidth + 20;

    let currentIndex = 0;
    let cardsPerSlide = window.innerWidth >= 768 ? 3 : 1;
    let scrollAmount = 0;

    function updateCardsPerSlide() {
        cardsPerSlide = window.innerWidth >= 768 ? 3 : 1;
    }

    function updateSliderPosition() {
        const cardWidth = projectCards[0].offsetWidth + 20; // 20 = gap
        const offset = currentIndex * cardWidth;
        slider.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < projectCards.length - cardsPerSlide) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    let startX = 0;
    let startY = 0;
    let touchStartTime = 0;
    let isSwiping = false;

    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        touchStartTime = new Date().getTime();
        isSwiping = false;
    });

    slider.addEventListener('touchmove', e => {
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY)) {
            isSwiping = true;
        }
    });

    slider.addEventListener('touchend', e => {
        const deltaX = e.changedTouches[0].clientX - startX;
        const deltaY = e.changedTouches[0].clientY - startY;
        const elapsed = new Date().getTime() - touchStartTime;

        const isSwipe = Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) && elapsed < 500;

        console.log('Touchend - isSwipe:', isSwipe);

        if (isSwipe) {
            e.preventDefault();
            if (deltaX > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (deltaX < 0 && currentIndex < projectCards.length - cardsPerSlide) {
                currentIndex++;
            }
            updateSliderPosition();
        }
    });
});