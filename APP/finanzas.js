function toggleFrequency() {
  const reminderCheckbox = document.getElementById("reminder");
  const frequencyOptions = document.getElementById("frequency-options");

  if (reminderCheckbox.checked) {
    frequencyOptions.classList.remove("hidden");
    frequencyOptions.style.maxHeight = "500px";
    frequencyOptions.style.opacity = "1";
  } else {
    frequencyOptions.style.maxHeight = "0";
    frequencyOptions.style.opacity = "0";
    setTimeout(() => frequencyOptions.classList.add("hidden"), 300);
  }
}
function goHome() {
  window.location.href = "Inicio.html";
}
