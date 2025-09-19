import { connect } from '../database';

export const getObservaciones = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT o.*, e.numero_matricula, p.nombres, p.apellidopat, p.apellidomat
            FROM observacion o
            JOIN estudiante e ON o.id_estudiante = e.id
            JOIN persona p ON e.per_id = p.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching observaciones:', error);
        res.status(500).json({ message: 'Error al obtener observaciones' });
    }
};

export const getObservacion = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT o.*, e.numero_matricula, p.nombres, p.apellidopat, p.apellidomat
            FROM observacion o
            JOIN estudiante e ON o.id_estudiante = e.id
            JOIN persona p ON e.per_id = p.id
            WHERE o.id = ?
        `, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Observación no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching observacion:', error);
        res.status(500).json({ message: 'Error al obtener observación' });
    }
};

export const createObservacion = async (req, res) => {
    const pool = await connect();
    const { id_estudiante, contenido, autor, fecha } = req.body;

    try {
        // Validar campos requeridos
        if (!id_estudiante || !contenido || !fecha) {
            return res.status(400).json({ message: 'Faltan campos requeridos: id_estudiante, contenido, fecha' });
        }

        // Validar formato de fecha (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            return res.status(400).json({ message: 'Formato de fecha inválido (use YYYY-MM-DD)' });
        }

        // Validar id_estudiante
        const [estudianteCheck] = await pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        if (estudianteCheck.length === 0) {
            return res.status(400).json({ message: 'Estudiante no encontrado' });
        }

        // Validar longitud de contenido y autor (si se proporciona)
        if (contenido.length > 500) { // Ajusta según el esquema
            return res.status(400).json({ message: 'El contenido excede el límite de 500 caracteres' });
        }
        if (autor && autor.length > 100) { // Ajusta según el esquema
            return res.status(400).json({ message: 'El autor excede el límite de 100 caracteres' });
        }

        // Insertar en observacion
        const [results] = await pool.query(
            `INSERT INTO observacion (
                id_estudiante, 
                contenido, 
                autor, 
                fecha
            ) VALUES (?, ?, ?, ?)`,
            [id_estudiante, contenido, autor || null, fecha]
        );

        // Devolver el registro insertado
        res.json({
            id: results.insertId,
            id_estudiante,
            contenido,
            autor,
            fecha
        });
    } catch (error) {
        console.error('Error creating observacion:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: estudiante no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Entrada duplicada en observacion' });
        }
        res.status(500).json({ message: `Error al crear observación: ${error.message}` });
    }
};

export const updateObservacion = async (req, res) => {
    const pool = await connect();
    const { id_estudiante, contenido, autor, fecha } = req.body;
    const id = parseInt(req.params.id);

    try {
        // Validar que el ID sea un número válido
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID de la observación inválido' });
        }

        // Verificar que la observación exista
        const [observacionCheck] = await pool.query('SELECT id FROM observacion WHERE id = ?', [id]);
        if (observacionCheck.length === 0) {
            return res.status(404).json({ message: 'Observación no encontrada' });
        }

        // Validar que al menos un campo se proporcione
        if (!id_estudiante && !contenido && autor === undefined && !fecha) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar' });
        }

        // Validar id_estudiante si se proporciona
        if (id_estudiante) {
            const [estudianteCheck] = await pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
            if (estudianteCheck.length === 0) {
                return res.status(400).json({ message: 'Estudiante no encontrado' });
            }
        }

        // Validar formato de fecha si se proporciona
        if (fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            return res.status(400).json({ message: 'Formato de fecha inválido (use YYYY-MM-DD)' });
        }

        // Validar longitud de contenido y autor si se proporcionan
        if (contenido && contenido.length > 500) {
            return res.status(400).json({ message: 'El contenido excede el límite de 500 caracteres' });
        }
        if (autor && autor.length > 100) {
            return res.status(400).json({ message: 'El autor excede el límite de 100 caracteres' });
        }

        // Construir la consulta de actualización dinámicamente
        const fields = [];
        const values = [];

        if (id_estudiante) {
            fields.push('id_estudiante = ?');
            values.push(id_estudiante);
        }
        if (contenido) {
            fields.push('contenido = ?');
            values.push(contenido);
        }
        if (autor !== undefined) {
            fields.push('autor = ?');
            values.push(autor);
        }
        if (fecha) {
            fields.push('fecha = ?');
            values.push(fecha);
        }

        // Ejecutar la consulta de actualización
        const [results] = await pool.query(
            `UPDATE observacion SET ${fields.join(', ')} WHERE id = ?`,
            [...values, id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Observación no encontrada o ningún cambio realizado' });
        }

        // Obtener la observación actualizada con datos relacionados
        const [updatedObservacion] = await pool.query(
            `SELECT 
                o.id,
                o.id_estudiante,
                o.contenido,
                o.autor,
                o.fecha,
                o.created_at,
                o.updated_at,
                e.numero_matricula,
                p.nombres AS estudiante_nombres,
                p.apellidopat AS estudiante_apellidopat,
                p.apellidomat AS estudiante_apellidomat
             FROM observacion o
             LEFT JOIN estudiante e ON o.id_estudiante = e.id
             LEFT JOIN persona p ON e.per_id = p.id
             WHERE o.id = ?`,
            [id]
        );

        res.json({
            message: 'Observación actualizada',
            data: updatedObservacion[0]
        });
    } catch (error) {
        console.error('Error updating observacion:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: estudiante no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Entrada duplicada en observacion' });
        }
        res.status(500).json({ message: `Error al actualizar observación: ${error.message}` });
    }
};

export const deleteObservacion = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM observacion WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Observación no encontrada' });
        res.json({ message: 'Observación eliminada' });
    } catch (error) {
        console.error('Error deleting observacion:', error);
        res.status(500).json({ message: 'Error al eliminar observación' });
    }
};