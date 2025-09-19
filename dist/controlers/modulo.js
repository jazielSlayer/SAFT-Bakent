"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateModulo = exports.getModulos = exports.getModulo = exports.deleteModulo = exports.createModulo = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getModulos = exports.getModulos = /*#__PURE__*/function () {
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
          return pool.query("\n            SELECT m.*, d.numero_item, p.nombres, p.apellidopat, p.apellidomat, met.nombre AS metodologia_nombre\n            FROM modulo m\n            JOIN docente d ON m.id_docente = d.id\n            JOIN persona p ON d.per_id = p.id\n            JOIN metodologia met ON m.id_metodologia = met.id\n        ");
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
          console.error('Error fetching modulos:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener módulos'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 12]]);
  }));
  return function getModulos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getModulo = exports.getModulo = /*#__PURE__*/function () {
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
          return pool.query("\n            SELECT m.*, d.numero_item, p.nombres, p.apellidopat, p.apellidomat, met.nombre AS metodologia_nombre\n            FROM modulo m\n            JOIN docente d ON m.id_docente = d.id\n            JOIN persona p ON d.per_id = p.id\n            JOIN metodologia met ON m.id_metodologia = met.id\n            WHERE m.id = ?\n        ", [req.params.id]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Módulo no encontrado'
          }));
        case 11:
          res.json(rows[0]);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.error('Error fetching modulo:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener módulo'
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return function getModulo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var createModulo = exports.createModulo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _req$body, codigo, nombre, id_docente, id_metodologia, duracion, descripcion, fecha_inicio, fecha_finalizacion, _yield$pool$query5, _yield$pool$query6, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _req$body = req.body, codigo = _req$body.codigo, nombre = _req$body.nombre, id_docente = _req$body.id_docente, id_metodologia = _req$body.id_metodologia, duracion = _req$body.duracion, descripcion = _req$body.descripcion, fecha_inicio = _req$body.fecha_inicio, fecha_finalizacion = _req$body.fecha_finalizacion;
          _context3.prev = 4;
          _context3.next = 7;
          return pool.query("INSERT INTO modulo (codigo, nombre, id_docente, id_metodologia, duracion, descripcion, fecha_inicio, fecha_finalizacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [codigo, nombre, id_docente, id_metodologia, duracion, descripcion || null, fecha_inicio, fecha_finalizacion]);
        case 7:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          results = _yield$pool$query6[0];
          res.json({
            id: results.insertId,
            codigo: codigo,
            nombre: nombre,
            id_docente: id_docente,
            id_metodologia: id_metodologia,
            duracion: duracion,
            descripcion: descripcion,
            fecha_inicio: fecha_inicio,
            fecha_finalizacion: fecha_finalizacion
          });
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](4);
          console.error('Error creating modulo:', _context3.t0);
          res.status(500).json({
            message: 'Error al crear módulo'
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 13]]);
  }));
  return function createModulo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateModulo = exports.updateModulo = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _req$body2, codigo, nombre, id_docente, id_metodologia, duracion, descripcion, fecha_inicio, fecha_finalizacion, _yield$pool$query7, _yield$pool$query8, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _req$body2 = req.body, codigo = _req$body2.codigo, nombre = _req$body2.nombre, id_docente = _req$body2.id_docente, id_metodologia = _req$body2.id_metodologia, duracion = _req$body2.duracion, descripcion = _req$body2.descripcion, fecha_inicio = _req$body2.fecha_inicio, fecha_finalizacion = _req$body2.fecha_finalizacion;
          _context4.prev = 4;
          _context4.next = 7;
          return pool.query("UPDATE modulo SET codigo = ?, nombre = ?, id_docente = ?, id_metodologia = ?, duracion = ?, descripcion = ?, fecha_inicio = ?, fecha_finalizacion = ? WHERE id = ?", [codigo, nombre, id_docente, id_metodologia, duracion, descripcion, fecha_inicio, fecha_finalizacion, req.params.id]);
        case 7:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          results = _yield$pool$query8[0];
          if (!(results.affectedRows === 0)) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Módulo no encontrado'
          }));
        case 12:
          res.json({
            message: 'Módulo actualizado'
          });
          _context4.next = 19;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](4);
          console.error('Error updating modulo:', _context4.t0);
          res.status(500).json({
            message: 'Error al actualizar módulo'
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 15]]);
  }));
  return function updateModulo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteModulo = exports.deleteModulo = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _yield$pool$query9, _yield$pool$query10, results;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.prev = 3;
          _context5.next = 6;
          return pool.query("DELETE FROM modulo WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query9 = _context5.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          results = _yield$pool$query10[0];
          if (!(results.affectedRows === 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Módulo no encontrado'
          }));
        case 11:
          res.json({
            message: 'Módulo eliminado'
          });
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.error('Error deleting modulo:', _context5.t0);
          res.status(500).json({
            message: 'Error al eliminar módulo'
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return function deleteModulo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();