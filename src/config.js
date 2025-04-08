import { config as dotenv } from 'dotenv';
dotenv();


const mysql = require('mysql2/promise');

const connectDB = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
  });
  console.log('Conectado a la base de datos MySQL');
  return connection;
};

module.exports = connectDB;