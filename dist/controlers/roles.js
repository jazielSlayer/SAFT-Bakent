"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRole = exports.getRoles = exports.getRole = exports.deleteRole = exports.createRole = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
// Obtener todos los roles
var getRoles = exports.getRoles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, _yield$pool$query, _yield$pool$query2, rows;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.connect)();
        case 3:
          pool = _context.sent;
          _context.next = 6;
          return pool.query("SELECT * FROM roles");
        case 6:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          res.json(rows);
          _context.next = 16;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching roles:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener roles'
          });
        case 16:
          _context.prev = 16;
          if (pool) pool.release();
          return _context.finish(16);
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12, 16, 19]]);
  }));
  return function getRoles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Obtener un rol por ID
var getRole = exports.getRole = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pool, _yield$pool$query3, _yield$pool$query4, rows;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0, _database.connect)();
        case 3:
          pool = _context2.sent;
          _context2.next = 6;
          return pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Rol no encontrado'
          }));
        case 11:
          res.json(rows[0]);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching role:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener rol'
          });
        case 18:
          _context2.prev = 18;
          if (pool) pool.release();
          return _context2.finish(18);
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14, 18, 21]]);
  }));
  return function getRole(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Crear un nuevo rol
var createRole = exports.createRole = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _req$body, name, descripcion, start_path, is_default, guard_name, _yield$pool$query5, _yield$pool$query6, existingRole, _yield$pool$query7, _yield$pool$query8, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _database.connect)();
        case 3:
          pool = _context3.sent;
          _req$body = req.body, name = _req$body.name, descripcion = _req$body.descripcion, start_path = _req$body.start_path, is_default = _req$body.is_default, guard_name = _req$body.guard_name; // Validaciones
          if (!(!name || !start_path || !guard_name)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Campos obligatorios faltantes: name, start_path, guard_name"
          }));
        case 7:
          _context3.next = 9;
          return pool.query("SELECT * FROM roles WHERE name = ? AND guard_name = ?", [name, guard_name]);
        case 9:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          existingRole = _yield$pool$query6[0];
          if (!(existingRole.length > 0)) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return", res.status(409).json({
            message: "Ya existe un rol con este nombre y guard_name"
          }));
        case 14:
          _context3.next = 16;
          return pool.query("INSERT INTO roles (name, descripcion, start_path, is_default, guard_name) VALUES (?, ?, ?, ?, ?)", [name, descripcion || null, start_path, is_default || 0, guard_name]);
        case 16:
          _yield$pool$query7 = _context3.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          results = _yield$pool$query8[0];
          res.status(201).json({
            id: results.insertId,
            name: name,
            descripcion: descripcion,
            start_path: start_path,
            is_default: is_default || 0,
            guard_name: guard_name
          });
          _context3.next = 28;
          break;
        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.error('Error creating role:', _context3.t0);
          if (!(_context3.t0.code === 'ER_DUP_ENTRY')) {
            _context3.next = 27;
            break;
          }
          return _context3.abrupt("return", res.status(409).json({
            message: "Ya existe un rol con este nombre y guard_name"
          }));
        case 27:
          res.status(500).json({
            message: "Error al crear rol"
          });
        case 28:
          _context3.prev = 28;
          if (pool) pool.release();
          return _context3.finish(28);
        case 31:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 22, 28, 31]]);
  }));
  return function createRole(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Actualizar un rol
var updateRole = exports.updateRole = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _yield$pool$query9, _yield$pool$query10, roleRows, role, _req$body2, _req$body2$name, name, _req$body2$descripcio, descripcion, _req$body2$start_path, start_path, _req$body2$is_default, is_default, _req$body2$guard_name, guard_name, _yield$pool$query11, _yield$pool$query12, existingRole, _yield$pool$query13, _yield$pool$query14, updatedRole;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _database.connect)();
        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          roleRows = _yield$pool$query10[0];
          if (!(roleRows.length === 0)) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Rol no encontrado'
          }));
        case 11:
          role = roleRows[0]; // Solo actualiza los campos enviados, los demás se mantienen igual
          _req$body2 = req.body, _req$body2$name = _req$body2.name, name = _req$body2$name === void 0 ? role.name : _req$body2$name, _req$body2$descripcio = _req$body2.descripcion, descripcion = _req$body2$descripcio === void 0 ? role.descripcion : _req$body2$descripcio, _req$body2$start_path = _req$body2.start_path, start_path = _req$body2$start_path === void 0 ? role.start_path : _req$body2$start_path, _req$body2$is_default = _req$body2.is_default, is_default = _req$body2$is_default === void 0 ? role.is_default : _req$body2$is_default, _req$body2$guard_name = _req$body2.guard_name, guard_name = _req$body2$guard_name === void 0 ? role.guard_name : _req$body2$guard_name; // Verificar si el nuevo name y guard_name ya existen (excluyendo el rol actual)
          _context4.next = 15;
          return pool.query("SELECT * FROM roles WHERE name = ? AND guard_name = ? AND id != ?", [name, guard_name, req.params.id]);
        case 15:
          _yield$pool$query11 = _context4.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          existingRole = _yield$pool$query12[0];
          if (!(existingRole.length > 0)) {
            _context4.next = 20;
            break;
          }
          return _context4.abrupt("return", res.status(409).json({
            message: "Ya existe un rol con este nombre y guard_name"
          }));
        case 20:
          _context4.next = 22;
          return pool.query("UPDATE roles SET name = ?, descripcion = ?, start_path = ?, is_default = ?, guard_name = ? WHERE id = ?", [name, descripcion, start_path, is_default, guard_name, req.params.id]);
        case 22:
          _context4.next = 24;
          return pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        case 24:
          _yield$pool$query13 = _context4.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          updatedRole = _yield$pool$query14[0];
          res.json({
            message: 'Rol actualizado',
            role: updatedRole[0]
          });
          _context4.next = 36;
          break;
        case 30:
          _context4.prev = 30;
          _context4.t0 = _context4["catch"](0);
          console.error('Error updating role:', _context4.t0);
          if (!(_context4.t0.code === 'ER_DUP_ENTRY')) {
            _context4.next = 35;
            break;
          }
          return _context4.abrupt("return", res.status(409).json({
            message: "Ya existe un rol con este nombre y guard_name"
          }));
        case 35:
          res.status(500).json({
            message: 'Error al actualizar rol'
          });
        case 36:
          _context4.prev = 36;
          if (pool) pool.release();
          return _context4.finish(36);
        case 39:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 30, 36, 39]]);
  }));
  return function updateRole(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Eliminar un rol
var deleteRole = exports.deleteRole = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _yield$pool$query15, _yield$pool$query16, rows, _yield$pool$query17, _yield$pool$query18, users, _yield$pool$query19, _yield$pool$query20, permisos;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _database.connect)();
        case 3:
          pool = _context5.sent;
          _context5.next = 6;
          return pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query15 = _context5.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          rows = _yield$pool$query16[0];
          if (!(rows.length === 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Rol no encontrado'
          }));
        case 11:
          _context5.next = 13;
          return pool.query("SELECT * FROM users WHERE id_roles = ?", [req.params.id]);
        case 13:
          _yield$pool$query17 = _context5.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          users = _yield$pool$query18[0];
          _context5.next = 18;
          return pool.query("SELECT * FROM permisos_roles WHERE id_rol = ?", [req.params.id]);
        case 18:
          _yield$pool$query19 = _context5.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          permisos = _yield$pool$query20[0];
          if (!(users.length > 0 || permisos.length > 0)) {
            _context5.next = 23;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'No se puede eliminar el rol porque está asignado a usuarios o permisos'
          }));
        case 23:
          _context5.next = 25;
          return pool.query("DELETE FROM roles WHERE id = ?", [req.params.id]);
        case 25:
          res.json({
            message: 'Rol eliminado'
          });
          _context5.next = 34;
          break;
        case 28:
          _context5.prev = 28;
          _context5.t0 = _context5["catch"](0);
          console.error('Error deleting role:', _context5.t0);
          if (!(_context5.t0.code === 'ER_ROW_IS_REFERENCED_2')) {
            _context5.next = 33;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'No se puede eliminar el rol porque está asignado a usuarios o permisos'
          }));
        case 33:
          res.status(500).json({
            message: 'Error al eliminar rol'
          });
        case 34:
          _context5.prev = 34;
          if (pool) pool.release();
          return _context5.finish(34);
        case 37:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 28, 34, 37]]);
  }));
  return function deleteRole(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();