"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pdfEstudiante = exports.pdfDocenteRevisor = exports.pdfDocenteGuia = exports.pdfAdmin = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _pdfkit = require("../libs/pdfkit");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// Función auxiliar para obtener datos del proyecto
function obtenerDatosProyecto(_x) {
  return _obtenerDatosProyecto.apply(this, arguments);
}
function _obtenerDatosProyecto() {
  _obtenerDatosProyecto = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(proyectoId) {
    var pool, _yield$pool$query29, _yield$pool$query30, rows, row;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _context5.next = 5;
          return pool.query("\n        SELECT \n            p.*,\n            e.numero_matricula,\n            e.id as estudiante_id,\n            per_e.nombres as est_nombres,\n            per_e.apellidopat as est_apellidopat,\n            per_e.apellidomat as est_apellidomat,\n            per_e.carnet as est_carnet,\n            dg.id as docente_guia_id,\n            dg.especialidad as dg_especialidad,\n            per_dg.nombres as dg_nombres,\n            per_dg.apellidopat as dg_apellidopat,\n            per_dg.apellidomat as dg_apellidomat,\n            dr.id as docente_revisor_id,\n            dr.especialidad as dr_especialidad,\n            per_dr.nombres as dr_nombres,\n            per_dr.apellidopat as dr_apellidopat,\n            per_dr.apellidomat as dr_apellidomat,\n            prog.nombre_programa,\n            prog.modalidad,\n            prog.facultad\n        FROM proyecto p\n        LEFT JOIN estudiante e ON p.id_estudiante = e.id\n        LEFT JOIN persona per_e ON e.per_id = per_e.id\n        LEFT JOIN docente dg ON p.id_docente_guia = dg.id\n        LEFT JOIN persona per_dg ON dg.per_id = per_dg.id\n        LEFT JOIN docente dr ON p.id_docente_revisor = dr.id\n        LEFT JOIN persona per_dr ON dr.per_id = per_dr.id\n        LEFT JOIN programa_academico prog ON e.id_programa_academico = prog.id\n        WHERE p.id = ?\n    ", [proyectoId]);
        case 5:
          _yield$pool$query29 = _context5.sent;
          _yield$pool$query30 = (0, _slicedToArray2["default"])(_yield$pool$query29, 1);
          rows = _yield$pool$query30[0];
          if (!(rows.length === 0)) {
            _context5.next = 10;
            break;
          }
          return _context5.abrupt("return", null);
        case 10:
          row = rows[0];
          return _context5.abrupt("return", _objectSpread(_objectSpread({}, row), {}, {
            estudiante: {
              id: row.estudiante_id,
              numero_matricula: row.numero_matricula,
              persona: {
                nombres: row.est_nombres,
                apellidopat: row.est_apellidopat,
                apellidomat: row.est_apellidomat,
                carnet: row.est_carnet
              }
            },
            docenteGuia: {
              id: row.docente_guia_id,
              especialidad: row.dg_especialidad,
              persona: {
                nombres: row.dg_nombres,
                apellidopat: row.dg_apellidopat,
                apellidomat: row.dg_apellidomat
              }
            },
            docenteRevisor: {
              id: row.docente_revisor_id,
              especialidad: row.dr_especialidad,
              persona: {
                nombres: row.dr_nombres,
                apellidopat: row.dr_apellidopat,
                apellidomat: row.dr_apellidomat
              }
            },
            programa: {
              nombre_programa: row.nombre_programa,
              modalidad: row.modalidad,
              facultad: row.facultad
            }
          }));
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _obtenerDatosProyecto.apply(this, arguments);
}
var pdfEstudiante = exports.pdfEstudiante = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var proyectoId, proyecto, stream;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          proyectoId = req.params.id || req.query.proyecto_id;
          if (proyectoId) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'ID de proyecto requerido'
          }));
        case 4:
          _context.next = 6;
          return obtenerDatosProyecto(proyectoId);
        case 6:
          proyecto = _context.sent;
          if (proyecto) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'Proyecto no encontrado'
          }));
        case 9:
          stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=reporte-estudiante-".concat(proyectoId, ".pdf")
          });
          (0, _pdfkit.buildPDFEstudiante)(proyecto, function (data) {
            return stream.write(data);
          }, function () {
            return stream.end();
          });
          _context.next = 17;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error('Error generando PDF estudiante:', _context.t0);
          res.status(500).json({
            message: 'Error al generar PDF',
            error: _context.t0.message
          });
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function pdfEstudiante(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var pdfDocenteGuia = exports.pdfDocenteGuia = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var proyectoId, proyecto, stream;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          proyectoId = req.params.id || req.query.proyecto_id;
          if (proyectoId) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'ID de proyecto requerido'
          }));
        case 4:
          _context2.next = 6;
          return obtenerDatosProyecto(proyectoId);
        case 6:
          proyecto = _context2.sent;
          if (proyecto) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Proyecto no encontrado'
          }));
        case 9:
          stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=reporte-guia-".concat(proyectoId, ".pdf")
          });
          (0, _pdfkit.buildPDFDocenteGuia)(proyecto, function (data) {
            return stream.write(data);
          }, function () {
            return stream.end();
          });
          _context2.next = 17;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error('Error generando PDF docente guía:', _context2.t0);
          res.status(500).json({
            message: 'Error al generar PDF',
            error: _context2.t0.message
          });
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function pdfDocenteGuia(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var pdfDocenteRevisor = exports.pdfDocenteRevisor = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var proyectoId, proyecto, stream;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          proyectoId = req.params.id || req.query.proyecto_id;
          if (proyectoId) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'ID de proyecto requerido'
          }));
        case 4:
          _context3.next = 6;
          return obtenerDatosProyecto(proyectoId);
        case 6:
          proyecto = _context3.sent;
          if (proyecto) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Proyecto no encontrado'
          }));
        case 9:
          stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=reporte-revisor-".concat(proyectoId, ".pdf")
          });
          (0, _pdfkit.buildPDFDocenteRevisor)(proyecto, function (data) {
            return stream.write(data);
          }, function () {
            return stream.end();
          });
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.error('Error generando PDF docente revisor:', _context3.t0);
          res.status(500).json({
            message: 'Error al generar PDF',
            error: _context3.t0.message
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function pdfDocenteRevisor(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var pdfAdmin = exports.pdfAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _yield$pool$query, _yield$pool$query2, stats, _yield$pool$query3, _yield$pool$query4, porPrograma, _yield$pool$query5, _yield$pool$query6, statsUsuarios, _yield$pool$query7, _yield$pool$query8, usuariosPorRol, _yield$pool$query9, _yield$pool$query10, statsPersonas, _yield$pool$query11, _yield$pool$query12, statsDocentes, _yield$pool$query13, _yield$pool$query14, docentesPorContrato, _yield$pool$query15, _yield$pool$query16, statsEstudiantes, _yield$pool$query17, _yield$pool$query18, estudiantesPorPrograma, _yield$pool$query19, _yield$pool$query20, statsMetodologias, _yield$pool$query21, _yield$pool$query22, statsModulos, _yield$pool$query23, _yield$pool$query24, modulosPorMetodologia, _yield$pool$query25, _yield$pool$query26, statsTalleres, _yield$pool$query27, _yield$pool$query28, talleresPorTipo, reporteGeneral, stream;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return (0, _database.connect)();
        case 3:
          pool = _context4.sent;
          _context4.next = 6;
          return pool.query("\n            SELECT \n                COUNT(*) as totalProyectos,\n                SUM(CASE WHEN calificacion >= 51 THEN 1 ELSE 0 END) as aprobados,\n                SUM(CASE WHEN calificacion IS NULL OR calificacion = '' THEN 1 ELSE 0 END) as pendientes,\n                SUM(CASE WHEN calificacion < 51 AND calificacion IS NOT NULL THEN 1 ELSE 0 END) as reprobados,\n                ROUND(AVG(CASE WHEN calificacion IS NOT NULL AND calificacion != '' THEN CAST(calificacion AS DECIMAL(10,2)) END), 2) as promedioCalificaciones\n            FROM proyecto\n        ");
        case 6:
          _yield$pool$query = _context4.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          stats = _yield$pool$query2[0];
          _context4.next = 11;
          return pool.query("\n            SELECT \n                prog.nombre_programa as programa,\n                COUNT(p.id) as total,\n                SUM(CASE WHEN p.calificacion >= 51 THEN 1 ELSE 0 END) as aprobados,\n                SUM(CASE WHEN p.calificacion IS NULL OR p.calificacion = '' THEN 1 ELSE 0 END) as pendientes\n            FROM proyecto p\n            JOIN estudiante e ON p.id_estudiante = e.id\n            JOIN programa_academico prog ON e.id_programa_academico = prog.id\n            GROUP BY prog.id, prog.nombre_programa\n            ORDER BY total DESC\n        ");
        case 11:
          _yield$pool$query3 = _context4.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          porPrograma = _yield$pool$query4[0];
          _context4.next = 16;
          return pool.query("\n            SELECT \n                COUNT(*) as totalUsuarios,\n                SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as usuariosActivos\n            FROM users\n        ");
        case 16:
          _yield$pool$query5 = _context4.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          statsUsuarios = _yield$pool$query6[0];
          _context4.next = 21;
          return pool.query("\n            SELECT \n                r.name as rol,\n                COUNT(u.id) as total,\n                SUM(CASE WHEN u.status = 1 THEN 1 ELSE 0 END) as activos\n            FROM users u\n            LEFT JOIN roles r ON u.id_roles = r.id\n            GROUP BY r.id, r.name\n            ORDER BY total DESC\n        ");
        case 21:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          usuariosPorRol = _yield$pool$query8[0];
          _context4.next = 26;
          return pool.query("\n            SELECT \n                COUNT(*) as totalPersonas,\n                SUM(CASE WHEN estado = 1 THEN 1 ELSE 0 END) as personasActivas\n            FROM persona\n        ");
        case 26:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          statsPersonas = _yield$pool$query10[0];
          _context4.next = 31;
          return pool.query("\n            SELECT \n                COUNT(*) as totalDocentes,\n                SUM(CASE WHEN estado = 1 THEN 1 ELSE 0 END) as docentesActivos\n            FROM docente\n        ");
        case 31:
          _yield$pool$query11 = _context4.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          statsDocentes = _yield$pool$query12[0];
          _context4.next = 36;
          return pool.query("\n            SELECT \n                tipo_contrato,\n                COUNT(*) as total\n            FROM docente\n            GROUP BY tipo_contrato\n            ORDER BY total DESC\n        ");
        case 36:
          _yield$pool$query13 = _context4.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          docentesPorContrato = _yield$pool$query14[0];
          _context4.next = 41;
          return pool.query("\n            SELECT \n                COUNT(*) as totalEstudiantes,\n                SUM(CASE WHEN estado = 1 THEN 1 ELSE 0 END) as estudiantesActivos\n            FROM estudiante\n        ");
        case 41:
          _yield$pool$query15 = _context4.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          statsEstudiantes = _yield$pool$query16[0];
          _context4.next = 46;
          return pool.query("\n            SELECT \n                prog.nombre_programa as programa,\n                COUNT(e.id) as total,\n                SUM(CASE WHEN e.estado = 1 THEN 1 ELSE 0 END) as activos\n            FROM estudiante e\n            JOIN programa_academico prog ON e.id_programa_academico = prog.id\n            GROUP BY prog.id, prog.nombre_programa\n            ORDER BY total DESC\n        ");
        case 46:
          _yield$pool$query17 = _context4.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          estudiantesPorPrograma = _yield$pool$query18[0];
          _context4.next = 51;
          return pool.query("\n            SELECT COUNT(*) as totalMetodologias\n            FROM metodologia\n        ");
        case 51:
          _yield$pool$query19 = _context4.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          statsMetodologias = _yield$pool$query20[0];
          _context4.next = 56;
          return pool.query("\n            SELECT COUNT(*) as totalModulos\n            FROM modulo\n        ");
        case 56:
          _yield$pool$query21 = _context4.sent;
          _yield$pool$query22 = (0, _slicedToArray2["default"])(_yield$pool$query21, 1);
          statsModulos = _yield$pool$query22[0];
          _context4.next = 61;
          return pool.query("\n            SELECT \n                met.nombre as metodologia,\n                COUNT(m.id) as total_modulos,\n                AVG(CAST(m.duracion AS DECIMAL(10,2))) as duracion_promedio\n            FROM modulo m\n            JOIN metodologia met ON m.id_metodologia = met.id\n            GROUP BY met.id, met.nombre\n            ORDER BY total_modulos DESC\n        ");
        case 61:
          _yield$pool$query23 = _context4.sent;
          _yield$pool$query24 = (0, _slicedToArray2["default"])(_yield$pool$query23, 1);
          modulosPorMetodologia = _yield$pool$query24[0];
          _context4.next = 66;
          return pool.query("\n            SELECT COUNT(*) as totalTalleres\n            FROM taller\n        ");
        case 66:
          _yield$pool$query25 = _context4.sent;
          _yield$pool$query26 = (0, _slicedToArray2["default"])(_yield$pool$query25, 1);
          statsTalleres = _yield$pool$query26[0];
          _context4.next = 71;
          return pool.query("\n            SELECT \n                tipo_taller as tipo,\n                COUNT(*) as total,\n                ROUND(AVG(CASE WHEN resultado IS NOT NULL AND resultado != '' THEN CAST(resultado AS DECIMAL(10,2)) END), 2) as resultado_promedio\n            FROM taller\n            GROUP BY tipo_taller\n            ORDER BY total DESC\n        ");
        case 71:
          _yield$pool$query27 = _context4.sent;
          _yield$pool$query28 = (0, _slicedToArray2["default"])(_yield$pool$query27, 1);
          talleresPorTipo = _yield$pool$query28[0];
          // ============== CONSTRUIR OBJETO DE REPORTE ==============
          reporteGeneral = {
            // Proyectos
            totalProyectos: stats[0].totalProyectos,
            aprobados: stats[0].aprobados,
            pendientes: stats[0].pendientes,
            reprobados: stats[0].reprobados,
            promedioCalificaciones: stats[0].promedioCalificaciones,
            porPrograma: porPrograma,
            // Usuarios
            totalUsuarios: statsUsuarios[0].totalUsuarios,
            usuariosActivos: statsUsuarios[0].usuariosActivos,
            usuariosPorRol: usuariosPorRol,
            // Personas
            totalPersonas: statsPersonas[0].totalPersonas,
            personasActivas: statsPersonas[0].personasActivas,
            // Docentes
            totalDocentes: statsDocentes[0].totalDocentes,
            docentesActivos: statsDocentes[0].docentesActivos,
            docentesPorContrato: docentesPorContrato,
            // Estudiantes
            totalEstudiantes: statsEstudiantes[0].totalEstudiantes,
            estudiantesActivos: statsEstudiantes[0].estudiantesActivos,
            estudiantesPorPrograma: estudiantesPorPrograma,
            // Metodologías y Módulos
            totalMetodologias: statsMetodologias[0].totalMetodologias,
            totalModulos: statsModulos[0].totalModulos,
            modulosPorMetodologia: modulosPorMetodologia,
            // Talleres
            totalTalleres: statsTalleres[0].totalTalleres,
            talleresPorTipo: talleresPorTipo
          };
          stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=reporte-admin-completo-".concat(new Date().toISOString().split('T')[0], ".pdf")
          });
          (0, _pdfkit.buildPDFAdmin)(reporteGeneral, function (data) {
            return stream.write(data);
          }, function () {
            return stream.end();
          });
          _context4.next = 83;
          break;
        case 79:
          _context4.prev = 79;
          _context4.t0 = _context4["catch"](0);
          console.error('Error generando PDF admin:', _context4.t0);
          res.status(500).json({
            message: 'Error al generar PDF',
            error: _context4.t0.message
          });
        case 83:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 79]]);
  }));
  return function pdfAdmin(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();