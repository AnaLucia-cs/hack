function mostrarResumen() {
  const objetivo = document.getElementById('objetivo').value || 'Sin objetivo';
  const monto = parseFloat(document.getElementById('monto').value) || 0;
  const meses = parseInt(document.getElementById('meses').value) || 1;
  const tarjeta = document.getElementById('tarjeta').value || 'Sin tarjeta';
  const ahorroMensual = (monto / meses).toFixed(2);

  // Mostrar resultado
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
    ✅ <strong>${objetivo}</strong><br>
    Monto total: <strong>$${monto}</strong><br>
    Duración: <strong>${meses}</strong> meses<br>
    Ahorro mensual: <strong>$${ahorroMensual}</strong><br>
    Tarjeta(s): <strong>${tarjeta}</strong>
  `;

  // Animación de progreso
  const circulos = document.querySelectorAll('.circulo');
  circulos.forEach((c, i) => {
    setTimeout(() => c.classList.add('activo'), i * 300);
  });
}

function goHome() {
  window.location.href = "Inicio.html";
}