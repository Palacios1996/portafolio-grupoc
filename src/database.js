// src/database.js
const { Sequelize } = require('sequelize');

// Cambia estos valores según tu configuración de base de datos
const sequelize = new Sequelize('nombre_de_base_de_datos', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql',
});
