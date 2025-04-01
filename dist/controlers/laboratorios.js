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
    var connection, _yield$connection$que, _yield$connection$que2, rows;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context.sent;
          _context.next = 5;
          return connection.query("SELECt * FROM laboratorios");
        case 5:
          _yield$connection$que = _context.sent;
          _yield$connection$que2 = (0, _slicedToArray2["default"])(_yield$connection$que, 1);
          rows = _yield$connection$que2[0];
          res.json(rows);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getLaboratories(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getLaboratory = exports.getLaboratory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var connection, _yield$connection$que3, _yield$connection$que4, rows;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context2.sent;
          _context2.next = 5;
          return connection.query("SELECT * FROM laboratorios WHERE laboratorio_id = ?", [req.params.id]);
        case 5:
          _yield$connection$que3 = _context2.sent;
          _yield$connection$que4 = (0, _slicedToArray2["default"])(_yield$connection$que3, 1);
          rows = _yield$connection$que4[0];
          res.json(rows[0]);
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getLaboratory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getLaboratoryCount = exports.getLaboratoryCount = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var connection, _yield$connection$que5, _yield$connection$que6, rows;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context3.sent;
          _context3.next = 5;
          return connection.query("SELECT COUNT(*) FROM laboratorios");
        case 5:
          _yield$connection$que5 = _context3.sent;
          _yield$connection$que6 = (0, _slicedToArray2["default"])(_yield$connection$que5, 1);
          rows = _yield$connection$que6[0];
          res.json(rows[0]['COUNT(*)']);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getLaboratoryCount(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var saveLaboratory = exports.saveLaboratory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var connection, _yield$connection$que7, _yield$connection$que8, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context4.sent;
          _context4.next = 5;
          return connection.query("INSERT INTO laboratorios (nombre, ubicacion, tipo_laboratorio, capacidad, responsable_id) VALUES (?, ?, ?, ?, ?)", [req.body.nombre, req.body.ubicacion, req.body.tipo_laboratorio, req.body.capacidad, req.body.responsable_id]);
        case 5:
          _yield$connection$que7 = _context4.sent;
          _yield$connection$que8 = (0, _slicedToArray2["default"])(_yield$connection$que7, 1);
          results = _yield$connection$que8[0];
          res.json(_objectSpread({
            id: results.resultId
          }, req.body));
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function saveLaboratory(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteLaboratory = exports.deleteLaboratory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var connection, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context5.sent;
          _context5.next = 5;
          return connection.query("DELETE FROM Laboratorios WHERE laboratorio_id = ?", [req.params.id]);
        case 5:
          result = _context5.sent;
          console.log(result);
          res.json({
            message: 'Laboratorio eliminado'
          });
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function deleteLaboratory(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var updateLaboratory = exports.updateLaboratory = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var connection, results;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _database.connect)();
        case 2:
          connection = _context6.sent;
          _context6.next = 5;
          return connection.query("UPDATE laboratorios SET ? WHERE laboratorio_id = ?", [req.body, req.params.id]);
        case 5:
          results = _context6.sent;
          console.log(results);
          res.json({
            message: 'Laboratorio actualizado'
          });
        case 8:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function updateLaboratory(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();