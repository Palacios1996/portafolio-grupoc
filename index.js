import bcrypt from 'bcrypt';
import sequelize from './config/database.js'; // Asegúrate de que la conexión con la base de datos esté correctamente importada
import User from './models/user.js';

// Función para sincronizar la base de datos
async function initializeDatabase() {
  try {
    // Sincronizar la base de datos con los modelos
    await sequelize.sync();
    console.log('Base de datos sincronizada.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
}

// Función para crear un nuevo usuario
async function createUser(name, email, password) {
  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log('Nuevo usuario creado:', newUser);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  }
}

// Función para consultar todos los usuarios
async function getUsers() {
  try {
    const users = await User.findAll();
    console.log('Usuarios registrados:', users);
  } catch (error) {
    console.error('Error al consultar los usuarios:', error);
  }
}

// Inicializar la base de datos y realizar operaciones
async function main() {
  // Primero sincronizamos la base de datos
  await initializeDatabase();

  // Crear un nuevo usuario (puedes cambiar los parámetros para probar con diferentes usuarios)
  createUser('Juan Pérez', 'juan@example.com', '1234password');

  // Consultar todos los usuarios registrados
  getUsers();
}

main();