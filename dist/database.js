"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;
var _promise = _interopRequireDefault(require("mysql2/promise"));
var _config = require("./config");
// Crear un pool de conexiones
var pool = _promise["default"].createPool({
  host: _config.config.host,
  user: _config.config.user,
  password: _config.config.password,
  database: _config.config.database,
  waitForConnections: true,
  // Esperar si no hay conexiones disponibles
  connectionLimit: 10,
  // Máximo de conexiones simultáneas en el pool
  queueLimit: 0 // Sin límite en la cola de solicitudes (0 = infinito)
});

// Logs para depuración
pool.on('acquire', function () {
  return console.log('Conexión adquirida del pool');
});
pool.on('release', function () {
  return console.log('Conexión liberada al pool');
});

// Exportar el pool
var connect = exports.connect = function connect() {
  return pool;
};