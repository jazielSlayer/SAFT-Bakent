"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProyecto = exports.getProyectos = exports.getProyectoEstudiante = exports.getProyectoDocente = exports.getProyecto = exports.deleteProyecto = exports.createProyecto = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getProyectos = exports.getProyectos = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, _yield$pool$query, _yield$pool$query2, rows;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return pool.query("\n            SELECT \n                p.id,\n                p.titulo,\n                p.linea_investigacion,\n                p.area_conocimiento,\n                p.calificacion,\n                p.fecha_entrega,\n                p.fecha_defensa,\n                p.resumen,\n                p.observacion,\n                p.created_at,\n                p.updated_at,\n                e.numero_matricula,\n                per_e.nombres AS estudiante_nombres,\n                per_e.apellidopat AS estudiante_apellidopat,\n                per_e.apellidomat AS estudiante_apellidomat,\n                d.numero_item AS guia_numero_item,\n                per_d.nombres AS guia_nombres,\n                per_d.apellidopat AS guia_apellidopat,\n                per_d.apellidomat AS guia_apellidomat,\n                d_revisor.numero_item AS revisor_numero_item,\n                per_d_revisor.nombres AS revisor_nombres,\n                per_d_revisor.apellidopat AS revisor_apellidopat,\n                per_d_revisor.apellidomat AS revisor_apellidomat\n            FROM proyecto p\n            LEFT JOIN estudiante e ON p.id_estudiante = e.id\n            LEFT JOIN persona per_e ON e.per_id = per_e.id\n            LEFT JOIN docente d ON p.id_docente_guia = d.id\n            LEFT JOIN persona per_d ON d.per_id = per_d.id\n            LEFT JOIN docente d_revisor ON p.id_docente_revisor = d_revisor.id\n            LEFT JOIN persona per_d_revisor ON d_revisor.per_id = per_d_revisor.id\n        ");
        case 6:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          rows = _yield$pool$query2[0];
          if (!(rows.length === 0)) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            message: 'No se encontraron proyectos'
          }));
        case 11:
          res.json(rows);
          _context.next = 18;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          console.error('Error fetching proyectos:', _context.t0);
          res.status(500).json({
            message: "Error al obtener proyectos: ".concat(_context.t0.message)
          });
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 14]]);
  }));
  return function getProyectos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getProyectoEstudiante = exports.getProyectoEstudiante = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pool, id_estudiante, _yield$pool$query3, _yield$pool$query4, rows;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context2.sent;
          id_estudiante = req.params.id_estudiante;
          _context2.prev = 4;
          _context2.next = 7;
          return pool.query("\n            SELECT \n                p.*,\n                e.numero_matricula,\n                per_e.nombres AS estudiante_nombres,\n                per_e.apellidopat AS estudiante_apellidopat,\n                per_e.apellidomat AS estudiante_apellidomat\n            FROM proyecto p\n            LEFT JOIN estudiante e ON p.id_estudiante = e.id\n            LEFT JOIN persona per_e ON e.per_id = per_e.id\n            WHERE p.id_estudiante = ?\n            ORDER BY p.fecha_entrega DESC\n        ", [id_estudiante]);
        case 7:
          _yield$pool$query3 = _context2.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          rows = _yield$pool$query4[0];
          res.json(rows);
          _context2.next = 17;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](4);
          console.error('Error fetching proyectos del estudiante:', _context2.t0);
          res.status(500).json({
            message: 'Error al obtener proyectos del estudiante'
          });
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 13]]);
  }));
  return function getProyectoEstudiante(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getProyectoDocente = exports.getProyectoDocente = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, id_docente, _yield$pool$query5, _yield$pool$query6, rows;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context3.sent;
          id_docente = req.params.id_docente;
          _context3.prev = 4;
          _context3.next = 7;
          return pool.query("\n            SELECT \n                p.*,\n                e.numero_matricula,\n                per_e.nombres AS estudiante_nombres,\n                per_e.apellidopat AS estudiante_apellidopat,\n                per_e.apellidomat AS estudiante_apellidomat\n            FROM proyecto p\n            LEFT JOIN estudiante e ON p.id_estudiante = e.id\n            LEFT JOIN persona per_e ON e.per_id = per_e.id\n            WHERE p.id_docente_guia = ? OR p.id_docente_revisor = ?\n            ORDER BY p.fecha_entrega DESC\n        ", [id_docente, id_docente]);
        case 7:
          _yield$pool$query5 = _context3.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          rows = _yield$pool$query6[0];
          res.json(rows);
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](4);
          console.error('Error fetching proyectos del docente:', _context3.t0);
          res.status(500).json({
            message: 'Error al obtener proyectos del docente'
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 13]]);
  }));
  return function getProyectoDocente(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getProyecto = exports.getProyecto = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, _req$query, titulo, area_conocimiento, estudiante, _req$query$page, page, _req$query$limit, limit, query, conditions, params, offset, _yield$pool$query7, _yield$pool$query8, rows, _yield$pool$query9, _yield$pool$query10, countResult, totalItems, totalPages;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context4.sent;
          _req$query = req.query, titulo = _req$query.titulo, area_conocimiento = _req$query.area_conocimiento, estudiante = _req$query.estudiante, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 10 : _req$query$limit;
          _context4.prev = 4;
          query = "\n            SELECT \n                p.id,\n                p.titulo,\n                p.linea_investigacion,\n                p.area_conocimiento,\n                p.calificacion,\n                p.fecha_entrega,\n                p.fecha_defensa,\n                p.resumen,\n                p.observacion,\n                p.created_at,\n                p.updated_at,\n                e.numero_matricula,\n                per_e.nombres AS estudiante_nombres,\n                per_e.apellidopat AS estudiante_apellidopat,\n                per_e.apellidomat AS estudiante_apellidomat,\n                d.numero_item AS guia_numero_item,\n                per_d.nombres AS guia_nombres,\n                per_d.apellidopat AS guia_apellidopat,\n                per_d.apellidomat AS guia_apellidomat,\n                d_revisor.numero_item AS revisor_numero_item,\n                per_d_revisor.nombres AS revisor_nombres,\n                per_d_revisor.apellidopat AS revisor_apellidopat,\n                per_d_revisor.apellidomat AS revisor_apellidomat\n            FROM proyecto p\n            LEFT JOIN estudiante e ON p.id_estudiante = e.id\n            LEFT JOIN persona per_e ON e.per_id = per_e.id\n            LEFT JOIN docente d ON p.id_docente_guia = d.id\n            LEFT JOIN persona per_d ON d.per_id = per_d.id\n            LEFT JOIN docente d_revisor ON p.id_docente_revisor = d_revisor.id\n            LEFT JOIN persona per_d_revisor ON d_revisor.per_id = per_d_revisor.id\n        ";
          conditions = [];
          params = [];
          if (titulo) {
            conditions.push('p.titulo LIKE ?');
            params.push("%".concat(titulo, "%"));
          }
          if (area_conocimiento) {
            conditions.push('p.area_conocimiento LIKE ?');
            params.push("%".concat(area_conocimiento, "%"));
          }
          if (estudiante) {
            conditions.push('(per_e.nombres LIKE ? OR per_e.apellidopat LIKE ? OR per_e.apellidomat LIKE ?)');
            params.push("%".concat(estudiante, "%"), "%".concat(estudiante, "%"), "%".concat(estudiante, "%"));
          }
          if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
          }
          query += ' ORDER BY p.fecha_entrega DESC';
          offset = (page - 1) * limit;
          query += ' LIMIT ? OFFSET ?';
          params.push(parseInt(limit), parseInt(offset));
          _context4.next = 18;
          return pool.query(query, params);
        case 18:
          _yield$pool$query7 = _context4.sent;
          _yield$pool$query8 = (0, _slicedToArray2["default"])(_yield$pool$query7, 1);
          rows = _yield$pool$query8[0];
          _context4.next = 23;
          return pool.query("SELECT COUNT(*) as total \n             FROM proyecto p\n             ".concat(conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''), params.slice(0, params.length - 2));
        case 23:
          _yield$pool$query9 = _context4.sent;
          _yield$pool$query10 = (0, _slicedToArray2["default"])(_yield$pool$query9, 1);
          countResult = _yield$pool$query10[0];
          totalItems = countResult[0].total;
          totalPages = Math.ceil(totalItems / limit);
          if (!(rows.length === 0)) {
            _context4.next = 30;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            message: 'No se encontraron proyectos',
            data: [],
            pagination: {
              page: parseInt(page),
              limit: parseInt(limit),
              totalItems: totalItems,
              totalPages: totalPages
            }
          }));
        case 30:
          res.json({
            data: rows,
            pagination: {
              page: parseInt(page),
              limit: parseInt(limit),
              totalItems: totalItems,
              totalPages: totalPages
            }
          });
          _context4.next = 41;
          break;
        case 33:
          _context4.prev = 33;
          _context4.t0 = _context4["catch"](4);
          console.error('Error fetching proyectos:', _context4.t0);
          if (!(_context4.t0.code === 'ER_BAD_FIELD_ERROR')) {
            _context4.next = 38;
            break;
          }
          return _context4.abrupt("return", res.status(500).json({
            message: 'Error en la estructura de la consulta SQL: ' + _context4.t0.message
          }));
        case 38:
          if (!(_context4.t0.code === 'ER_NO_SUCH_TABLE')) {
            _context4.next = 40;
            break;
          }
          return _context4.abrupt("return", res.status(500).json({
            message: 'Una de las tablas no existe en la base de datos: ' + _context4.t0.message
          }));
        case 40:
          res.status(500).json({
            message: "Error al obtener proyectos: ".concat(_context4.t0.message)
          });
        case 41:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 33]]);
  }));
  return function getProyecto(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var createProyecto = exports.createProyecto = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, _req$body, id_estudiante, id_docente_guia, id_docente_revisor, titulo, linea_investigacion, area_conocimiento, fecha_entrega, _req$body$fecha_defen, fecha_defensa, _req$body$resumen, resumen, _req$body$observacion, observacion, _req$body$calificacio, calificacion, _yield$pool$query11, _yield$pool$query12, estudianteCheck, _yield$pool$query13, _yield$pool$query14, docenteGuiaCheck, _yield$pool$query15, _yield$pool$query16, docenteRevisorCheck, _yield$pool$query17, _yield$pool$query18, results;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context5.sent;
          _req$body = req.body, id_estudiante = _req$body.id_estudiante, id_docente_guia = _req$body.id_docente_guia, id_docente_revisor = _req$body.id_docente_revisor, titulo = _req$body.titulo, linea_investigacion = _req$body.linea_investigacion, area_conocimiento = _req$body.area_conocimiento, fecha_entrega = _req$body.fecha_entrega, _req$body$fecha_defen = _req$body.fecha_defensa, fecha_defensa = _req$body$fecha_defen === void 0 ? null : _req$body$fecha_defen, _req$body$resumen = _req$body.resumen, resumen = _req$body$resumen === void 0 ? null : _req$body$resumen, _req$body$observacion = _req$body.observacion, observacion = _req$body$observacion === void 0 ? null : _req$body$observacion, _req$body$calificacio = _req$body.calificacion, calificacion = _req$body$calificacio === void 0 ? null : _req$body$calificacio;
          _context5.prev = 4;
          if (!(!id_estudiante || !id_docente_guia || !id_docente_revisor || !titulo || !linea_investigacion || !area_conocimiento || !fecha_entrega)) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Faltan campos requeridos: id_estudiante, id_docente_guia, id_docente_revisor, titulo, linea_investigacion, area_conocimiento, fecha_entrega'
          }));
        case 7:
          if (/^\d{4}-\d{2}-\d{2}$/.test(fecha_entrega)) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Formato de fecha_entrega inválido (use YYYY-MM-DD)'
          }));
        case 9:
          if (!(fecha_defensa && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_defensa))) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Formato de fecha_defensa inválido (use YYYY-MM-DD)'
          }));
        case 11:
          _context5.next = 13;
          return pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        case 13:
          _yield$pool$query11 = _context5.sent;
          _yield$pool$query12 = (0, _slicedToArray2["default"])(_yield$pool$query11, 1);
          estudianteCheck = _yield$pool$query12[0];
          if (!(estudianteCheck.length === 0)) {
            _context5.next = 18;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Estudiante no encontrado'
          }));
        case 18:
          _context5.next = 20;
          return pool.query('SELECT id FROM docente WHERE id = ?', [id_docente_guia]);
        case 20:
          _yield$pool$query13 = _context5.sent;
          _yield$pool$query14 = (0, _slicedToArray2["default"])(_yield$pool$query13, 1);
          docenteGuiaCheck = _yield$pool$query14[0];
          if (!(docenteGuiaCheck.length === 0)) {
            _context5.next = 25;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Docente guía no encontrado'
          }));
        case 25:
          _context5.next = 27;
          return pool.query('SELECT id FROM docente WHERE id = ?', [id_docente_revisor]);
        case 27:
          _yield$pool$query15 = _context5.sent;
          _yield$pool$query16 = (0, _slicedToArray2["default"])(_yield$pool$query15, 1);
          docenteRevisorCheck = _yield$pool$query16[0];
          if (!(docenteRevisorCheck.length === 0)) {
            _context5.next = 32;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Docente revisor no encontrado'
          }));
        case 32:
          if (!(calificacion !== null && (isNaN(calificacion) || calificacion < 0 || calificacion > 100))) {
            _context5.next = 34;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Calificación debe ser un número entre 0 y 100'
          }));
        case 34:
          _context5.next = 36;
          return pool.query("INSERT INTO proyecto (\n                id_estudiante, \n                id_docente_guia, \n                id_docente_revisor, \n                titulo, \n                linea_investigacion, \n                area_conocimiento, \n                calificacion, \n                fecha_entrega, \n                fecha_defensa, \n                resumen, \n                observacion\n            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id_estudiante, id_docente_guia, id_docente_revisor, titulo, linea_investigacion, area_conocimiento, calificacion, fecha_entrega, fecha_defensa, resumen, observacion]);
        case 36:
          _yield$pool$query17 = _context5.sent;
          _yield$pool$query18 = (0, _slicedToArray2["default"])(_yield$pool$query17, 1);
          results = _yield$pool$query18[0];
          res.json({
            id: results.insertId,
            id_estudiante: id_estudiante,
            id_docente_guia: id_docente_guia,
            id_docente_revisor: id_docente_revisor,
            titulo: titulo,
            linea_investigacion: linea_investigacion,
            area_conocimiento: area_conocimiento,
            calificacion: calificacion,
            fecha_entrega: fecha_entrega,
            fecha_defensa: fecha_defensa,
            resumen: resumen,
            observacion: observacion
          });
          _context5.next = 50;
          break;
        case 42:
          _context5.prev = 42;
          _context5.t0 = _context5["catch"](4);
          console.error('Error creating proyecto:', _context5.t0);
          if (!(_context5.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context5.next = 47;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: estudiante o docente no existe'
          }));
        case 47:
          if (!(_context5.t0.code === 'ER_DUP_ENTRY')) {
            _context5.next = 49;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Entrada duplicada: el proyecto ya existe'
          }));
        case 49:
          res.status(500).json({
            message: "Error al crear proyecto: ".concat(_context5.t0.message)
          });
        case 50:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[4, 42]]);
  }));
  return function createProyecto(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var updateProyecto = exports.updateProyecto = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var pool, _req$body2, id_estudiante, id_docente_guia, id_docente_revisor, titulo, linea_investigacion, area_conocimiento, calificacion, fecha_entrega, fecha_defensa, resumen, observacion, id, _yield$pool$query19, _yield$pool$query20, proyectoCheck, _yield$pool$query21, _yield$pool$query22, estudianteCheck, _yield$pool$query23, _yield$pool$query24, docenteGuiaCheck, _yield$pool$query25, _yield$pool$query26, docenteRevisorCheck, fields, values, _yield$pool$query27, _yield$pool$query28, results, _yield$pool$query29, _yield$pool$query30, updatedProyecto;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context6.sent;
          _req$body2 = req.body, id_estudiante = _req$body2.id_estudiante, id_docente_guia = _req$body2.id_docente_guia, id_docente_revisor = _req$body2.id_docente_revisor, titulo = _req$body2.titulo, linea_investigacion = _req$body2.linea_investigacion, area_conocimiento = _req$body2.area_conocimiento, calificacion = _req$body2.calificacion, fecha_entrega = _req$body2.fecha_entrega, fecha_defensa = _req$body2.fecha_defensa, resumen = _req$body2.resumen, observacion = _req$body2.observacion;
          id = parseInt(req.params.id);
          _context6.prev = 5;
          if (!(isNaN(id) || id <= 0)) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'ID del proyecto inválido'
          }));
        case 8:
          _context6.next = 10;
          return pool.query('SELECT id FROM proyecto WHERE id = ?', [id]);
        case 10:
          _yield$pool$query19 = _context6.sent;
          _yield$pool$query20 = (0, _slicedToArray2["default"])(_yield$pool$query19, 1);
          proyectoCheck = _yield$pool$query20[0];
          if (!(proyectoCheck.length === 0)) {
            _context6.next = 15;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Proyecto no encontrado'
          }));
        case 15:
          if (!(!id_estudiante && !id_docente_guia && !id_docente_revisor && !titulo && !linea_investigacion && !area_conocimiento && calificacion === undefined && !fecha_entrega && !fecha_defensa && !resumen && !observacion)) {
            _context6.next = 17;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Se debe proporcionar al menos un campo para actualizar'
          }));
        case 17:
          if (!id_estudiante) {
            _context6.next = 25;
            break;
          }
          _context6.next = 20;
          return pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        case 20:
          _yield$pool$query21 = _context6.sent;
          _yield$pool$query22 = (0, _slicedToArray2["default"])(_yield$pool$query21, 1);
          estudianteCheck = _yield$pool$query22[0];
          if (!(estudianteCheck.length === 0)) {
            _context6.next = 25;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Estudiante no encontrado'
          }));
        case 25:
          if (!id_docente_guia) {
            _context6.next = 33;
            break;
          }
          _context6.next = 28;
          return pool.query('SELECT id FROM docente WHERE id = ?', [id_docente_guia]);
        case 28:
          _yield$pool$query23 = _context6.sent;
          _yield$pool$query24 = (0, _slicedToArray2["default"])(_yield$pool$query23, 1);
          docenteGuiaCheck = _yield$pool$query24[0];
          if (!(docenteGuiaCheck.length === 0)) {
            _context6.next = 33;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Docente guía no encontrado'
          }));
        case 33:
          if (!id_docente_revisor) {
            _context6.next = 41;
            break;
          }
          _context6.next = 36;
          return pool.query('SELECT id FROM docente WHERE id = ?', [id_docente_revisor]);
        case 36:
          _yield$pool$query25 = _context6.sent;
          _yield$pool$query26 = (0, _slicedToArray2["default"])(_yield$pool$query25, 1);
          docenteRevisorCheck = _yield$pool$query26[0];
          if (!(docenteRevisorCheck.length === 0)) {
            _context6.next = 41;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Docente revisor no encontrado'
          }));
        case 41:
          if (!(fecha_entrega && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_entrega))) {
            _context6.next = 43;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Formato de fecha_entrega inválido (use YYYY-MM-DD)'
          }));
        case 43:
          if (!(fecha_defensa && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_defensa))) {
            _context6.next = 45;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Formato de fecha_defensa inválido (use YYYY-MM-DD)'
          }));
        case 45:
          if (!(calificacion !== undefined && (isNaN(calificacion) || calificacion < 0 || calificacion > 100))) {
            _context6.next = 47;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Calificación debe ser un número entre 0 y 100'
          }));
        case 47:
          fields = [];
          values = [];
          if (id_estudiante) {
            fields.push('id_estudiante = ?');
            values.push(id_estudiante);
          }
          if (id_docente_guia) {
            fields.push('id_docente_guia = ?');
            values.push(id_docente_guia);
          }
          if (id_docente_revisor) {
            fields.push('id_docente_revisor = ?');
            values.push(id_docente_revisor);
          }
          if (titulo) {
            fields.push('titulo = ?');
            values.push(titulo);
          }
          if (linea_investigacion) {
            fields.push('linea_investigacion = ?');
            values.push(linea_investigacion);
          }
          if (area_conocimiento) {
            fields.push('area_conocimiento = ?');
            values.push(area_conocimiento);
          }
          if (calificacion !== undefined) {
            fields.push('calificacion = ?');
            values.push(calificacion);
          }
          if (fecha_entrega) {
            fields.push('fecha_entrega = ?');
            values.push(fecha_entrega);
          }
          if (fecha_defensa !== undefined) {
            fields.push('fecha_defensa = ?');
            values.push(fecha_defensa);
          }
          if (resumen !== undefined) {
            fields.push('resumen = ?');
            values.push(resumen);
          }
          if (observacion !== undefined) {
            fields.push('observacion = ?');
            values.push(observacion);
          }
          fields.push('updated_at = NOW()');
          _context6.next = 63;
          return pool.query("UPDATE proyecto SET ".concat(fields.join(', '), " WHERE id = ?"), [].concat(values, [id]));
        case 63:
          _yield$pool$query27 = _context6.sent;
          _yield$pool$query28 = (0, _slicedToArray2["default"])(_yield$pool$query27, 1);
          results = _yield$pool$query28[0];
          if (!(results.affectedRows === 0)) {
            _context6.next = 68;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Proyecto no encontrado o ningún cambio realizado'
          }));
        case 68:
          _context6.next = 70;
          return pool.query("SELECT \n                p.id,\n                p.titulo,\n                p.linea_investigacion,\n                p.area_conocimiento,\n                p.calificacion,\n                p.fecha_entrega,\n                p.fecha_defensa,\n                p.resumen,\n                p.observacion,\n                p.created_at,\n                p.updated_at,\n                e.numero_matricula,\n                per_e.nombres AS estudiante_nombres,\n                per_e.apellidopat AS estudiante_apellidopat,\n                per_e.apellidomat AS estudiante_apellidomat,\n                d.numero_item AS guia_numero_item,\n                per_d.nombres AS guia_nombres,\n                per_d.apellidopat AS guia_apellidopat,\n                per_d.apellidomat AS guia_apellidomat,\n                d_revisor.numero_item AS revisor_numero_item,\n                per_d_revisor.nombres AS revisor_nombres,\n                per_d_revisor.apellidopat AS revisor_apellidopat,\n                per_d_revisor.apellidomat AS revisor_apellidomat\n             FROM proyecto p\n             LEFT JOIN estudiante e ON p.id_estudiante = e.id\n             LEFT JOIN persona per_e ON e.per_id = per_e.id\n             LEFT JOIN docente d ON p.id_docente_guia = d.id\n             LEFT JOIN persona per_d ON d.per_id = per_d.id\n             LEFT JOIN docente d_revisor ON p.id_docente_revisor = d_revisor.id\n             LEFT JOIN persona per_d_revisor ON d_revisor.per_id = per_d_revisor.id\n             WHERE p.id = ?", [id]);
        case 70:
          _yield$pool$query29 = _context6.sent;
          _yield$pool$query30 = (0, _slicedToArray2["default"])(_yield$pool$query29, 1);
          updatedProyecto = _yield$pool$query30[0];
          res.json({
            message: 'Proyecto actualizado',
            data: updatedProyecto[0]
          });
          _context6.next = 84;
          break;
        case 76:
          _context6.prev = 76;
          _context6.t0 = _context6["catch"](5);
          console.error('Error updating proyecto:', _context6.t0);
          if (!(_context6.t0.code === 'ER_NO_REFERENCED_ROW_2')) {
            _context6.next = 81;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Clave foránea inválida: estudiante o docente no existe'
          }));
        case 81:
          if (!(_context6.t0.code === 'ER_DUP_ENTRY')) {
            _context6.next = 83;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Entrada duplicada en el proyecto'
          }));
        case 83:
          res.status(500).json({
            message: "Error al actualizar proyecto: ".concat(_context6.t0.message)
          });
        case 84:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[5, 76]]);
  }));
  return function updateProyecto(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var deleteProyecto = exports.deleteProyecto = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pool, _yield$pool$query31, _yield$pool$query32, results;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _database.connect)();
        case 2:
          pool = _context7.sent;
          _context7.prev = 3;
          _context7.next = 6;
          return pool.query("DELETE FROM proyecto WHERE id = ?", [req.params.id]);
        case 6:
          _yield$pool$query31 = _context7.sent;
          _yield$pool$query32 = (0, _slicedToArray2["default"])(_yield$pool$query31, 1);
          results = _yield$pool$query32[0];
          if (!(results.affectedRows === 0)) {
            _context7.next = 11;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Proyecto no encontrado'
          }));
        case 11:
          res.json({
            message: 'Proyecto eliminado'
          });
          _context7.next = 18;
          break;
        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](3);
          console.error('Error deleting proyecto:', _context7.t0);
          res.status(500).json({
            message: 'Error al eliminar proyecto'
          });
        case 18:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 14]]);
  }));
  return function deleteProyecto(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();