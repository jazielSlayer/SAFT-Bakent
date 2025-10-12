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
          return pool.query('SELECT id FROM persona WHERE correo = ?', [email]);
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
          expiresAt = new Date(Date.now() + 10 * 60 * 1000);
          _context.next = 18;
          return pool.query('INSERT INTO Autenticacion (id, email, code, expires_at) VALUES (?, ?, ?, ?)', [_crypto["default"].randomUUID(), email, code, expiresAt]);
        case 18:
          console.log("Enviando correo a ".concat(email, " con c\xF3digo ").concat(code, " a las ").concat(new Date().toISOString()));
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
          _context.next = 22;
          return transporter.sendMail({
            from: '"SAFT" <tu-email@gmail.com>',
            to: email,
            subject: 'Código de Verificación',
            text: "Tu c\xF3digo de verificaci\xF3n es: ".concat(code),
            html: "\n                <!DOCTYPE html>\n                <html>\n                <head>\n                    <style>\n                        body { font-family: Arial, sans-serif; color: #0000FF; }\n                    </style>\n                </head>\n                <body>\n                    <table width=\"100%\" bgcolor=\"#554747a2\" style=\"padding: 20px 0;\">\n                        <tr>\n                            <td align=\"center\">\n                                <h1 style=\"color: #23196dff;\">SAFT</h1>\n                                <img src=\"https://via.placeholder.com/150\" alt=\"Placeholder Image\" style=\"margin-top: 10px;\">\n                            </td>\n                        </tr>\n                    </table>\n                    <table width=\"600\" align=\"center\" bgcolor=\"#FFFFFF\" style=\"margin: 20px auto; border: 1px solid #0000FF; padding: 20px;\">\n                        <tr>\n                            <td>\n                                <h2 style=\"color: #100954cd;\">C\xF3digo de Verificaci\xF3n</h2>\n                                <p style=\"font-size: 16px; color: #0000FF;\">\n                                    Estimado usuario,<br>\n                                    Su c\xF3digo de verificaci\xF3n para acceder a nuestros servicios es:\n                                </p>\n                                <p style=\"background-color: #cccc07b3; padding: 10px; font-size: 24px; text-align: center; color: #FF0000; font-weight: bold;\">\n                                    ".concat(code, "\n                                </p>\n                                <p style=\"font-size: 14px; color: #0000FF;\">\n                                    Este c\xF3digo es v\xE1lido por <strong>10 minutos</strong>. Por favor, no comparta este c\xF3digo con nadie. Si no solicit\xF3 este c\xF3digo, ignore este mensaje o cont\xE1ctenos inmediatamente.\n                                </p>\n                            </td>\n                        </tr>\n                    </table>\n                    <table width=\"100%\" bgcolor=\"#081570ff\" style=\"padding: 10px 0; color: #FFFF00; text-align: center;\">\n                        <tr>\n                            <td>\n                                <p style=\"font-size: 12px;\">SAFT - Sistema de Administraci\xF3n Financiera \xA9 ").concat(new Date().getFullYear(), " | <a href=\"mailto:support@saft.com\" style=\"color: #FFFF00; text-decoration: none;\">support@saft.com</a></p>\n                            </td>\n                        </tr>\n                    </table>\n                </body>\n                </html>\n            ")
          });
        case 22:
          res.json({
            success: true,
            message: 'Código enviado exitosamente'
          });
          _context.next = 29;
          break;
        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](4);
          console.error('Error enviando código de autenticación:', _context.t0);
          res.status(500).json({
            message: 'Error al enviar el código de autenticación'
          });
        case 29:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 25]]);
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