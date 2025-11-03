"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Pdfs = require("../controlers/Pdfs");
var router = (0, _express.Router)();
// ruta para pdfs de estudiante
router.get("/pdfEstudiante", _Pdfs.pdfEstudiante);
var _default = exports["default"] = router;