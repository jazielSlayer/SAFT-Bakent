"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.saveUser = exports.registerUser = exports.loginUser = exports.getUsers = exports.getUserRoleByEmail = exports.getUserCount = exports.getUser = exports.getRoles = exports.deleteUser = exports.assignRoleToUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var registerUser = exports.registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, _req$body, nombres, apellidopat, apellidomat, carnet, email, password, user_name, per_id, role, personaId, _yield$pool$query, _yield$pool$query2, personaCheck, _yield$pool$query3, _yield$pool$query4, personaResults, roleId, roleName, _yield$pool$query5, _yield$pool$query6, roleCheck, hashedPassword, _yield$pool$query7, _yield$pool$query8, userResults, userId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context.sent;
          _req$body = req.body, nombres = _req$body.nombres, apellidopat = _req$body.apellidopat, apellidomat = _req$body.apellidomat, carnet = _req$body.carnet, email = _req$body.email, password = _req$body.password, user_name = _req$body.user_name, per_id = _req$body.per_id, role = _req$body.role;
          console.log('registerUser recibió:', {
            per_id: per_id || 'NO PROPORCIONADO',
            nombres: nombres,
            email: email,
            user_name: user_name,
            role: role || 'NO PROPORCIONADO',
            password: password ? 'presente' : 'UNDEFINED'
          });
          _context.prev = 5;
          if (!(!password || typeof password !== 'string')) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Contraseña requerida y debe ser texto"
          }));
        case 8:
          if (!(!user_name || !email)) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Campos obligatorios faltantes"
          }));
        case 10:
          if (!per_id) {
            _context.next = 22;
            break;
          }
          console.log('Usando per_id existente:', per_id);
          _context.next = 14;
          return pool.query("SELECT id FROM persona WHERE id = ?", [per_id]);
        case 14:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          personaCheck = _yield$pool$query2[0];
          if (!(personaCheck.length === 0)) {
            _context.next = 19;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: "Persona no encontrada"
          }));
        case 19:
          personaId = per_id;
          _context.next = 31;
          break;
        case 22:
          console.log('Creando nueva persona');
          if (nombres) {
            _context.next = 25;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Nombres requerido para crear persona"
          }));
        case 25:
          _context.next = 27;
          return pool.query("INSERT INTO persona (nombres, apellidopat, apellidomat, carnet, correo, estado) VALUES (?, ?, ?, ?, ?, 1)", [nombres, apellidopat || '', apellidomat || '', carnet || '', email]);
        case 27:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          personaResults = _yield$pool$query4[0];
          personaId = personaResults.insertId;
        case 31:
          roleId = null;
          roleName = null;
          if (!role) {
            _context.next = 47;
            break;
          }
          _context.next = 36;
          return pool.query("SELECT id, name FROM roles WHERE name = ?", [role]);
        case 36:
          _yield$pool$query5 = _context.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          roleCheck = _yield$pool$query6[0];
          if (!(roleCheck.length > 0)) {
            _context.next = 45;
            break;
          }
          roleId = roleCheck[0].id;
          roleName = roleCheck[0].name;
          console.log("Rol encontrado: \"".concat(roleName, "\" (id: ").concat(roleId, ")"));
          _context.next = 47;
          break;
        case 45:
          console.warn("Rol \"".concat(role, "\" no encontrado en la base de datos"));
          return _context.abrupt("return", res.status(400).json({
            message: "Rol \"".concat(role, "\" no v\xE1lido")
          }));
        case 47:
          _context.next = 49;
          return _bcryptjs["default"].hash(password, 10);
        case 49:
          hashedPassword = _context.sent;
          _context.next = 52;
          return pool.query("INSERT INTO users (user_name, per_id, id_roles, email, password, status) VALUES (?, ?, ?, ?, ?, 1)", [user_name, personaId, roleId, email, hashedPassword]);
        case 52:
          _yield$pool$query7 = _context.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          userResults = _yield$pool$query8[0];
          userId = userResults.insertId;
          console.log("Usuario ".concat(userId, " creado con rol \"").concat(roleName, "\" (id_roles: ").concat(roleId, ")"));
          res.json({
            id: userId,
            user_name: user_name,
            email: email,
            per_id: personaId,
            id_roles: roleId,
            role: roleName
          });
          _context.next = 69;
          break;
        case 60:
          _context.prev = 60;
          _context.t0 = _context["catch"](5);
          console.error('Error al registrar usuario:', _context.t0);
          if (!(_context.t0.code === 'ER_DUP_ENTRY')) {
            _context.next = 68;
            break;
          }
          if (!_context.t0.message.includes('user_name')) {
            _context.next = 66;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            message: "Nombre de usuario ya existe"
          }));
        case 66:
          if (!_context.t0.message.includes('email')) {
            _context.next = 68;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            message: "Email ya está registrado"
          }));
        case 68:
          res.status(500).json({
            message: "Error al registrar usuario"
          });
        case 69:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 60]]);
  }));
  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pool, _req$body2, email, password, _yield$pool$query9, _yield$pool$query10, rows, user, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context2.sent;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 4;
          _context2.next = 7;
          return pool.query("\n            SELECT \n                u.id,\n                u.user_name,\n                u.email,\n                u.password,\n                u.status,\n                u.id_roles,\n                p.nombres,\n                p.apellidopat,\n                p.apellidomat,\n                p.carnet,\n                r.name as role_name,\n                r.start_path,\n                r.descripcion as role_descripcion\n            FROM users u\n            JOIN persona p ON u.per_id = p.id\n            LEFT JOIN roles r ON u.id_roles = r.id\n            WHERE u.email = ?\n        ", [email]);
        case 7:
          _yield$pool$query9 = _context2.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          rows = _yield$pool$query10[0];
          if (!(rows.length === 0)) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Usuario no encontrado"
          }));
        case 12:
          user = rows[0];
          if (user.status) {
            _context2.next = 15;
            break;
          }
          return _context2.abrupt("return", res.status(403).json({
            message: "Usuario inactivo. Contacta al administrador."
          }));
        case 15:
          _context2.next = 17;
          return _bcryptjs["default"].compare(password, user.password);
        case 17:
          isMatch = _context2.sent;
          if (isMatch) {
            _context2.next = 20;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: "Contraseña incorrecta"
          }));
        case 20:
          if (!(!user.id_roles || !user.role_name)) {
            _context2.next = 22;
            break;
          }
          return _context2.abrupt("return", res.status(403).json({
            message: "Usuario sin rol asignado. Contacta al administrador."
          }));
        case 22:
          res.json({
            id: user.id,
            user_name: user.user_name,
            nombres: user.nombres,
            apellidopat: user.apellidopat,
            apellidomat: user.apellidomat,
            email: user.email,
            carnet: user.carnet,
            id_roles: user.id_roles,
            role: user.role_name,
            start_path: user.start_path
          });
          _context2.next = 29;
          break;
        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](4);
          console.error('Error en el login:', _context2.t0);
          res.status(500).json({
            message: "Error en el login"
          });
        case 29:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 25]]);
  }));
  return function loginUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getUsers = exports.getUsers = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _yield$pool$query11, _yield$pool$query12, rows;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          _context3.prev = 3;
          _context3.next = 6;
          return pool.query("\n            SELECT \n                u.id, \n                u.user_name, \n                u.email, \n                u.status, \n                u.id_roles,\n                r.name as role_name,\n                p.nombres, \n                p.apellidopat, \n                p.apellidomat, \n                p.carnet \n            FROM users u \n            JOIN persona p ON u.per_id = p.id\n            LEFT JOIN roles r ON u.id_roles = r.id\n            ORDER BY u.id\n        ");
        case 6:
          _yield$pool$query11 = _context3.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          rows = _yield$pool$query12[0];
          res.json(rows);
          _context3.next = 16;
          break;
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](3);
          console.error('Error fetching users:', _context3.t0);
          res.status(500).json({
            message: 'Error al obtener usuarios'
          });
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 12]]);
  }));
  return function getUsers(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _yield$pool$query13, _yield$pool$query14, rows;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _context4.prev = 3;
          _context4.next = 6;
          return pool.query("\n            SELECT \n                u.id, \n                u.user_name, \n                u.email, \n                u.status, \n                u.id_roles,\n                r.name as role_name,\n                r.start_path,\n                p.nombres, \n                p.apellidopat, \n                p.apellidomat, \n                p.carnet \n            FROM users u \n            JOIN persona p ON u.per_id = p.id\n            LEFT JOIN roles r ON u.id_roles = r.id\n            WHERE u.id = ?\n        ", [req.params.id]);
        case 6:
          _yield$pool$query13 = _context4.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          rows = _yield$pool$query14[0];
          if (!(rows.length === 0)) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 11:
          res.json(rows[0]);
          _context4.next = 18;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](3);
          console.error('Error fetching user:', _context4.t0);
          res.status(500).json({
            message: 'Error al obtener usuario'
          });
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 14]]);
  }));
  return function getUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getUserCount = exports.getUserCount = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _yield$pool$query15, _yield$pool$query16, rows;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.prev = 3;
          _context5.next = 6;
          return pool.query("SELECT COUNT(*) AS count FROM users");
        case 6:
          _yield$pool$query15 = _context5.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          rows = _yield$pool$query16[0];
          res.json(rows[0].count);
          _context5.next = 16;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](3);
          console.error('Error fetching user count:', _context5.t0);
          res.status(500).json({
            message: 'Error al contar usuarios'
          });
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 12]]);
  }));
  return function getUserCount(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var saveUser = exports.saveUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var pool, _req$body3, nombres, apellidopat, apellidomat, carnet, email, user_name, id_roles, _yield$pool$query17, _yield$pool$query18, personaResults, per_id, _yield$pool$query19, _yield$pool$query20, userResults;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context6.sent;
          _req$body3 = req.body, nombres = _req$body3.nombres, apellidopat = _req$body3.apellidopat, apellidomat = _req$body3.apellidomat, carnet = _req$body3.carnet, email = _req$body3.email, user_name = _req$body3.user_name, id_roles = _req$body3.id_roles;
          _context6.prev = 4;
          _context6.next = 7;
          return pool.query("INSERT INTO persona (nombres, apellidopat, apellidomat, carnet, correo, estado) VALUES (?, ?, ?, ?, ?, 1)", [nombres, apellidopat, apellidomat, carnet, email]);
        case 7:
          _yield$pool$query17 = _context6.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          personaResults = _yield$pool$query18[0];
          per_id = personaResults.insertId;
          _context6.next = 13;
          return pool.query("INSERT INTO users (user_name, per_id, id_roles, email, status) VALUES (?, ?, ?, ?, 1)", [user_name, per_id, id_roles || null, email]);
        case 13:
          _yield$pool$query19 = _context6.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          userResults = _yield$pool$query20[0];
          res.json({
            id: userResults.insertId,
            user_name: user_name,
            nombres: nombres,
            apellidopat: apellidopat,
            apellidomat: apellidomat,
            email: email,
            id_roles: id_roles
          });
          _context6.next = 23;
          break;
        case 19:
          _context6.prev = 19;
          _context6.t0 = _context6["catch"](4);
          console.error('Error saving user:', _context6.t0);
          res.status(500).json({
            message: 'Error al guardar usuario'
          });
        case 23:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[4, 19]]);
  }));
  return function saveUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var deleteUser = exports.deleteUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pool, _yield$pool$query21, _yield$pool$query22, userRows, per_id;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context7.sent;
          _context7.prev = 3;
          _context7.next = 6;
          return pool.query("SELECT per_id FROM users WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query21 = _context7.sent;
          _yield$pool$query22 = (0, _slicedToArray2["default"])(_yield$pool$query21, 1);
          userRows = _yield$pool$query22[0];
          if (!(userRows.length === 0)) {
            _context7.next = 11;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 11:
          per_id = userRows[0].per_id;
          _context7.next = 14;
          return pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);
        case 14:
          _context7.next = 16;
          return pool.query("DELETE FROM persona WHERE id = ?", [per_id]);
        case 16:
          res.json({
            message: 'Usuario eliminado'
          });
          _context7.next = 23;
          break;
        case 19:
          _context7.prev = 19;
          _context7.t0 = _context7["catch"](3);
          console.error('Error deleting user:', _context7.t0);
          res.status(500).json({
            message: 'Error al eliminar usuario'
          });
        case 23:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 19]]);
  }));
  return function deleteUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var pool, _yield$pool$query23, _yield$pool$query24, userRows, user, per_id, _yield$pool$query25, _yield$pool$query26, personaRows, persona, _req$body4, _req$body4$nombres, nombres, _req$body4$apellidopa, apellidopat, _req$body4$apellidoma, apellidomat, _req$body4$carnet, carnet, _req$body4$email, email, _req$body4$user_name, user_name, _req$body4$id_roles, id_roles;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context8.sent;
          _context8.prev = 3;
          _context8.next = 6;
          return pool.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query23 = _context8.sent;
          _yield$pool$query24 = (0, _slicedToArray2["default"])(_yield$pool$query23, 1);
          userRows = _yield$pool$query24[0];
          if (!(userRows.length === 0)) {
            _context8.next = 11;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 11:
          user = userRows[0];
          per_id = user.per_id;
          _context8.next = 15;
          return pool.query("SELECT * FROM persona WHERE id = ?", [per_id]);
        case 15:
          _yield$pool$query25 = _context8.sent;
          _yield$pool$query26 = (0, _slicedToArray2["default"])(_yield$pool$query25, 1);
          personaRows = _yield$pool$query26[0];
          if (!(personaRows.length === 0)) {
            _context8.next = 20;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'Persona no encontrada'
          }));
        case 20:
          persona = personaRows[0];
          _req$body4 = req.body, _req$body4$nombres = _req$body4.nombres, nombres = _req$body4$nombres === void 0 ? persona.nombres : _req$body4$nombres, _req$body4$apellidopa = _req$body4.apellidopat, apellidopat = _req$body4$apellidopa === void 0 ? persona.apellidopat : _req$body4$apellidopa, _req$body4$apellidoma = _req$body4.apellidomat, apellidomat = _req$body4$apellidoma === void 0 ? persona.apellidomat : _req$body4$apellidoma, _req$body4$carnet = _req$body4.carnet, carnet = _req$body4$carnet === void 0 ? persona.carnet : _req$body4$carnet, _req$body4$email = _req$body4.email, email = _req$body4$email === void 0 ? persona.correo : _req$body4$email, _req$body4$user_name = _req$body4.user_name, user_name = _req$body4$user_name === void 0 ? user.user_name : _req$body4$user_name, _req$body4$id_roles = _req$body4.id_roles, id_roles = _req$body4$id_roles === void 0 ? user.id_roles : _req$body4$id_roles;
          _context8.next = 24;
          return pool.query("UPDATE persona SET nombres = ?, apellidopat = ?, apellidomat = ?, carnet = ?, correo = ? WHERE id = ?", [nombres, apellidopat, apellidomat, carnet, email, per_id]);
        case 24:
          _context8.next = 26;
          return pool.query("UPDATE users SET user_name = ?, email = ?, id_roles = ? WHERE id = ?", [user_name, email, id_roles, req.params.id]);
        case 26:
          res.json({
            message: 'Usuario actualizado'
          });
          _context8.next = 33;
          break;
        case 29:
          _context8.prev = 29;
          _context8.t0 = _context8["catch"](3);
          console.error('Error updating user:', _context8.t0);
          res.status(500).json({
            message: 'Error al actualizar usuario'
          });
        case 33:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[3, 29]]);
  }));
  return function updateUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var assignRoleToUser = exports.assignRoleToUser = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var pool, role_id, userId, _yield$pool$query27, _yield$pool$query28, userCheck, _yield$pool$query29, _yield$pool$query30, roleCheck, _yield$pool$query31, _yield$pool$query32, existing;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context9.sent;
          role_id = req.body.role_id;
          userId = req.params.id;
          _context9.prev = 5;
          _context9.next = 8;
          return pool.query('SELECT id FROM users WHERE id = ?', [userId]);
        case 8:
          _yield$pool$query27 = _context9.sent;
          _yield$pool$query28 = (0, _slicedToArray2["default"])(_yield$pool$query27, 1);
          userCheck = _yield$pool$query28[0];
          if (!(userCheck.length === 0)) {
            _context9.next = 13;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 13:
          _context9.next = 15;
          return pool.query('SELECT id FROM roles WHERE id = ?', [role_id]);
        case 15:
          _yield$pool$query29 = _context9.sent;
          _yield$pool$query30 = (0, _slicedToArray2["default"])(_yield$pool$query29, 1);
          roleCheck = _yield$pool$query30[0];
          if (!(roleCheck.length === 0)) {
            _context9.next = 20;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: 'Rol no encontrado'
          }));
        case 20:
          _context9.next = 22;
          return pool.query('SELECT * FROM model_has_roles WHERE model_id = ? AND role_id = ?', [userId, role_id]);
        case 22:
          _yield$pool$query31 = _context9.sent;
          _yield$pool$query32 = (0, _slicedToArray2["default"])(_yield$pool$query31, 1);
          existing = _yield$pool$query32[0];
          if (!(existing.length > 0)) {
            _context9.next = 27;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: 'El usuario ya tiene asignado este rol'
          }));
        case 27:
          _context9.next = 29;
          return pool.query("INSERT INTO model_has_roles (model_id, role_id, model_type) VALUES (?, ?, \"App\\Models\\User\")", [userId, role_id]);
        case 29:
          res.json({
            message: 'Rol asignado correctamente',
            user_id: userId,
            role_id: role_id
          });
          _context9.next = 36;
          break;
        case 32:
          _context9.prev = 32;
          _context9.t0 = _context9["catch"](5);
          console.error('Error al asignar rol:', _context9.t0);
          res.status(500).json({
            message: 'Error al asignar rol al usuario',
            error: _context9.t0.message
          });
        case 36:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[5, 32]]);
  }));
  return function assignRoleToUser(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var getRoles = exports.getRoles = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var pool, _yield$pool$query33, _yield$pool$query34, rows;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context10.sent;
          _context10.prev = 3;
          _context10.next = 6;
          return pool.query("SELECT * FROM roles ORDER BY id");
        case 6:
          _yield$pool$query33 = _context10.sent;
          _yield$pool$query34 = (0, _slicedToArray2["default"])(_yield$pool$query33, 1);
          rows = _yield$pool$query34[0];
          res.json(rows);
          _context10.next = 16;
          break;
        case 12:
          _context10.prev = 12;
          _context10.t0 = _context10["catch"](3);
          console.error('Error fetching roles:', _context10.t0);
          res.status(500).json({
            message: 'Error al obtener roles'
          });
        case 16:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[3, 12]]);
  }));
  return function getRoles(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var getUserRoleByEmail = exports.getUserRoleByEmail = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var pool, email, _yield$pool$query35, _yield$pool$query36, rows, user;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context11.sent;
          email = req.body.email;
          _context11.prev = 4;
          if (!(!email || typeof email !== 'string')) {
            _context11.next = 7;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: "Correo requerido y debe ser texto"
          }));
        case 7:
          _context11.next = 9;
          return pool.query("\n            SELECT \n                u.email,\n                r.name as role_name\n            FROM users u\n            LEFT JOIN roles r ON u.id_roles = r.id\n            WHERE u.email = ?\n        ", [email]);
        case 9:
          _yield$pool$query35 = _context11.sent;
          _yield$pool$query36 = (0, _slicedToArray2["default"])(_yield$pool$query35, 1);
          rows = _yield$pool$query36[0];
          if (!(rows.length === 0)) {
            _context11.next = 14;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            message: "Usuario no encontrado"
          }));
        case 14:
          user = rows[0];
          res.json({
            email: user.email,
            role: user.role_name || "Sin rol asignado"
          });
          _context11.next = 22;
          break;
        case 18:
          _context11.prev = 18;
          _context11.t0 = _context11["catch"](4);
          console.error('Error al obtener rol por correo:', _context11.t0);
          res.status(500).json({
            message: "Error al obtener el rol del usuario"
          });
        case 22:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[4, 18]]);
  }));
  return function getUserRoleByEmail(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();