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
                p.calificacion,          -- Taller 1
                p.calificacion2,         -- Taller 2
                p.calificacion_final,    -- Defensa Final
                p.fecha_entrega,
                p.fecha_defensa,
                p.resumen,
                p.observacion,
                p.created_at,
                p.updated_at,
                e.ru,
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
            ORDER BY p.id DESC
        `);

        res.json(rows.length > 0 ? rows : { message: 'No se encontraron proyectos' });
    } catch (error) {
        console.error('Error fetching proyectos:', error);
        res.status(500).json({ message: 'Error al obtener proyectos' });
    }
};

export const getProyectoEstudiante = async (req, res) => {
    const pool = await connect();
    const { id_estudiante } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.*,
                p.calificacion,
                p.calificacion2,
                p.calificacion_final,
                e.ru,
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
                p.calificacion,
                p.calificacion2,
                p.calificacion_final,
                e.ru,
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
                p.id_estudiante,
                p.id_docente_guia,
                p.id_docente_revisor,
                p.titulo,
                p.linea_investigacion,
                p.area_conocimiento,
                p.calificacion,
                p.calificacion2,
                p.calificacion_final,
                p.fecha_entrega,
                p.fecha_defensa,
                p.resumen,
                p.observacion,
                p.created_at,
                p.updated_at,
                e.ru,
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

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching proyecto by ID:', error);
        res.status(500).json({ message: 'Error al obtener el proyecto' });
    }
};

export const createProyecto = async (req, res) => {
    const pool = await connect();
    const { 
        id_estudiante, id_docente_guia, id_docente_revisor, titulo, 
        linea_investigacion, area_conocimiento, fecha_entrega,
        calificacion = null, calificacion2 = null, calificacion_final = null,
        fecha_defensa = null, resumen = null, observacion = null
    } = req.body;

    try {
        // Validaciones básicas
        if (!id_estudiante || !id_docente_guia || !id_docente_revisor || !titulo || !linea_investigacion || !area_conocimiento || !fecha_entrega) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        // Validar estudiantes y docentes
        const [est] = await pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        const [guia] = await pool.query('SELECT id FROM docente WHERE id = ?', [id_docente_guia]);
        const [revisor] = await pool.query('SELECT id FROM docente WHERE id = ?', [id_docente_revisor]);
        if (est.length === 0 || guia.length === 0 || revisor.length === 0) {
            return res.status(400).json({ message: 'Estudiante o docente no encontrado' });
        }

        const [result] = await pool.query(`
            INSERT INTO proyecto (
                id_estudiante, id_docente_guia, id_docente_revisor, titulo,
                linea_investigacion, area_conocimiento, calificacion, calificacion2, calificacion_final,
                fecha_entrega, fecha_defensa, resumen, observacion
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            id_estudiante, id_docente_guia, id_docente_revisor, titulo,
            linea_investigacion, area_conocimiento, calificacion, calificacion2, calificacion_final,
            fecha_entrega, fecha_defensa, resumen, observacion
        ]);

        res.json({ id: result.insertId, message: 'Proyecto creado exitosamente' });
    } catch (error) {
        console.error('Error creando proyecto:', error);
        res.status(500).json({ message: 'Error al crear proyecto' });
    }
};

export const updateProyecto = async (req, res) => {
    const pool = await connect();
    const { id } = req.params;
    const updates = req.body;

    try {
        const allowedFields = [
            'id_estudiante', 'id_docente_guia', 'id_docente_revisor', 'titulo',
            'linea_investigacion', 'area_conocimiento', 'calificacion', 'calificacion2',
            'calificacion_final', 'fecha_entrega', 'fecha_defensa', 'resumen', 'observacion'
        ];

        const fields = [];
        const values = [];

        for (const field of allowedFields) {
            if (updates[field] !== undefined) {
                fields.push(`${field} = ?`);
                values.push(updates[field]);
            }
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: 'No se enviaron datos para actualizar' });
        }

        fields.push('updated_at = NOW()');
        values.push(id);

        const [result] = await pool.query(
            `UPDATE proyecto SET ${fields.join(', ')} WHERE id = ?`,
            values
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        res.json({ message: 'Proyecto actualizado correctamente' });
    } catch (error) {
        console.error('Error actualizando proyecto:', error);
        res.status(500).json({ message: 'Error al actualizar proyecto' });
    }
};

export const deleteProyecto = async (req, res) => {
    const pool = await connect();
    try {
        const [result] = await pool.query("DELETE FROM proyecto WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proyecto no encontrado' });
        res.json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando proyecto:', error);
        res.status(500).json({ message: 'Error al eliminar proyecto' });
    }
};