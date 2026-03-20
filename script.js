document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('nav ul li a');

    // Funzione per aggiornare lo stato attivo
    function updateActiveLink() {
        const currentHash = window.location.hash;
        const currentPath = window.location.pathname;

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');

            // Caso 1: Siamo sui contatti (ancora #contatti)
            if (currentHash === "#contatti" && href.includes("#contatti")) {
                link.classList.add('active');
            } 
            // Caso 2: Siamo nel menù (pagina menu.html)
            else if (currentPath.includes("menu.html") && href.includes("menu.html")) {
                link.classList.add('active');
            }
            // Caso 3: Siamo in Home (e non sui contatti)
            else if ((currentPath.endsWith("index.html") || currentPath === "/" || currentPath.endsWith("trc/")) 
                     && href === "index.html" && currentHash !== "#contatti") {
                link.classList.add('active');
            }
        });
    }

    // Gestione del click per un feedback istantaneo
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Se è un link interno alla stessa pagina, cambiamo subito classe
            if (this.getAttribute('href').startsWith('#') || this.getAttribute('href').includes(window.location.pathname)) {
                navLinks.forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Ascolta i cambiamenti dell'URL (quando si clicca "Contatti" da un'altra pagina)
    window.addEventListener('hashchange', updateActiveLink);
    
    // Esegui al caricamento iniziale
    updateActiveLink();
});