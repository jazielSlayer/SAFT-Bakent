"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateReporteReservas = exports.getReporteReservas = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _expressValidator = require("express-validator");
var validateReporteReservas = exports.validateReporteReservas = [(0, _expressValidator.query)('fecha_inicio').optional().isISO8601().toDate().withMessage('Fecha de inicio debe ser una fecha válida'), (0, _expressValidator.query)('fecha_fin').optional().isISO8601().toDate().withMessage('Fecha de fin debe ser una fecha válida'), (0, _expressValidator.query)('estado').optional().isIn(['pendiente', 'aprobada', 'cancelada']).withMessage('Estado inválido'), (0, _expressValidator.query)('laboratorio_id').optional().isInt().withMessage('laboratorio_id debe ser un entero'), (0, _expressValidator.query)('page').optional().isInt({
  min: 1
}).toInt().withMessage('Página debe ser un entero mayor a 0'), (0, _expressValidator.query)('limit').optional().isInt({
  min: 1,
  max: 100
}).toInt().withMessage('Límite debe ser un entero entre 1 y 100')];
var getReporteReservas = exports.getReporteReservas = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var errors, _req$query, fecha_inicio, fecha_fin, estado, laboratorio_id, _req$query$page, page, _req$query$limit, limit, offset, conditions, params, whereClause, statsQuery, stats, detailsQuery, details, countQuery, _yield$query, _yield$query2, countResult, total;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          errors = (0, _expressValidator.validationResult)(req);
          if (errors.isEmpty()) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));
        case 4:
          _req$query = req.query, fecha_inicio = _req$query.fecha_inicio, fecha_fin = _req$query.fecha_fin, estado = _req$query.estado, laboratorio_id = _req$query.laboratorio_id, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit;
          offset = (page - 1) * limit; // Construir condiciones de la consulta
          conditions = [];
          params = [];
          if (fecha_inicio) {
            conditions.push('rl.fecha_inicio >= ?');
            params.push(fecha_inicio);
          }
          if (fecha_fin) {
            conditions.push('rl.fecha_fin <= ?');
            params.push(fecha_fin);
          }
          if (estado) {
            conditions.push('rl.estado = ?');
            params.push(estado);
          }
          if (laboratorio_id) {
            conditions.push('rl.laboratorio_id = ?');
            params.push(laboratorio_id);
          }
          whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''; // Consulta 1: Estadísticas generales
          statsQuery = "\n      SELECT \n        l.laboratorio_id,\n        l.nombre AS laboratorio_nombre,\n        COUNT(rl.reserva_id) AS total_reservas,\n        SUM(CASE WHEN rl.estado = 'pendiente' THEN 1 ELSE 0 END) AS reservas_pendientes,\n        SUM(CASE WHEN rl.estado = 'aprobada' THEN 1 ELSE 0 END) AS reservas_aprobadas,\n        SUM(CASE WHEN rl.estado = 'cancelada' THEN 1 ELSE 0 END) AS reservas_canceladas,\n        GROUP_CONCAT(DISTINCT rl.proposito) AS propositos\n      FROM Reservas_Laboratorio rl\n      JOIN Laboratorios l ON rl.laboratorio_id = l.laboratorio_id\n      ".concat(whereClause, "\n      GROUP BY l.laboratorio_id, l.nombre\n    ");
          _context.next = 16;
          return (0, _database.query)(statsQuery, params);
        case 16:
          stats = _context.sent;
          // Consulta 2: Lista de reservas detallada con paginación
          detailsQuery = "\n      SELECT \n        rl.reserva_id,\n        l.nombre AS laboratorio_nombre,\n        u.nombre AS usuario_nombre,\n        u.apellido AS usuario_apellido,\n        rl.fecha_inicio,\n        rl.fecha_fin,\n        rl.proposito,\n        rl.estado\n      FROM Reservas_Laboratorio rl\n      JOIN Laboratorios l ON rl.laboratorio_id = l.laboratorio_id\n      JOIN Usuarios u ON rl.usuario_id = u.usuario_id\n      ".concat(whereClause, "\n      ORDER BY rl.fecha_inicio DESC\n      LIMIT ? OFFSET ?\n    ");
          params.push(parseInt(limit), offset);
          _context.next = 21;
          return (0, _database.query)(detailsQuery, params);
        case 21:
          details = _context.sent;
          // Consulta 3: Total de reservas para paginación
          countQuery = "\n      SELECT COUNT(*) AS total\n      FROM Reservas_Laboratorio rl\n      ".concat(whereClause, "\n    ");
          _context.next = 25;
          return (0, _database.query)(countQuery, params.slice(0, -2));
        case 25:
          _yield$query = _context.sent;
          _yield$query2 = (0, _slicedToArray2["default"])(_yield$query, 1);
          countResult = _yield$query2[0];
          total = countResult.total;
          res.status(200).json({
            estadisticas: stats,
            detalles: {
              data: details,
              total: total,
              page: parseInt(page),
              limit: parseInt(limit),
              totalPages: Math.ceil(total / limit)
            }
          });
          _context.next = 35;
          break;
        case 32:
          _context.prev = 32;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 35:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 32]]);
  }));
  return function getReporteReservas(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();