"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateObservacion = exports.getObservaciones = exports.getObservacion = exports.deleteObservacion = exports.createObservacion = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getObservaciones = exports.getObservaciones = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, _yield$pool$query, _yield$pool$query2, rows;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return pool.query("\n            SELECT o.*, e.numero_matricula, p.nombres, p.apellidopat, p.apellidomat\n            FROM observacion o\n            JOIN estudiante e ON o.id_estudiante = e.id\n            JOIN persona p ON e.per_id = p.id\n        ");
        case 6:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          res.json(rows);
          _context.next = 16;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          console.error('Error fetching observaciones:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener observaciones'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 12]]);
  }));
  return function getObservaciones(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getObservacion = exports.getObservacion = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pool, _yield$pool$query3, _yield$pool$query4, rows;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context2.sent;
          _context2.prev = 3;
          _context2.next = 6;
          return pool.query("\n            SELECT o.*, e.numero_matricula, p.nombres, p.apellidopat, p.apellidomat\n            FROM observacion o\n            JOIN estudiante e ON o.id_estudiante = e.id\n            JOIN persona p ON e.per_id = p.id\n            WHERE o.id = ?\n        ", [req.params.id]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Observación no encontrada'
          }));
        case 11:
          res.json(rows[0]);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.error('Error fetching observacion:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener observación'
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return function getObservacion(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var createObservacion = exports.createObservacion = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _req$body, id_estudiante, contenido, autor, fecha, _yield$pool$query5, _yield$pool$query6, estudianteCheck, _yield$pool$query7, _yield$pool$query8, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _req$body = req.body, id_estudiante = _req$body.id_estudiante, contenido = _req$body.contenido, autor = _req$body.autor, fecha = _req$body.fecha;
          _context3.prev = 4;
          if (!(!id_estudiante || !contenido || !fecha)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Faltan campos requeridos: id_estudiante, contenido, fecha'
          }));
        case 7:
          if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Formato de fecha inválido (use YYYY-MM-DD)'
          }));
        case 9:
          _context3.next = 11;
          return pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        case 11:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          estudianteCheck = _yield$pool$query6[0];
          if (!(estudianteCheck.length === 0)) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Estudiante no encontrado'
          }));
        case 16:
          if (!(contenido.length > 500)) {
            _context3.next = 18;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'El contenido excede el límite de 500 caracteres'
          }));
        case 18:
          if (!(autor && autor.length > 100)) {
            _context3.next = 20;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'El autor excede el límite de 100 caracteres'
          }));
        case 20:
          _context3.next = 22;
          return pool.query("INSERT INTO observacion (\n                id_estudiante, \n                contenido, \n                autor, \n                fecha\n            ) VALUES (?, ?, ?, ?)", [id_estudiante, contenido, autor || null, fecha]);
        case 22:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          results = _yield$pool$query8[0];
          // Devolver el registro insertado
          res.json({
            id: results.insertId,
            id_estudiante: id_estudiante,
            contenido: contenido,
            autor: autor,
            fecha: fecha
          });
          _context3.next = 36;
          break;
        case 28:
          _context3.prev = 28;
          _context3.t0 = _context3["catch"](4);
          console.error('Error creating observacion:', _context3.t0);
          if (!(_context3.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context3.next = 33;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: estudiante no existe'
          }));
        case 33:
          if (!(_context3.t0.code === 'ER_DUP_ENTRY')) {
            _context3.next = 35;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Entrada duplicada en observacion'
          }));
        case 35:
          res.status(500).json({
            message: "Error al crear observaci\xF3n: ".concat(_context3.t0.message)
          });
        case 36:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 28]]);
  }));
  return function createObservacion(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateObservacion = exports.updateObservacion = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _req$body2, id_estudiante, contenido, autor, fecha, id, _yield$pool$query9, _yield$pool$query10, observacionCheck, _yield$pool$query11, _yield$pool$query12, estudianteCheck, fields, values, _yield$pool$query13, _yield$pool$query14, results, _yield$pool$query15, _yield$pool$query16, updatedObservacion;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _req$body2 = req.body, id_estudiante = _req$body2.id_estudiante, contenido = _req$body2.contenido, autor = _req$body2.autor, fecha = _req$body2.fecha;
          id = parseInt(req.params.id);
          _context4.prev = 5;
          if (!(isNaN(id) || id <= 0)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'ID de la observación inválido'
          }));
        case 8:
          _context4.next = 10;
          return pool.query('SELECT id FROM observacion WHERE id = ?', [id]);
        case 10:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          observacionCheck = _yield$pool$query10[0];
          if (!(observacionCheck.length === 0)) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Observación no encontrada'
          }));
        case 15:
          if (!(!id_estudiante && !contenido && autor === undefined && !fecha)) {
            _context4.next = 17;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Se debe proporcionar al menos un campo para actualizar'
          }));
        case 17:
          if (!id_estudiante) {
            _context4.next = 25;
            break;
          }
          _context4.next = 20;
          return pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        case 20:
          _yield$pool$query11 = _context4.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          estudianteCheck = _yield$pool$query12[0];
          if (!(estudianteCheck.length === 0)) {
            _context4.next = 25;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Estudiante no encontrado'
          }));
        case 25:
          if (!(fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha))) {
            _context4.next = 27;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Formato de fecha inválido (use YYYY-MM-DD)'
          }));
        case 27:
          if (!(contenido && contenido.length > 500)) {
            _context4.next = 29;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'El contenido excede el límite de 500 caracteres'
          }));
        case 29:
          if (!(autor && autor.length > 100)) {
            _context4.next = 31;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'El autor excede el límite de 100 caracteres'
          }));
        case 31:
          // Construir la consulta de actualización dinámicamente
          fields = [];
          values = [];
          if (id_estudiante) {
            fields.push('id_estudiante = ?');
            values.push(id_estudiante);
          }
          if (contenido) {
            fields.push('contenido = ?');
            values.push(contenido);
          }
          if (autor !== undefined) {
            fields.push('autor = ?');
            values.push(autor);
          }
          if (fecha) {
            fields.push('fecha = ?');
            values.push(fecha);
          }

          // Ejecutar la consulta de actualización
          _context4.next = 39;
          return pool.query("UPDATE observacion SET ".concat(fields.join(', '), " WHERE id = ?"), [].concat(values, [id]));
        case 39:
          _yield$pool$query13 = _context4.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          results = _yield$pool$query14[0];
          if (!(results.affectedRows === 0)) {
            _context4.next = 44;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Observación no encontrada o ningún cambio realizado'
          }));
        case 44:
          _context4.next = 46;
          return pool.query("SELECT \n                o.id,\n                o.id_estudiante,\n                o.contenido,\n                o.autor,\n                o.fecha,\n                o.created_at,\n                o.updated_at,\n                e.numero_matricula,\n                p.nombres AS estudiante_nombres,\n                p.apellidopat AS estudiante_apellidopat,\n                p.apellidomat AS estudiante_apellidomat\n             FROM observacion o\n             LEFT JOIN estudiante e ON o.id_estudiante = e.id\n             LEFT JOIN persona p ON e.per_id = p.id\n             WHERE o.id = ?", [id]);
        case 46:
          _yield$pool$query15 = _context4.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          updatedObservacion = _yield$pool$query16[0];
          res.json({
            message: 'Observación actualizada',
            data: updatedObservacion[0]
          });
          _context4.next = 60;
          break;
        case 52:
          _context4.prev = 52;
          _context4.t0 = _context4["catch"](5);
          console.error('Error updating observacion:', _context4.t0);
          if (!(_context4.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context4.next = 57;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: estudiante no existe'
          }));
        case 57:
          if (!(_context4.t0.code === 'ER_DUP_ENTRY')) {
            _context4.next = 59;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Entrada duplicada en observacion'
          }));
        case 59:
          res.status(500).json({
            message: "Error al actualizar observaci\xF3n: ".concat(_context4.t0.message)
          });
        case 60:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 52]]);
  }));
  return function updateObservacion(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteObservacion = exports.deleteObservacion = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _yield$pool$query17, _yield$pool$query18, results;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.prev = 3;
          _context5.next = 6;
          return pool.query("DELETE FROM observacion WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query17 = _context5.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          results = _yield$pool$query18[0];
          if (!(results.affectedRows === 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Observación no encontrada'
          }));
        case 11:
          res.json({
            message: 'Observación eliminada'
          });
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.error('Error deleting observacion:', _context5.t0);
          res.status(500).json({
            message: 'Error al eliminar observación'
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return function deleteObservacion(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();