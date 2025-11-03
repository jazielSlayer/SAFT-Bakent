"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _pdfkit = _interopRequireDefault(require("pdfkit"));
function buildPDF(dataCallback, endCallback) {
  var doc = new _pdfkit["default"]();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Generar contenido del PDF
  doc.text("Contenido del PDF");
  doc.image('./img/logousb.png', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
  });
  doc.end();
}
var _default = exports["default"] = buildPDF;