const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const tipo = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', tipo);

    // Cambia el ícono del botón
    togglePassword.textContent = tipo === 'password' ? '👁️' : '🙈';
});