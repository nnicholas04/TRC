document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Salviamo subito il percorso della pagina in cui ci troviamo
    const currentPath = window.location.pathname;

    // Funzione intelligente per capire su che pagina ci troviamo
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
    // EFFETTO SLIDE UP HEADER (SOLO NEL MENU)
    // =========================================
    if (currentPath.includes("menu.html")) {
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            let moveUp = 0; 
            
            if (window.scrollY > 300) {
                moveUp = (window.scrollY - 300) / 4.4; 
                if (moveUp > 80) {
                    moveUp = 80;
                }
            }
            
            header.style.transform = `translateY(-${moveUp}px)`;
        });
    }

    // =========================================
    // EFFETTO COMPARSA ELEMENTI (SCROLL REVEAL)
    // =========================================
    
    // 🔥 LA CORREZIONE È QUI: Ora cerca tutto ciò che ha la classe '.reveal' 
    const elementiDaAnimare = document.querySelectorAll('.info-box, .menu-item, .reveal');
    
    elementiDaAnimare.forEach(el => {
        el.classList.add('reveal'); // Si assicura che tutti abbiano la classe base
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Li fa apparire!
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 
    });

    elementiDaAnimare.forEach(el => {
        observer.observe(el);
    });
});