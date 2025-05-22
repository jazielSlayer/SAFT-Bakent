"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _config = require("./config");
// Configurar el transporte de correo
var transporter = _nodemailer["default"].createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  // Usa SSL/TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Función para enviar correos
var sendEmail = exports.sendEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(to, subject, text) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return transporter.sendMail({
            from: "\"Lab-App\" <".concat(process.env.EMAIL_USER, ">"),
            to: to,
            subject: subject,
            text: text
          });
        case 3:
          console.log("Correo enviado a ".concat(to));
          _context.next = 10;
          break;
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error('Error enviando correo:', _context.t0);
          throw new Error('Error al enviar el correo de notificación');
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return function sendEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();