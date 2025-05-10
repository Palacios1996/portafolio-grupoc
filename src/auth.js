const users = {};

export function registerUser(email, password) {
  if (users[email]) return { success: false, message: 'Ya existe' };
  users[email] = { password, portfolio: [] };
  return { success: true };
}

export function loginUser(email, password) {
  if (!users[email]) return { success: false, message: 'No registrado' };
  if (users[email].password !== password) return { success: false, message: 'Contraseña incorrecta' };
  return { success: true };
}

export function getUsers() {
  return users;
}