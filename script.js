document.addEventListener("DOMContentLoaded", function() {
    // =========================================
    // 1. GESTIONE LINK ATTIVO NELLA NAVBAR
    // =========================================
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
    // 2. PULSANTE "TORNA SU"
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
    // 3. EFFETTI SCROLL OTTIMIZZATI (Zero Lag)
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
    // 4. FORM PRENOTAZIONE (INVIO WHATSAPP)
    // =========================================
    const prenotationForm = document.getElementById('prenotationForm');
    if (prenotationForm) {
        prenotationForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;

            // Formatta la data a DD/MM/YYYY
            const dateParts = date.split('-');
            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

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

            const whatsappUrl = "https://wa.me/393880584145?text=" + encodeURIComponent(whatsappMessage);
            window.open(whatsappUrl, '_blank');

            prenotationForm.reset();
            // Reset della tendina ora dopo l'invio
            const selectTime = document.getElementById('time');
            if(selectTime) selectTime.innerHTML = '<option value="" disabled selected>Scegli l\'orario</option>';
        });
    }

    // =========================================
    // 5. CONTROLLO DATA E ORA PRENOTAZIONE 
    // =========================================
    const dateInput = document.getElementById('date');
    const selectTime = document.getElementById('time');

    if (dateInput && selectTime) {
        // La lista esatta dei tuoi orari a scatti di 15 minuti!
        const timeSlots = [
            "18:00", "18:15", "18:30", "18:45",
            "19:00", "19:15", "19:30", "19:45",
            "20:00", "20:15", "20:30", "20:45",
            "21:00", "21:15", "21:30", "21:45",
            "22:00", "22:15", "22:30", "22:45",
            "23:00", "23:15", "23:30", "23:45",
            "00:00", "00:15", "00:30", "00:45",
            "01:00", "01:15", "01:30", "01:45", "02:00"
        ];

        // Imposta la data minima a "oggi" sul calendario
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayString = `${yyyy}-${mm}-${dd}`;
        
        dateInput.setAttribute('min', todayString);

        // Funzione per generare gli orari dinamicamente
        function updateTimeOptions() {
            // Svuota le vecchie opzioni
            selectTime.innerHTML = '<option value="" disabled selected>Scegli l\'orario</option>';
            
            if (!dateInput.value) return;

            const isToday = dateInput.value === todayString;
            const now = new Date();
            
            // Calcoliamo i minuti attuali (spostando la notte in avanti)
            let currentH = now.getHours();
            if (currentH >= 0 && currentH <= 5) currentH += 24; 
            const currentTotalMins = (currentH * 60) + now.getMinutes();

            // Riempiamo la tendina
            timeSlots.forEach(time => {
                let [h, m] = time.split(':').map(Number);
                if (h >= 0 && h <= 5) h += 24; // Le 01:00 diventano "25:00"
                const slotTotalMins = (h * 60) + m;

                // Se la prenotazione è per oggi, nascondi gli orari passati
                if (isToday && slotTotalMins <= currentTotalMins) {
                    return; 
                }

                // Altrimenti, crea l'opzione
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                selectTime.appendChild(option);
            });

            // Se è oggi ed è troppo tardi per prenotare
            if (selectTime.options.length === 1) {
                selectTime.innerHTML = '<option value="" disabled selected>Nessun tavolo disponibile per stasera</option>';
            }
        }

        // Ricalcola gli orari ogni volta che cambia la data + FIX APPLE IPHONE
        dateInput.addEventListener('change', function() {
            // Selezionata data precedente a oggi? L'iPhone viene bloccato!
            if (this.value && this.value < todayString) {
                alert("Non puoi prenotare per un giorno passato! La data è stata reimpostata a oggi.");
                this.value = todayString; // Forza il calendario a tornare su "oggi"
            }
            
            // Dopodiché, aggiorna la tendina degli orari come sempre
            updateTimeOptions();
        });
    }
    
    // =========================================
    // 6. SCROLL REVEAL (INTERSECTION OBSERVER)
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