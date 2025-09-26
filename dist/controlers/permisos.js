"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePermission = exports.removePermissionFromRole = exports.getPermissionsByRole = exports.getPermissions = exports.getPermission = exports.deletePermission = exports.createPermission = exports.assignPermissionToRole = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
// controllers/permissions.js

// Obtener todos los permisos
var getPermissions = exports.getPermissions = /*#__PURE__*/function () {
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
          return pool.query("SELECT * FROM permissions");
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
          console.error('Error fetching permissions:', _context.t0);
          res.status(500).json({
            message: 'Error al obtener permisos'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 12]]);
  }));
  return function getPermissions(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Obtener un permiso por ID
var getPermission = exports.getPermission = /*#__PURE__*/function () {
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
          return pool.query("SELECT * FROM permissions WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Permiso no encontrado'
          }));
        case 11:
          res.json(rows[0]);
          _context2.next = 18;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](3);
          console.error('Error fetching permission:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener permiso'
          });
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 14]]);
  }));
  return function getPermission(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Crear un nuevo permiso
var createPermission = exports.createPermission = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _req$body, name, guard_name, _yield$pool$query5, _yield$pool$query6, results;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _req$body = req.body, name = _req$body.name, guard_name = _req$body.guard_name; // Validaciones
          if (!(!name || !guard_name)) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Campos obligatorios faltantes: name, guard_name"
          }));
        case 6:
          _context3.prev = 6;
          _context3.next = 9;
          return pool.query("INSERT INTO permissions (name, guard_name) VALUES (?, ?)", [name, guard_name]);
        case 9:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          results = _yield$pool$query6[0];
          res.json({
            id: results.insertId,
            name: name,
            guard_name: guard_name
          });
          _context3.next = 21;
          break;
        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](6);
          console.error('Error creating permission:', _context3.t0);
          if (!(_context3.t0.code === 'ER_DUP_ENTRY')) {
            _context3.next = 20;
            break;
          }
          return _context3.abrupt("return", res.status(409).json({
            message: "Permiso ya existe"
          }));
        case 20:
          res.status(500).json({
            message: "Error al crear permiso"
          });
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[6, 15]]);
  }));
  return function createPermission(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Actualizar un permiso
var updatePermission = exports.updatePermission = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _yield$pool$query7, _yield$pool$query8, permissionRows, permission, _req$body2, _req$body2$name, name, _req$body2$guard_name, guard_name;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _context4.prev = 3;
          _context4.next = 6;
          return pool.query("SELECT * FROM permissions WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          permissionRows = _yield$pool$query8[0];
          if (!(permissionRows.length === 0)) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Permiso no encontrado'
          }));
        case 11:
          permission = permissionRows[0]; // Solo actualiza los campos enviados, los demás se mantienen igual
          _req$body2 = req.body, _req$body2$name = _req$body2.name, name = _req$body2$name === void 0 ? permission.name : _req$body2$name, _req$body2$guard_name = _req$body2.guard_name, guard_name = _req$body2$guard_name === void 0 ? permission.guard_name : _req$body2$guard_name;
          _context4.next = 15;
          return pool.query("UPDATE permissions SET name = ?, guard_name = ? WHERE id = ?", [name, guard_name, req.params.id]);
        case 15:
          res.json({
            message: 'Permiso actualizado'
          });
          _context4.next = 22;
          break;
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](3);
          console.error('Error updating permission:', _context4.t0);
          res.status(500).json({
            message: 'Error al actualizar permiso'
          });
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 18]]);
  }));
  return function updatePermission(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// Eliminar un permiso
var deletePermission = exports.deletePermission = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _yield$pool$query9, _yield$pool$query10, rows;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.prev = 3;
          _context5.next = 6;
          return pool.query("SELECT * FROM permissions WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query9 = _context5.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          rows = _yield$pool$query10[0];
          if (!(rows.length === 0)) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Permiso no encontrado'
          }));
        case 11:
          _context5.next = 13;
          return pool.query("DELETE FROM permissions WHERE id = ?", [req.params.id]);
        case 13:
          res.json({
            message: 'Permiso eliminado'
          });
          _context5.next = 20;
          break;
        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](3);
          console.error('Error deleting permission:', _context5.t0);
          res.status(500).json({
            message: 'Error al eliminar permiso'
          });
        case 20:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 16]]);
  }));
  return function deletePermission(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// Obtener permisos de un rol específico
var getPermissionsByRole = exports.getPermissionsByRole = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var pool, _yield$pool$query11, _yield$pool$query12, rows;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context6.sent;
          _context6.prev = 3;
          _context6.next = 6;
          return pool.query("\n            SELECT p.* \n            FROM permissions p\n            JOIN role_has_permissions rhp ON p.id = rhp.permission_id\n            WHERE rhp.role_id = ?\n        ", [req.params.roleId]);
        case 6:
          _yield$pool$query11 = _context6.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          rows = _yield$pool$query12[0];
          res.json(rows);
          _context6.next = 16;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](3);
          console.error('Error fetching permissions by role:', _context6.t0);
          res.status(500).json({
            message: 'Error al obtener permisos del rol'
          });
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 12]]);
  }));
  return function getPermissionsByRole(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// Asignar un permiso a un rol
var assignPermissionToRole = exports.assignPermissionToRole = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pool, permission_id, _yield$pool$query13, _yield$pool$query14, roleRows, _yield$pool$query15, _yield$pool$query16, permRows, _yield$pool$query17, _yield$pool$query18, existing;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context7.sent;
          permission_id = req.body.permission_id;
          if (permission_id) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: "permission_id es requerido"
          }));
        case 6:
          _context7.prev = 6;
          _context7.next = 9;
          return pool.query("SELECT * FROM roles WHERE id = ?", [req.params.roleId]);
        case 9:
          _yield$pool$query13 = _context7.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          roleRows = _yield$pool$query14[0];
          if (!(roleRows.length === 0)) {
            _context7.next = 14;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Rol no encontrado'
          }));
        case 14:
          _context7.next = 16;
          return pool.query("SELECT * FROM permissions WHERE id = ?", [permission_id]);
        case 16:
          _yield$pool$query15 = _context7.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          permRows = _yield$pool$query16[0];
          if (!(permRows.length === 0)) {
            _context7.next = 21;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Permiso no encontrado'
          }));
        case 21:
          _context7.next = 23;
          return pool.query("SELECT * FROM role_has_permissions WHERE role_id = ? AND permission_id = ?", [req.params.roleId, permission_id]);
        case 23:
          _yield$pool$query17 = _context7.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          existing = _yield$pool$query18[0];
          if (!(existing.length > 0)) {
            _context7.next = 28;
            break;
          }
          return _context7.abrupt("return", res.status(409).json({
            message: 'Permiso ya asignado a este rol'
          }));
        case 28:
          _context7.next = 30;
          return pool.query("INSERT INTO role_has_permissions (permission_id, role_id) VALUES (?, ?)", [permission_id, req.params.roleId]);
        case 30:
          res.json({
            message: 'Permiso asignado al rol'
          });
          _context7.next = 39;
          break;
        case 33:
          _context7.prev = 33;
          _context7.t0 = _context7["catch"](6);
          console.error('Error assigning permission to role:', _context7.t0);
          if (!(_context7.t0.code === 'ER_DUP_ENTRY')) {
            _context7.next = 38;
            break;
          }
          return _context7.abrupt("return", res.status(409).json({
            message: "Asignación duplicada"
          }));
        case 38:
          res.status(500).json({
            message: "Error al asignar permiso al rol"
          });
        case 39:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[6, 33]]);
  }));
  return function assignPermissionToRole(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// Remover un permiso de un rol
var removePermissionFromRole = exports.removePermissionFromRole = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var pool, permission_id, _yield$pool$query19, _yield$pool$query20, existing;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context8.sent;
          permission_id = req.body.permission_id;
          if (permission_id) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: "permission_id es requerido"
          }));
        case 6:
          _context8.prev = 6;
          _context8.next = 9;
          return pool.query("SELECT * FROM role_has_permissions WHERE role_id = ? AND permission_id = ?", [req.params.roleId, permission_id]);
        case 9:
          _yield$pool$query19 = _context8.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          existing = _yield$pool$query20[0];
          if (!(existing.length === 0)) {
            _context8.next = 14;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Asignación no encontrada'
          }));
        case 14:
          _context8.next = 16;
          return pool.query("DELETE FROM role_has_permissions WHERE role_id = ? AND permission_id = ?", [req.params.roleId, permission_id]);
        case 16:
          res.json({
            message: 'Permiso removido del rol'
          });
          _context8.next = 23;
          break;
        case 19:
          _context8.prev = 19;
          _context8.t0 = _context8["catch"](6);
          console.error('Error removing permission from role:', _context8.t0);
          res.status(500).json({
            message: 'Error al remover permiso del rol'
          });
        case 23:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[6, 19]]);
  }));
  return function removePermissionFromRole(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();