document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress-bar");
  const agregarBtn = document.getElementById("agregarBtn");
  const inputCantidad = document.getElementById("inputCantidad");
  const estadoText = document.getElementById("estadoText");
  const circuitsContainer = document.getElementById("circuits-container");
  const retosCompletados = document.getElementById("retosCompletados");

  const metaSemanal = 100;
  const totalCircuits = 5;

  // Crear círculos
  for (let i = 0; i < totalCircuits; i++) {
    const div = document.createElement("div");
    div.classList.add("circuit");
    circuitsContainer.appendChild(div);
  }

  let progresoActual = 0;

  agregarBtn.addEventListener("click", () => {
    let cantidad = parseFloat(inputCantidad.value);
    if (isNaN(cantidad) || cantidad <= 0) {
      estadoText.textContent = "⚠️ Ingresa una cantidad válida";
      return;
    }

    progresoActual += cantidad;
    if (progresoActual > metaSemanal) progresoActual = metaSemanal;

    let porcentaje = (progresoActual / metaSemanal) * 100;
    progressBar.style.width = porcentaje + "%";

    const circuitos = circuitsContainer.querySelectorAll(".circuit");
    circuitos.forEach((circuit, index) => {
      if ((progresoActual / metaSemanal) * totalCircuits > index) {
        circuit.classList.add("completed");
      } else {
        circuit.classList.remove("completed");
      }
    });

    if (progresoActual >= metaSemanal) {
      estadoText.textContent = "✅ ¡Meta alcanzada!";
    } else {
      estadoText.textContent = `Progreso: $${progresoActual.toFixed(2)} / $${metaSemanal}`;
    }

    retosCompletados.textContent = Math.round((progresoActual / metaSemanal) * totalCircuits);

    inputCantidad.value = "";
  });
});

// Función global para regresar al inicio
function goHome() {
  window.location.href = "Inicio.html";
}

