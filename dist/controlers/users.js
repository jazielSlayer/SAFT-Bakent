"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.saveUser = exports.registerUser = exports.loginUser = exports.getUsers = exports.getUserLoansReport = exports.getUserLabReport = exports.getUserCount = exports.getUser = exports.deleteUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// Registro de usuario
var registerUser = exports.registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var connection, _req$body, nombre, apellido, email, password, tipo_usuario, numero_identificacion, hashedPassword, _yield$connection$que, _yield$connection$que2, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context.sent;
          _req$body = req.body, nombre = _req$body.nombre, apellido = _req$body.apellido, email = _req$body.email, password = _req$body.password, tipo_usuario = _req$body.tipo_usuario, numero_identificacion = _req$body.numero_identificacion;
          _context.next = 6;
          return _bcryptjs["default"].hash(password, 10);
        case 6:
          hashedPassword = _context.sent;
          _context.prev = 7;
          _context.next = 10;
          return connection.query("INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario, numero_identificacion) VALUES (?, ?, ?, ?, ?, ?)", [nombre, apellido, email, hashedPassword, tipo_usuario, numero_identificacion]);
        case 10:
          _yield$connection$que = _context.sent;
          _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
          results = _yield$connection$que2[0];
          res.json({
            id: results.insertId,
            nombre: nombre,
            apellido: apellido,
            email: email,
            tipo_usuario: tipo_usuario
          });
          _context.next = 19;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](7);
          res.status(500).json({
            message: "Error al registrar usuario"
          });
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[7, 16]]);
  }));
  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Login de usuario
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var connection, _req$body2, email, password, _yield$connection$que3, _yield$connection$que4, rows, user, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context2.sent;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 4;
          _context2.next = 7;
          return connection.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        case 7:
          _yield$connection$que3 = _context2.sent;
          _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
          rows = _yield$connection$que4[0];
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
            id: user.usuario_id,
            nombre: user.nombre,
            tipo_usuario: user.tipo_usuario
          });
          _context2.next = 24;
          break;
        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](4);
          res.status(500).json({
            message: "Error en el login"
          });
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 21]]);
  }));
  return function loginUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Reporte de laboratorios prestados y no entregados por usuario
var getUserLabReport = exports.getUserLabReport = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var connection, _yield$connection$que5, _yield$connection$que6, rows, currentDate, borrowed, notReturned, todasReservas;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context3.sent;
          _context3.prev = 3;
          _context3.next = 6;
          return connection.query("\n      SELECT \n        r.reserva_id,\n        l.nombre AS laboratorio_nombre,\n        l.ubicacion,\n        r.fecha_inicio,\n        r.fecha_fin,\n        r.proposito,\n        r.estado\n      FROM Reservas_Laboratorio r\n      JOIN Laboratorios l ON r.laboratorio_id = l.laboratorio_id\n      WHERE r.usuario_id = ?\n      ORDER BY r.fecha_inicio DESC\n    ", [req.params.id]);
        case 6:
          _yield$connection$que5 = _context3.sent;
          _yield$connection$que6 = (0, _slicedToArray2["default"])(_yield$connection$que5, 1);
          rows = _yield$connection$que6[0];
          currentDate = new Date();
          borrowed = [];
          notReturned = [];
          todasReservas = [];
          rows.forEach(function (reserva) {
            var reservaEndDate = new Date(reserva.fecha_fin);
            var isNotReturned = reserva.estado === 'pendiente' || reserva.estado === 'aprobada' && reservaEndDate >= currentDate;
            var reservaData = {
              reserva_id: reserva.reserva_id,
              laboratorio_nombre: reserva.laboratorio_nombre,
              ubicacion: reserva.ubicacion,
              fecha_inicio: reserva.fecha_inicio,
              fecha_fin: reserva.fecha_fin,
              proposito: reserva.proposito,
              estado: reserva.estado
            };

            // Add to todas_reservas (all reservations)
            todasReservas.push(reservaData);

            // Existing logic for borrowed and notReturned
            borrowed.push(reservaData);
            if (isNotReturned) {
              notReturned.push(reservaData);
            }
          });
          res.json({
            usuario_id: req.params.id,
            total_reservas: todasReservas.length,
            laboratorios_prestados: borrowed,
            laboratorios_no_entregados: notReturned,
            todas_reservas: todasReservas
          });
          _context3.next = 21;
          break;
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](3);
          console.error('Error fetching lab report:', _context3.t0);
          res.status(500).json({
            message: 'Error al generar el reporte de laboratorios'
          });
        case 21:
          _context3.prev = 21;
          _context3.next = 24;
          return connection.end();
        case 24:
          return _context3.finish(21);
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 17, 21, 25]]);
  }));
  return function getUserLabReport(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
// Reporte de préstamos hechos por el usuario
var getUserLoansReport = exports.getUserLoansReport = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var connection, _yield$connection$que7, _yield$connection$que8, rows, prestamos, noDevueltos, currentDate;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context4.sent;
          _context4.prev = 3;
          _context4.next = 6;
          return connection.query("\n            SELECT \n                p.prestamo_id,\n                e.nombre AS equipo_nombre,\n                e.descripcion,\n                p.fecha_prestamo,\n                p.fecha_devolucion_prevista,\n                p.fecha_devolucion_real,\n                p.estado,\n                p.notas\n            FROM prestamos p\n            JOIN equipos e ON p.equipo_id = e.equipo_id\n            WHERE p.usuario_id = ?\n            ORDER BY p.fecha_prestamo DESC\n        ", [req.params.id]);
        case 6:
          _yield$connection$que7 = _context4.sent;
          _yield$connection$que8 = (0, _slicedToArray2["default"])(_yield$connection$que7, 1);
          rows = _yield$connection$que8[0];
          prestamos = [];
          noDevueltos = [];
          currentDate = new Date();
          rows.forEach(function (prestamo) {
            // Un préstamo no devuelto es aquel con estado 'activo' o 'atrasado' y sin fecha_devolucion_real
            var isNotReturned = (prestamo.estado === 'activo' || prestamo.estado === 'atrasado') && !prestamo.fecha_devolucion_real;
            var prestamoData = {
              prestamo_id: prestamo.prestamo_id,
              equipo_nombre: prestamo.equipo_nombre,
              descripcion: prestamo.descripcion,
              fecha_prestamo: prestamo.fecha_prestamo,
              fecha_devolucion_prevista: prestamo.fecha_devolucion_prevista,
              fecha_devolucion_real: prestamo.fecha_devolucion_real,
              estado: prestamo.estado,
              notas: prestamo.notas
            };
            prestamos.push(prestamoData);
            if (isNotReturned) {
              noDevueltos.push(prestamoData);
            }
          });
          res.json({
            usuario_id: req.params.id,
            total_prestamos: prestamos.length,
            prestamos: prestamos,
            prestamos_no_devueltos: noDevueltos
          });
          _context4.next = 20;
          break;
        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](3);
          console.error('Error fetching loans report:', _context4.t0);
          res.status(500).json({
            message: 'Error al generar el reporte de préstamos'
          });
        case 20:
          _context4.prev = 20;
          _context4.next = 23;
          return connection.end();
        case 23:
          return _context4.finish(20);
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 16, 20, 24]]);
  }));
  return function getUserLoansReport(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getUsers = exports.getUsers = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var connection, _yield$connection$que9, _yield$connection$que10, rows;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context5.sent;
          _context5.next = 5;
          return connection.query("SELECT * FROM usuarios");
        case 5:
          _yield$connection$que9 = _context5.sent;
          _yield$connection$que10 = (0, _slicedToArray2["default"])(_yield$connection$que9, 1);
          rows = _yield$connection$que10[0];
          res.json(rows);
        case 9:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getUsers(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var connection, _yield$connection$que11, _yield$connection$que12, rows;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context6.sent;
          _context6.next = 5;
          return connection.query("SELECT * FROM usuarios WHERE usuario_id = ?", [req.params.id]);
        case 5:
          _yield$connection$que11 = _context6.sent;
          _yield$connection$que12 = (0, _slicedToArray2["default"])(_yield$connection$que11, 1);
          rows = _yield$connection$que12[0];
          res.json(rows[0]);
        case 9:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var getUserCount = exports.getUserCount = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var connection, _yield$connection$que13, _yield$connection$que14, rows;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context7.sent;
          _context7.next = 5;
          return connection.query("SELECT COUNT(*) FROM usuarios");
        case 5:
          _yield$connection$que13 = _context7.sent;
          _yield$connection$que14 = (0, _slicedToArray2["default"])(_yield$connection$que13, 1);
          rows = _yield$connection$que14[0];
          res.json(rows[0]['COUNT(*)']);
        case 9:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getUserCount(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var saveUser = exports.saveUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var connection, _yield$connection$que15, _yield$connection$que16, results;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context8.sent;
          _context8.next = 5;
          return connection.query("INSERT INTO usuarios (nombre, apellido, email, tipo_usuario,numero_identificacion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)", [req.body.nombre, req.body.apellido, req.body.email, req.body.tipo_usuario, req.body.numero_identificacion, req.body.fecha_registro]);
        case 5:
          _yield$connection$que15 = _context8.sent;
          _yield$connection$que16 = (0, _slicedToArray2["default"])(_yield$connection$que15, 1);
          results = _yield$connection$que16[0];
          res.json(_objectSpread({
            id: results.resultId
          }, req.body));
        case 9:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function saveUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var deleteUser = exports.deleteUser = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var connection, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context9.sent;
          _context9.next = 5;
          return connection.query("DELETE FROM usuarios WHERE usuario_id = ?", [req.params.id]);
        case 5:
          result = _context9.sent;
          console.log(result);
          res.json({
            message: 'Usuario eliminado'
          });
        case 8:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function deleteUser(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var connection, results;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context10.sent;
          _context10.next = 5;
          return connection.query("UPDATE usuarios SET ? WHERE usuario_id = ?", [req.body, req.params.id]);
        case 5:
          results = _context10.sent;
          console.log(results);
          res.json({
            message: 'Usuario actualizado'
          });
        case 8:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function updateUser(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();