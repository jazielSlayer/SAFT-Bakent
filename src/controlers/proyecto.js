import { connect } from '../database';

export const getProyectos = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.id,
                p.titulo,
                p.linea_investigacion,
                p.area_conocimiento,
                p.calificacion,
                p.fecha_entrega,
                p.fecha_defensa,
                p.resumen,
                p.observacion,
                p.created_at,
                p.updated_at,
                e.numero_matricula,
                per_e.nombres AS estudiante_nombres,
                per_e.apellidopat AS estudiante_apellidopat,
                per_e.apellidomat AS estudiante_apellidomat,
                d.numero_item AS guia_numero_item,
                per_d.nombres AS guia_nombres,
                per_d.apellidopat AS guia_apellidopat,
                per_d.apellidomat AS guia_apellidomat,
                d_revisor.numero_item AS revisor_numero_item,
                per_d_revisor.nombres AS revisor_nombres,
                per_d_revisor.apellidopat AS revisor_apellidopat,
                per_d_revisor.apellidomat AS revisor_apellidomat
            FROM proyecto p
            LEFT JOIN estudiante e ON p.id_estudiante = e.id
            LEFT JOIN persona per_e ON e.per_id = per_e.id
            LEFT JOIN docente d ON p.id_docente_guia = d.id
            LEFT JOIN persona per_d ON d.per_id = per_d.id
            LEFT JOIN docente d_revisor ON p.id_docente_revisor = d_revisor.id
            LEFT JOIN persona per_d_revisor ON d_revisor.per_id = per_d_revisor.id
        `);

        if (rows.length === 0) {
            return res.status(200).json({ message: 'No se encontraron proyectos' });
        }

        res.json(rows);
    } catch (error) {
        console.error('Error fetching proyectos:', error);
        res.status(500).json({ message: `Error al obtener proyectos: ${error.message}` });
    }
};

export const getProyectoEstudiante = async (req, res) => {
    const pool = await connect();
    const { id_estudiante } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.*,
                e.numero_matricula,
                per_e.nombres AS estudiante_nombres,
                per_e.apellidopat AS estudiante_apellidopat,
                per_e.apellidomat AS estudiante_apellidomat
            FROM proyecto p
            LEFT JOIN estudiante e ON p.id_estudiante = e.id
            LEFT JOIN persona per_e ON e.per_id = per_e.id
            WHERE p.id_estudiante = ?
            ORDER BY p.fecha_entrega DESC
        `, [id_estudiante]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching proyectos del estudiante:', error);
        res.status(500).json({ message: 'Error al obtener proyectos del estudiante' });
    }
};

export const getProyectoDocente = async (req, res) => {
    const pool = await connect();
    const { id_docente } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.*,
                e.numero_matricula,
                per_e.nombres AS estudiante_nombres,
                per_e.apellidopat AS estudiante_apellidopat,
                per_e.apellidomat AS estudiante_apellidomat
            FROM proyecto p
            LEFT JOIN estudiante e ON p.id_estudiante = e.id
            LEFT JOIN persona per_e ON e.per_id = per_e.id
            WHERE p.id_docente_guia = ? OR p.id_docente_revisor = ?
            ORDER BY p.fecha_entrega DESC
        `, [id_docente, id_docente]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching proyectos del docente:', error);
        res.status(500).json({ message: 'Error al obtener proyectos del docente' });
    }
};

export const getProyectoById = async (req, res) => {
    const pool = await connect();
    const { id } = req.params;

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const [rows] = await pool.query(`
            SELECT 
                p.id,
                p.titulo,
                p.linea_investigacion,
                p.area_conocimiento,
                p.calificacion,
                p.fecha_entrega,
                p.fecha_defensa,
                p.resumen,
                p.observacion,
                p.created_at,
                p.updated_at,
                e.numero_matricula,
                per_e.nombres AS estudiante_nombres,
                per_e.apellidopat AS estudiante_apellidopat,
                per_e.apellidomat AS estudiante_apellidomat,
                d.numero_item AS guia_numero_item,
                per_d.nombres AS guia_nombres,
                per_d.apellidopat AS guia_apellidopat,
                per_d.apellidomat AS guia_apellidomat,
                d_revisor.numero_item AS revisor_numero_item,
                per_d_revisor.nombres AS revisor_nombres,
                per_d_revisor.apellidopat AS revisor_apellidopat,
                per_d_revisor.apellidomat AS revisor_apellidomat
            FROM proyecto p
            LEFT JOIN estudiante e ON p.id_estudiante = e.id
            LEFT JOIN persona per_e ON e.per_id = per_e.id
            LEFT JOIN docente d ON p.id_docente_guia = d.id
            LEFT JOIN persona per_d ON d.per_id = per_d.id
            LEFT JOIN docente d_revisor ON p.id_docente_revisor = d_revisor.id
            LEFT JOIN persona per_d_revisor ON d_revisor.per_id = per_d_revisor.id
            WHERE p.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        res.json(rows[0]); // Solo 1 objeto
    } catch (error) {
        console.error('Error fetching proyecto by ID:', error);
        res.status(500).json({ message: 'Error al obtener el proyecto' });
    }
};

export const createProyecto = async (req, res) => {
    const pool = await connect();
    const { 
        id_estudiante, 
        id_docente_guia, 
        id_docente_revisor, 
        titulo, 
        linea_investigacion, 
        area_conocimiento, 
        fecha_entrega, 
        fecha_defensa = null, 
        resumen = null, 
        observacion = null, 
        calificacion = null 
    } = req.body;

    try {
        if (!id_estudiante || !id_docente_guia || !id_docente_revisor || !titulo || !linea_investigacion || !area_conocimiento || !fecha_entrega) {
            return res.status(400).json({ message: 'Faltan campos requeridos: id_estudiante, id_docente_guia, id_docente_revisor, titulo, linea_investigacion, area_conocimiento, fecha_entrega' });
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_entrega)) {
            return res.status(400).json({ message: 'Formato de fecha_entrega inválido (use YYYY-MM-DD)' });
        }
        if (fecha_defensa && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_defensa)) {
            return res.status(400).json({ message: 'Formato de fecha_defensa inválido (use YYYY-MM-DD)' });
        }

        const [estudianteCheck] = await pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        if (estudianteCheck.length === 0) {
            return res.status(400).json({ message: 'Estudiante no encontrado' });
        }

        const [docenteGuiaCheck] = await pool.query('SELECT id FROM docente WHERE id = ?', [id_docente_guia]);
        if (docenteGuiaCheck.length === 0) {
            return res.status(400).json({ message: 'Docente guía no encontrado' });
        }

        const [docenteRevisorCheck] = await pool.query('SELECT id FROM docente WHERE id = ?', [id_docente_revisor]);
        if (docenteRevisorCheck.length === 0) {
            return res.status(400).json({ message: 'Docente revisor no encontrado' });
        }

        if (calificacion !== null && (isNaN(calificacion) || calificacion < 0 || calificacion > 100)) {
            return res.status(400).json({ message: 'Calificación debe ser un número entre 0 y 100' });
        }

        const [results] = await pool.query(
            `INSERT INTO proyecto (
                id_estudiante, 
                id_docente_guia, 
                id_docente_revisor, 
                titulo, 
                linea_investigacion, 
                area_conocimiento, 
                calificacion, 
                fecha_entrega, 
                fecha_defensa, 
                resumen, 
                observacion
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id_estudiante, 
                id_docente_guia, 
                id_docente_revisor, 
                titulo, 
                linea_investigacion, 
                area_conocimiento, 
                calificacion, 
                fecha_entrega, 
                fecha_defensa, 
                resumen, 
                observacion
            ]
        );

        res.json({
            id: results.insertId,
            id_estudiante,
            id_docente_guia,
            id_docente_revisor,
            titulo,
            linea_investigacion,
            area_conocimiento,
            calificacion,
            fecha_entrega,
            fecha_defensa,
            resumen,
            observacion
        });
    } catch (error) {
        console.error('Error creating proyecto:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: estudiante o docente no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Entrada duplicada: el proyecto ya existe' });
        }
        res.status(500).json({ message: `Error al crear proyecto: ${error.message}` });
    }
};

export const updateProyecto = async (req, res) => {
    const pool = await connect();
    const { 
        id_estudiante, 
        id_docente_guia, 
        id_docente_revisor, 
        titulo, 
        linea_investigacion, 
        area_conocimiento, 
        calificacion, 
        fecha_entrega, 
        fecha_defensa, 
        resumen, 
        observacion 
    } = req.body;
    const id = parseInt(req.params.id);

    try {

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID del proyecto inválido' });
        }

        const [proyectoCheck] = await pool.query('SELECT id FROM proyecto WHERE id = ?', [id]);
        if (proyectoCheck.length === 0) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        if (!id_estudiante && !id_docente_guia && !id_docente_revisor && !titulo && !linea_investigacion && 
            !area_conocimiento && calificacion === undefined && !fecha_entrega && !fecha_defensa && 
            !resumen && !observacion) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar' });
        }

        if (id_estudiante) {
            const [estudianteCheck] = await pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
            if (estudianteCheck.length === 0) {
                return res.status(400).json({ message: 'Estudiante no encontrado' });
            }
        }

        if (id_docente_guia) {
            const [docenteGuiaCheck] = await pool.query('SELECT id FROM docente WHERE id = ?', [id_docente_guia]);
            if (docenteGuiaCheck.length === 0) {
                return res.status(400).json({ message: 'Docente guía no encontrado' });
            }
        }

        if (id_docente_revisor) {
            const [docenteRevisorCheck] = await pool.query('SELECT id FROM docente WHERE id = ?', [id_docente_revisor]);
            if (docenteRevisorCheck.length === 0) {
                return res.status(400).json({ message: 'Docente revisor no encontrado' });
            }
        }

        if (fecha_entrega && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_entrega)) {
            return res.status(400).json({ message: 'Formato de fecha_entrega inválido (use YYYY-MM-DD)' });
        }
        if (fecha_defensa && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_defensa)) {
            return res.status(400).json({ message: 'Formato de fecha_defensa inválido (use YYYY-MM-DD)' });
        }

        if (calificacion !== undefined && (isNaN(calificacion) || calificacion < 0 || calificacion > 100)) {
            return res.status(400).json({ message: 'Calificación debe ser un número entre 0 y 100' });
        }

        const fields = [];
        const values = [];

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

        const [results] = await pool.query(
            `UPDATE proyecto SET ${fields.join(', ')} WHERE id = ?`,
            [...values, id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Proyecto no encontrado o ningún cambio realizado' });
        }

        const [updatedProyecto] = await pool.query(
            `SELECT 
                p.id,
                p.titulo,
                p.linea_investigacion,
                p.area_conocimiento,
                p.calificacion,
                p.fecha_entrega,
                p.fecha_defensa,
                p.resumen,
                p.observacion,
                p.created_at,
                p.updated_at,
                e.numero_matricula,
                per_e.nombres AS estudiante_nombres,
                per_e.apellidopat AS estudiante_apellidopat,
                per_e.apellidomat AS estudiante_apellidomat,
                d.numero_item AS guia_numero_item,
                per_d.nombres AS guia_nombres,
                per_d.apellidopat AS guia_apellidopat,
                per_d.apellidomat AS guia_apellidomat,
                d_revisor.numero_item AS revisor_numero_item,
                per_d_revisor.nombres AS revisor_nombres,
                per_d_revisor.apellidopat AS revisor_apellidopat,
                per_d_revisor.apellidomat AS revisor_apellidomat
             FROM proyecto p
             LEFT JOIN estudiante e ON p.id_estudiante = e.id
             LEFT JOIN persona per_e ON e.per_id = per_e.id
             LEFT JOIN docente d ON p.id_docente_guia = d.id
             LEFT JOIN persona per_d ON d.per_id = per_d.id
             LEFT JOIN docente d_revisor ON p.id_docente_revisor = d_revisor.id
             LEFT JOIN persona per_d_revisor ON d_revisor.per_id = per_d_revisor.id
             WHERE p.id = ?`,
            [id]
        );

        res.json({
            message: 'Proyecto actualizado',
            data: updatedProyecto[0]
        });
    } catch (error) {
        console.error('Error updating proyecto:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: estudiante o docente no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Entrada duplicada en el proyecto' });
        }
        res.status(500).json({ message: `Error al actualizar proyecto: ${error.message}` });
    }
};

export const deleteProyecto = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM proyecto WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.json({ message: 'Proyecto eliminado' });
    } catch (error) {
        console.error('Error deleting proyecto:', error);
        res.status(500).json({ message: 'Error al eliminar proyecto' });
    }
};