"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubirImagenes = exports.MultipleArchivos = void 0;
var fs = require('node:fs');
var SubirImagenes = exports.SubirImagenes = function SubirImagenes(req, res) {
  console.log(req.file);
  SaveImage(req.file);
  res.send('Subido puto');
};
var MultipleArchivos = exports.MultipleArchivos = function MultipleArchivos(req, res) {
  console.log(req.files);
  req.files.map(SaveImage);
  res.send('Archivos subidos exitosamente');
};
function SaveImage(file) {
  var newPath = "./uploads/".concat(file.originalname);
  fs.renameSync(file.path, newPath);
  return newPath;
}