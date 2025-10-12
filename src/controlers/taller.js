import { connect } from '../database';

export const getTalleres = async (req, res) => {
    const pool = await connect();
    const { titulo, tipo_taller, fecha_realizacion, page = 1, limit = 10 } = req.query;

    try {
        // Construir la consulta base
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

        // Agregar condiciones de filtro
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

        // Agregar ordenamiento
        query += ' ORDER BY t.fecha_realizacion DESC';

        // Agregar paginación
        const offset = (page - 1) * limit;
        query += ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        // Ejecutar la consulta
        const [rows] = await pool.query(query, params);

        // Obtener el total de talleres para paginación
        const [countResult] = await pool.query(
            `SELECT COUNT(*) as total 
             FROM taller t
             ${conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''}`,
            params.slice(0, params.length - 2) // Excluir parámetros de paginación
        );
        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        // Responder según los resultados
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
        // Validar que el ID sea un número entero positivo
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID del taller inválido' });
        }

        // Ejecutar la consulta
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

        // Verificar si se encontró el taller
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }

        // Devolver el taller encontrado
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
        // Validar campos requeridos
        if (!titulo || !id_metodologia || !tipo_taller || !fecha_realizacion) {
            return res.status(400).json({ message: 'Faltan campos requeridos: titulo, id_metodologia, tipo_taller, fecha_realizacion' });
        }

        // Validar formato de fecha (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_realizacion)) {
            return res.status(400).json({ message: 'Formato de fecha_realizacion inválido (use YYYY-MM-DD)' });
        }

        // Validar que id_metodologia exista
        const [metodologiaCheck] = await pool.query('SELECT id FROM metodologia WHERE id = ?', [id_metodologia]);
        if (metodologiaCheck.length === 0) {
            return res.status(400).json({ message: 'Metodología no encontrada' });
        }

        // Validar tipo_taller (asumiendo valores permitidos: 'Teórico', 'Práctico', 'Mixto')
        const validTipos = ['Teórico', 'Práctico', 'Mixto'];
        if (!validTipos.includes(tipo_taller)) {
            return res.status(400).json({ message: `Tipo de taller inválido. Use: ${validTipos.join(', ')}` });
        }

        // Insertar en la tabla taller
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

        // Devolver la respuesta con los datos insertados
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
        // Validar que el ID sea un número válido
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID del taller inválido' });
        }

        // Verificar que el taller exista
        const [tallerCheck] = await pool.query('SELECT id FROM taller WHERE id = ?', [id]);
        if (tallerCheck.length === 0) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }

        // Validar que al menos un campo se proporcione para actualizar
        if (!titulo && !id_metodologia && !tipo_taller && evaluacion_final === undefined && 
            duracion === undefined && !resultado && !fecha_realizacion) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar' });
        }

        // Validar id_metodologia si se proporciona
        if (id_metodologia) {
            const [metodologiaCheck] = await pool.query('SELECT id FROM metodologia WHERE id = ?', [id_metodologia]);
            if (metodologiaCheck.length === 0) {
                return res.status(400).json({ message: 'Metodología no encontrada' });
            }
        }

        // Validar formato de fecha si se proporciona
        if (fecha_realizacion && !/^\d{4}-\d{2}-\d{2}$/.test(fecha_realizacion)) {
            return res.status(400).json({ message: 'Formato de fecha_realizacion inválido (use YYYY-MM-DD)' });
        }

        // Validar tipo_taller si se proporciona
        if (tipo_taller) {
            const validTipos = ['Teórico', 'Práctico', 'Mixto'];
            if (!validTipos.includes(tipo_taller)) {
                return res.status(400).json({ message: `Tipo de taller inválido. Use: ${validTipos.join(', ')}` });
            }
        }

        // Construir la consulta de actualización dinámicamente
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

        // Ejecutar la consulta de actualización
        const [results] = await pool.query(
            `UPDATE taller SET ${fields.join(', ')} WHERE id = ?`,
            [...values, id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Taller no encontrado o ningún cambio realizado' });
        }

        // Obtener el taller actualizado
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