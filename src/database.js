import mysql from 'mysql2/promise';
import { config } from './config';

// Crear un pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true, // Esperar si no hay conexiones disponibles
    connectionLimit: 10, // Máximo de conexiones simultáneas en el pool
    queueLimit: 0 // Sin límite en la cola de solicitudes (0 = infinito)
});

// Logs para depuración
pool.on('acquire', () => console.log('Conexión adquirida del pool'));
pool.on('release', () => console.log('Conexión liberada al pool'));

// Exportar el pool
export const connect = () => pool;