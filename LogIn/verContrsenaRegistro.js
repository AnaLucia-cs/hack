const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');

togglePassword.addEventListener('click', () => {
    const tipo = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', tipo);
    togglePassword.textContent = tipo === 'password' ? '👁️' : '🙈';
});

toggleConfirmPassword.addEventListener('click', () => {
    const tipo = confirmInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmInput.setAttribute('type', tipo);
    toggleConfirmPassword.textContent = tipo === 'password' ? '👁️' : '🙈';
});
