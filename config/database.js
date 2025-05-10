// config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // Archivo local para SQLite
});

export default sequelize;