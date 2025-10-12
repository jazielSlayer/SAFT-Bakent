import { connect } from '../database';

export const getTalleres = async (req, res) => {
    const pool = await connect();
    const { titulo, tipo_taller, fecha_realizacion, page = 1, limit = 10 } = req.query;

    try {
        let query = `
            SELECT 
                t.id,
                t.titulo,
                t.id_metodologia,        
                t.tipo_taller,
                t.evaluacion_final,
                t.duracion,
                t.resultado,
                t.fecha_realizacion,
                m.nombre AS metodologia_nombre
            FROM taller t
            LEFT JOIN metodologia m ON t.id_metodologia = m.id
        `;

        const conditions = [];
        const params = [];

        if (titulo) {
            conditions.push('t.titulo LIKE ?');
            params.push(`%${titulo}%`);
        }
        if (tipo_taller) {
            conditions.push('t.tipo_taller LIKE ?');
            params.push(`%${tipo_taller}%`);
        }
        if (fecha_realizacion) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_realizacion)) {
                return res.status(400).json({ message: 'Formato de fecha_realizacion inválido (use YYYY-MM-DD)' });
            }
            conditions.push('t.fecha_realizacion = ?');
            params.push(fecha_realizacion);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY t.fecha_realizacion DESC';

        const offset = (page - 1) * limit;
        query += ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [rows] = await pool.query(query, params);

        const [countResult] = await pool.query(
            `SELECT COUNT(*) as total 
             FROM taller t
             ${conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''}`,
            params.slice(0, params.length - 2) 
        );
        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        if (rows.length === 0) {
            return res.status(200).json({ 
                message: 'No se encontraron talleres', 
                data: [], 
                pagination: { page: parseInt(page), limit: parseInt(limit), totalItems, totalPages }
            });
        }

        res.json({
            data: rows,
            pagination: { page: parseInt(page), limit: parseInt(limit), totalItems, totalPages }
        });
    } catch (error) {
        console.error('Error fetching talleres:', error);
        if (error.code === 'ER_BAD_FIELD_ERROR') {
            return res.status(500).json({ message: 'Error en la estructura de la consulta SQL: ' + error.message });
        }
        if (error.code === 'ER_NO_SUCH_TABLE') {
            return res.status(500).json({ message: 'Una de las tablas no existe en la base de datos: ' + error.message });
        }
        res.status(500).json({ message: `Error al obtener talleres: ${error.message}` });
    }
};

export const getTaller = async (req, res) => {
    const pool = await connect();
    const id = parseInt(req.params.id);

    try {
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID del taller inválido' });
        }

        const [rows] = await pool.query(`
            SELECT 
                t.id,
                t.titulo,
                t.id_metodologia,        
                t.tipo_taller,
                t.evaluacion_final,
                t.duracion,
                t.resultado,
                t.fecha_realizacion,
                m.nombre AS metodologia_nombre
            FROM taller t
            LEFT JOIN metodologia m ON t.id_metodologia = m.id
            WHERE t.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }
        res.json({
            message: 'Taller encontrado',
            data: rows[0]
        });
    } catch (error) {
        console.error('Error fetching taller:', error);
        if (error.code === 'ER_BAD_FIELD_ERROR') {
            return res.status(500).json({ message: 'Error en la estructura de la consulta SQL: ' + error.message });
        }
        if (error.code === 'ER_NO_SUCH_TABLE') {
            return res.status(500).json({ message: 'Una de las tablas no existe en la base de datos: ' + error.message });
        }
        res.status(500).json({ message: `Error al obtener taller: ${error.message}` });
    }
};

export const createTaller = async (req, res) => {
    const pool = await connect();
    const { 
        titulo, 
        id_metodologia, 
        tipo_taller, 
        evaluacion_final, 
        duracion, 
        resultado,
        fecha_realizacion 
    } = req.body;

    try {
        if (!titulo || !id_metodologia || !tipo_taller || !fecha_realizacion) {
            return res.status(400).json({ message: 'Faltan campos requeridos: titulo, id_metodologia, tipo_taller, fecha_realizacion' });
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_realizacion)) {
            return res.status(400).json({ message: 'Formato de fecha_realizacion inválido (use YYYY-MM-DD)' });
        }
        const [metodologiaCheck] = await pool.query('SELECT id FROM metodologia WHERE id = ?', [id_metodologia]);
        if (metodologiaCheck.length === 0) {
            return res.status(400).json({ message: 'Metodología no encontrada' });
        }

        const validTipos = ['Teórico', 'Práctico', 'Mixto'];
        if (!validTipos.includes(tipo_taller)) {
            return res.status(400).json({ message: `Tipo de taller inválido. Use: ${validTipos.join(', ')}` });
        }

        const [results] = await pool.query(
            `INSERT INTO taller (
                titulo, 
                id_metodologia, 
                tipo_taller, 
                evaluacion_final, 
                duracion, 
                resultado,
                fecha_realizacion
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [titulo, id_metodologia, tipo_taller, evaluacion_final || null, duracion || null, resultado || null, fecha_realizacion]
        );

        res.json({
            id: results.insertId,
            titulo,
            id_metodologia,
            tipo_taller,
            evaluacion_final,
            duracion,
            resultado,
            fecha_realizacion
        });
    } catch (error) {
        console.error('Error creating taller:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: metodología no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Entrada duplicada: el taller ya existe' });
        }
        res.status(500).json({ message: `Error al crear taller: ${error.message}` });
    }
};

export const updateTaller = async (req, res) => {
    const pool = await connect();
    const { 
        titulo, 
        id_metodologia, 
        tipo_taller, 
        evaluacion_final, 
        duracion, 
        resultado,
        fecha_realizacion 
    } = req.body;
    const id = parseInt(req.params.id);

    try {
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID del taller inválido' });
        }

        const [tallerCheck] = await pool.query('SELECT id FROM taller WHERE id = ?', [id]);
        if (tallerCheck.length === 0) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }

        if (!titulo && !id_metodologia && !tipo_taller && evaluacion_final === undefined && 
            duracion === undefined && !resultado && !fecha_realizacion) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar' });
        }

        if (id_metodologia) {
            const [metodologiaCheck] = await pool.query('SELECT id FROM metodologia WHERE id = ?', [id_metodologia]);
            if (metodologiaCheck.length === 0) {
                return res.status(400).json({ message: 'Metodología no encontrada' });
            }
        }

        if (fecha_realizacion && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_realizacion)) {
            return res.status(400).json({ message: 'Formato de fecha_realizacion inválido (use YYYY-MM-DD)' });
        }

        if (tipo_taller) {
            const validTipos = ['Teórico', 'Práctico', 'Mixto'];
            if (!validTipos.includes(tipo_taller)) {
                return res.status(400).json({ message: `Tipo de taller inválido. Use: ${validTipos.join(', ')}` });
            }
        }

        const fields = [];
        const values = [];

        if (titulo) {
            fields.push('titulo = ?');
            values.push(titulo);
        }
        if (id_metodologia) {
            fields.push('id_metodologia = ?');
            values.push(id_metodologia);
        }
        if (tipo_taller) {
            fields.push('tipo_taller = ?');
            values.push(tipo_taller);
        }
        if (evaluacion_final !== undefined) {
            fields.push('evaluacion_final = ?');
            values.push(evaluacion_final);
        }
        if (duracion !== undefined) {
            fields.push('duracion = ?');
            values.push(duracion);
        }
        if (resultado !== undefined) {
            fields.push('resultado = ?');
            values.push(resultado);
        }
        if (fecha_realizacion) {
            fields.push('fecha_realizacion = ?');
            values.push(fecha_realizacion);
        }

        const [results] = await pool.query(
            `UPDATE taller SET ${fields.join(', ')} WHERE id = ?`,
            [...values, id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Taller no encontrado o ningún cambio realizado' });
        }

        const [updatedTaller] = await pool.query(
            `SELECT 
                t.id,
                t.titulo,
                t.tipo_taller,
                t.evaluacion_final,
                t.duracion,
                t.resultado,
                t.fecha_realizacion,
                m.nombre AS metodologia_nombre
             FROM taller t
             LEFT JOIN metodologia m ON t.id_metodologia = m.id
             WHERE t.id = ?`,
            [id]
        );

        res.json({
            message: 'Taller actualizado',
            data: updatedTaller[0]
        });
    } catch (error) {
        console.error('Error updating taller:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: metodología no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Entrada duplicada en el taller' });
        }
        res.status(500).json({ message: `Error al actualizar taller: ${error.message}` });
    }
};

export const deleteTaller = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM taller WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Taller no encontrado' });
        res.json({ message: 'Taller eliminado' });
    } catch (error) {
        console.error('Error deleting taller:', error);
        res.status(500).json({ message: 'Error al eliminar taller' });
    }
};