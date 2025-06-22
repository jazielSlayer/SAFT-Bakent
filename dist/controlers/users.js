"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.saveUser = exports.registerUser = exports.loginUser = exports.getUsers = exports.getUserLoanReport = exports.getUserLabReservas = exports.getUserCount = exports.getUser = exports.getAdminDashboardData = exports.deleteUser = void 0;
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
    var pool, _req$body, nombre, apellido, email, password, tipo_usuario, numero_identificacion, hashedPassword, _yield$pool$query, _yield$pool$query2, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context.sent;
          _req$body = req.body, nombre = _req$body.nombre, apellido = _req$body.apellido, email = _req$body.email, password = _req$body.password, tipo_usuario = _req$body.tipo_usuario, numero_identificacion = _req$body.numero_identificacion;
          _context.prev = 4;
          _context.next = 7;
          return _bcryptjs["default"].hash(password, 10);
        case 7:
          hashedPassword = _context.sent;
          _context.next = 10;
          return pool.query("INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario, numero_identificacion) VALUES (?, ?, ?, ?, ?, ?)", [nombre, apellido, email, hashedPassword, tipo_usuario, numero_identificacion]);
        case 10:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          results = _yield$pool$query2[0];
          res.json({
            id: results.insertId,
            nombre: nombre,
            apellido: apellido,
            email: email,
            tipo_usuario: tipo_usuario
          });
          _context.next = 20;
          break;
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](4);
          console.error('Error al registrar usuario:', _context.t0);
          res.status(500).json({
            message: "Error al registrar usuario"
          });
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 16]]);
  }));
  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Login de usuario
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pool, _req$body2, email, password, _yield$pool$query3, _yield$pool$query4, rows, user, isMatch;
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
          return pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        case 7:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
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

// Reporte de laboratorios prestados y no entregados por usuario
var getUserLabReservas = exports.getUserLabReservas = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _yield$pool$query5, _yield$pool$query6, reservaRows, _yield$pool$query7, _yield$pool$query8, prestamoRows, currentDate, aprobadas, pendientesReservas, canceladas, todasReservas, pendientesPrestamos, atrasados, devueltos, todosPrestamos, sortByFechaInicio;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _context3.prev = 3;
          _context3.next = 6;
          return pool.query("\n            SELECT \n                r.reserva_id,\n                r.usuario_id,\n                l.nombre AS laboratorio_nombre,\n                l.ubicacion,\n                r.fecha_inicio,\n                r.fecha_fin,\n                r.proposito,\n                r.estado\n            FROM reservas_laboratorio r\n            JOIN laboratorios l ON r.laboratorio_id = l.laboratorio_id\n            WHERE r.usuario_id = ?\n            ORDER BY r.fecha_inicio DESC\n        ", [req.params.id]);
        case 6:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          reservaRows = _yield$pool$query6[0];
          _context3.next = 11;
          return pool.query("\n            SELECT \n                p.prestamo_id,\n                p.usuario_id,\n                e.nombre AS equipo_nombre,\n                p.fecha_prestamo,\n                p.fecha_devolucion_prevista,\n                p.fecha_devolucion_real,\n                p.estado,\n                p.notas\n            FROM prestamos p\n            JOIN equipos e ON p.equipo_id = e.equipo_id\n            WHERE p.usuario_id = ?\n            ORDER BY p.fecha_prestamo DESC\n        ", [req.params.id]);
        case 11:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          prestamoRows = _yield$pool$query8[0];
          currentDate = new Date();
          aprobadas = [];
          pendientesReservas = [];
          canceladas = [];
          todasReservas = [];
          reservaRows.forEach(function (reserva) {
            if (!reserva.reserva_id) {
              console.warn('Reserva sin reserva_id encontrada:', reserva);
              return;
            }
            if (reserva.usuario_id !== parseInt(req.params.id)) {
              console.warn("Reserva con usuario_id incorrecto: reserva_id=".concat(reserva.reserva_id, ", usuario_id=").concat(reserva.usuario_id, ", esperado=").concat(req.params.id));
              return;
            }
            var reservaData = {
              reserva_id: reserva.reserva_id,
              laboratorio_nombre: reserva.laboratorio_nombre || 'N/A',
              ubicacion: reserva.ubicacion || 'N/A',
              fecha_inicio: reserva.fecha_inicio,
              fecha_fin: reserva.fecha_fin,
              proposito: reserva.proposito || 'N/A',
              estado: reserva.estado || 'N/A'
            };
            todasReservas.push(reservaData);
            if (reserva.estado === 'aprobada') {
              aprobadas.push(reservaData);
            } else if (reserva.estado === 'pendiente') {
              pendientesReservas.push(reservaData);
            } else if (reserva.estado === 'cancelada') {
              canceladas.push(reservaData);
            } else {
              console.warn('Reserva no clasificada:', reserva);
            }
          });
          pendientesPrestamos = [];
          atrasados = [];
          devueltos = [];
          todosPrestamos = [];
          prestamoRows.forEach(function (prestamo) {
            if (!prestamo.prestamo_id) {
              console.warn('Préstamo sin prestamo_id encontrado:', prestamo);
              return;
            }
            if (prestamo.usuario_id !== parseInt(req.params.id)) {
              console.warn("Pr\xE9stamo con usuario_id incorrecto: prestamo_id=".concat(prestamo.prestamo_id, ", usuario_id=").concat(prestamo.usuario_id, ", esperado=").concat(req.params.id));
              return;
            }
            var devolucionPrevista = prestamo.fecha_devolucion_prevista ? new Date(prestamo.fecha_devolucion_prevista) : null;
            var prestamoData = {
              prestamo_id: prestamo.prestamo_id,
              equipo_nombre: prestamo.equipo_nombre || 'N/A',
              fecha_prestamo: prestamo.fecha_prestamo,
              fecha_devolucion_prevista: prestamo.fecha_devolucion_prevista,
              fecha_devolucion_real: prestamo.fecha_devolucion_real,
              estado: prestamo.estado || 'N/A',
              notas: prestamo.notas || 'N/A'
            };
            todosPrestamos.push(prestamoData);
            if (prestamo.estado === 'devuelto' && prestamo.fecha_devolucion_real) {
              devueltos.push(prestamoData);
            } else if (prestamo.estado === 'atrasado') {
              atrasados.push(prestamoData);
            } else if (prestamo.estado === 'activo') {
              if (!prestamo.fecha_devolucion_real && devolucionPrevista && devolucionPrevista < currentDate) {
                atrasados.push(prestamoData);
              } else if (!prestamo.fecha_devolucion_real) {
                pendientesPrestamos.push(prestamoData);
              } else {
                console.warn("Pr\xE9stamo con estado=\"activo\" pero con fecha_devolucion_real:", prestamo);
                atrasados.push(prestamoData);
              }
            } else {
              console.warn('Préstamo no clasificado:', prestamo);
            }
          });
          sortByFechaInicio = function sortByFechaInicio(a, b) {
            return new Date(b.fecha_inicio || b.fecha_prestamo) - new Date(a.fecha_inicio || a.fecha_prestamo);
          };
          aprobadas.sort(sortByFechaInicio);
          pendientesReservas.sort(sortByFechaInicio);
          canceladas.sort(sortByFechaInicio);
          todasReservas.sort(sortByFechaInicio);
          pendientesPrestamos.sort(sortByFechaInicio);
          atrasados.sort(sortByFechaInicio);
          devueltos.sort(sortByFechaInicio);
          todosPrestamos.sort(sortByFechaInicio);
          res.json({
            usuario_id: req.params.id,
            total_reservas: todasReservas.length,
            total_aprobadas: aprobadas.length,
            total_pendientes_reservas: pendientesReservas.length,
            total_canceladas: canceladas.length,
            reservas_aprobadas: aprobadas,
            reservas_pendientes: pendientesReservas,
            reservas_canceladas: canceladas,
            todas_reservas: todasReservas,
            total_prestamos: todosPrestamos.length,
            total_pendientes_prestamos: pendientesPrestamos.length,
            total_atrasados: atrasados.length,
            total_devueltos: devueltos.length,
            prestamos_pendientes: pendientesPrestamos,
            prestamos_atrasados: atrasados,
            prestamos_devueltos: devueltos,
            todos_prestamos: todosPrestamos
          });
          _context3.next = 41;
          break;
        case 37:
          _context3.prev = 37;
          _context3.t0 = _context3["catch"](3);
          console.error('Error fetching lab and loan report:', _context3.t0);
          res.status(500).json({
            message: 'Error al generar el reporte de laboratorios y préstamos'
          });
        case 41:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 37]]);
  }));
  return function getUserLabReservas(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Reporte de préstamos hechos por el usuario
var getUserLoanReport = exports.getUserLoanReport = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _yield$pool$query9, _yield$pool$query10, rows, currentDate, pending, overdue, returned, todosPrestamos, sortByFechaPrestamo;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _context4.prev = 3;
          _context4.next = 6;
          return pool.query("\n            SELECT \n                p.prestamo_id,\n                p.usuario_id,\n                e.nombre AS equipo_nombre,\n                p.fecha_prestamo,\n                p.fecha_devolucion_prevista,\n                p.fecha_devolucion_real,\n                p.estado,\n                p.notas\n            FROM prestamos p\n            JOIN equipos e ON p.equipo_id = e.equipo_id\n            WHERE p.usuario_id = ?\n            ORDER BY p.fecha_prestamo DESC\n        ", [req.params.id]);
        case 6:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          rows = _yield$pool$query10[0];
          currentDate = new Date();
          pending = [];
          overdue = [];
          returned = [];
          todosPrestamos = [];
          rows.forEach(function (prestamo) {
            if (!prestamo.prestamo_id) {
              console.warn('Préstamo sin prestamo_id encontrado:', prestamo);
              return;
            }
            if (prestamo.usuario_id !== parseInt(req.params.id)) {
              console.warn("Pr\xE9stamo con usuario_id incorrecto: prestamo_id=".concat(prestamo.prestamo_id, ", usuario_id=").concat(prestamo.usuario_id, ", esperado=").concat(req.params.id));
              return;
            }
            var devolucionPrevista = prestamo.fecha_devolucion_prevista ? new Date(prestamo.fecha_devolucion_prevista) : null;
            var prestamoData = {
              prestamo_id: prestamo.prestamo_id,
              equipo_nombre: prestamo.equipo_nombre || 'N/A',
              fecha_prestamo: prestamo.fecha_prestamo,
              fecha_devolucion_prevista: prestamo.fecha_devolucion_prevista,
              fecha_devolucion_real: prestamo.fecha_devolucion_real,
              estado: prestamo.estado || 'N/A',
              notas: prestamo.notas || 'N/A'
            };
            todosPrestamos.push(prestamoData);
            if (prestamo.estado === 'devuelto' && prestamo.fecha_devolucion_real) {
              returned.push(prestamoData);
            } else if (prestamo.estado === 'atrasado') {
              overdue.push(prestamoData);
            } else if (prestamo.estado === 'activo') {
              if (!prestamo.fecha_devolucion_real && devolucionPrevista && devolucionPrevista < currentDate) {
                overdue.push(prestamoData);
              } else if (!prestamo.fecha_devolucion_real) {
                pending.push(prestamoData);
              } else {
                console.warn("Pr\xE9stamo con estado=\"activo\" pero con fecha_devolucion_real:", prestamo);
                overdue.push(prestamoData);
              }
            } else {
              console.warn('Préstamo no clasificado:', prestamo);
            }
          });
          sortByFechaPrestamo = function sortByFechaPrestamo(a, b) {
            return new Date(b.fecha_prestamo) - new Date(a.fecha_prestamo);
          };
          pending.sort(sortByFechaPrestamo);
          overdue.sort(sortByFechaPrestamo);
          returned.sort(sortByFechaPrestamo);
          todosPrestamos.sort(sortByFechaPrestamo);
          res.json({
            usuario_id: req.params.id,
            total_prestamos: todosPrestamos.length,
            total_pendientes: pending.length,
            total_atrasados: overdue.length,
            total_devueltos: returned.length,
            prestamos_pendientes: pending,
            prestamos_atrasados: overdue,
            prestamos_devueltos: returned,
            todos_prestamos: todosPrestamos
          });
          _context4.next = 27;
          break;
        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](3);
          console.error('Error fetching loan report:', _context4.t0);
          res.status(500).json({
            message: 'Error al generar el reporte de préstamos'
          });
        case 27:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 23]]);
  }));
  return function getUserLoanReport(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Nueva función para el dashboard de admin
var getAdminDashboardData = exports.getAdminDashboardData = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, usuario_id, _yield$pool$query11, _yield$pool$query12, userRows, _yield$pool$query13, _yield$pool$query14, users, _yield$pool$query15, _yield$pool$query16, labs, _yield$pool$query17, _yield$pool$query18, equipment, _yield$pool$query19, _yield$pool$query20, categories, _yield$pool$query21, _yield$pool$query22, loans, _yield$pool$query23, _yield$pool$query24, reservations, _yield$pool$query25, _yield$pool$query26, maintenances, usersByType, labsByType, equipmentByCategory, loansByStatus, reservationsByStatus, validLoans, loanCounts, mostRequested;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.prev = 3;
          // Verificar si el usuario es admin
          usuario_id = req.body.usuario_id || req.params.usuario_id;
          if (usuario_id) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(401).json({
            message: 'Usuario no autenticado'
          }));
        case 7:
          _context5.next = 9;
          return pool.query("SELECT tipo_usuario FROM usuarios WHERE usuario_id = ?", [usuario_id]);
        case 9:
          _yield$pool$query11 = _context5.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          userRows = _yield$pool$query12[0];
          if (!(userRows.length === 0 || userRows[0].tipo_usuario !== 'admin')) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", res.status(403).json({
            message: 'Acceso denegado: Solo administradores'
          }));
        case 14:
          _context5.next = 16;
          return pool.query("SELECT * FROM usuarios");
        case 16:
          _yield$pool$query13 = _context5.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          users = _yield$pool$query14[0];
          _context5.next = 21;
          return pool.query("SELECT * FROM laboratorios");
        case 21:
          _yield$pool$query15 = _context5.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          labs = _yield$pool$query16[0];
          _context5.next = 26;
          return pool.query("SELECT * FROM equipos");
        case 26:
          _yield$pool$query17 = _context5.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          equipment = _yield$pool$query18[0];
          _context5.next = 31;
          return pool.query("SELECT * FROM categorias_equipos");
        case 31:
          _yield$pool$query19 = _context5.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          categories = _yield$pool$query20[0];
          _context5.next = 36;
          return pool.query("SELECT * FROM prestamos");
        case 36:
          _yield$pool$query21 = _context5.sent;
          _yield$pool$query22 = (0, _slicedToArray2["default"])(_yield$pool$query21, 1);
          loans = _yield$pool$query22[0];
          _context5.next = 41;
          return pool.query("SELECT * FROM reservas_laboratorio");
        case 41:
          _yield$pool$query23 = _context5.sent;
          _yield$pool$query24 = (0, _slicedToArray2["default"])(_yield$pool$query23, 1);
          reservations = _yield$pool$query24[0];
          _context5.next = 46;
          return pool.query("SELECT * FROM mantenimiento");
        case 46:
          _yield$pool$query25 = _context5.sent;
          _yield$pool$query26 = (0, _slicedToArray2["default"])(_yield$pool$query25, 1);
          maintenances = _yield$pool$query26[0];
          // Calcular métricas
          usersByType = {
            estudiante: 0,
            profesor: 0,
            personal: 0,
            admin: 0
          };
          users.forEach(function (user) {
            if (usersByType.hasOwnProperty(user.tipo_usuario)) {
              usersByType[user.tipo_usuario]++;
            }
          });
          labsByType = {
            electronica: 0,
            hardware: 0,
            telecomunicaciones: 0,
            redes: 0
          };
          labs.forEach(function (lab) {
            if (labsByType.hasOwnProperty(lab.tipo_laboratorio)) {
              labsByType[lab.tipo_laboratorio]++;
            }
          });
          equipmentByCategory = {};
          categories.forEach(function (cat) {
            return equipmentByCategory[cat.nombre] = 0;
          });
          equipment.forEach(function (eq) {
            var cat = categories.find(function (c) {
              return c.categoria_id === eq.categoria_id;
            });
            if (cat) equipmentByCategory[cat.nombre]++;
          });
          loansByStatus = {
            activo: 0,
            devuelto: 0,
            atrasado: 0
          };
          loans.forEach(function (loan) {
            if (loansByStatus.hasOwnProperty(loan.estado)) {
              loansByStatus[loan.estado]++;
            }
          });
          reservationsByStatus = {
            pendiente: 0,
            aprobada: 0,
            cancelada: 0
          };
          reservations.forEach(function (res) {
            if (reservationsByStatus.hasOwnProperty(res.estado)) {
              reservationsByStatus[res.estado]++;
            }
          });

          // Equipos más solicitados
          validLoans = loans.filter(function (loan) {
            return equipment.some(function (eq) {
              return eq.equipo_id === loan.equipo_id;
            });
          });
          loanCounts = validLoans.reduce(function (acc, loan) {
            acc[loan.equipo_id] = (acc[loan.equipo_id] || 0) + 1;
            return acc;
          }, {});
          mostRequested = Object.entries(loanCounts).map(function (_ref6) {
            var _ref7 = (0, _slicedToArray2["default"])(_ref6, 2),
              equipo_id = _ref7[0],
              count = _ref7[1];
            var eq = equipment.find(function (e) {
              return e.equipo_id === parseInt(equipo_id);
            });
            if (!eq) {
              console.warn("No se encontr\xF3 equipo para equipo_id: ".concat(equipo_id));
              return null;
            }
            return {
              equipo_id: parseInt(equipo_id),
              nombre: eq.nombre,
              count: count
            };
          }).filter(function (item) {
            return item !== null;
          }).sort(function (a, b) {
            return b.count - a.count;
          }).slice(0, 5);
          res.json({
            total_users: users.length,
            users_by_type: usersByType,
            total_labs: labs.length,
            labs_by_type: labsByType,
            total_equipment: equipment.length,
            equipment_by_category: equipmentByCategory,
            total_loans: loans.length,
            loans_by_status: loansByStatus,
            total_reservations: reservations.length,
            reservations_by_status: reservationsByStatus,
            total_maintenances: maintenances.length,
            most_requested_equipment: mostRequested,
            users: users,
            labs: labs,
            equipment: equipment,
            categories: categories,
            loans: loans,
            reservations: reservations,
            maintenances: maintenances
          });
          _context5.next = 70;
          break;
        case 66:
          _context5.prev = 66;
          _context5.t0 = _context5["catch"](3);
          console.error('Error fetching admin dashboard data:', _context5.t0);
          res.status(500).json({
            message: 'Error al obtener datos del dashboard'
          });
        case 70:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 66]]);
  }));
  return function getAdminDashboardData(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getUsers = exports.getUsers = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var pool, _yield$pool$query27, _yield$pool$query28, rows;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context6.sent;
          _context6.prev = 3;
          _context6.next = 6;
          return pool.query("SELECT * FROM usuarios");
        case 6:
          _yield$pool$query27 = _context6.sent;
          _yield$pool$query28 = (0, _slicedToArray2["default"])(_yield$pool$query27, 1);
          rows = _yield$pool$query28[0];
          res.json(rows);
          _context6.next = 16;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](3);
          console.error('Error fetching users:', _context6.t0);
          res.status(500).json({
            message: 'Error al obtener usuarios'
          });
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 12]]);
  }));
  return function getUsers(_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pool, _yield$pool$query29, _yield$pool$query30, rows;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context7.sent;
          _context7.prev = 3;
          _context7.next = 6;
          return pool.query("SELECT * FROM usuarios WHERE usuario_id = ?", [req.params.id]);
        case 6:
          _yield$pool$query29 = _context7.sent;
          _yield$pool$query30 = (0, _slicedToArray2["default"])(_yield$pool$query29, 1);
          rows = _yield$pool$query30[0];
          res.json(rows[0]);
          _context7.next = 16;
          break;
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](3);
          console.error('Error fetching user:', _context7.t0);
          res.status(500).json({
            message: 'Error al obtener usuario'
          });
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 12]]);
  }));
  return function getUser(_x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}();
var getUserCount = exports.getUserCount = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var pool, _yield$pool$query31, _yield$pool$query32, rows;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context8.sent;
          _context8.prev = 3;
          _context8.next = 6;
          return pool.query("SELECT COUNT(*) FROM usuarios");
        case 6:
          _yield$pool$query31 = _context8.sent;
          _yield$pool$query32 = (0, _slicedToArray2["default"])(_yield$pool$query31, 1);
          rows = _yield$pool$query32[0];
          res.json(rows[0]['COUNT(*)']);
          _context8.next = 16;
          break;
        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](3);
          console.error('Error fetching user count:', _context8.t0);
          res.status(500).json({
            message: 'Error al contar usuarios'
          });
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[3, 12]]);
  }));
  return function getUserCount(_x15, _x16) {
    return _ref10.apply(this, arguments);
  };
}();
var saveUser = exports.saveUser = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var pool, _yield$pool$query33, _yield$pool$query34, results;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context9.sent;
          _context9.prev = 3;
          _context9.next = 6;
          return pool.query("INSERT INTO usuarios (nombre, apellido, email, tipo_usuario, numero_identificacion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)", [req.body.nombre, req.body.apellido, req.body.email, req.body.tipo_usuario, req.body.numero_identificacion, req.body.fecha_registro]);
        case 6:
          _yield$pool$query33 = _context9.sent;
          _yield$pool$query34 = (0, _slicedToArray2["default"])(_yield$pool$query33, 1);
          results = _yield$pool$query34[0];
          res.json(_objectSpread({
            id: results.insertId
          }, req.body));
          _context9.next = 16;
          break;
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](3);
          console.error('Error saving user:', _context9.t0);
          res.status(500).json({
            message: 'Error al guardar usuario'
          });
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[3, 12]]);
  }));
  return function saveUser(_x17, _x18) {
    return _ref11.apply(this, arguments);
  };
}();
var deleteUser = exports.deleteUser = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var pool, _yield$pool$query35, _yield$pool$query36, result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context10.sent;
          _context10.prev = 3;
          _context10.next = 6;
          return pool.query("DELETE FROM usuarios WHERE usuario_id = ?", [req.params.id]);
        case 6:
          _yield$pool$query35 = _context10.sent;
          _yield$pool$query36 = (0, _slicedToArray2["default"])(_yield$pool$query35, 1);
          result = _yield$pool$query36[0];
          res.json({
            message: 'Usuario eliminado'
          });
          _context10.next = 16;
          break;
        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](3);
          console.error('Error deleting user:', _context10.t0);
          res.status(500).json({
            message: 'Error al eliminar usuario'
          });
        case 16:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[3, 12]]);
  }));
  return function deleteUser(_x19, _x20) {
    return _ref12.apply(this, arguments);
  };
}();
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var pool, _yield$pool$query37, _yield$pool$query38, results;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context11.sent;
          _context11.prev = 3;
          _context11.next = 6;
          return pool.query("UPDATE usuarios SET ? WHERE usuario_id = ?", [req.body, req.params.id]);
        case 6:
          _yield$pool$query37 = _context11.sent;
          _yield$pool$query38 = (0, _slicedToArray2["default"])(_yield$pool$query37, 1);
          results = _yield$pool$query38[0];
          res.json({
            message: 'Usuario actualizado'
          });
          _context11.next = 16;
          break;
        case 12:
          _context11.prev = 12;
          _context11.t0 = _context11["catch"](3);
          console.error('Error updating user:', _context11.t0);
          res.status(500).json({
            message: 'Error al actualizar usuario'
          });
        case 16:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[3, 12]]);
  }));
  return function updateUser(_x21, _x22) {
    return _ref13.apply(this, arguments);
  };
}();