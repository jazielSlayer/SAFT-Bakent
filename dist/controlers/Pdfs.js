"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdfEstudiante = void 0;
var _pdfkit = _interopRequireDefault(require("../libs/pdfkit"));
var pdfEstudiante = exports.pdfEstudiante = function pdfEstudiante(req, res) {
  var stream = res.writeHead(200, {
    "content-type": "application/pdf",
    "content-disposition": "attachment; filename=estudiante.pdf"
  });
  (0, _pdfkit["default"])(function (data) {
    return stream.write(data);
  }, function () {
    return stream.end();
  });
  res.send("Aquí van los PDFs de estudiante");
};