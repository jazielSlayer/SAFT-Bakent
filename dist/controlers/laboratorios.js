"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLaboratory = exports.saveLaboratory = exports.getLaboratoryCount = exports.getLaboratory = exports.getLaboratories = exports.deleteLaboratory = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var getLaboratories = exports.getLaboratories = /*#__PURE__*/function () {
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
          return pool.query("SELECT * FROM laboratorios");
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
          console.error('Error fetching laboratories:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener laboratorios'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 12]]);
  }));
  return function getLaboratories(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getLaboratory = exports.getLaboratory = /*#__PURE__*/function () {
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
          return pool.query("SELECT * FROM laboratorios WHERE laboratorio_id = ?", [req.params.id]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Laboratorio no encontrado'
          }));
        case 11:
          res.json(rows[0]);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.error('Error fetching laboratory:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener laboratorio'
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return function getLaboratory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getLaboratoryCount = exports.getLaboratoryCount = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _yield$pool$query5, _yield$pool$query6, rows;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _context3.prev = 3;
          _context3.next = 6;
          return pool.query("SELECT COUNT(*) AS count FROM laboratorios");
        case 6:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          rows = _yield$pool$query6[0];
          res.json(rows[0].count);
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](3);
          console.error('Error fetching laboratory count:', _context3.t0);
          res.status(500).json({
            message: 'Error al contar laboratorios'
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 12]]);
  }));
  return function getLaboratoryCount(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var saveLaboratory = exports.saveLaboratory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _req$body, nombre, ubicacion, tipo_laboratorio, capacidad, responsable_id, _yield$pool$query7, _yield$pool$query8, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _context4.prev = 3;
          _req$body = req.body, nombre = _req$body.nombre, ubicacion = _req$body.ubicacion, tipo_laboratorio = _req$body.tipo_laboratorio, capacidad = _req$body.capacidad, responsable_id = _req$body.responsable_id;
          _context4.next = 7;
          return pool.query("INSERT INTO laboratorios (nombre, ubicacion, tipo_laboratorio, capacidad, responsable_id) VALUES (?, ?, ?, ?, ?)", [nombre, ubicacion, tipo_laboratorio, capacidad, responsable_id]);
        case 7:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          results = _yield$pool$query8[0];
          res.json(_objectSpread({
            id: results.insertId
          }, req.body));
          _context4.next = 17;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](3);
          console.error('Error saving laboratory:', _context4.t0);
          res.status(500).json({
            message: 'Error al guardar laboratorio'
          });
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 13]]);
  }));
  return function saveLaboratory(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteLaboratory = exports.deleteLaboratory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _yield$pool$query9, _yield$pool$query10, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.prev = 3;
          _context5.next = 6;
          return pool.query("DELETE FROM laboratorios WHERE laboratorio_id = ?", [req.params.id]);
        case 6:
          _yield$pool$query9 = _context5.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          result = _yield$pool$query10[0];
          if (!(result.affectedRows === 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Laboratorio no encontrado'
          }));
        case 11:
          res.json({
            message: 'Laboratorio eliminado'
          });
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.error('Error deleting laboratory:', _context5.t0);
          res.status(500).json({
            message: 'Error al eliminar laboratorio'
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return function deleteLaboratory(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var updateLaboratory = exports.updateLaboratory = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var pool, _yield$pool$query11, _yield$pool$query12, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context6.sent;
          _context6.prev = 3;
          _context6.next = 6;
          return pool.query("UPDATE laboratorios SET ? WHERE laboratorio_id = ?", [req.body, req.params.id]);
        case 6:
          _yield$pool$query11 = _context6.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          result = _yield$pool$query12[0];
          if (!(result.affectedRows === 0)) {
            _context6.next = 11;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Laboratorio no encontrado'
          }));
        case 11:
          res.json({
            message: 'Laboratorio actualizado'
          });
          _context6.next = 18;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](3);
          console.error('Error updating laboratory:', _context6.t0);
          res.status(500).json({
            message: 'Error al actualizar laboratorio'
          });
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 14]]);
  }));
  return function updateLaboratory(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();