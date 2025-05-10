const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const path = require('path');

// Crear la instancia de Express
const app = express();
const port = 3000;

// Configuración de Sequelize y la base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Modelo de usuario
const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal que sirve login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));  // Asegúrate de que 'login.html' esté en la carpeta 'public'
});

// Sincronización de la base de datos
sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch((error) => console.log('Error al sincronizar la base de datos:', error));

// Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Por favor, complete todos los campos.' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ success: true, message: 'Usuario registrado correctamente', user });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
  }
});

// Ruta para login (autenticación)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Por favor, ingrese ambos campos.' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Correo electrónico no encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Contraseña incorrecta.' });
    }

    res.status(200).json({ success: true, message: 'Login exitoso', user });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ success: false, message: 'Error en el login' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Ruta para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener usuarios' });
  }
});