import { connect } from '../database';

export const getAvances = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT a.*, e.ru, p.nombres, p.apellidopat, p.apellidomat, m.nombre AS modulo_nombre
            FROM avance_estudiante a
            JOIN estudiante e ON a.id_estudiante = e.id
            JOIN persona p ON e.per_id = p.id
            JOIN modulo m ON a.id_modulo = m.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching avances:', error);
        res.status(500).json({ message: 'Error al obtener avances' });
    }
};

export const getAvance = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT a.*, e.ru, p.nombres, p.apellidopat, p.apellidomat, m.nombre AS modulo_nombre
            FROM avance_estudiante a
            JOIN estudiante e ON a.id_estudiante = e.id
            JOIN persona p ON e.per_id = p.id
            JOIN modulo m ON a.id_modulo = m.id
            WHERE a.id = ?
        `, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Avance no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching avance:', error);
        res.status(500).json({ message: 'Error al obtener avance' });
    }
};

export const getAvanceEstudiante = async (req, res) => {
    const pool = await connect();
    try {
        const id_estudiante = parseInt(req.params.id_estudiante);
        if (isNaN(id_estudiante) || id_estudiante <= 0) {
            return res.status(400).json({ message: 'ID de estudiante inválido' });
        }

        const [estudianteCheck] = await pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        if (estudianteCheck.length === 0) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        const [rows] = await pool.query(`
            SELECT 
                a.id,
                a.id_estudiante,
                a.id_modulo,
                a.responsable,
                a.fecha,
                a.estado,
                a.created_at,
                a.updated_at,
                e.ru,
                p.nombres AS estudiante_nombres,
                p.apellidopat AS estudiante_apellidopat,
                p.apellidomat AS estudiante_apellidomat,
                m.nombre AS modulo_nombre
            FROM avance_estudiante a
            JOIN estudiante e ON a.id_estudiante = e.id
            JOIN persona p ON e.per_id = p.id
            JOIN modulo m ON a.id_modulo = m.id
            WHERE a.id_estudiante = ?
        `, [id_estudiante]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron avances para este estudiante' });
        }

        res.json(rows);
    } catch (error) {
        console.error('Error fetching avance estudiante:', error);
        res.status(500).json({ message: 'Error al obtener avances del estudiante' });
    }
};

export const createAvance = async (req, res) => {
    const pool = await connect();
    const { id_estudiante, id_modulo, responsable, fecha, estado } = req.body;

    try {
        
        if (!id_estudiante || !id_modulo || !fecha) {
            return res.status(400).json({ message: 'Faltan campos requeridos: id_estudiante, id_modulo, fecha' });
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            return res.status(400).json({ message: 'Formato de fecha inválido (use YYYY-MM-DD)' });
        }

        const [estudianteCheck] = await pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        if (estudianteCheck.length === 0) {
            return res.status(400).json({ message: 'Estudiante no encontrado' });
        }

        const [moduloCheck] = await pool.query('SELECT id FROM modulo WHERE id = ?', [id_modulo]);
        if (moduloCheck.length === 0) {
            return res.status(400).json({ message: 'Módulo no encontrado' });
        }

        const validEstados = ['completado', 'pendiente', 'en progreso'];
        if (estado && !validEstados.includes(estado)) {
            return res.status(400).json({ message: `Estado inválido. Use: ${validEstados.join(', ')}` });
        }

        const [results] = await pool.query(
            `INSERT INTO avance_estudiante (
                id_estudiante, 
                id_modulo, 
                responsable, 
                fecha, 
                estado
            ) VALUES (?, ?, ?, ?, ?)`,
            [id_estudiante, id_modulo, responsable || null, fecha, estado || 'pendiente']
        );

        res.json({
            id: results.insertId,
            id_estudiante,
            id_modulo,
            responsable,
            fecha,
            estado: estado || 'pendiente'
        });
    } catch (error) {
        console.error('Error creating avance:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: estudiante o módulo no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Entrada duplicada en avance_estudiante' });
        }
        res.status(500).json({ message: `Error al crear avance: ${error.message}` });
    }
};

export const updateAvance = async (req, res) => {
    const pool = await connect();
    const { id_estudiante, id_modulo, responsable, fecha, estado } = req.body;
    const id = parseInt(req.params.id);

    try {
        
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID del avance inválido' });
        }

        const [avanceCheck] = await pool.query('SELECT id FROM avance_estudiante WHERE id = ?', [id]);
        if (avanceCheck.length === 0) {
            return res.status(404).json({ message: 'Avance no encontrado' });
        }

        if (!id_estudiante && !id_modulo && responsable === undefined && !fecha && estado === undefined) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar' });
        }

        if (id_estudiante) {
            const [estudianteCheck] = await pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
            if (estudianteCheck.length === 0) {
                return res.status(400).json({ message: 'Estudiante no encontrado' });
            }
        }

        if (id_modulo) {
            const [moduloCheck] = await pool.query('SELECT id FROM modulo WHERE id = ?', [id_modulo]);
            if (moduloCheck.length === 0) {
                return res.status(400).json({ message: 'Módulo no encontrado' });
            }
        }

        if (fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            return res.status(400).json({ message: 'Formato de fecha inválido (use YYYY-MM-DD)' });
        }

        if (estado) {
            const validEstados = ['completado', 'pendiente', 'en progreso'];
            if (!validEstados.includes(estado)) {
                return res.status(400).json({ message: `Estado inválido. Use: ${validEstados.join(', ')}` });
            }
        }

        const fields = [];
        const values = [];

        if (id_estudiante) {
            fields.push('id_estudiante = ?');
            values.push(id_estudiante);
        }
        if (id_modulo) {
            fields.push('id_modulo = ?');
            values.push(id_modulo);
        }
        if (responsable !== undefined) {
            fields.push('responsable = ?');
            values.push(responsable);
        }
        if (fecha) {
            fields.push('fecha = ?');
            values.push(fecha);
        }
        if (estado) {
            fields.push('estado = ?');
            values.push(estado);
        }

        const [results] = await pool.query(
            `UPDATE avance_estudiante SET ${fields.join(', ')} WHERE id = ?`,
            [...values, id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Avance no encontrado o ningún cambio realizado' });
        }

        const [updatedAvance] = await pool.query(
            `SELECT 
                a.id,
                a.id_estudiante,
                a.id_modulo,
                a.responsable,
                a.fecha,
                a.estado,
                a.created_at,
                a.updated_at,
                e.ru,
                p.nombres AS estudiante_nombres,
                p.apellidopat AS estudiante_apellidopat,
                p.apellidomat AS estudiante_apellidomat,
                m.nombre AS modulo_nombre
             FROM avance_estudiante a
             LEFT JOIN estudiante e ON a.id_estudiante = e.id
             LEFT JOIN persona p ON e.per_id = p.id
             LEFT JOIN modulo m ON a.id_modulo = m.id
             WHERE a.id = ?`,
            [id]
        );

        res.json({
            message: 'Avance actualizado',
            data: updatedAvance[0]
        });
    } catch (error) {
        console.error('Error updating avance:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: estudiante o módulo no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Entrada duplicada en avance_estudiante' });
        }
        res.status(500).json({ message: `Error al actualizar avance: ${error.message}` });
    }
};

export const deleteAvance = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM avance_estudiante WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Avance no encontrado' });
        res.json({ message: 'Avance eliminado' });
    } catch (error) {
        console.error('Error deleting avance:', error);
        res.status(500).json({ message: 'Error al eliminar avance' });
    }
};