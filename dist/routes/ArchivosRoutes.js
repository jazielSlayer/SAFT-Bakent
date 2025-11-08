"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Archivos = require("../controlers/Archivos");
var _multer = _interopRequireDefault(require("multer"));
var upload = (0, _multer["default"])({
  dest: 'uploads/'
});
var router = (0, _express.Router)();
router.post("/imagen/", upload.single('imagenPerfil'), _Archivos.SubirImagenes);
router.post("/multiple/archivos", upload.array('archivos', 20), _Archivos.MultipleArchivos);
var _default = exports["default"] = router;