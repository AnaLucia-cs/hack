const cards = document.querySelectorAll('.card');
let current = 0;

// Aplicamos una transición suave
cards.forEach(card => {
    card.style.transition = "transform 0.6s ease, opacity 0.6s ease";
});

function updateCards() {
    const total = cards.length;

    cards.forEach((card, i) => {
        const index = (i - current + total) % total;

        // Calculamos posición circular
        if (index === 0) {
            // Carta principal (al frente)
            card.style.transform = "translateX(0) scale(1) translateZ(100px)";
            card.style.zIndex = 3;
            card.style.opacity = 1;
        } else if (index === 1) {
            // Siguiente a la derecha
            card.style.transform = "translateX(120px) scale(0.85) translateZ(-80px)";
            card.style.zIndex = 2;
            card.style.opacity = 0.7;
        } else if (index === total - 1) {
            // Anterior a la izquierda
            card.style.transform = "translateX(-120px) scale(0.85) translateZ(-80px)";
            card.style.zIndex = 2;
            card.style.opacity = 0.7;
        } else {
            // Cartas fuera de vista
            card.style.transform = "translateX(0) scale(0.7) translateZ(-200px)";
            card.style.zIndex = 1;
            card.style.opacity = 0;
        }
    });
}

// Botones de control
document.getElementById('nextBtn').addEventListener('click', () => {
    current = (current + 1) % cards.length;
    updateCards();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    current = (current - 1 + cards.length) % cards.length;
    updateCards();
});

// Inicializar
updateCards();
