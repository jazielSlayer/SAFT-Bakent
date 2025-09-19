"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAvance = exports.getAvances = exports.getAvance = exports.deleteAvance = exports.createAvance = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getAvances = exports.getAvances = /*#__PURE__*/function () {
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
          return pool.query("\n            SELECT a.*, e.numero_matricula, p.nombres, p.apellidopat, p.apellidomat, m.nombre AS modulo_nombre\n            FROM avance_estudiante a\n            JOIN estudiante e ON a.id_estudiante = e.id\n            JOIN persona p ON e.per_id = p.id\n            JOIN modulo m ON a.id_modulo = m.id\n        ");
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
          console.error('Error fetching avances:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener avances'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 12]]);
  }));
  return function getAvances(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getAvance = exports.getAvance = /*#__PURE__*/function () {
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
          return pool.query("\n            SELECT a.*, e.numero_matricula, p.nombres, p.apellidopat, p.apellidomat, m.nombre AS modulo_nombre\n            FROM avance_estudiante a\n            JOIN estudiante e ON a.id_estudiante = e.id\n            JOIN persona p ON e.per_id = p.id\n            JOIN modulo m ON a.id_modulo = m.id\n            WHERE a.id = ?\n        ", [req.params.id]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Avance no encontrado'
          }));
        case 11:
          res.json(rows[0]);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.error('Error fetching avance:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener avance'
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return function getAvance(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var createAvance = exports.createAvance = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _req$body, id_estudiante, id_modulo, responsable, fecha, estado, _yield$pool$query5, _yield$pool$query6, estudianteCheck, _yield$pool$query7, _yield$pool$query8, moduloCheck, validEstados, _yield$pool$query9, _yield$pool$query10, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _req$body = req.body, id_estudiante = _req$body.id_estudiante, id_modulo = _req$body.id_modulo, responsable = _req$body.responsable, fecha = _req$body.fecha, estado = _req$body.estado;
          _context3.prev = 4;
          if (!(!id_estudiante || !id_modulo || !fecha)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Faltan campos requeridos: id_estudiante, id_modulo, fecha'
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
          _context3.next = 18;
          return pool.query('SELECT id FROM modulo WHERE id = ?', [id_modulo]);
        case 18:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          moduloCheck = _yield$pool$query8[0];
          if (!(moduloCheck.length === 0)) {
            _context3.next = 23;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Módulo no encontrado'
          }));
        case 23:
          // Validar estado si se proporciona
          validEstados = ['completado', 'pendiente', 'en progreso'];
          if (!(estado && !validEstados.includes(estado))) {
            _context3.next = 26;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Estado inv\xE1lido. Use: ".concat(validEstados.join(', '))
          }));
        case 26:
          _context3.next = 28;
          return pool.query("INSERT INTO avance_estudiante (\n                id_estudiante, \n                id_modulo, \n                responsable, \n                fecha, \n                estado\n            ) VALUES (?, ?, ?, ?, ?)", [id_estudiante, id_modulo, responsable || null, fecha, estado || 'pendiente']);
        case 28:
          _yield$pool$query9 = _context3.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          results = _yield$pool$query10[0];
          // Devolver el registro insertado
          res.json({
            id: results.insertId,
            id_estudiante: id_estudiante,
            id_modulo: id_modulo,
            responsable: responsable,
            fecha: fecha,
            estado: estado || 'pendiente'
          });
          _context3.next = 42;
          break;
        case 34:
          _context3.prev = 34;
          _context3.t0 = _context3["catch"](4);
          console.error('Error creating avance:', _context3.t0);
          if (!(_context3.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context3.next = 39;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: estudiante o módulo no existe'
          }));
        case 39:
          if (!(_context3.t0.code === 'ER_DUP_ENTRY')) {
            _context3.next = 41;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Entrada duplicada en avance_estudiante'
          }));
        case 41:
          res.status(500).json({
            message: "Error al crear avance: ".concat(_context3.t0.message)
          });
        case 42:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 34]]);
  }));
  return function createAvance(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateAvance = exports.updateAvance = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _req$body2, id_estudiante, id_modulo, responsable, fecha, estado, id, _yield$pool$query11, _yield$pool$query12, avanceCheck, _yield$pool$query13, _yield$pool$query14, estudianteCheck, _yield$pool$query15, _yield$pool$query16, moduloCheck, validEstados, fields, values, _yield$pool$query17, _yield$pool$query18, results, _yield$pool$query19, _yield$pool$query20, updatedAvance;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _req$body2 = req.body, id_estudiante = _req$body2.id_estudiante, id_modulo = _req$body2.id_modulo, responsable = _req$body2.responsable, fecha = _req$body2.fecha, estado = _req$body2.estado;
          id = parseInt(req.params.id);
          _context4.prev = 5;
          if (!(isNaN(id) || id <= 0)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'ID del avance inválido'
          }));
        case 8:
          _context4.next = 10;
          return pool.query('SELECT id FROM avance_estudiante WHERE id = ?', [id]);
        case 10:
          _yield$pool$query11 = _context4.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          avanceCheck = _yield$pool$query12[0];
          if (!(avanceCheck.length === 0)) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Avance no encontrado'
          }));
        case 15:
          if (!(!id_estudiante && !id_modulo && responsable === undefined && !fecha && estado === undefined)) {
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
          _yield$pool$query13 = _context4.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          estudianteCheck = _yield$pool$query14[0];
          if (!(estudianteCheck.length === 0)) {
            _context4.next = 25;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Estudiante no encontrado'
          }));
        case 25:
          if (!id_modulo) {
            _context4.next = 33;
            break;
          }
          _context4.next = 28;
          return pool.query('SELECT id FROM modulo WHERE id = ?', [id_modulo]);
        case 28:
          _yield$pool$query15 = _context4.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          moduloCheck = _yield$pool$query16[0];
          if (!(moduloCheck.length === 0)) {
            _context4.next = 33;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Módulo no encontrado'
          }));
        case 33:
          if (!(fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha))) {
            _context4.next = 35;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Formato de fecha inválido (use YYYY-MM-DD)'
          }));
        case 35:
          if (!estado) {
            _context4.next = 39;
            break;
          }
          validEstados = ['completado', 'pendiente', 'en progreso'];
          if (validEstados.includes(estado)) {
            _context4.next = 39;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: "Estado inv\xE1lido. Use: ".concat(validEstados.join(', '))
          }));
        case 39:
          // Construir la consulta de actualización dinámicamente
          fields = [];
          values = [];
          if (id_estudiante) {
            fields.push('id_estudiante = ?');
            values.push(id_estudiante);
          }
          if (id_modulo) {
            fields.push('id_modulo = ?');
            values.push(id_modulo);
          }
          if (responsable !== undefined) {
            fields.push('responsable = ?');
            values.push(responsable);
          }
          if (fecha) {
            fields.push('fecha = ?');
            values.push(fecha);
          }
          if (estado) {
            fields.push('estado = ?');
            values.push(estado);
          }

          // Ejecutar la consulta de actualización
          _context4.next = 48;
          return pool.query("UPDATE avance_estudiante SET ".concat(fields.join(', '), " WHERE id = ?"), [].concat(values, [id]));
        case 48:
          _yield$pool$query17 = _context4.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          results = _yield$pool$query18[0];
          if (!(results.affectedRows === 0)) {
            _context4.next = 53;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Avance no encontrado o ningún cambio realizado'
          }));
        case 53:
          _context4.next = 55;
          return pool.query("SELECT \n                a.id,\n                a.id_estudiante,\n                a.id_modulo,\n                a.responsable,\n                a.fecha,\n                a.estado,\n                a.created_at,\n                a.updated_at,\n                e.numero_matricula,\n                p.nombres AS estudiante_nombres,\n                p.apellidopat AS estudiante_apellidopat,\n                p.apellidomat AS estudiante_apellidomat,\n                m.nombre AS modulo_nombre\n             FROM avance_estudiante a\n             LEFT JOIN estudiante e ON a.id_estudiante = e.id\n             LEFT JOIN persona p ON e.per_id = p.id\n             LEFT JOIN modulo m ON a.id_modulo = m.id\n             WHERE a.id = ?", [id]);
        case 55:
          _yield$pool$query19 = _context4.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          updatedAvance = _yield$pool$query20[0];
          res.json({
            message: 'Avance actualizado',
            data: updatedAvance[0]
          });
          _context4.next = 69;
          break;
        case 61:
          _context4.prev = 61;
          _context4.t0 = _context4["catch"](5);
          console.error('Error updating avance:', _context4.t0);
          if (!(_context4.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context4.next = 66;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: estudiante o módulo no existe'
          }));
        case 66:
          if (!(_context4.t0.code === 'ER_DUP_ENTRY')) {
            _context4.next = 68;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Entrada duplicada en avance_estudiante'
          }));
        case 68:
          res.status(500).json({
            message: "Error al actualizar avance: ".concat(_context4.t0.message)
          });
        case 69:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 61]]);
  }));
  return function updateAvance(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteAvance = exports.deleteAvance = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _yield$pool$query21, _yield$pool$query22, results;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.prev = 3;
          _context5.next = 6;
          return pool.query("DELETE FROM avance_estudiante WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query21 = _context5.sent;
          _yield$pool$query22 = (0, _slicedToArray2["default"])(_yield$pool$query21, 1);
          results = _yield$pool$query22[0];
          if (!(results.affectedRows === 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Avance no encontrado'
          }));
        case 11:
          res.json({
            message: 'Avance eliminado'
          });
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.error('Error deleting avance:', _context5.t0);
          res.status(500).json({
            message: 'Error al eliminar avance'
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return function deleteAvance(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();