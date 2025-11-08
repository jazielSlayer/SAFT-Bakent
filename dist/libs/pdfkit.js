"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPDFAdmin = buildPDFAdmin;
exports.buildPDFDocenteGuia = buildPDFDocenteGuia;
exports.buildPDFDocenteRevisor = buildPDFDocenteRevisor;
exports.buildPDFEstudiante = buildPDFEstudiante;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _pdfkitTable = _interopRequireDefault(require("pdfkit-table"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// === FUNCIÓN: REPORTE PARA ESTUDIANTE ===
function buildPDFEstudiante(proyecto, dataCallback, endCallback) {
  var doc = new _pdfkitTable["default"]({
    margin: 50,
    size: 'A4'
  });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  try {
    var estudiante = proyecto.estudiante,
      docenteGuia = proyecto.docenteGuia,
      docenteRevisor = proyecto.docenteRevisor,
      programa = proyecto.programa;

    // Encabezado
    doc.image('./src/img/logousb.png', 50, 30, {
      width: 100
    });
    doc.fontSize(14).text('Universidad Salesiana de Bolivia', 160, 40, {
      align: 'center'
    });
    doc.fontSize(12).text('Reporte de Titulación - Estudiante', 0, 60, {
      align: 'center'
    });
    doc.fontSize(10).text('Código: T-0045', 0, 75, {
      align: 'center'
    });
    doc.moveDown(2);

    // Datos del estudiante
    doc.fontSize(11).text("Nombre del estudiante: ".concat(estudiante.persona.nombres, " ").concat(estudiante.persona.apellidopat, " ").concat(estudiante.persona.apellidomat || ''));
    doc.text("C.I.: ".concat(estudiante.persona.carnet));
    doc.text("R.U.: ".concat(estudiante.numero_matricula));
    doc.text("Programa: ".concat(programa.nombre_programa));
    doc.text("Modalidad: ".concat(programa.modalidad));
    doc.text("Modalidad de Titulaci\xF3n: Proyecto de Grado");
    doc.text("Fecha de defensa: ".concat(proyecto.fecha_defensa ? new Date(proyecto.fecha_defensa).toLocaleDateString('es-ES') : 'Pendiente'));
    doc.text("Fecha de emisi\xF3n: ".concat(new Date().toLocaleDateString('es-ES')));
    doc.moveDown(2);

    // Tabla de proyecto (FORMATO CORRECTO)
    var table = {
      title: "Información del Proyecto",
      headers: [{
        label: "N°",
        property: 'numero',
        width: 30,
        align: 'center'
      }, {
        label: "Título del Proyecto",
        property: 'titulo',
        width: 150
      }, {
        label: "Área",
        property: 'area',
        width: 70
      }, {
        label: "Tutor",
        property: 'tutor',
        width: 80
      }, {
        label: "Tribunal",
        property: 'tribunal',
        width: 80
      }, {
        label: "Calificación",
        property: 'calificacion',
        width: 60,
        align: 'center'
      }, {
        label: "Observaciones",
        property: 'observaciones',
        width: 80
      }],
      datas: [{
        numero: "1",
        titulo: proyecto.titulo,
        area: proyecto.area_conocimiento,
        tutor: "".concat(docenteGuia.persona.nombres, " ").concat(docenteGuia.persona.apellidopat),
        tribunal: "".concat(docenteRevisor.persona.nombres, " ").concat(docenteRevisor.persona.apellidopat),
        calificacion: proyecto.calificacion || 'Pendiente',
        observaciones: proyecto.observacion || 'Sin observaciones'
      }]
    };
    doc.table(table, {
      prepareHeader: function prepareHeader() {
        return doc.font('Helvetica-Bold').fontSize(10);
      },
      prepareRow: function prepareRow() {
        return doc.font('Helvetica').fontSize(9);
      }
    });
    doc.moveDown(3);

    // Firmas
    doc.fontSize(10).text('_________________________', 80, doc.y);
    doc.text('Firma del Estudiante', 80, doc.y + 15);
    doc.text('_________________________', 350, doc.y - 15);
    doc.text('Firma del Tutor', 350, doc.y);
  } catch (error) {
    console.error('Error generando PDF Estudiante:', error);
    doc.text('Error al generar el documento', 50, 200);
  }
  doc.end();
}

// === FUNCIÓN: REPORTE PARA DOCENTE GUÍA ===
function buildPDFDocenteGuia(proyecto, dataCallback, endCallback) {
  var doc = new _pdfkitTable["default"]({
    margin: 50,
    size: 'A4'
  });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  try {
    var estudiante = proyecto.estudiante,
      docenteGuia = proyecto.docenteGuia,
      programa = proyecto.programa;
    doc.image('./src/img/logousb.png', 50, 30, {
      width: 100
    });
    doc.fontSize(14).text('Universidad Salesiana de Bolivia', 160, 40, {
      align: 'center'
    });
    doc.fontSize(12).text('Reporte de Seguimiento - Docente Guía', 0, 60, {
      align: 'center'
    });
    doc.fontSize(10).text('Código: DG-001', 0, 75, {
      align: 'center'
    });
    doc.moveDown(2);
    doc.fontSize(11).text("Docente Gu\xEDa: ".concat(docenteGuia.persona.nombres, " ").concat(docenteGuia.persona.apellidopat, " ").concat(docenteGuia.persona.apellidomat || ''));
    doc.text("Especialidad: ".concat(docenteGuia.especialidad));
    doc.text("Estudiante: ".concat(estudiante.persona.nombres, " ").concat(estudiante.persona.apellidopat));
    doc.text("Matr\xEDcula: ".concat(estudiante.numero_matricula));
    doc.text("Programa: ".concat(programa.nombre_programa));
    doc.text("T\xEDtulo del Proyecto: ".concat(proyecto.titulo));
    doc.moveDown(1.5);
    var table = {
      title: "Seguimiento de Actividades",
      headers: [{
        label: "Fecha",
        property: 'fecha',
        width: 80
      }, {
        label: "Actividad Realizada",
        property: 'actividad',
        width: 200
      }, {
        label: "Avance (%)",
        property: 'avance',
        width: 70,
        align: 'center'
      }, {
        label: "Estado",
        property: 'estado',
        width: 100
      }],
      datas: [{
        fecha: new Date().toLocaleDateString('es-ES'),
        actividad: "Revisión de propuesta",
        avance: "30%",
        estado: "En proceso"
      }, {
        fecha: new Date().toLocaleDateString('es-ES'),
        actividad: "Entrega de capítulo 1",
        avance: "60%",
        estado: "Pendiente revisión"
      }]
    };
    doc.table(table, {
      prepareHeader: function prepareHeader() {
        return doc.font('Helvetica-Bold').fontSize(10);
      },
      prepareRow: function prepareRow() {
        return doc.font('Helvetica').fontSize(9);
      }
    });
    doc.moveDown(2);
    doc.fontSize(11).text('Observaciones del Docente Guía:');
    doc.fontSize(10).text(proyecto.observacion || 'Sin observaciones adicionales.');
    doc.moveDown(4);
    doc.text('_________________________', 200, doc.y);
    doc.text('Firma del Docente Guía', 200, doc.y + 15);
  } catch (error) {
    console.error('Error generando PDF Docente Guía:', error);
    doc.text('Error al generar el documento', 50, 200);
  }
  doc.end();
}

// === FUNCIÓN: REPORTE PARA DOCENTE REVISOR ===
function buildPDFDocenteRevisor(proyecto, dataCallback, endCallback) {
  var doc = new _pdfkitTable["default"]({
    margin: 50,
    size: 'A4'
  });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  try {
    var estudiante = proyecto.estudiante,
      docenteRevisor = proyecto.docenteRevisor,
      programa = proyecto.programa;
    doc.image('./src/img/logousb.png', 50, 30, {
      width: 100
    });
    doc.fontSize(14).text('Universidad Salesiana de Bolivia', 160, 40, {
      align: 'center'
    });
    doc.fontSize(12).text('Informe de Revisión - Tribunal', 0, 60, {
      align: 'center'
    });
    doc.fontSize(10).text('Código: TR-002', 0, 75, {
      align: 'center'
    });
    doc.moveDown(2);
    doc.fontSize(11).text("Docente Revisor: ".concat(docenteRevisor.persona.nombres, " ").concat(docenteRevisor.persona.apellidopat));
    doc.text("Estudiante: ".concat(estudiante.persona.nombres, " ").concat(estudiante.persona.apellidopat));
    doc.text("T\xEDtulo del Proyecto: ".concat(proyecto.titulo));
    doc.text("Fecha de Revisi\xF3n: ".concat(new Date().toLocaleDateString('es-ES')));
    doc.moveDown(1.5);
    var table = {
      title: "Evaluación del Proyecto",
      headers: [{
        label: "Criterio",
        property: 'criterio',
        width: 200
      }, {
        label: "Puntuación",
        property: 'puntuacion',
        width: 100,
        align: 'center'
      }, {
        label: "Comentario",
        property: 'comentario',
        width: 150
      }],
      datas: [{
        criterio: "Metodología",
        puntuacion: "18/20",
        comentario: "Buena estructura, falta detalle en cronograma"
      }, {
        criterio: "Originalidad",
        puntuacion: "15/20",
        comentario: "Tema relevante, pero referencias desactualizadas"
      }, {
        criterio: "Redacción",
        puntuacion: "16/20",
        comentario: "Claro, pero con errores ortográficos"
      }, {
        criterio: "Total",
        puntuacion: proyecto.calificacion || 'Pendiente',
        comentario: ""
      }]
    };
    doc.table(table, {
      prepareHeader: function prepareHeader() {
        return doc.font('Helvetica-Bold').fontSize(10);
      },
      prepareRow: function prepareRow() {
        return doc.font('Helvetica').fontSize(9);
      }
    });
    doc.moveDown(2);
    doc.fontSize(11).text('Recomendación Final:');
    doc.fontSize(10).text(proyecto.observacion || 'Aprobado con observaciones menores.');
    doc.moveDown(4);
    doc.text('_________________________', 200, doc.y);
    doc.text('Firma del Revisor', 200, doc.y + 15);
  } catch (error) {
    console.error('Error generando PDF Docente Revisor:', error);
    doc.text('Error al generar el documento', 50, 200);
  }
  doc.end();
}

// === FUNCIÓN: REPORTE PARA ADMINISTRADOR (CORREGIDA) ===

function buildPDFAdmin(reporteGeneral, dataCallback, endCallback) {
  var doc = new _pdfkitTable["default"]({
    margin: 50,
    size: 'A4',
    bufferPages: true
  });
  doc.on('data', dataCallback);
  doc.on('end', endCallback);
  try {
    var _reporteGeneral$total = reporteGeneral.totalProyectos,
      totalProyectos = _reporteGeneral$total === void 0 ? 0 : _reporteGeneral$total,
      _reporteGeneral$aprob = reporteGeneral.aprobados,
      aprobados = _reporteGeneral$aprob === void 0 ? 0 : _reporteGeneral$aprob,
      _reporteGeneral$pendi = reporteGeneral.pendientes,
      pendientes = _reporteGeneral$pendi === void 0 ? 0 : _reporteGeneral$pendi,
      _reporteGeneral$repro = reporteGeneral.reprobados,
      reprobados = _reporteGeneral$repro === void 0 ? 0 : _reporteGeneral$repro,
      promedioCalificaciones = reporteGeneral.promedioCalificaciones,
      _reporteGeneral$porPr = reporteGeneral.porPrograma,
      porPrograma = _reporteGeneral$porPr === void 0 ? [] : _reporteGeneral$porPr,
      _reporteGeneral$total2 = reporteGeneral.totalUsuarios,
      totalUsuarios = _reporteGeneral$total2 === void 0 ? 0 : _reporteGeneral$total2,
      _reporteGeneral$usuar = reporteGeneral.usuariosPorRol,
      usuariosPorRol = _reporteGeneral$usuar === void 0 ? [] : _reporteGeneral$usuar,
      _reporteGeneral$total3 = reporteGeneral.totalPersonas,
      totalPersonas = _reporteGeneral$total3 === void 0 ? 0 : _reporteGeneral$total3,
      _reporteGeneral$perso = reporteGeneral.personasActivas,
      personasActivas = _reporteGeneral$perso === void 0 ? 0 : _reporteGeneral$perso,
      _reporteGeneral$total4 = reporteGeneral.totalDocentes,
      totalDocentes = _reporteGeneral$total4 === void 0 ? 0 : _reporteGeneral$total4,
      _reporteGeneral$docen = reporteGeneral.docentesActivos,
      docentesActivos = _reporteGeneral$docen === void 0 ? 0 : _reporteGeneral$docen,
      _reporteGeneral$docen2 = reporteGeneral.docentesPorContrato,
      docentesPorContrato = _reporteGeneral$docen2 === void 0 ? [] : _reporteGeneral$docen2,
      _reporteGeneral$total5 = reporteGeneral.totalEstudiantes,
      totalEstudiantes = _reporteGeneral$total5 === void 0 ? 0 : _reporteGeneral$total5,
      _reporteGeneral$estud = reporteGeneral.estudiantesActivos,
      estudiantesActivos = _reporteGeneral$estud === void 0 ? 0 : _reporteGeneral$estud,
      _reporteGeneral$estud2 = reporteGeneral.estudiantesPorPrograma,
      estudiantesPorPrograma = _reporteGeneral$estud2 === void 0 ? [] : _reporteGeneral$estud2,
      _reporteGeneral$total6 = reporteGeneral.totalMetodologias,
      totalMetodologias = _reporteGeneral$total6 === void 0 ? 0 : _reporteGeneral$total6,
      _reporteGeneral$total7 = reporteGeneral.totalModulos,
      totalModulos = _reporteGeneral$total7 === void 0 ? 0 : _reporteGeneral$total7,
      _reporteGeneral$modul = reporteGeneral.modulosPorMetodologia,
      modulosPorMetodologia = _reporteGeneral$modul === void 0 ? [] : _reporteGeneral$modul,
      _reporteGeneral$total8 = reporteGeneral.totalTalleres,
      totalTalleres = _reporteGeneral$total8 === void 0 ? 0 : _reporteGeneral$total8,
      _reporteGeneral$talle = reporteGeneral.talleresPorTipo,
      talleresPorTipo = _reporteGeneral$talle === void 0 ? [] : _reporteGeneral$talle;
    var fecha = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // === COLORES INSTITUCIONALES ===
    var COLORS = {
      primary: '#1a5d57',
      // Verde USB
      secondary: '#2c3e50',
      // Azul oscuro
      success: '#27ae60',
      // Verde
      warning: '#f39c12',
      // Naranja
      danger: '#e74c3c',
      // Rojo
      light: '#f8f9fa',
      // Fondo claro
      gray: '#6c757d',
      // Texto secundario
      border: '#dee2e6' // Bordes
    };

    // === ENCABEZADO PROFESIONAL ===
    var addHeader = function addHeader() {
      // Logo
      doc.image('./src/img/logousb.png', 50, 30, {
        width: 70
      });

      // Título principal
      doc.font('Helvetica-Bold').fontSize(18).fillColor(COLORS.primary).text('Universidad Salesiana de Bolivia', 0, 40, {
        align: 'center'
      });
      doc.font('Helvetica').fontSize(13).fillColor(COLORS.secondary).text('Reporte Estadístico General del Sistema', 0, 65, {
        align: 'center'
      });
      doc.fontSize(10).fillColor(COLORS.gray).text("Generado: ".concat(fecha), 0, 85, {
        align: 'center'
      });

      // Línea divisoria
      doc.moveTo(50, 105).lineTo(550, 105).strokeColor(COLORS.border).lineWidth(1).stroke();
      doc.moveDown(2);
    };
    addHeader();

    // === FUNCIÓN: SECCIÓN CON TÍTULO Y FONDO ===
    var addSection = function addSection(title) {
      var yOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = doc.y + yOffset;
      doc.rect(50, y, 500, 25).fill(COLORS.light).stroke(COLORS.border);
      doc.font('Helvetica-Bold').fontSize(13).fillColor(COLORS.primary).text(title, 60, y + 6);
      doc.moveDown(1.8);
    };

    // === PÁGINA 1: RESUMEN EJECUTIVO ===
    addSection('RESUMEN EJECUTIVO');
    var addStat = function addStat(label, value) {
      doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.secondary).text(label + ':');
      doc.font('Helvetica').fontSize(10).fillColor('#000').text("  ".concat(value), {
        indent: 20
      });
    };

    // Proyectos
    addStat('Proyectos de Titulación', '');
    doc.font('Helvetica').fontSize(9.5);
    doc.text("  \u2022 Total: ".concat(totalProyectos), {
      indent: 30
    });
    doc.text("  \u2022 Aprobados: ".concat(aprobados, " (").concat(totalProyectos > 0 ? (aprobados / totalProyectos * 100).toFixed(1) : 0, "%)"), {
      indent: 30
    });
    doc.text("  \u2022 Pendientes: ".concat(pendientes, " (").concat(totalProyectos > 0 ? (pendientes / totalProyectos * 100).toFixed(1) : 0, "%)"), {
      indent: 30
    });
    doc.text("  \u2022 Reprobados: ".concat(reprobados, " (").concat(totalProyectos > 0 ? (reprobados / totalProyectos * 100).toFixed(1) : 0, "%)"), {
      indent: 30
    });
    if (promedioCalificaciones) doc.text("  \u2022 Promedio: ".concat(promedioCalificaciones), {
      indent: 30
    });
    doc.moveDown(0.5);
    addStat('Usuarios del Sistema', '');
    doc.fontSize(9.5);
    doc.text("  \u2022 Total Usuarios: ".concat(totalUsuarios), {
      indent: 30
    });
    doc.text("  \u2022 Total Personas: ".concat(totalPersonas), {
      indent: 30
    });
    doc.text("  \u2022 Personas Activas: ".concat(personasActivas), {
      indent: 30
    });
    doc.moveDown(0.5);
    addStat('Docentes y Estudiantes', '');
    doc.text("  \u2022 Docentes: ".concat(totalDocentes, " (Activos: ").concat(docentesActivos, ")"), {
      indent: 30
    });
    doc.text("  \u2022 Estudiantes: ".concat(totalEstudiantes, " (Activos: ").concat(estudiantesActivos, ")"), {
      indent: 30
    });
    doc.moveDown(0.5);
    addStat('Metodologías y Talleres', '');
    doc.text("  \u2022 Metodolog\xEDas: ".concat(totalMetodologias), {
      indent: 30
    });
    doc.text("  \u2022 M\xF3dulos: ".concat(totalModulos), {
      indent: 30
    });
    doc.text("  \u2022 Talleres: ".concat(totalTalleres), {
      indent: 30
    });
    doc.moveDown(1.5);

    // === GRÁFICO DE BARRAS PROFESIONAL ===
    doc.font('Helvetica-Bold').fontSize(12).fillColor(COLORS.primary).text('Estado de Proyectos:');
    doc.moveDown(0.5);
    var barData = [{
      label: 'Aprobados',
      value: aprobados,
      color: COLORS.success
    }, {
      label: 'Pendientes',
      value: pendientes,
      color: COLORS.warning
    }, {
      label: 'Reprobados',
      value: reprobados,
      color: COLORS.danger
    }];
    var maxWidth = 300;
    barData.forEach(function (item) {
      var width = totalProyectos > 0 ? item.value / totalProyectos * maxWidth : 0;
      doc.rect(100, doc.y + 3, maxWidth, 14).fill('#f1f3f5').stroke(COLORS.border);
      doc.rect(100, doc.y + 3, width, 14).fill(item.color).stroke();
      doc.font('Helvetica').fontSize(9).fillColor('#000').text("".concat(item.label, ": ").concat(item.value), 410, doc.y + 5);
      doc.moveDown(1.2);
    });

    // === PÁGINA 2 ===
    doc.addPage();
    addHeader();
    var tableOptions = {
      prepareHeader: function prepareHeader() {
        return doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.primary);
      },
      prepareRow: function prepareRow() {
        return doc.font('Helvetica').fontSize(9).fillColor('#000');
      },
      columnSpacing: 10,
      padding: 8,
      borderWidth: 0.5,
      borderColor: COLORS.border,
      headerBackground: COLORS.light,
      headerBorder: COLORS.border,
      stripeColor: '#f8f9fa'
    };

    // Tabla: Proyectos por Programa
    addSection('DISTRIBUCIÓN POR PROGRAMA ACADÉMICO', -10);
    doc.table({
      headers: ['Programa', 'Total', 'Aprobados', 'Pendientes', 'Tasa Éxito'],
      rows: porPrograma.length > 0 ? porPrograma.map(function (p) {
        var _p$total, _p$aprobados, _p$pendientes;
        return [p.programa || 'Sin datos', ((_p$total = p.total) === null || _p$total === void 0 ? void 0 : _p$total.toString()) || '0', ((_p$aprobados = p.aprobados) === null || _p$aprobados === void 0 ? void 0 : _p$aprobados.toString()) || '0', ((_p$pendientes = p.pendientes) === null || _p$pendientes === void 0 ? void 0 : _p$pendientes.toString()) || '0', p.total > 0 ? "".concat((p.aprobados / p.total * 100).toFixed(1), "%") : '0%'];
      }) : [['Sin datos', '0', '0', '0', '0%']]
    }, _objectSpread({
      x: 50,
      y: doc.y + 10
    }, tableOptions));

    // Tabla: Usuarios por Rol
    doc.moveDown(2);
    addSection('USUARIOS POR ROL', -10);
    doc.table({
      headers: ['Rol', 'Total', 'Activos', '% del Total'],
      rows: usuariosPorRol.length > 0 ? usuariosPorRol.map(function (u) {
        var _u$total, _u$activos;
        return [u.rol || 'Sin rol', ((_u$total = u.total) === null || _u$total === void 0 ? void 0 : _u$total.toString()) || '0', ((_u$activos = u.activos) === null || _u$activos === void 0 ? void 0 : _u$activos.toString()) || '0', totalUsuarios > 0 ? "".concat((u.total / totalUsuarios * 100).toFixed(1), "%") : '0%'];
      }) : [['Sin datos', '0', '0', '0%']]
    }, _objectSpread({
      x: 50,
      y: doc.y + 10
    }, tableOptions));

    // === PÁGINA 3 ===
    doc.addPage();
    addHeader();
    addSection('DOCENTES', -10);
    doc.table({
      headers: ['Tipo de Contrato', 'Total', 'Porcentaje'],
      rows: docentesPorContrato.length > 0 ? docentesPorContrato.map(function (d) {
        var _d$total;
        return [d.tipo_contrato || 'N/A', ((_d$total = d.total) === null || _d$total === void 0 ? void 0 : _d$total.toString()) || '0', totalDocentes > 0 ? "".concat((d.total / totalDocentes * 100).toFixed(1), "%") : '0%'];
      }) : [['Sin datos', '0', '0%']]
    }, _objectSpread({
      x: 50,
      y: doc.y + 10
    }, tableOptions));
    doc.moveDown(2);
    addSection('ESTUDIANTES', -10);
    doc.table({
      headers: ['Programa', 'Total', 'Activos', '% del Total'],
      rows: estudiantesPorPrograma.length > 0 ? estudiantesPorPrograma.map(function (e) {
        var _e$total, _e$activos;
        return [e.programa || 'N/A', ((_e$total = e.total) === null || _e$total === void 0 ? void 0 : _e$total.toString()) || '0', ((_e$activos = e.activos) === null || _e$activos === void 0 ? void 0 : _e$activos.toString()) || '0', totalEstudiantes > 0 ? "".concat((e.total / totalEstudiantes * 100).toFixed(1), "%") : '0%'];
      }) : [['Sin datos', '0', '0', '0%']]
    }, _objectSpread({
      x: 50,
      y: doc.y + 10
    }, tableOptions));

    // === PÁGINA 4 ===
    doc.addPage();
    addHeader();
    addSection('METODOLOGÍAS Y MÓDULOS', -10);
    doc.table({
      headers: ['Metodología', 'Total Módulos', 'Duración Promedio'],
      rows: modulosPorMetodologia.length > 0 ? modulosPorMetodologia.map(function (m) {
        var _m$total_modulos;
        return [m.metodologia || 'N/A', ((_m$total_modulos = m.total_modulos) === null || _m$total_modulos === void 0 ? void 0 : _m$total_modulos.toString()) || '0', m.duracion_promedio ? m.duracion_promedio.toFixed(2) : 'N/A'];
      }) : [['Sin datos', '0', 'N/A']]
    }, _objectSpread({
      x: 50,
      y: doc.y + 10
    }, tableOptions));
    doc.moveDown(2);
    addSection('TALLERES', -10);
    doc.table({
      headers: ['Tipo de Taller', 'Total', 'Resultado Prom.', '% del Total'],
      rows: talleresPorTipo.length > 0 ? talleresPorTipo.map(function (t) {
        var _t$total;
        return [t.tipo || 'N/A', ((_t$total = t.total) === null || _t$total === void 0 ? void 0 : _t$total.toString()) || '0', t.resultado_promedio ? parseFloat(t.resultado_promedio).toFixed(2) : 'N/A', totalTalleres > 0 ? "".concat((t.total / totalTalleres * 100).toFixed(1), "%") : '0%'];
      }) : [['Sin datos', '0', 'N/A', '0%']]
    }, _objectSpread({
      x: 50,
      y: doc.y + 10
    }, tableOptions));

    // === INDICADORES CLAVE ===
    doc.moveDown(3);
    doc.rect(50, doc.y, 500, 90).fill('#f1f3f5').stroke(COLORS.border);
    doc.font('Helvetica-Bold').fontSize(13).fillColor(COLORS.primary).text('INDICADORES CLAVE', 60, doc.y + 15);
    doc.font('Helvetica').fontSize(10).fillColor('#000');
    var yStart = doc.y + 35;
    doc.text("\u2022 Ratio Docente/Estudiante: ".concat(totalEstudiantes > 0 && totalDocentes > 0 ? (totalEstudiantes / totalDocentes).toFixed(2) : 'N/A'), 60, yStart);
    doc.text("\u2022 Tasa de Aprobaci\xF3n: ".concat(totalProyectos > 0 ? (aprobados / totalProyectos * 100).toFixed(1) : 0, "%"), 60, yStart + 18);
    doc.text("\u2022 Proyectos Pendientes: ".concat(pendientes), 60, yStart + 36);
    doc.text("\u2022 M\xF3dulos Activos: ".concat(totalModulos), 60, yStart + 54);
    doc.text("\u2022 Talleres Programados: ".concat(totalTalleres), 60, yStart + 72);

    // === FIRMAS ===
    doc.moveDown(6);
    doc.fontSize(11).fillColor(COLORS.secondary);
    doc.text('_________________________', 80, doc.y);
    doc.text('Firma del Administrador', 80, doc.y + 15);
    doc.text('_________________________', 320, doc.y - 15);
    doc.text('Director de Carrera', 320, doc.y);

    // === PIE DE PÁGINA ===
    doc.fontSize(8).fillColor(COLORS.gray).text('Este documento es confidencial y de uso exclusivo de la Universidad Salesiana de Bolivia', 50, 780, {
      align: 'center',
      width: 500
    });
  } catch (error) {
    console.error('Error generando PDF Admin:', error);
    doc.font('Helvetica').fontSize(12).fillColor('#e74c3c').text('Error interno al generar el reporte', 50, 300);
  }
  doc.end();
}