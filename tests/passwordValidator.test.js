// tests/passwordValidator.test.js
const { validatePassword } = require('../src/passwordValidator');

test('La contraseña no debe estar vacía', () => {
  expect(validatePassword("")).toBe(false);
});

test('La contraseña debe tener al menos 8 caracteres', () => {
  expect(validatePassword("abc123")).toBe(false);
  expect(validatePassword("Abc12345")).toBe(true);
});

test('La contraseña debe contener al menos una letra mayúscula', () => {
  expect(validatePassword("abcdefgh")).toBe(false);
  expect(validatePassword("Abcdefgh1")).toBe(true);
});

test('La contraseña debe contener al menos un número', () => {
  expect(validatePassword("Abcdefgh")).toBe(false);
  expect(validatePassword("Abcdefg1")).toBe(true);
});