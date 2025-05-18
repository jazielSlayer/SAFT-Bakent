"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateJWT = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var authenticateJWT = exports.authenticateJWT = function authenticateJWT(req, res, next) {
  var authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({
    message: 'Se requiere token de acceso'
  });
  var token = authHeader.split(' ')[1];
  try {
    var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      message: 'Token inválido o expirado'
    });
  }
};