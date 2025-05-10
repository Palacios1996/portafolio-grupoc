import { registerUser, loginUser, getUsers } from '../src/auth.js'; 

describe('Pruebas de registro e inicio de sesión', () => {

  // Limpiar el objeto `users` antes de cada prueba para asegurarnos de que no haya datos persistentes
  beforeEach(() => {
    // Reiniciar los datos de usuarios antes de cada prueba
    const users = {};
  });

  test('Debe registrar un nuevo usuario correctamente', () => {
    const result = registerUser('jose@gmail.com', '1234');
    expect(result.success).toBe(true);
    expect(getUsers()['jose@gmail.com']).toBeDefined();
  });

  test('No debe permitir registrar un usuario con un email ya existente', () => {
    registerUser('jose@gmail.com', '1234');
    const result = registerUser('jose@gmail.com', '1234');
    expect(result.success).toBe(false);
    expect(result.message).toBe('Ya existe');
  });

  test('Debe iniciar sesión correctamente con un email y contraseña válidos', () => {
    registerUser('jose@gmail.com', '1234');
    const result = loginUser('jose@gmail.com', '1234');
    expect(result.success).toBe(true);
  });

  test('Debe fallar si el usuario no está registrado', () => {
    const result = loginUser('noexiste@gmail.com', '1234');
    expect(result.success).toBe(false);
    expect(result.message).toBe('No registrado');
  });

  test('Debe fallar si la contraseña es incorrecta', () => {
    registerUser('jose@gmail.com', '1234');
    const result = loginUser('jose@gmail.com', '0000');
    expect(result.success).toBe(false);
    expect(result.message).toBe('Contraseña incorrecta');
  });

  test('Debe retornar el objeto users con los usuarios registrados', () => {
    registerUser('jose@gmail.com', '1234');
    expect(getUsers()).toEqual({
      'jose@gmail.com': { password: '1234', portfolio: [] }
    });
  });

});