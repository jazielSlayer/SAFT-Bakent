"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOptions = require("./swaggerOptions");
var _user = _interopRequireDefault(require("./routes/user"));
var _laboratorio = _interopRequireDefault(require("./routes/laboratorio"));
var _prestamo = _interopRequireDefault(require("./routes/prestamo"));
var _categoria_equipo = _interopRequireDefault(require("./routes/categoria_equipo"));
var _equipo = _interopRequireDefault(require("./routes/equipo"));
var _reserva_laboratorio = _interopRequireDefault(require("./routes/reserva_laboratorio"));
var _mantenimiento = _interopRequireDefault(require("./routes/mantenimiento"));
var specs = (0, _swaggerJsdoc["default"])(_swaggerOptions.options);
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_user["default"]);
app.use(_laboratorio["default"]);
app.use(_prestamo["default"]);
app.use(_categoria_equipo["default"]);
app.use(_equipo["default"]);
app.use(_reserva_laboratorio["default"]);
app.use(_mantenimiento["default"]);
app.use('/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs));
var _default = exports["default"] = app;