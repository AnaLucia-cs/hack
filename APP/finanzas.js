// ===============================
// Mostrar u ocultar las opciones de recordatorio
// ===============================
function toggleFrequency() {
  const frequencyOptions = document.getElementById("frequency-options");
  frequencyOptions.classList.toggle("show");
}

// ===============================
// Redirigir a la página de inicio
// ===============================
function goHome() {
  window.location.href = "Inicio.html";
}

// ===============================
// Manejo del formulario
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("finance-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      tarjeta: document.getElementById("card").value.trim(),
      fecha: document.getElementById("due-date").value,
      creditos: document.getElementById("credits").value,
      pendiente: document.getElementById("pending").value,
      recordatorio: document.getElementById("reminder").checked,
    };

    if (!data.tarjeta || !data.fecha || !data.creditos || !data.pendiente) {
      alert("⚠️ Por favor completa todos los campos obligatorios.");
      return;
    }

    // Guardar en localStorage
    let registros = JSON.parse(localStorage.getItem("registrosFinancieros")) || [];
    registros.push(data);
    localStorage.setItem("registrosFinancieros", JSON.stringify(registros));

    alert("✅ Registro financiero guardado correctamente");
    form.reset();

    // Ocultar recordatorios al reiniciar
    const frequencyOptions = document.getElementById("frequency-options");
    frequencyOptions.classList.remove("show");
  });
});

