"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = require("express");
var _database = require("../database");
var router = (0, _express.Router)();
router.get('/events', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var connection, _yield$connection$que, _yield$connection$que2, reservaRows, _yield$connection$que3, _yield$connection$que4, prestamoRows, events;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return connection.query("\n            SELECT \n                r.reserva_id,\n                r.usuario_id,\n                l.nombre AS laboratorio_nombre,\n                r.fecha_inicio,\n                r.fecha_fin,\n                r.proposito,\n                r.estado,\n                u.nombre AS usuario_nombre\n            FROM reservas_laboratorio r\n            JOIN laboratorios l ON r.laboratorio_id = l.laboratorio_id\n            JOIN usuarios u ON r.usuario_id = u.usuario_id\n        ");
        case 6:
          _yield$connection$que = _context.sent;
          _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
          reservaRows = _yield$connection$que2[0];
          _context.next = 11;
          return connection.query("\n            SELECT \n                p.prestamo_id,\n                p.usuario_id,\n                e.nombre AS equipo_nombre,\n                p.fecha_prestamo,\n                p.fecha_devolucion_prevista,\n                p.estado,\n                p.notas,\n                u.nombre AS usuario_nombre\n            FROM prestamos p\n            JOIN equipos e ON p.equipo_id = e.equipo_id\n            JOIN usuarios u ON p.usuario_id = u.usuario_id\n        ");
        case 11:
          _yield$connection$que3 = _context.sent;
          _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
          prestamoRows = _yield$connection$que4[0];
          // Formatear eventos para react-big-calendar
          events = [].concat((0, _toConsumableArray2["default"])(reservaRows.map(function (row) {
            return {
              id: "reserva_".concat(row.reserva_id),
              title: "Reserva: ".concat(row.laboratorio_nombre),
              start: new Date(row.fecha_inicio),
              end: new Date(row.fecha_fin),
              description: "Usuario: ".concat(row.usuario_nombre, "\nProp\xF3sito: ").concat(row.proposito, "\nEstado: ").concat(row.estado)
            };
          })), (0, _toConsumableArray2["default"])(prestamoRows.map(function (row) {
            return {
              id: "prestamo_".concat(row.prestamo_id),
              title: "Pr\xE9stamo: ".concat(row.equipo_nombre),
              start: new Date(row.fecha_prestamo),
              end: new Date(row.fecha_devolucion_prevista),
              description: "Usuario: ".concat(row.usuario_nombre, "\nNotas: ").concat(row.notas || 'Ninguna', "\nEstado: ").concat(row.estado)
            };
          })));
          res.json(events);
          _context.next = 22;
          break;
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](3);
          console.error('Error fetching calendar events:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener eventos del calendario'
          });
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 18]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;