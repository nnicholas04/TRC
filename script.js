document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname;

    function updateActiveLink() {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');

            if (currentPath.includes("menu.html") && href.includes("menu.html")) {
                link.classList.add('active');
            } else if (currentPath.includes("contatti.html") && href.includes("contatti.html")) {
                link.classList.add('active');
            } else if ((currentPath.endsWith("index.html") || currentPath === "/" || currentPath.endsWith("trc/")) && href === "index.html") {
                link.classList.add('active');
            }
        });
    }
    updateActiveLink();

    // =========================================
    // PULSANTE BACK TO TOP
    // =========================================
    const backToTopBtn = document.createElement('a');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('href', '#');
    backToTopBtn.classList.add('back-to-top');
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =========================================
    // EFFETTI SCROLL OTTIMIZZATI (Zero Lag)
    // =========================================
    let isScrolling = false;
    const header = document.querySelector('header');
    const isMenuPage = currentPath.includes("menu.html");

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                
                // Bottone Torna Su
                if (window.scrollY > 400) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }

                // Header a scomparsa nel Menu
                if (isMenuPage && header) {
                    let moveUp = 0; 
                    if (window.scrollY > 350) {
                        moveUp = (window.scrollY - 350) / 5; 
                        if (moveUp > 80) moveUp = 80;
                    }
                    header.style.transform = `translateY(-${moveUp}px)`;
                }

                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // =========================================
    // SCROLL REVEAL (INTERSECTION OBSERVER)
    // =========================================
    const elementiDaAnimare = document.querySelectorAll('.info-box, .menu-item, .reveal');
    elementiDaAnimare.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Fa scattare l'animazione un attimo prima per maggiore fluidità
    });

    elementiDaAnimare.forEach(el => observer.observe(el));
});