import { connect } from '../database';
import { buildPDFEstudiante, buildPDFAdmin, buildPDFDocenteGuia, buildPDFDocenteRevisor } from "../libs/pdfkit";

// Función auxiliar para obtener datos del proyecto
async function obtenerDatosProyecto(proyectoId) {
    const pool = await connect();
    const [rows] = await pool.query(`
        SELECT 
            p.*,
            e.ru,
            e.id as estudiante_id,
            per_e.nombres as est_nombres,
            per_e.apellidopat as est_apellidopat,
            per_e.apellidomat as est_apellidomat,
            per_e.carnet as est_carnet,
            dg.id as docente_guia_id,
            dg.especialidad as dg_especialidad,
            per_dg.nombres as dg_nombres,
            per_dg.apellidopat as dg_apellidopat,
            per_dg.apellidomat as dg_apellidomat,
            dr.id as docente_revisor_id,
            dr.especialidad as dr_especialidad,
            per_dr.nombres as dr_nombres,
            per_dr.apellidopat as dr_apellidopat,
            per_dr.apellidomat as dr_apellidomat,
            prog.nombre_programa,
            prog.modalidad,
            prog.facultad
        FROM proyecto p
        LEFT JOIN estudiante e ON p.id_estudiante = e.id
        LEFT JOIN persona per_e ON e.per_id = per_e.id
        LEFT JOIN docente dg ON p.id_docente_guia = dg.id
        LEFT JOIN persona per_dg ON dg.per_id = per_dg.id
        LEFT JOIN docente dr ON p.id_docente_revisor = dr.id
        LEFT JOIN persona per_dr ON dr.per_id = per_dr.id
        LEFT JOIN programa_academico prog ON e.id_programa_academico = prog.id
        WHERE p.id = ?
    `, [proyectoId]);

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
        ...row,
        estudiante: {
            id: row.estudiante_id,
            ru: row.ru,
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
    };
}

export const pdfEstudiante = async (req, res) => {
    try {
        const proyectoId = req.params.id || req.query.proyecto_id;
        
        if (!proyectoId) {
            return res.status(400).json({ message: 'ID de proyecto requerido' });
        }

        const proyecto = await obtenerDatosProyecto(proyectoId);
        
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=reporte-estudiante-${proyectoId}.pdf`,
        });

        buildPDFEstudiante(
            proyecto,
            (data) => stream.write(data),
            () => stream.end()
        );
    } catch (error) {
        console.error('Error generando PDF estudiante:', error);
        res.status(500).json({ message: 'Error al generar PDF', error: error.message });
    }
};

export const pdfDocenteGuia = async (req, res) => {
    try {
        const proyectoId = req.params.id || req.query.proyecto_id;
        
        if (!proyectoId) {
            return res.status(400).json({ message: 'ID de proyecto requerido' });
        }

        const proyecto = await obtenerDatosProyecto(proyectoId);
        
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=reporte-guia-${proyectoId}.pdf`,
        });

        buildPDFDocenteGuia(
            proyecto,
            (data) => stream.write(data),
            () => stream.end()
        );
    } catch (error) {
        console.error('Error generando PDF docente guía:', error);
        res.status(500).json({ message: 'Error al generar PDF', error: error.message });
    }
};

export const pdfDocenteRevisor = async (req, res) => {
    try {
        const proyectoId = req.params.id || req.query.proyecto_id;
        
        if (!proyectoId) {
            return res.status(400).json({ message: 'ID de proyecto requerido' });
        }

        const proyecto = await obtenerDatosProyecto(proyectoId);
        
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=reporte-revisor-${proyectoId}.pdf`,
        });

        buildPDFDocenteRevisor(
            proyecto,
            (data) => stream.write(data),
            () => stream.end()
        );
    } catch (error) {
        console.error('Error generando PDF docente revisor:', error);
        res.status(500).json({ message: 'Error al generar PDF', error: error.message });
    }
};

export const pdfAdmin = async (req, res) => {
    try {
        const pool = await connect();

        // ============== ESTADÍSTICAS DE PROYECTOS ==============
        const [stats] = await pool.query(`
            SELECT 
                COUNT(*) as totalProyectos,
                SUM(CASE WHEN calificacion >= 51 THEN 1 ELSE 0 END) as aprobados,
                SUM(CASE WHEN calificacion IS NULL OR calificacion = '' THEN 1 ELSE 0 END) as pendientes,
                SUM(CASE WHEN calificacion < 51 AND calificacion IS NOT NULL THEN 1 ELSE 0 END) as reprobados,
                ROUND(AVG(CASE WHEN calificacion IS NOT NULL AND calificacion != '' THEN CAST(calificacion AS DECIMAL(10,2)) END), 2) as promedioCalificaciones
            FROM proyecto
        `);

        // ============== PROYECTOS POR PROGRAMA ==============
        const [porPrograma] = await pool.query(`
            SELECT 
                prog.nombre_programa as programa,
                COUNT(p.id) as total,
                SUM(CASE WHEN p.calificacion >= 51 THEN 1 ELSE 0 END) as aprobados,
                SUM(CASE WHEN p.calificacion IS NULL OR p.calificacion = '' THEN 1 ELSE 0 END) as pendientes
            FROM proyecto p
            JOIN estudiante e ON p.id_estudiante = e.id
            JOIN programa_academico prog ON e.id_programa_academico = prog.id
            GROUP BY prog.id, prog.nombre_programa
            ORDER BY total DESC
        `);

        // ============== ESTADÍSTICAS DE USUARIOS ==============
        const [statsUsuarios] = await pool.query(`
            SELECT 
                COUNT(*) as totalUsuarios,
                SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as usuariosActivos
            FROM users
        `);

        const [usuariosPorRol] = await pool.query(`
            SELECT 
                r.name as rol,
                COUNT(u.id) as total,
                SUM(CASE WHEN u.status = 1 THEN 1 ELSE 0 END) as activos
            FROM users u
            LEFT JOIN roles r ON u.id_roles = r.id
            GROUP BY r.id, r.name
            ORDER BY total DESC
        `);

        // ============== ESTADÍSTICAS DE PERSONAS ==============
        const [statsPersonas] = await pool.query(`
            SELECT 
                COUNT(*) as totalPersonas,
                SUM(CASE WHEN estado = 1 THEN 1 ELSE 0 END) as personasActivas
            FROM persona
        `);

        // ============== ESTADÍSTICAS DE DOCENTES ==============
        const [statsDocentes] = await pool.query(`
            SELECT 
                COUNT(*) as totalDocentes,
                SUM(CASE WHEN estado = 1 THEN 1 ELSE 0 END) as docentesActivos
            FROM docente
        `);

        const [docentesPorContrato] = await pool.query(`
            SELECT 
                tipo_contrato,
                COUNT(*) as total
            FROM docente
            GROUP BY tipo_contrato
            ORDER BY total DESC
        `);

        // ============== ESTADÍSTICAS DE ESTUDIANTES ==============
        const [statsEstudiantes] = await pool.query(`
            SELECT 
                COUNT(*) as totalEstudiantes,
                SUM(CASE WHEN estado = 1 THEN 1 ELSE 0 END) as estudiantesActivos
            FROM estudiante
        `);

        const [estudiantesPorPrograma] = await pool.query(`
            SELECT 
                prog.nombre_programa as programa,
                COUNT(e.id) as total,
                SUM(CASE WHEN e.estado = 1 THEN 1 ELSE 0 END) as activos
            FROM estudiante e
            JOIN programa_academico prog ON e.id_programa_academico = prog.id
            GROUP BY prog.id, prog.nombre_programa
            ORDER BY total DESC
        `);

        // ============== ESTADÍSTICAS DE METODOLOGÍAS ==============
        const [statsMetodologias] = await pool.query(`
            SELECT COUNT(*) as totalMetodologias
            FROM metodologia
        `);

        // ============== ESTADÍSTICAS DE MÓDULOS ==============
        const [statsModulos] = await pool.query(`
            SELECT COUNT(*) as totalModulos
            FROM modulo
        `);

        const [modulosPorMetodologia] = await pool.query(`
            SELECT 
                met.nombre as metodologia,
                COUNT(m.id) as total_modulos,
                AVG(CAST(m.duracion AS DECIMAL(10,2))) as duracion_promedio
            FROM modulo m
            JOIN metodologia met ON m.id_metodologia = met.id
            GROUP BY met.id, met.nombre
            ORDER BY total_modulos DESC
        `);

        // ============== ESTADÍSTICAS DE TALLERES ==============
        const [statsTalleres] = await pool.query(`
            SELECT COUNT(*) as totalTalleres
            FROM taller
        `);

        const [talleresPorTipo] = await pool.query(`
            SELECT 
                tipo_taller as tipo,
                COUNT(*) as total,
                ROUND(AVG(CASE WHEN resultado IS NOT NULL AND resultado != '' THEN CAST(resultado AS DECIMAL(10,2)) END), 2) as resultado_promedio
            FROM taller
            GROUP BY tipo_taller
            ORDER BY total DESC
        `);

        // ============== CONSTRUIR OBJETO DE REPORTE ==============
        const reporteGeneral = {
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

        const stream = res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=reporte-admin-completo-${new Date().toISOString().split('T')[0]}.pdf`,
        });

        buildPDFAdmin(
            reporteGeneral,
            (data) => stream.write(data),
            () => stream.end()
        );
    } catch (error) {
        console.error('Error generando PDF admin:', error);
        res.status(500).json({ 
            message: 'Error al generar PDF', 
            error: error.message 
        });
    }
};