"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePlantel = exports.getPlanteles = exports.getPlantel = exports.deletePlantel = exports.createPlantel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getPlanteles = exports.getPlanteles = /*#__PURE__*/function () {
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
          return pool.query("\n            SELECT pa.*, p.nombres, p.apellidopat, p.apellidomat\n            FROM plantel_administrativo pa\n            JOIN persona p ON pa.per_id = p.id\n        ");
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
          console.error('Error fetching planteles:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener planteles'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 12]]);
  }));
  return function getPlanteles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getPlantel = exports.getPlantel = /*#__PURE__*/function () {
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
          return pool.query("\n            SELECT pa.*, p.nombres, p.apellidopat, p.apellidomat\n            FROM plantel_administrativo pa\n            JOIN persona p ON pa.per_id = p.id\n            WHERE pa.id = ?\n        ", [req.params.id]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Plantel no encontrado'
          }));
        case 11:
          res.json(rows[0]);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.error('Error fetching plantel:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener plantel'
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return function getPlantel(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var createPlantel = exports.createPlantel = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _req$body, per_id, cargo, unidad, estado, _yield$pool$query5, _yield$pool$query6, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _req$body = req.body, per_id = _req$body.per_id, cargo = _req$body.cargo, unidad = _req$body.unidad, estado = _req$body.estado;
          _context3.prev = 4;
          _context3.next = 7;
          return pool.query("INSERT INTO plantel_administrativo (per_id, cargo, unidad, estado) VALUES (?, ?, ?, ?)", [per_id, cargo, unidad, estado || 0]);
        case 7:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          results = _yield$pool$query6[0];
          res.json({
            id: results.insertId,
            per_id: per_id,
            cargo: cargo,
            unidad: unidad,
            estado: estado
          });
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](4);
          console.error('Error creating plantel:', _context3.t0);
          res.status(500).json({
            message: 'Error al crear plantel'
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 13]]);
  }));
  return function createPlantel(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updatePlantel = exports.updatePlantel = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _req$body2, per_id, cargo, unidad, estado, _yield$pool$query7, _yield$pool$query8, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _req$body2 = req.body, per_id = _req$body2.per_id, cargo = _req$body2.cargo, unidad = _req$body2.unidad, estado = _req$body2.estado;
          _context4.prev = 4;
          _context4.next = 7;
          return pool.query("UPDATE plantel_administrativo SET per_id = ?, cargo = ?, unidad = ?, estado = ? WHERE id = ?", [per_id, cargo, unidad, estado, req.params.id]);
        case 7:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          results = _yield$pool$query8[0];
          if (!(results.affectedRows === 0)) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Plantel no encontrado'
          }));
        case 12:
          res.json({
            message: 'Plantel actualizado'
          });
          _context4.next = 19;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](4);
          console.error('Error updating plantel:', _context4.t0);
          res.status(500).json({
            message: 'Error al actualizar plantel'
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 15]]);
  }));
  return function updatePlantel(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deletePlantel = exports.deletePlantel = /*#__PURE__*/function () {
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
          return pool.query("DELETE FROM plantel_administrativo WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query9 = _context5.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          results = _yield$pool$query10[0];
          if (!(results.affectedRows === 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Plantel no encontrado'
          }));
        case 11:
          res.json({
            message: 'Plantel eliminado'
          });
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.error('Error deleting plantel:', _context5.t0);
          res.status(500).json({
            message: 'Error al eliminar plantel'
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return function deletePlantel(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();