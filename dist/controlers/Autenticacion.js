"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAuthCode = exports.sendAuthCode = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _crypto = _interopRequireDefault(require("crypto"));
// Para generar UUID

var sendAuthCode = exports.sendAuthCode = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, email, _yield$pool$query, _yield$pool$query2, userCheck, code, expiresAt, transporter;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context.sent;
          email = req.body.email;
          _context.prev = 4;
          if (!(!email || typeof email !== 'string')) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Correo requerido y debe ser texto'
          }));
        case 7:
          _context.next = 9;
          return pool.query('SELECT id FROM persona WHERE correo = ?',
          // Usa el campo correcto de persona
          [email]);
        case 9:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          userCheck = _yield$pool$query2[0];
          if (!(userCheck.length === 0)) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'Correo no registrado'
          }));
        case 14:
          code = Math.floor(100000 + Math.random() * 900000).toString();
          expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos
          _context.next = 18;
          return pool.query('INSERT INTO Autenticacion (id, email, code, expires_at) VALUES (?, ?, ?, ?)', [_crypto["default"].randomUUID(), email, code, expiresAt]);
        case 18:
          transporter = _nodemailer["default"].createTransport({
            service: 'gmail',
            auth: {
              user: process.env.CORREO_APP,
              pass: process.env.CONTRASENA_APP
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          _context.next = 21;
          return transporter.sendMail({
            from: '"SAFT" <tu-email@gmail.com>',
            to: email,
            subject: 'Código de Verificación',
            text: "Tu c\xF3digo de verificaci\xF3n es: ".concat(code),
            html: "<p>Tu c\xF3digo de verificaci\xF3n es: <strong>".concat(code, "</strong></p>")
          });
        case 21:
          res.json({
            success: true,
            message: 'Código enviado exitosamente'
          });
          _context.next = 28;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](4);
          console.error('Error enviando código de autenticación:', _context.t0);
          res.status(500).json({
            message: 'Error al enviar el código de autenticación'
          });
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 24]]);
  }));
  return function sendAuthCode(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var verifyAuthCode = exports.verifyAuthCode = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pool, _req$body, email, code, _yield$pool$query3, _yield$pool$query4, rows;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context2.sent;
          _req$body = req.body, email = _req$body.email, code = _req$body.code;
          _context2.prev = 4;
          if (!(!email || !code)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Correo y código son requeridos'
          }));
        case 7:
          _context2.next = 9;
          return pool.query('SELECT * FROM Autenticacion WHERE email = ? AND code = ? AND expires_at > NOW()', [email, code]);
        case 9:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          if (!(rows.length === 0)) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Código inválido o expirado'
          }));
        case 14:
          _context2.next = 16;
          return pool.query('DELETE FROM Autenticacion WHERE email = ? AND code = ?', [email, code]);
        case 16:
          res.json({
            success: true,
            message: 'Código verificado exitosamente'
          });
          _context2.next = 23;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](4);
          console.error('Error verificando código de autenticación:', _context2.t0);
          res.status(500).json({
            message: 'Error al verificar el código de autenticación'
          });
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 19]]);
  }));
  return function verifyAuthCode(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();