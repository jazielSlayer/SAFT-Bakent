"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.saveUser = exports.registerUser = exports.loginUser = exports.getUsers = exports.getUserLoanReport = exports.getUserLabReservas = exports.getUserCount = exports.getUser = exports.getAdminDashboardData = exports.deleteUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
// Registro de usuario
var registerUser = exports.registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, _req$body, nombres, apellidopat, apellidomat, carnet, email, password, user_name, _yield$pool$query, _yield$pool$query2, personaResults, per_id, hashedPassword, _yield$pool$query3, _yield$pool$query4, userResults;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context.sent;
          _req$body = req.body, nombres = _req$body.nombres, apellidopat = _req$body.apellidopat, apellidomat = _req$body.apellidomat, carnet = _req$body.carnet, email = _req$body.email, password = _req$body.password, user_name = _req$body.user_name;
          _context.prev = 4;
          _context.next = 7;
          return pool.query("INSERT INTO persona (nombres, apellidopat, apellidomat, carnet, correo, estado) VALUES (?, ?, ?, ?, ?, 1)", [nombres, apellidopat, apellidomat, carnet, email]);
        case 7:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          personaResults = _yield$pool$query2[0];
          per_id = personaResults.insertId; // Hashear contraseña
          _context.next = 13;
          return _bcryptjs["default"].hash(password, 10);
        case 13:
          hashedPassword = _context.sent;
          _context.next = 16;
          return pool.query("INSERT INTO users (user_name, per_id, email, password, status) VALUES (?, ?, ?, ?, 1)", [user_name, per_id, email, hashedPassword]);
        case 16:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          userResults = _yield$pool$query4[0];
          res.json({
            id: userResults.insertId,
            user_name: user_name,
            nombres: nombres,
            apellidopat: apellidopat,
            apellidomat: apellidomat,
            email: email
          });
          _context.next = 26;
          break;
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](4);
          console.error('Error al registrar usuario:', _context.t0);
          res.status(500).json({
            message: "Error al registrar usuario"
          });
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 22]]);
  }));
  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Login de usuario
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pool, _req$body2, email, password, _yield$pool$query5, _yield$pool$query6, rows, user, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context2.sent;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 4;
          _context2.next = 7;
          return pool.query("SELECT u.*, p.nombres, p.apellidopat, p.apellidomat FROM users u JOIN persona p ON u.per_id = p.id WHERE u.email = ?", [email]);
        case 7:
          _yield$pool$query5 = _context2.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          rows = _yield$pool$query6[0];
          if (!(rows.length === 0)) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Usuario no encontrado"
          }));
        case 12:
          user = rows[0];
          _context2.next = 15;
          return _bcryptjs["default"].compare(password, user.password);
        case 15:
          isMatch = _context2.sent;
          if (isMatch) {
            _context2.next = 18;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: "Contraseña incorrecta"
          }));
        case 18:
          res.json({
            id: user.id,
            user_name: user.user_name,
            nombres: user.nombres,
            apellidopat: user.apellidopat,
            apellidomat: user.apellidomat,
            email: user.email
          });
          _context2.next = 25;
          break;
        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](4);
          console.error('Error en el login:', _context2.t0);
          res.status(500).json({
            message: "Error en el login"
          });
        case 25:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 21]]);
  }));
  return function loginUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Obtener todos los usuarios
var getUsers = exports.getUsers = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _yield$pool$query7, _yield$pool$query8, rows;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _context3.prev = 3;
          _context3.next = 6;
          return pool.query("SELECT u.id, u.user_name, u.email, u.status, p.nombres, p.apellidopat, p.apellidomat, p.carnet FROM users u JOIN persona p ON u.per_id = p.id");
        case 6:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          rows = _yield$pool$query8[0];
          res.json(rows);
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](3);
          console.error('Error fetching users:', _context3.t0);
          res.status(500).json({
            message: 'Error al obtener usuarios'
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 12]]);
  }));
  return function getUsers(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Obtener un usuario por ID
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _yield$pool$query9, _yield$pool$query10, rows;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _context4.prev = 3;
          _context4.next = 6;
          return pool.query("SELECT u.id, u.user_name, u.email, u.status, p.nombres, p.apellidopat, p.apellidomat, p.carnet FROM users u JOIN persona p ON u.per_id = p.id WHERE u.id = ?", [req.params.id]);
        case 6:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          rows = _yield$pool$query10[0];
          if (!(rows.length === 0)) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 11:
          res.json(rows[0]);
          _context4.next = 18;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](3);
          console.error('Error fetching user:', _context4.t0);
          res.status(500).json({
            message: 'Error al obtener usuario'
          });
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 14]]);
  }));
  return function getUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Contar usuarios
var getUserCount = exports.getUserCount = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _yield$pool$query11, _yield$pool$query12, rows;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.prev = 3;
          _context5.next = 6;
          return pool.query("SELECT COUNT(*) AS count FROM users");
        case 6:
          _yield$pool$query11 = _context5.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          rows = _yield$pool$query12[0];
          res.json(rows[0].count);
          _context5.next = 16;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](3);
          console.error('Error fetching user count:', _context5.t0);
          res.status(500).json({
            message: 'Error al contar usuarios'
          });
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 12]]);
  }));
  return function getUserCount(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Guardar un usuario
var saveUser = exports.saveUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var pool, _req$body3, nombres, apellidopat, apellidomat, carnet, email, user_name, _yield$pool$query13, _yield$pool$query14, personaResults, per_id, _yield$pool$query15, _yield$pool$query16, userResults;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context6.sent;
          _req$body3 = req.body, nombres = _req$body3.nombres, apellidopat = _req$body3.apellidopat, apellidomat = _req$body3.apellidomat, carnet = _req$body3.carnet, email = _req$body3.email, user_name = _req$body3.user_name;
          _context6.prev = 4;
          _context6.next = 7;
          return pool.query("INSERT INTO persona (nombres, apellidopat, apellidomat, carnet, correo, estado) VALUES (?, ?, ?, ?, ?, 1)", [nombres, apellidopat, apellidomat, carnet, email]);
        case 7:
          _yield$pool$query13 = _context6.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          personaResults = _yield$pool$query14[0];
          per_id = personaResults.insertId;
          _context6.next = 13;
          return pool.query("INSERT INTO users (user_name, per_id, email, status) VALUES (?, ?, ?, 1)", [user_name, per_id, email]);
        case 13:
          _yield$pool$query15 = _context6.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          userResults = _yield$pool$query16[0];
          res.json({
            id: userResults.insertId,
            user_name: user_name,
            nombres: nombres,
            apellidopat: apellidopat,
            apellidomat: apellidomat,
            email: email
          });
          _context6.next = 23;
          break;
        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6["catch"](4);
          console.error('Error saving user:', _context6.t0);
          res.status(500).json({
            message: 'Error al guardar usuario'
          });
        case 23:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[4, 19]]);
  }));
  return function saveUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// Eliminar un usuario
var deleteUser = exports.deleteUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pool, _yield$pool$query17, _yield$pool$query18, userRows, per_id;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context7.sent;
          _context7.prev = 3;
          _context7.next = 6;
          return pool.query("SELECT per_id FROM users WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query17 = _context7.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          userRows = _yield$pool$query18[0];
          if (!(userRows.length === 0)) {
            _context7.next = 11;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 11:
          per_id = userRows[0].per_id;
          _context7.next = 14;
          return pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);
        case 14:
          _context7.next = 16;
          return pool.query("DELETE FROM persona WHERE id = ?", [per_id]);
        case 16:
          res.json({
            message: 'Usuario eliminado'
          });
          _context7.next = 23;
          break;
        case 19:
          _context7.prev = 19;
          _context7.t0 = _context7["catch"](3);
          console.error('Error deleting user:', _context7.t0);
          res.status(500).json({
            message: 'Error al eliminar usuario'
          });
        case 23:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 19]]);
  }));
  return function deleteUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// Actualizar un usuario
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var pool, _req$body4, nombres, apellidopat, apellidomat, carnet, email, user_name, _yield$pool$query19, _yield$pool$query20, userRows, per_id;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context8.sent;
          _context8.prev = 3;
          _req$body4 = req.body, nombres = _req$body4.nombres, apellidopat = _req$body4.apellidopat, apellidomat = _req$body4.apellidomat, carnet = _req$body4.carnet, email = _req$body4.email, user_name = _req$body4.user_name;
          _context8.next = 7;
          return pool.query("SELECT per_id FROM users WHERE id = ?", [req.params.id]);
        case 7:
          _yield$pool$query19 = _context8.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          userRows = _yield$pool$query20[0];
          if (!(userRows.length === 0)) {
            _context8.next = 12;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 12:
          per_id = userRows[0].per_id;
          _context8.next = 15;
          return pool.query("UPDATE persona SET nombres = ?, apellidopat = ?, apellidomat = ?, carnet = ?, correo = ? WHERE id = ?", [nombres, apellidopat, apellidomat, carnet, email, per_id]);
        case 15:
          _context8.next = 17;
          return pool.query("UPDATE users SET user_name = ?, email = ? WHERE id = ?", [user_name, email, req.params.id]);
        case 17:
          res.json({
            message: 'Usuario actualizado'
          });
          _context8.next = 24;
          break;
        case 20:
          _context8.prev = 20;
          _context8.t0 = _context8["catch"](3);
          console.error('Error updating user:', _context8.t0);
          res.status(500).json({
            message: 'Error al actualizar usuario'
          });
        case 24:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[3, 20]]);
  }));
  return function updateUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

// Reporte de avances de estudiante (adaptado del lab-reservas)
var getUserLabReservas = exports.getUserLabReservas = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var pool, _yield$pool$query21, _yield$pool$query22, rows, avances;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context9.sent;
          _context9.prev = 3;
          _context9.next = 6;
          return pool.query("\n            SELECT \n                a.id AS avance_id,\n                a.id_estudiante,\n                e.numero_matricula,\n                p.nombres,\n                p.apellidopat,\n                p.apellidomat,\n                m.nombre AS modulo_nombre,\n                a.responsable,\n                a.fecha,\n                a.estado\n            FROM avance_estudiante a\n            JOIN estudiante e ON a.id_estudiante = e.id\n            JOIN persona p ON e.per_id = p.id\n            JOIN modulo m ON a.id_modulo = m.id\n            WHERE e.per_id = (SELECT per_id FROM users WHERE id = ?)\n            ORDER BY a.fecha DESC\n        ", [req.params.id]);
        case 6:
          _yield$pool$query21 = _context9.sent;
          _yield$pool$query22 = (0, _slicedToArray2["default"])(_yield$pool$query21, 1);
          rows = _yield$pool$query22[0];
          avances = rows.map(function (row) {
            return {
              avance_id: row.avance_id,
              numero_matricula: row.numero_matricula,
              nombres: row.nombres,
              apellidopat: row.apellidopat,
              apellidomat: row.apellidomat,
              modulo_nombre: row.modulo_nombre,
              responsable: row.responsable,
              fecha: row.fecha,
              estado: row.estado
            };
          });
          res.json({
            usuario_id: req.params.id,
            total_avances: avances.length,
            avances: avances
          });
          _context9.next = 17;
          break;
        case 13:
          _context9.prev = 13;
          _context9.t0 = _context9["catch"](3);
          console.error('Error fetching student progress report:', _context9.t0);
          res.status(500).json({
            message: 'Error al generar el reporte de avances'
          });
        case 17:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[3, 13]]);
  }));
  return function getUserLabReservas(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

// Reporte de préstamos (no aplicable en saf, placeholder)
var getUserLoanReport = exports.getUserLoanReport = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          res.status(501).json({
            message: 'Reporte de préstamos no implementado para la base de datos saf'
          });
        case 1:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function getUserLoanReport(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

// Dashboard de admin
var getAdminDashboardData = exports.getAdminDashboardData = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var pool, usuario_id, _yield$pool$query23, _yield$pool$query24, userRows, _yield$pool$query25, _yield$pool$query26, users, _yield$pool$query27, _yield$pool$query28, personas, _yield$pool$query29, _yield$pool$query30, estudiantes, _yield$pool$query31, _yield$pool$query32, docentes, _yield$pool$query33, _yield$pool$query34, programas, _yield$pool$query35, _yield$pool$query36, proyectos, _yield$pool$query37, _yield$pool$query38, avances, rolesCount, _yield$pool$query39, _yield$pool$query40, rolesRows;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context11.sent;
          _context11.prev = 3;
          usuario_id = req.body.usuario_id || req.params.usuario_id;
          if (usuario_id) {
            _context11.next = 7;
            break;
          }
          return _context11.abrupt("return", res.status(401).json({
            message: 'Usuario no autenticado'
          }));
        case 7:
          _context11.next = 9;
          return pool.query("SELECT r.name FROM users u JOIN model_has_roles mr ON u.id = mr.model_id JOIN roles r ON mr.role_id = r.id WHERE u.id = ?", [usuario_id]);
        case 9:
          _yield$pool$query23 = _context11.sent;
          _yield$pool$query24 = (0, _slicedToArray2["default"])(_yield$pool$query23, 1);
          userRows = _yield$pool$query24[0];
          if (!(userRows.length === 0 || userRows[0].name !== 'Admin')) {
            _context11.next = 14;
            break;
          }
          return _context11.abrupt("return", res.status(403).json({
            message: 'Acceso denegado: Solo administradores'
          }));
        case 14:
          _context11.next = 16;
          return pool.query("SELECT * FROM users");
        case 16:
          _yield$pool$query25 = _context11.sent;
          _yield$pool$query26 = (0, _slicedToArray2["default"])(_yield$pool$query25, 1);
          users = _yield$pool$query26[0];
          _context11.next = 21;
          return pool.query("SELECT * FROM persona");
        case 21:
          _yield$pool$query27 = _context11.sent;
          _yield$pool$query28 = (0, _slicedToArray2["default"])(_yield$pool$query27, 1);
          personas = _yield$pool$query28[0];
          _context11.next = 26;
          return pool.query("SELECT * FROM estudiante");
        case 26:
          _yield$pool$query29 = _context11.sent;
          _yield$pool$query30 = (0, _slicedToArray2["default"])(_yield$pool$query29, 1);
          estudiantes = _yield$pool$query30[0];
          _context11.next = 31;
          return pool.query("SELECT * FROM docente");
        case 31:
          _yield$pool$query31 = _context11.sent;
          _yield$pool$query32 = (0, _slicedToArray2["default"])(_yield$pool$query31, 1);
          docentes = _yield$pool$query32[0];
          _context11.next = 36;
          return pool.query("SELECT * FROM programa_academico");
        case 36:
          _yield$pool$query33 = _context11.sent;
          _yield$pool$query34 = (0, _slicedToArray2["default"])(_yield$pool$query33, 1);
          programas = _yield$pool$query34[0];
          _context11.next = 41;
          return pool.query("SELECT * FROM proyecto");
        case 41:
          _yield$pool$query35 = _context11.sent;
          _yield$pool$query36 = (0, _slicedToArray2["default"])(_yield$pool$query35, 1);
          proyectos = _yield$pool$query36[0];
          _context11.next = 46;
          return pool.query("SELECT * FROM avance_estudiante");
        case 46:
          _yield$pool$query37 = _context11.sent;
          _yield$pool$query38 = (0, _slicedToArray2["default"])(_yield$pool$query37, 1);
          avances = _yield$pool$query38[0];
          rolesCount = {
            Admin: 0,
            Docente: 0
          };
          _context11.next = 52;
          return pool.query("SELECT r.name, COUNT(mr.model_id) as count FROM roles r LEFT JOIN model_has_roles mr ON r.id = mr.role_id GROUP BY r.name");
        case 52:
          _yield$pool$query39 = _context11.sent;
          _yield$pool$query40 = (0, _slicedToArray2["default"])(_yield$pool$query39, 1);
          rolesRows = _yield$pool$query40[0];
          rolesRows.forEach(function (row) {
            if (rolesCount.hasOwnProperty(row.name)) {
              rolesCount[row.name] = row.count;
            }
          });
          res.json({
            total_users: users.length,
            roles_count: rolesCount,
            total_personas: personas.length,
            total_estudiantes: estudiantes.length,
            total_docentes: docentes.length,
            total_programas: programas.length,
            total_proyectos: proyectos.length,
            total_avances: avances.length,
            users: users,
            personas: personas,
            estudiantes: estudiantes,
            docentes: docentes,
            programas: programas,
            proyectos: proyectos,
            avances: avances
          });
          _context11.next = 63;
          break;
        case 59:
          _context11.prev = 59;
          _context11.t0 = _context11["catch"](3);
          console.error('Error fetching admin dashboard data:', _context11.t0);
          res.status(500).json({
            message: 'Error al obtener datos del dashboard'
          });
        case 63:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[3, 59]]);
  }));
  return function getAdminDashboardData(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();