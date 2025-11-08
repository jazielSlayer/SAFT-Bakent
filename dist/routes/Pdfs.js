"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Pdfs = require("../controlers/Pdfs");
var router = (0, _express.Router)();
router.get("/pdf/estudiante/:id", _Pdfs.pdfEstudiante);
router.get("/pdf/docente-guia/:id", _Pdfs.pdfDocenteGuia);
router.get("/pdf/docente-revisor/:id", _Pdfs.pdfDocenteRevisor);
router.get("/pdf/admin", _Pdfs.pdfAdmin);
var _default = exports["default"] = router;