"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEstudiante = exports.getEstudiantes = exports.getEstudiante = exports.deleteEstudiante = exports.createEstudiante = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getEstudiantes = exports.getEstudiantes = /*#__PURE__*/function () {
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
          return pool.query("\n            SELECT e.*, p.nombres, p.apellidopat, p.apellidomat, pa.nombre_programa\n            FROM estudiante e\n            JOIN persona p ON e.per_id = p.id\n            JOIN programa_academico pa ON e.id_programa_academico = pa.id\n        ");
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
          console.error('Error fetching estudiantes:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener estudiantes'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 12]]);
  }));
  return function getEstudiantes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getEstudiante = exports.getEstudiante = /*#__PURE__*/function () {
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
          return pool.query("\n            SELECT e.*, p.nombres, p.apellidopat, p.apellidomat, pa.nombre_programa\n            FROM estudiante e\n            JOIN persona p ON e.per_id = p.id\n            JOIN programa_academico pa ON e.id_programa_academico = pa.id\n            WHERE e.id = ?\n        ", [req.params.id]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Estudiante no encontrado'
          }));
        case 11:
          res.json(rows[0]);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.error('Error fetching estudiante:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener estudiante'
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return function getEstudiante(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var createEstudiante = exports.createEstudiante = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _req$body, per_id, id_programa_academico, numero_matricula, fecha_inscripcion, estado, _yield$pool$query5, _yield$pool$query6, personaCheck, _yield$pool$query7, _yield$pool$query8, programaCheck, estadoValue, _yield$pool$query9, _yield$pool$query10, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _req$body = req.body, per_id = _req$body.per_id, id_programa_academico = _req$body.id_programa_academico, numero_matricula = _req$body.numero_matricula, fecha_inscripcion = _req$body.fecha_inscripcion, estado = _req$body.estado;
          _context3.prev = 4;
          if (!(!per_id || !id_programa_academico || !numero_matricula || !fecha_inscripcion)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Faltan campos requeridos'
          }));
        case 7:
          if (/^\d{4}-\d{2}-\d{2}$/.test(fecha_inscripcion)) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Formato de fecha inválido (use YYYY-MM-DD)'
          }));
        case 9:
          _context3.next = 11;
          return pool.query('SELECT id FROM persona WHERE id = ?', [per_id]);
        case 11:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          personaCheck = _yield$pool$query6[0];
          if (!(personaCheck.length === 0)) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Persona no encontrada'
          }));
        case 16:
          _context3.next = 18;
          return pool.query('SELECT id FROM programa_academico WHERE id = ?', [id_programa_academico]);
        case 18:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          programaCheck = _yield$pool$query8[0];
          if (!(programaCheck.length === 0)) {
            _context3.next = 23;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Programa académico no encontrado'
          }));
        case 23:
          // Validar estado (0 o 1)
          estadoValue = estado === true || estado === 1 ? 1 : 0; // Insertar en la tabla estudiante
          _context3.next = 26;
          return pool.query('INSERT INTO estudiante (per_id, id_programa_academico, numero_matricula, fecha_inscripcion, estado) VALUES (?, ?, ?, ?, ?)', [per_id, id_programa_academico, numero_matricula, fecha_inscripcion, estadoValue]);
        case 26:
          _yield$pool$query9 = _context3.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          results = _yield$pool$query10[0];
          res.json({
            id: results.insertId,
            per_id: per_id,
            id_programa_academico: id_programa_academico,
            numero_matricula: numero_matricula,
            fecha_inscripcion: fecha_inscripcion,
            estado: estadoValue
          });
          _context3.next = 40;
          break;
        case 32:
          _context3.prev = 32;
          _context3.t0 = _context3["catch"](4);
          console.error('Error creating estudiante:', _context3.t0);
          if (!(_context3.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context3.next = 37;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: persona o programa académico no existe'
          }));
        case 37:
          if (!(_context3.t0.code === 'ER_DUP_ENTRY')) {
            _context3.next = 39;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'El número de matrícula ya está registrado'
          }));
        case 39:
          res.status(500).json({
            message: 'Error al crear estudiante'
          });
        case 40:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 32]]);
  }));
  return function createEstudiante(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateEstudiante = exports.updateEstudiante = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _req$body2, per_id, id_programa_academico, numero_matricula, fecha_inscripcion, estado, _yield$pool$query11, _yield$pool$query12, results;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _req$body2 = req.body, per_id = _req$body2.per_id, id_programa_academico = _req$body2.id_programa_academico, numero_matricula = _req$body2.numero_matricula, fecha_inscripcion = _req$body2.fecha_inscripcion, estado = _req$body2.estado;
          _context4.prev = 4;
          _context4.next = 7;
          return pool.query("UPDATE estudiante SET per_id = ?, id_programa_academico = ?, numero_matricula = ?, fecha_inscripcion = ?, estado = ? WHERE id = ?", [per_id, id_programa_academico, numero_matricula, fecha_inscripcion, estado, req.params.id]);
        case 7:
          _yield$pool$query11 = _context4.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          results = _yield$pool$query12[0];
          if (!(results.affectedRows === 0)) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Estudiante no encontrado'
          }));
        case 12:
          res.json({
            message: 'Estudiante actualizado'
          });
          _context4.next = 19;
          break;
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](4);
          console.error('Error updating estudiante:', _context4.t0);
          res.status(500).json({
            message: 'Error al actualizar estudiante'
          });
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 15]]);
  }));
  return function updateEstudiante(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteEstudiante = exports.deleteEstudiante = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _yield$pool$query13, _yield$pool$query14, results;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.prev = 3;
          _context5.next = 6;
          return pool.query("DELETE FROM estudiante WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query13 = _context5.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          results = _yield$pool$query14[0];
          if (!(results.affectedRows === 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Estudiante no encontrado'
          }));
        case 11:
          res.json({
            message: 'Estudiante eliminado'
          });
          _context5.next = 18;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](3);
          console.error('Error deleting estudiante:', _context5.t0);
          res.status(500).json({
            message: 'Error al eliminar estudiante'
          });
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 14]]);
  }));
  return function deleteEstudiante(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();