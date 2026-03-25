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
    // EFFETTI SCROLL OTTIMIZZATI
    // =========================================
    let isScrolling = false;
    const header = document.querySelector('header');
    const isMenuPage = currentPath.includes("menu.html");

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 400) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }

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
    // FORM PRENOTAZIONE (INVIO WHATSAPP)
    // =========================================
    const prenotationForm = document.getElementById('prenotationForm');
    if (prenotationForm) {
        prenotationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impedisce il caricamento a vuoto della pagina

            // Preleviamo i valori inseriti dall'utente
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;

            // Formattiamo la data da YYYY-MM-DD a DD/MM/YYYY (Formato Italiano)
            const dateParts = date.split('-');
            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

            // Costruiamo il testo del messaggio pezzo per pezzo
            let whatsappMessage = "Ciao! 🤘 Vorrei prenotare un tavolo al The ROCK Cafe\n\n";
            whatsappMessage += "📝 *Dettagli Prenotazione*\n";
            whatsappMessage += "👤 Nome: " + name + "\n";
            whatsappMessage += "📱 Telefono: " + phone + "\n";
            whatsappMessage += "📅 Data: " + formattedDate + "\n";
            whatsappMessage += "⏰ Ora: " + time + "\n";
            whatsappMessage += "👥 Persone: " + guests + "\n";

            if (message.trim() !== "") {
                whatsappMessage += "📌 Note: " + message + "\n";
            }
            
            whatsappMessage += "\nGrazie! 🍺🎸";

            // Creiamo il link magico e lo codifichiamo per evitare bug
            const whatsappUrl = "https://wa.me/393880584145?text=" + encodeURIComponent(whatsappMessage);
            
            // Apriamo WhatsApp in una nuova finestra/app
            window.open(whatsappUrl, '_blank');

            // Puliamo i campi del modulo per la prossima volta
            prenotationForm.reset();
        });
    }

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
        rootMargin: "0px 0px -50px 0px"
    });

    elementiDaAnimare.forEach(el => observer.observe(el));
});