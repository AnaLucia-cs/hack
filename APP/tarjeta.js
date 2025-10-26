function actualizarAhorro() {
  const meta = parseFloat(document.getElementById("meta").value);
  const actual = parseFloat(document.getElementById("actual").value);
  const barra = document.getElementById("barraAhorro");

  if (meta > 0) {
    const porcentaje = (actual / meta) * 100;
    barra.value = Math.min(porcentaje, 100);
  } else {
    barra.value = 0;
  }
}

function calcularGastos() {
  const transporte = parseFloat(document.getElementById("transporte").value) || 0;
  const comida = parseFloat(document.getElementById("comida").value) || 0;
  const ninos = parseFloat(document.getElementById("ninos").value) || 0;
  const total = transporte + comida + ninos;

  document.getElementById("resultadoGastos").innerText =
    `Total de gastos: $${total.toFixed(2)}`;
}

function guardarTarjeta() {
  const nombre = document.getElementById("nombreTarjeta").value.trim();
  const resultado = document.getElementById("tarjetaGuardada");

  if (nombre) {
    resultado.textContent = `✅ Tarjeta guardada: ${nombre}`;
  } else {
    resultado.textContent = "⚠️ Escribe un nombre o número de tarjeta";
  }
}

function goHome() {
  window.location.href = "Inicio.html";
}
