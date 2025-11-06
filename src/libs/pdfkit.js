import PDFDocument from 'pdfkit-table';

// === FUNCIÓN: REPORTE PARA ESTUDIANTE ===
export function buildPDFEstudiante(proyecto, dataCallback, endCallback) {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  try {
    const { estudiante, docenteGuia, docenteRevisor, programa } = proyecto;

    // Encabezado
    doc.image('./src/img/logousb.png', 50, 30, { width: 100 });
    doc.fontSize(14).text('Universidad Salesiana de Bolivia', 160, 40, { align: 'center' });
    doc.fontSize(12).text('Reporte de Titulación - Estudiante', 0, 60, { align: 'center' });
    doc.fontSize(10).text('Código: T-0045', 0, 75, { align: 'center' });
    doc.moveDown(2);

    // Datos del estudiante
    doc.fontSize(11).text(`Nombre del estudiante: ${estudiante.persona.nombres} ${estudiante.persona.apellidopat} ${estudiante.persona.apellidomat || ''}`);
    doc.text(`C.I.: ${estudiante.persona.carnet}`);
    doc.text(`R.U.: ${estudiante.numero_matricula}`);
    doc.text(`Programa: ${programa.nombre_programa}`);
    doc.text(`Modalidad: ${programa.modalidad}`);
    doc.text(`Modalidad de Titulación: Proyecto de Grado`);
    doc.text(`Fecha de defensa: ${proyecto.fecha_defensa ? new Date(proyecto.fecha_defensa).toLocaleDateString('es-ES') : 'Pendiente'}`);
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString('es-ES')}`);
    doc.moveDown(2);

    // Tabla de proyecto (FORMATO CORRECTO)
    const table = {
      title: "Información del Proyecto",
      headers: [
        { label: "N°", property: 'numero', width: 30, align: 'center' },
        { label: "Título del Proyecto", property: 'titulo', width: 150 },
        { label: "Área", property: 'area', width: 70 },
        { label: "Tutor", property: 'tutor', width: 80 },
        { label: "Tribunal", property: 'tribunal', width: 80 },
        { label: "Calificación", property: 'calificacion', width: 60, align: 'center' },
        { label: "Observaciones", property: 'observaciones', width: 80 }
      ],
      datas: [{
        numero: "1",
        titulo: proyecto.titulo,
        area: proyecto.area_conocimiento,
        tutor: `${docenteGuia.persona.nombres} ${docenteGuia.persona.apellidopat}`,
        tribunal: `${docenteRevisor.persona.nombres} ${docenteRevisor.persona.apellidopat}`,
        calificacion: proyecto.calificacion || 'Pendiente',
        observaciones: proyecto.observacion || 'Sin observaciones'
      }]
    };

    doc.table(table, { 
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
      prepareRow: () => doc.font('Helvetica').fontSize(9)
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
export function buildPDFDocenteGuia(proyecto, dataCallback, endCallback) {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  try {
    const { estudiante, docenteGuia, programa } = proyecto;

    doc.image('./src/img/logousb.png', 50, 30, { width: 100 });
    doc.fontSize(14).text('Universidad Salesiana de Bolivia', 160, 40, { align: 'center' });
    doc.fontSize(12).text('Reporte de Seguimiento - Docente Guía', 0, 60, { align: 'center' });
    doc.fontSize(10).text('Código: DG-001', 0, 75, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(11).text(`Docente Guía: ${docenteGuia.persona.nombres} ${docenteGuia.persona.apellidopat} ${docenteGuia.persona.apellidomat || ''}`);
    doc.text(`Especialidad: ${docenteGuia.especialidad}`);
    doc.text(`Estudiante: ${estudiante.persona.nombres} ${estudiante.persona.apellidopat}`);
    doc.text(`Matrícula: ${estudiante.numero_matricula}`);
    doc.text(`Programa: ${programa.nombre_programa}`);
    doc.text(`Título del Proyecto: ${proyecto.titulo}`);
    doc.moveDown(1.5);

    const table = {
      title: "Seguimiento de Actividades",
      headers: [
        { label: "Fecha", property: 'fecha', width: 80 },
        { label: "Actividad Realizada", property: 'actividad', width: 200 },
        { label: "Avance (%)", property: 'avance', width: 70, align: 'center' },
        { label: "Estado", property: 'estado', width: 100 }
      ],
      datas: [
        {
          fecha: new Date().toLocaleDateString('es-ES'),
          actividad: "Revisión de propuesta",
          avance: "30%",
          estado: "En proceso"
        },
        {
          fecha: new Date().toLocaleDateString('es-ES'),
          actividad: "Entrega de capítulo 1",
          avance: "60%",
          estado: "Pendiente revisión"
        }
      ]
    };

    doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
      prepareRow: () => doc.font('Helvetica').fontSize(9)
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
export function buildPDFDocenteRevisor(proyecto, dataCallback, endCallback) {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  try {
    const { estudiante, docenteRevisor, programa } = proyecto;

    doc.image('./src/img/logousb.png', 50, 30, { width: 100 });
    doc.fontSize(14).text('Universidad Salesiana de Bolivia', 160, 40, { align: 'center' });
    doc.fontSize(12).text('Informe de Revisión - Tribunal', 0, 60, { align: 'center' });
    doc.fontSize(10).text('Código: TR-002', 0, 75, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(11).text(`Docente Revisor: ${docenteRevisor.persona.nombres} ${docenteRevisor.persona.apellidopat}`);
    doc.text(`Estudiante: ${estudiante.persona.nombres} ${estudiante.persona.apellidopat}`);
    doc.text(`Título del Proyecto: ${proyecto.titulo}`);
    doc.text(`Fecha de Revisión: ${new Date().toLocaleDateString('es-ES')}`);
    doc.moveDown(1.5);

    const table = {
      title: "Evaluación del Proyecto",
      headers: [
        { label: "Criterio", property: 'criterio', width: 200 },
        { label: "Puntuación", property: 'puntuacion', width: 100, align: 'center' },
        { label: "Comentario", property: 'comentario', width: 150 }
      ],
      datas: [
        {
          criterio: "Metodología",
          puntuacion: "18/20",
          comentario: "Buena estructura, falta detalle en cronograma"
        },
        {
          criterio: "Originalidad",
          puntuacion: "15/20",
          comentario: "Tema relevante, pero referencias desactualizadas"
        },
        {
          criterio: "Redacción",
          puntuacion: "16/20",
          comentario: "Claro, pero con errores ortográficos"
        },
        {
          criterio: "Total",
          puntuacion: proyecto.calificacion || 'Pendiente',
          comentario: ""
        }
      ]
    };

    doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
      prepareRow: () => doc.font('Helvetica').fontSize(9)
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


export function buildPDFAdmin(reporteGeneral, dataCallback, endCallback) {
  const doc = new PDFDocument({ 
    margin: 50, 
    size: 'A4',
    bufferPages: true 
  });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  try {
    const { 
      totalProyectos = 0, aprobados = 0, pendientes = 0, reprobados = 0, promedioCalificaciones,
      porPrograma = [], totalUsuarios = 0, usuariosPorRol = [], 
      totalPersonas = 0, personasActivas = 0,
      totalDocentes = 0, docentesActivos = 0, docentesPorContrato = [],
      totalEstudiantes = 0, estudiantesActivos = 0, estudiantesPorPrograma = [],
      totalMetodologias = 0, totalModulos = 0, modulosPorMetodologia = [],
      totalTalleres = 0, talleresPorTipo = []
    } = reporteGeneral;

    const fecha = new Date().toLocaleDateString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // === COLORES INSTITUCIONALES ===
    const COLORS = {
      primary: '#1a5d57',    // Verde USB
      secondary: '#2c3e50',  // Azul oscuro
      success: '#27ae60',    // Verde
      warning: '#f39c12',    // Naranja
      danger: '#e74c3c',     // Rojo
      light: '#f8f9fa',      // Fondo claro
      gray: '#6c757d',       // Texto secundario
      border: '#dee2e6'      // Bordes
    };

    // === ENCABEZADO PROFESIONAL ===
    const addHeader = () => {
      // Logo
      doc.image('./src/img/logousb.png', 50, 30, { width: 70 });
      
      // Título principal
      doc.font('Helvetica-Bold').fontSize(18).fillColor(COLORS.primary)
         .text('Universidad Salesiana de Bolivia', 0, 40, { align: 'center' });
      
      doc.font('Helvetica').fontSize(13).fillColor(COLORS.secondary)
         .text('Reporte Estadístico General del Sistema', 0, 65, { align: 'center' });
      
      doc.fontSize(10).fillColor(COLORS.gray)
         .text(`Generado: ${fecha}`, 0, 85, { align: 'center' });
      
      // Línea divisoria
      doc.moveTo(50, 105).lineTo(550, 105).strokeColor(COLORS.border).lineWidth(1).stroke();
      doc.moveDown(2);
    };

    addHeader();

    // === FUNCIÓN: SECCIÓN CON TÍTULO Y FONDO ===
    const addSection = (title, yOffset = 0) => {
      const y = doc.y + yOffset;
      doc.rect(50, y, 500, 25).fill(COLORS.light).stroke(COLORS.border);
      doc.font('Helvetica-Bold').fontSize(13).fillColor(COLORS.primary)
         .text(title, 60, y + 6);
      doc.moveDown(1.8);
    };

    // === PÁGINA 1: RESUMEN EJECUTIVO ===
    addSection('RESUMEN EJECUTIVO');

    const addStat = (label, value) => {
      doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.secondary).text(label + ':');
      doc.font('Helvetica').fontSize(10).fillColor('#000').text(`  ${value}`, { indent: 20 });
    };

    // Proyectos
    addStat('Proyectos de Titulación', '');
    doc.font('Helvetica').fontSize(9.5);
    doc.text(`  • Total: ${totalProyectos}`, { indent: 30 });
    doc.text(`  • Aprobados: ${aprobados} (${totalProyectos > 0 ? ((aprobados/totalProyectos)*100).toFixed(1) : 0}%)`, { indent: 30 });
    doc.text(`  • Pendientes: ${pendientes} (${totalProyectos > 0 ? ((pendientes/totalProyectos)*100).toFixed(1) : 0}%)`, { indent: 30 });
    doc.text(`  • Reprobados: ${reprobados} (${totalProyectos > 0 ? ((reprobados/totalProyectos)*100).toFixed(1) : 0}%)`, { indent: 30 });
    if (promedioCalificaciones) doc.text(`  • Promedio: ${promedioCalificaciones}`, { indent: 30 });
    doc.moveDown(0.5);

    addStat('Usuarios del Sistema', '');
    doc.fontSize(9.5);
    doc.text(`  • Total Usuarios: ${totalUsuarios}`, { indent: 30 });
    doc.text(`  • Total Personas: ${totalPersonas}`, { indent: 30 });
    doc.text(`  • Personas Activas: ${personasActivas}`, { indent: 30 });
    doc.moveDown(0.5);

    addStat('Docentes y Estudiantes', '');
    doc.text(`  • Docentes: ${totalDocentes} (Activos: ${docentesActivos})`, { indent: 30 });
    doc.text(`  • Estudiantes: ${totalEstudiantes} (Activos: ${estudiantesActivos})`, { indent: 30 });
    doc.moveDown(0.5);

    addStat('Metodologías y Talleres', '');
    doc.text(`  • Metodologías: ${totalMetodologias}`, { indent: 30 });
    doc.text(`  • Módulos: ${totalModulos}`, { indent: 30 });
    doc.text(`  • Talleres: ${totalTalleres}`, { indent: 30 });
    doc.moveDown(1.5);

    // === GRÁFICO DE BARRAS PROFESIONAL ===
    doc.font('Helvetica-Bold').fontSize(12).fillColor(COLORS.primary).text('Estado de Proyectos:');
    doc.moveDown(0.5);

    const barData = [
      { label: 'Aprobados', value: aprobados, color: COLORS.success },
      { label: 'Pendientes', value: pendientes, color: COLORS.warning },
      { label: 'Reprobados', value: reprobados, color: COLORS.danger }
    ];

    const maxWidth = 300;
    barData.forEach(item => {
      const width = totalProyectos > 0 ? (item.value / totalProyectos) * maxWidth : 0;
      doc.rect(100, doc.y + 3, maxWidth, 14).fill('#f1f3f5').stroke(COLORS.border);
      doc.rect(100, doc.y + 3, width, 14).fill(item.color).stroke();
      doc.font('Helvetica').fontSize(9).fillColor('#000')
         .text(`${item.label}: ${item.value}`, 410, doc.y + 5);
      doc.moveDown(1.2);
    });

    // === PÁGINA 2 ===
    doc.addPage();
    addHeader();

    const tableOptions = {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.primary),
      prepareRow: () => doc.font('Helvetica').fontSize(9).fillColor('#000'),
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
      rows: porPrograma.length > 0 
        ? porPrograma.map(p => [
            p.programa || 'Sin datos',
            p.total?.toString() || '0',
            p.aprobados?.toString() || '0',
            p.pendientes?.toString() || '0',
            p.total > 0 ? `${((p.aprobados / p.total) * 100).toFixed(1)}%` : '0%'
          ])
        : [['Sin datos', '0', '0', '0', '0%']]
    }, { x: 50, y: doc.y + 10, ...tableOptions });

    // Tabla: Usuarios por Rol
    doc.moveDown(2);
    addSection('USUARIOS POR ROL', -10);
    doc.table({
      headers: ['Rol', 'Total', 'Activos', '% del Total'],
      rows: usuariosPorRol.length > 0
        ? usuariosPorRol.map(u => [
            u.rol || 'Sin rol',
            u.total?.toString() || '0',
            u.activos?.toString() || '0',
            totalUsuarios > 0 ? `${((u.total / totalUsuarios) * 100).toFixed(1)}%` : '0%'
          ])
        : [['Sin datos', '0', '0', '0%']]
    }, { x: 50, y: doc.y + 10, ...tableOptions });

    // === PÁGINA 3 ===
    doc.addPage();
    addHeader();

    addSection('DOCENTES', -10);
    doc.table({
      headers: ['Tipo de Contrato', 'Total', 'Porcentaje'],
      rows: docentesPorContrato.length > 0
        ? docentesPorContrato.map(d => [
            d.tipo_contrato || 'N/A',
            d.total?.toString() || '0',
            totalDocentes > 0 ? `${((d.total / totalDocentes) * 100).toFixed(1)}%` : '0%'
          ])
        : [['Sin datos', '0', '0%']]
    }, { x: 50, y: doc.y + 10, ...tableOptions });

    doc.moveDown(2);
    addSection('ESTUDIANTES', -10);
    doc.table({
      headers: ['Programa', 'Total', 'Activos', '% del Total'],
      rows: estudiantesPorPrograma.length > 0
        ? estudiantesPorPrograma.map(e => [
            e.programa || 'N/A',
            e.total?.toString() || '0',
            e.activos?.toString() || '0',
            totalEstudiantes > 0 ? `${((e.total / totalEstudiantes) * 100).toFixed(1)}%` : '0%'
          ])
        : [['Sin datos', '0', '0', '0%']]
    }, { x: 50, y: doc.y + 10, ...tableOptions });

    // === PÁGINA 4 ===
    doc.addPage();
    addHeader();

    addSection('METODOLOGÍAS Y MÓDULOS', -10);
    doc.table({
      headers: ['Metodología', 'Total Módulos', 'Duración Promedio'],
      rows: modulosPorMetodologia.length > 0
        ? modulosPorMetodologia.map(m => [
            m.metodologia || 'N/A',
            m.total_modulos?.toString() || '0',
            m.duracion_promedio ? m.duracion_promedio.toFixed(2) : 'N/A'
          ])
        : [['Sin datos', '0', 'N/A']]
    }, { x: 50, y: doc.y + 10, ...tableOptions });

    doc.moveDown(2);
    addSection('TALLERES', -10);
    doc.table({
      headers: ['Tipo de Taller', 'Total', 'Resultado Prom.', '% del Total'],
      rows: talleresPorTipo.length > 0
        ? talleresPorTipo.map(t => [
            t.tipo || 'N/A',
            t.total?.toString() || '0',
            t.resultado_promedio ? parseFloat(t.resultado_promedio).toFixed(2) : 'N/A',
            totalTalleres > 0 ? `${((t.total / totalTalleres) * 100).toFixed(1)}%` : '0%'
          ])
        : [['Sin datos', '0', 'N/A', '0%']]
    }, { x: 50, y: doc.y + 10, ...tableOptions });

    // === INDICADORES CLAVE ===
    doc.moveDown(3);
    doc.rect(50, doc.y, 500, 90).fill('#f1f3f5').stroke(COLORS.border);
    doc.font('Helvetica-Bold').fontSize(13).fillColor(COLORS.primary)
       .text('INDICADORES CLAVE', 60, doc.y + 15);
    
    doc.font('Helvetica').fontSize(10).fillColor('#000');
    const yStart = doc.y + 35;
    doc.text(`• Ratio Docente/Estudiante: ${totalEstudiantes > 0 && totalDocentes > 0 ? (totalEstudiantes / totalDocentes).toFixed(2) : 'N/A'}`, 60, yStart);
    doc.text(`• Tasa de Aprobación: ${totalProyectos > 0 ? ((aprobados / totalProyectos) * 100).toFixed(1) : 0}%`, 60, yStart + 18);
    doc.text(`• Proyectos Pendientes: ${pendientes}`, 60, yStart + 36);
    doc.text(`• Módulos Activos: ${totalModulos}`, 60, yStart + 54);
    doc.text(`• Talleres Programados: ${totalTalleres}`, 60, yStart + 72);

    // === FIRMAS ===
    doc.moveDown(6);
    doc.fontSize(11).fillColor(COLORS.secondary);
    doc.text('_________________________', 80, doc.y);
    doc.text('Firma del Administrador', 80, doc.y + 15);
    doc.text('_________________________', 320, doc.y - 15);
    doc.text('Director de Carrera', 320, doc.y);

    // === PIE DE PÁGINA ===
    doc.fontSize(8).fillColor(COLORS.gray)
       .text('Este documento es confidencial y de uso exclusivo de la Universidad Salesiana de Bolivia', 
             50, 780, { align: 'center', width: 500 });

  } catch (error) {
    console.error('Error generando PDF Admin:', error);
    doc.font('Helvetica').fontSize(12).fillColor('#e74c3c')
       .text('Error interno al generar el reporte', 50, 300);
  }

  doc.end();
}
