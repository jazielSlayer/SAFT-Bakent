"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTaller = exports.getTalleres = exports.getTaller = exports.deleteTaller = exports.createTaller = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getTalleres = exports.getTalleres = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, _req$query, titulo, tipo_taller, fecha_realizacion, _req$query$page, page, _req$query$limit, limit, query, conditions, params, offset, _yield$pool$query, _yield$pool$query2, rows, _yield$pool$query3, _yield$pool$query4, countResult, totalItems, totalPages;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context.sent;
          _req$query = req.query, titulo = _req$query.titulo, tipo_taller = _req$query.tipo_taller, fecha_realizacion = _req$query.fecha_realizacion, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit;
          _context.prev = 4;
          query = "\n            SELECT \n                t.id,\n                t.titulo,\n                t.id_metodologia,        \n                t.tipo_taller,\n                t.evaluacion_final,\n                t.duracion,\n                t.resultado,\n                t.fecha_realizacion,\n                m.nombre AS metodologia_nombre\n            FROM taller t\n            LEFT JOIN metodologia m ON t.id_metodologia = m.id\n        ";
          conditions = [];
          params = [];
          if (titulo) {
            conditions.push('t.titulo LIKE ?');
            params.push("%".concat(titulo, "%"));
          }
          if (tipo_taller) {
            conditions.push('t.tipo_taller LIKE ?');
            params.push("%".concat(tipo_taller, "%"));
          }
          if (!fecha_realizacion) {
            _context.next = 15;
            break;
          }
          if (/^\d{4}-\d{2}-\d{2}$/.test(fecha_realizacion)) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Formato de fecha_realizacion inválido (use YYYY-MM-DD)'
          }));
        case 13:
          conditions.push('t.fecha_realizacion = ?');
          params.push(fecha_realizacion);
        case 15:
          if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
          }
          query += ' ORDER BY t.fecha_realizacion DESC';
          offset = (page - 1) * limit;
          query += ' LIMIT ? OFFSET ?';
          params.push(parseInt(limit), parseInt(offset));
          _context.next = 22;
          return pool.query(query, params);
        case 22:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          _context.next = 27;
          return pool.query("SELECT COUNT(*) as total \n             FROM taller t\n             ".concat(conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''), params.slice(0, params.length - 2));
        case 27:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          countResult = _yield$pool$query4[0];
          totalItems = countResult[0].total;
          totalPages = Math.ceil(totalItems / limit);
          if (!(rows.length === 0)) {
            _context.next = 34;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            message: 'No se encontraron talleres',
            data: [],
            pagination: {
              page: parseInt(page),
              limit: parseInt(limit),
              totalItems: totalItems,
              totalPages: totalPages
            }
          }));
        case 34:
          res.json({
            data: rows,
            pagination: {
              page: parseInt(page),
              limit: parseInt(limit),
              totalItems: totalItems,
              totalPages: totalPages
            }
          });
          _context.next = 45;
          break;
        case 37:
          _context.prev = 37;
          _context.t0 = _context["catch"](4);
          console.error('Error fetching talleres:', _context.t0);
          if (!(_context.t0.code === 'ER_BAD_FIELD_ERROR')) {
            _context.next = 42;
            break;
          }
          return _context.abrupt("return", res.status(500).json({
            message: 'Error en la estructura de la consulta SQL: ' + _context.t0.message
          }));
        case 42:
          if (!(_context.t0.code === 'ER_NO_SUCH_TABLE')) {
            _context.next = 44;
            break;
          }
          return _context.abrupt("return", res.status(500).json({
            message: 'Una de las tablas no existe en la base de datos: ' + _context.t0.message
          }));
        case 44:
          res.status(500).json({
            message: "Error al obtener talleres: ".concat(_context.t0.message)
          });
        case 45:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 37]]);
  }));
  return function getTalleres(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getTaller = exports.getTaller = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pool, id, _yield$pool$query5, _yield$pool$query6, rows;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context2.sent;
          id = parseInt(req.params.id);
          _context2.prev = 4;
          if (!(isNaN(id) || id <= 0)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'ID del taller inválido'
          }));
        case 7:
          _context2.next = 9;
          return pool.query("\n            SELECT \n                t.id,\n                t.titulo,\n                t.id_metodologia,        \n                t.tipo_taller,\n                t.evaluacion_final,\n                t.duracion,\n                t.resultado,\n                t.fecha_realizacion,\n                m.nombre AS metodologia_nombre\n            FROM taller t\n            LEFT JOIN metodologia m ON t.id_metodologia = m.id\n            WHERE t.id = ?\n        ", [id]);
        case 9:
          _yield$pool$query5 = _context2.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          rows = _yield$pool$query6[0];
          if (!(rows.length === 0)) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Taller no encontrado'
          }));
        case 14:
          res.json({
            message: 'Taller encontrado',
            data: rows[0]
          });
          _context2.next = 25;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](4);
          console.error('Error fetching taller:', _context2.t0);
          if (!(_context2.t0.code === 'ER_BAD_FIELD_ERROR')) {
            _context2.next = 22;
            break;
          }
          return _context2.abrupt("return", res.status(500).json({
            message: 'Error en la estructura de la consulta SQL: ' + _context2.t0.message
          }));
        case 22:
          if (!(_context2.t0.code === 'ER_NO_SUCH_TABLE')) {
            _context2.next = 24;
            break;
          }
          return _context2.abrupt("return", res.status(500).json({
            message: 'Una de las tablas no existe en la base de datos: ' + _context2.t0.message
          }));
        case 24:
          res.status(500).json({
            message: "Error al obtener taller: ".concat(_context2.t0.message)
          });
        case 25:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 17]]);
  }));
  return function getTaller(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var createTaller = exports.createTaller = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _req$body, titulo, id_metodologia, tipo_taller, evaluacion_final, duracion, resultado, fecha_realizacion, _yield$pool$query7, _yield$pool$query8, metodologiaCheck, validTipos, _yield$pool$query9, _yield$pool$query10, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _req$body = req.body, titulo = _req$body.titulo, id_metodologia = _req$body.id_metodologia, tipo_taller = _req$body.tipo_taller, evaluacion_final = _req$body.evaluacion_final, duracion = _req$body.duracion, resultado = _req$body.resultado, fecha_realizacion = _req$body.fecha_realizacion;
          _context3.prev = 4;
          if (!(!titulo || !id_metodologia || !tipo_taller || !fecha_realizacion)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Faltan campos requeridos: titulo, id_metodologia, tipo_taller, fecha_realizacion'
          }));
        case 7:
          if (/^\d{4}-\d{2}-\d{2}$/.test(fecha_realizacion)) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Formato de fecha_realizacion inválido (use YYYY-MM-DD)'
          }));
        case 9:
          _context3.next = 11;
          return pool.query('SELECT id FROM metodologia WHERE id = ?', [id_metodologia]);
        case 11:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          metodologiaCheck = _yield$pool$query8[0];
          if (!(metodologiaCheck.length === 0)) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Metodología no encontrada'
          }));
        case 16:
          validTipos = ['Teórico', 'Práctico', 'Mixto'];
          if (validTipos.includes(tipo_taller)) {
            _context3.next = 19;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Tipo de taller inv\xE1lido. Use: ".concat(validTipos.join(', '))
          }));
        case 19:
          _context3.next = 21;
          return pool.query("INSERT INTO taller (\n                titulo, \n                id_metodologia, \n                tipo_taller, \n                evaluacion_final, \n                duracion, \n                resultado,\n                fecha_realizacion\n            ) VALUES (?, ?, ?, ?, ?, ?, ?)", [titulo, id_metodologia, tipo_taller, evaluacion_final || null, duracion || null, resultado || null, fecha_realizacion]);
        case 21:
          _yield$pool$query9 = _context3.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          results = _yield$pool$query10[0];
          res.json({
            id: results.insertId,
            titulo: titulo,
            id_metodologia: id_metodologia,
            tipo_taller: tipo_taller,
            evaluacion_final: evaluacion_final,
            duracion: duracion,
            resultado: resultado,
            fecha_realizacion: fecha_realizacion
          });
          _context3.next = 35;
          break;
        case 27:
          _context3.prev = 27;
          _context3.t0 = _context3["catch"](4);
          console.error('Error creating taller:', _context3.t0);
          if (!(_context3.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context3.next = 32;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: metodología no existe'
          }));
        case 32:
          if (!(_context3.t0.code === 'ER_DUP_ENTRY')) {
            _context3.next = 34;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Entrada duplicada: el taller ya existe'
          }));
        case 34:
          res.status(500).json({
            message: "Error al crear taller: ".concat(_context3.t0.message)
          });
        case 35:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 27]]);
  }));
  return function createTaller(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateTaller = exports.updateTaller = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _req$body2, titulo, id_metodologia, tipo_taller, evaluacion_final, duracion, resultado, fecha_realizacion, id, _yield$pool$query11, _yield$pool$query12, tallerCheck, _yield$pool$query13, _yield$pool$query14, metodologiaCheck, validTipos, fields, values, _yield$pool$query15, _yield$pool$query16, results, _yield$pool$query17, _yield$pool$query18, updatedTaller;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _req$body2 = req.body, titulo = _req$body2.titulo, id_metodologia = _req$body2.id_metodologia, tipo_taller = _req$body2.tipo_taller, evaluacion_final = _req$body2.evaluacion_final, duracion = _req$body2.duracion, resultado = _req$body2.resultado, fecha_realizacion = _req$body2.fecha_realizacion;
          id = parseInt(req.params.id);
          _context4.prev = 5;
          if (!(isNaN(id) || id <= 0)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'ID del taller inválido'
          }));
        case 8:
          _context4.next = 10;
          return pool.query('SELECT id FROM taller WHERE id = ?', [id]);
        case 10:
          _yield$pool$query11 = _context4.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          tallerCheck = _yield$pool$query12[0];
          if (!(tallerCheck.length === 0)) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Taller no encontrado'
          }));
        case 15:
          if (!(!titulo && !id_metodologia && !tipo_taller && evaluacion_final === undefined && duracion === undefined && !resultado && !fecha_realizacion)) {
            _context4.next = 17;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Se debe proporcionar al menos un campo para actualizar'
          }));
        case 17:
          if (!id_metodologia) {
            _context4.next = 25;
            break;
          }
          _context4.next = 20;
          return pool.query('SELECT id FROM metodologia WHERE id = ?', [id_metodologia]);
        case 20:
          _yield$pool$query13 = _context4.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          metodologiaCheck = _yield$pool$query14[0];
          if (!(metodologiaCheck.length === 0)) {
            _context4.next = 25;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Metodología no encontrada'
          }));
        case 25:
          if (!(fecha_realizacion && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_realizacion))) {
            _context4.next = 27;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Formato de fecha_realizacion inválido (use YYYY-MM-DD)'
          }));
        case 27:
          if (!tipo_taller) {
            _context4.next = 31;
            break;
          }
          validTipos = ['Teórico', 'Práctico', 'Mixto'];
          if (validTipos.includes(tipo_taller)) {
            _context4.next = 31;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: "Tipo de taller inv\xE1lido. Use: ".concat(validTipos.join(', '))
          }));
        case 31:
          fields = [];
          values = [];
          if (titulo) {
            fields.push('titulo = ?');
            values.push(titulo);
          }
          if (id_metodologia) {
            fields.push('id_metodologia = ?');
            values.push(id_metodologia);
          }
          if (tipo_taller) {
            fields.push('tipo_taller = ?');
            values.push(tipo_taller);
          }
          if (evaluacion_final !== undefined) {
            fields.push('evaluacion_final = ?');
            values.push(evaluacion_final);
          }
          if (duracion !== undefined) {
            fields.push('duracion = ?');
            values.push(duracion);
          }
          if (resultado !== undefined) {
            fields.push('resultado = ?');
            values.push(resultado);
          }
          if (fecha_realizacion) {
            fields.push('fecha_realizacion = ?');
            values.push(fecha_realizacion);
          }
          _context4.next = 42;
          return pool.query("UPDATE taller SET ".concat(fields.join(', '), " WHERE id = ?"), [].concat(values, [id]));
        case 42:
          _yield$pool$query15 = _context4.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          results = _yield$pool$query16[0];
          if (!(results.affectedRows === 0)) {
            _context4.next = 47;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Taller no encontrado o ningún cambio realizado'
          }));
        case 47:
          _context4.next = 49;
          return pool.query("SELECT \n                t.id,\n                t.titulo,\n                t.tipo_taller,\n                t.evaluacion_final,\n                t.duracion,\n                t.resultado,\n                t.fecha_realizacion,\n                m.nombre AS metodologia_nombre\n             FROM taller t\n             LEFT JOIN metodologia m ON t.id_metodologia = m.id\n             WHERE t.id = ?", [id]);
        case 49:
          _yield$pool$query17 = _context4.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          updatedTaller = _yield$pool$query18[0];
          res.json({
            message: 'Taller actualizado',
            data: updatedTaller[0]
          });
          _context4.next = 63;
          break;
        case 55:
          _context4.prev = 55;
          _context4.t0 = _context4["catch"](5);
          console.error('Error updating taller:', _context4.t0);
          if (!(_context4.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context4.next = 60;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: metodología no existe'
          }));
        case 60:
          if (!(_context4.t0.code === 'ER_DUP_ENTRY')) {
            _context4.next = 62;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Entrada duplicada en el taller'
          }));
        case 62:
          res.status(500).json({
            message: "Error al actualizar taller: ".concat(_context4.t0.message)
          });
        case 63:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[5, 55]]);
  }));
  return function updateTaller(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteTaller = exports.deleteTaller = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _yield$pool$query19, _yield$pool$query20, results;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.prev = 3;
          _context5.next = 6;
          return pool.query("DELETE FROM taller WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query19 = _context5.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          results = _yield$pool$query20[0];
          if (!(results.affectedRows === 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Taller no encontrado'
          }));
        case 11:
          res.json({
            message: 'Taller eliminado'
          });
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.error('Error deleting taller:', _context5.t0);
          res.status(500).json({
            message: 'Error al eliminar taller'
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return function deleteTaller(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();