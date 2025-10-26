function calcularPenalizacion() {
  const monto = parseFloat(document.getElementById("monto").value);
  const dias = parseInt(document.getElementById("dias").value);

  if (isNaN(monto) || monto <= 0) {
    mostrarResultado("resultadoPenalizacion", "Ingresa un monto válido");
    return;
  }

  if (isNaN(dias) || dias < 0) {
    mostrarResultado("resultadoPenalizacion", "Ingresa un número válido de días");
    return;
  }

  const penalizacion = monto * 0.01 * dias;
  const total = monto + penalizacion;

  const mensaje =
    dias > 0
      ? `Pagando tarde pagarías: <b>$${total.toFixed(2)}</b> (penalización: <b>$${penalizacion.toFixed(2)}</b>)`
      : `Pagando a tiempo pagarías: <b>$${monto.toFixed(2)}</b> sin penalización`;

  mostrarResultado("resultadoPenalizacion", mensaje);
}

function calcularCapacidad() {
  const ingreso = parseFloat(document.getElementById("ingreso").value);
  const deuda = parseFloat(document.getElementById("deuda").value);

  if (isNaN(ingreso) || ingreso <= 0) {
    mostrarResultado("resultadoCapacidad", "Ingresa un ingreso válido");
    return;
  }

  if (isNaN(deuda) || deuda < 0) {
    mostrarResultado("resultadoCapacidad", "Ingresa una deuda válida");
    return;
  }

  const porcentaje = (deuda / ingreso) * 100;

  let resultado = "";
  if (porcentaje < 30) {
    resultado = "Capacidad de endeudamiento: Baja → ¡Buen trabajo!";
  } else if (porcentaje < 50) {
    resultado = "Capacidad de endeudamiento: Media → Estable";
  } else {
    resultado = "Capacidad de endeudamiento: Alta → ¡Cuidado con el endeudamiento!";
  }

  mostrarResultado("resultadoCapacidad", resultado);
}

function mostrarResultado(id, mensaje) {
  const div = document.getElementById(id);
  div.innerHTML = mensaje;
  div.style.opacity = 0;
  div.style.transform = "translateY(-10px)";
  setTimeout(() => {
    div.style.transition = "all 0.4s ease";
    div.style.opacity = 1;
    div.style.transform = "translateY(0)";
  }, 50);
}

function goHome() {
  window.location.href = "Inicio.html";
}