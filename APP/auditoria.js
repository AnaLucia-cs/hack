// Variables de referencia
const progressBar = document.getElementById("progress-bar");
const agregarBtn = document.getElementById("agregarBtn");
const inputCantidad = document.getElementById("inputCantidad");
const estadoText = document.getElementById("estadoText");
const circuitsContainer = document.getElementById("circuits-container");

// Configuración de ejemplo: meta semanal $100 y 5 círculos
const metaSemanal = 100;
const totalCircuits = 5;

// Crear círculos al cargar la página
for (let i = 0; i < totalCircuits; i++) {
  const div = document.createElement("div");
  div.classList.add("circuit");
  circuitsContainer.appendChild(div);
}

// Estado actual del progreso
let progresoActual = 0;

agregarBtn.addEventListener("click", () => {
  let cantidad = parseFloat(inputCantidad.value);
  if (isNaN(cantidad) || cantidad <= 0) {
    estadoText.textContent = "⚠️ Ingresa una cantidad válida";
    return;
  }

  progresoActual += cantidad;
  if (progresoActual > metaSemanal) progresoActual = metaSemanal;

  // Actualizar barra de progreso
  let porcentaje = (progresoActual / metaSemanal) * 100;
  progressBar.style.width = porcentaje + "%";

  // Actualizar los círculos según el progreso
  const circuitos = circuitsContainer.querySelectorAll(".circuit");
  circuitos.forEach((circuit, index) => {
    if ((progresoActual / metaSemanal) * totalCircuits > index) {
      circuit.classList.add("completed");
    } else {
      circuit.classList.remove("completed");
    }
  });

  // Mensaje de estado
  if (progresoActual >= metaSemanal) {
    estadoText.textContent = "✅ ¡Meta alcanzada!";
  } else {
    estadoText.textContent = `Progreso: $${progresoActual.toFixed(2)} / $${metaSemanal}`;
  }

  // Limpiar input
  inputCantidad.value = "";
});
