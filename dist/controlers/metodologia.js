"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMetodologia = exports.getMetodologias = exports.getMetodologia = exports.deleteMetodologia = exports.createMetodologia = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getMetodologias = exports.getMetodologias = /*#__PURE__*/function () {
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
          return pool.query("SELECT * FROM metodologia");
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
          console.error('Error fetching metodologias:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener metodologías'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 12]]);
  }));
  return function getMetodologias(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getMetodologia = exports.getMetodologia = /*#__PURE__*/function () {
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
          return pool.query("SELECT * FROM metodologia WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Metodología no encontrada'
          }));
        case 11:
          res.json(rows[0]);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.error('Error fetching metodologia:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener metodología'
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return function getMetodologia(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var createMetodologia = exports.createMetodologia = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _req$body, nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion, _yield$pool$query5, _yield$pool$query6, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _req$body = req.body, nombre = _req$body.nombre, descripcion = _req$body.descripcion, objetivos = _req$body.objetivos, numero_modulos = _req$body.numero_modulos, fecha_inicio = _req$body.fecha_inicio, fecha_finalizacion = _req$body.fecha_finalizacion;
          _context3.prev = 4;
          _context3.next = 7;
          return pool.query("INSERT INTO metodologia (nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion) VALUES (?, ?, ?, ?, ?, ?)", [nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion]);
        case 7:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          results = _yield$pool$query6[0];
          res.json({
            id: results.insertId,
            nombre: nombre,
            descripcion: descripcion,
            objetivos: objetivos,
            numero_modulos: numero_modulos,
            fecha_inicio: fecha_inicio,
            fecha_finalizacion: fecha_finalizacion
          });
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](4);
          console.error('Error creating metodologia:', _context3.t0);
          res.status(500).json({
            message: 'Error al crear metodología'
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 13]]);
  }));
  return function createMetodologia(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateMetodologia = exports.updateMetodologia = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _req$body2, nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion, _yield$pool$query7, _yield$pool$query8, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _req$body2 = req.body, nombre = _req$body2.nombre, descripcion = _req$body2.descripcion, objetivos = _req$body2.objetivos, numero_modulos = _req$body2.numero_modulos, fecha_inicio = _req$body2.fecha_inicio, fecha_finalizacion = _req$body2.fecha_finalizacion;
          _context4.prev = 4;
          _context4.next = 7;
          return pool.query("UPDATE metodologia SET nombre = ?, descripcion = ?, objetivos = ?, numero_modulos = ?, fecha_inicio = ?, fecha_finalizacion = ? WHERE id = ?", [nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion, req.params.id]);
        case 7:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          results = _yield$pool$query8[0];
          if (!(results.affectedRows === 0)) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Metodología no encontrada'
          }));
        case 12:
          res.json({
            message: 'Metodología actualizada'
          });
          _context4.next = 19;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](4);
          console.error('Error updating metodologia:', _context4.t0);
          res.status(500).json({
            message: 'Error al actualizar metodología'
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 15]]);
  }));
  return function updateMetodologia(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteMetodologia = exports.deleteMetodologia = /*#__PURE__*/function () {
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
          return pool.query("DELETE FROM metodologia WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query9 = _context5.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          results = _yield$pool$query10[0];
          if (!(results.affectedRows === 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Metodología no encontrada'
          }));
        case 11:
          res.json({
            message: 'Metodología eliminada'
          });
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.error('Error deleting metodologia:', _context5.t0);
          res.status(500).json({
            message: 'Error al eliminar metodología'
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return function deleteMetodologia(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();