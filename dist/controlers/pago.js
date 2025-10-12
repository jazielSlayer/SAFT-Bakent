"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePago = exports.getPagos = exports.getPagoEstudiante = exports.getPago = exports.deletePago = exports.createPago = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getPagos = exports.getPagos = /*#__PURE__*/function () {
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
          return pool.query("\n            SELECT p.*, e.numero_matricula, per.nombres, per.apellidopat, per.apellidomat\n            FROM pago p\n            JOIN estudiante e ON p.id_estudiante = e.id\n            JOIN persona per ON e.per_id = per.id\n        ");
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
          console.error('Error fetching pagos:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener pagos'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 12]]);
  }));
  return function getPagos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getPago = exports.getPago = /*#__PURE__*/function () {
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
          return pool.query("\n            SELECT p.*, e.numero_matricula, per.nombres, per.apellidopat, per.apellidomat\n            FROM pago p\n            JOIN estudiante e ON p.id_estudiante = e.id\n            JOIN persona per ON e.per_id = per.id\n            WHERE p.id = ?\n        ", [req.params.id]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Pago no encontrado'
          }));
        case 11:
          res.json(rows[0]);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.error('Error fetching pago:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener pago'
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return function getPago(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getPagoEstudiante = exports.getPagoEstudiante = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, id_estudiante, _yield$pool$query5, _yield$pool$query6, rows;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          id_estudiante = req.params.id_estudiante;
          _context3.prev = 4;
          _context3.next = 7;
          return pool.query("\n            SELECT p.*, e.numero_matricula, per.nombres, per.apellidopat, per.apellidomat\n            FROM pago p\n            JOIN estudiante e ON p.id_estudiante = e.id\n            JOIN persona per ON e.per_id = per.id\n            WHERE p.id_estudiante = ?\n            ORDER BY p.fecha DESC\n        ", [id_estudiante]);
        case 7:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          rows = _yield$pool$query6[0];
          res.json(rows);
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](4);
          console.error('Error fetching pagos del estudiante:', _context3.t0);
          res.status(500).json({
            message: 'Error al obtener pagos del estudiante'
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 13]]);
  }));
  return function getPagoEstudiante(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var createPago = exports.createPago = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _req$body, id_estudiante, monto, metodo, comprobante, fecha, _yield$pool$query7, _yield$pool$query8, estudianteCheck, parsedMonto, validMetodos, _yield$pool$query9, _yield$pool$query10, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _req$body = req.body, id_estudiante = _req$body.id_estudiante, monto = _req$body.monto, metodo = _req$body.metodo, comprobante = _req$body.comprobante, fecha = _req$body.fecha;
          _context4.prev = 4;
          if (!(!id_estudiante || !monto || !fecha)) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Faltan campos requeridos: id_estudiante, monto, fecha'
          }));
        case 7:
          _context4.next = 9;
          return pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        case 9:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          estudianteCheck = _yield$pool$query8[0];
          if (!(estudianteCheck.length === 0)) {
            _context4.next = 14;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Estudiante no encontrado'
          }));
        case 14:
          parsedMonto = parseFloat(monto);
          if (!(isNaN(parsedMonto) || parsedMonto <= 0)) {
            _context4.next = 17;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Monto inválido: debe ser un número positivo'
          }));
        case 17:
          if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            _context4.next = 19;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Formato de fecha inválido (use YYYY-MM-DD)'
          }));
        case 19:
          validMetodos = ['efectivo', 'transferencia', 'tarjeta'];
          if (!(metodo && !validMetodos.includes(metodo))) {
            _context4.next = 22;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: "M\xE9todo inv\xE1lido. Use: ".concat(validMetodos.join(', '))
          }));
        case 22:
          if (!(comprobante && comprobante.length > 100)) {
            _context4.next = 24;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'El comprobante excede el límite de 100 caracteres'
          }));
        case 24:
          _context4.next = 26;
          return pool.query("INSERT INTO pago (\n                id_estudiante, \n                monto, \n                metodo, \n                comprobante, \n                fecha\n            ) VALUES (?, ?, ?, ?, ?)", [id_estudiante, parsedMonto, metodo || 'efectivo', comprobante || null, fecha]);
        case 26:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          results = _yield$pool$query10[0];
          res.json({
            id: results.insertId,
            id_estudiante: id_estudiante,
            monto: parsedMonto,
            metodo: metodo || 'efectivo',
            comprobante: comprobante,
            fecha: fecha
          });
          _context4.next = 40;
          break;
        case 32:
          _context4.prev = 32;
          _context4.t0 = _context4["catch"](4);
          console.error('Error creating pago:', _context4.t0);
          if (!(_context4.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context4.next = 37;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: estudiante no existe'
          }));
        case 37:
          if (!(_context4.t0.code === 'ER_DUP_ENTRY')) {
            _context4.next = 39;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Entrada duplicada en pago'
          }));
        case 39:
          res.status(500).json({
            message: "Error al crear pago: ".concat(_context4.t0.message)
          });
        case 40:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 32]]);
  }));
  return function createPago(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var updatePago = exports.updatePago = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _req$body2, id_estudiante, monto, metodo, comprobante, fecha, id, _yield$pool$query11, _yield$pool$query12, pagoCheck, _yield$pool$query13, _yield$pool$query14, estudianteCheck, parsedMonto, validMetodos, fields, values, _yield$pool$query15, _yield$pool$query16, results, _yield$pool$query17, _yield$pool$query18, updatedPago;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _req$body2 = req.body, id_estudiante = _req$body2.id_estudiante, monto = _req$body2.monto, metodo = _req$body2.metodo, comprobante = _req$body2.comprobante, fecha = _req$body2.fecha;
          id = parseInt(req.params.id);
          _context5.prev = 5;
          if (!(isNaN(id) || id <= 0)) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'ID del pago inválido'
          }));
        case 8:
          _context5.next = 10;
          return pool.query('SELECT id FROM pago WHERE id = ?', [id]);
        case 10:
          _yield$pool$query11 = _context5.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          pagoCheck = _yield$pool$query12[0];
          if (!(pagoCheck.length === 0)) {
            _context5.next = 15;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Pago no encontrado'
          }));
        case 15:
          if (!(!id_estudiante && !monto && metodo === undefined && comprobante === undefined && !fecha)) {
            _context5.next = 17;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Se debe proporcionar al menos un campo para actualizar'
          }));
        case 17:
          if (!id_estudiante) {
            _context5.next = 25;
            break;
          }
          _context5.next = 20;
          return pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        case 20:
          _yield$pool$query13 = _context5.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          estudianteCheck = _yield$pool$query14[0];
          if (!(estudianteCheck.length === 0)) {
            _context5.next = 25;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Estudiante no encontrado'
          }));
        case 25:
          if (!monto) {
            _context5.next = 29;
            break;
          }
          parsedMonto = parseFloat(monto);
          if (!(isNaN(parsedMonto) || parsedMonto <= 0)) {
            _context5.next = 29;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Monto inválido: debe ser un número positivo'
          }));
        case 29:
          if (!(fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha))) {
            _context5.next = 31;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Formato de fecha inválido (use YYYY-MM-DD)'
          }));
        case 31:
          validMetodos = ['efectivo', 'transferencia', 'tarjeta'];
          if (!(metodo && !validMetodos.includes(metodo))) {
            _context5.next = 34;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "M\xE9todo inv\xE1lido. Use: ".concat(validMetodos.join(', '))
          }));
        case 34:
          if (!(comprobante && comprobante.length > 100)) {
            _context5.next = 36;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'El comprobante excede el límite de 100 caracteres'
          }));
        case 36:
          fields = [];
          values = [];
          if (id_estudiante) {
            fields.push('id_estudiante = ?');
            values.push(id_estudiante);
          }
          if (monto) {
            fields.push('monto = ?');
            values.push(parseFloat(monto));
          }
          if (metodo !== undefined) {
            fields.push('metodo = ?');
            values.push(metodo);
          }
          if (comprobante !== undefined) {
            fields.push('comprobante = ?');
            values.push(comprobante);
          }
          if (fecha) {
            fields.push('fecha = ?');
            values.push(fecha);
          }
          _context5.next = 45;
          return pool.query("UPDATE pago SET ".concat(fields.join(', '), " WHERE id = ?"), [].concat(values, [id]));
        case 45:
          _yield$pool$query15 = _context5.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          results = _yield$pool$query16[0];
          if (!(results.affectedRows === 0)) {
            _context5.next = 50;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Pago no encontrado o ningún cambio realizado'
          }));
        case 50:
          _context5.next = 52;
          return pool.query("SELECT \n                p.id,\n                p.id_estudiante,\n                p.monto,\n                p.metodo,\n                p.comprobante,\n                p.fecha,\n                p.created_at,\n                p.updated_at,\n                e.numero_matricula,\n                e_2.nombres AS estudiante_nombres,\n                e_2.apellidopat AS estudiante_apellidopat,\n                e_2.apellidomat AS estudiante_apellidomat\n             FROM pago p\n             LEFT JOIN estudiante e ON p.id_estudiante = e.id\n             LEFT JOIN persona e_2 ON e.per_id = e_2.id\n             WHERE p.id = ?", [id]);
        case 52:
          _yield$pool$query17 = _context5.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          updatedPago = _yield$pool$query18[0];
          res.json({
            message: 'Pago actualizado',
            data: updatedPago[0]
          });
          _context5.next = 66;
          break;
        case 58:
          _context5.prev = 58;
          _context5.t0 = _context5["catch"](5);
          console.error('Error updating pago:', _context5.t0);
          if (!(_context5.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context5.next = 63;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: estudiante no existe'
          }));
        case 63:
          if (!(_context5.t0.code === 'ER_DUP_ENTRY')) {
            _context5.next = 65;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Entrada duplicada en pago'
          }));
        case 65:
          res.status(500).json({
            message: "Error al actualizar pago: ".concat(_context5.t0.message)
          });
        case 66:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[5, 58]]);
  }));
  return function updatePago(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var deletePago = exports.deletePago = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var pool, _yield$pool$query19, _yield$pool$query20, results;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context6.sent;
          _context6.prev = 3;
          _context6.next = 6;
          return pool.query("DELETE FROM pago WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query19 = _context6.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          results = _yield$pool$query20[0];
          if (!(results.affectedRows === 0)) {
            _context6.next = 11;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Pago no encontrado'
          }));
        case 11:
          res.json({
            message: 'Pago eliminado'
          });
          _context6.next = 18;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](3);
          console.error('Error deleting pago:', _context6.t0);
          res.status(500).json({
            message: 'Error al eliminar pago'
          });
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 14]]);
  }));
  return function deletePago(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();