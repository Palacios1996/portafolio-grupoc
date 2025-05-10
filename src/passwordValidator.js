// src/passwordValidator.js

function validatePassword(password) {
    if (!password) return false;                    // No debe estar vacía
    if (password.length < 8) return false;           // Mínimo 8 caracteres
    if (!/[A-Z]/.test(password)) return false;       // Al menos una mayúscula
    if (!/[0-9]/.test(password)) return false;       // Al menos un número
    return true;
}
  
module.exports = { validatePassword };