import { connect } from '../database';

export const getPagos = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT p.*, e.ru, per.nombres, per.apellidopat, per.apellidomat
            FROM pago p
            JOIN estudiante e ON p.id_estudiante = e.id
            JOIN persona per ON e.per_id = per.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching pagos:', error);
        res.status(500).json({ message: 'Error al obtener pagos' });
    }
};

export const getPago = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT p.*, e.ru, per.nombres, per.apellidopat, per.apellidomat
            FROM pago p
            JOIN estudiante e ON p.id_estudiante = e.id
            JOIN persona per ON e.per_id = per.id
            WHERE p.id = ?
        `, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Pago no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching pago:', error);
        res.status(500).json({ message: 'Error al obtener pago' });
    }
};

export const getPagoEstudiante = async (req, res) => {
    const pool = await connect();
    const { id_estudiante } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT p.*, e.ru, per.nombres, per.apellidopat, per.apellidomat
            FROM pago p
            JOIN estudiante e ON p.id_estudiante = e.id
            JOIN persona per ON e.per_id = per.id
            WHERE p.id_estudiante = ?
            ORDER BY p.fecha DESC
        `, [id_estudiante]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching pagos del estudiante:', error);
        res.status(500).json({ message: 'Error al obtener pagos del estudiante' });
    }
};

export const createPago = async (req, res) => {
    const pool = await connect();
    const { id_estudiante, monto, metodo, comprobante, fecha } = req.body;

    try {

        if (!id_estudiante || !monto || !fecha) {
            return res.status(400).json({ message: 'Faltan campos requeridos: id_estudiante, monto, fecha' });
        }

        const [estudianteCheck] = await pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
        if (estudianteCheck.length === 0) {
            return res.status(400).json({ message: 'Estudiante no encontrado' });
        }

        const parsedMonto = parseFloat(monto);
        if (isNaN(parsedMonto) || parsedMonto <= 0) {
            return res.status(400).json({ message: 'Monto inválido: debe ser un número positivo' });
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            return res.status(400).json({ message: 'Formato de fecha inválido (use YYYY-MM-DD)' });
        }

        const validMetodos = ['efectivo', 'transferencia', 'tarjeta'];
        if (metodo && !validMetodos.includes(metodo)) {
            return res.status(400).json({ message: `Método inválido. Use: ${validMetodos.join(', ')}` });
        }

        if (comprobante && comprobante.length > 100) {
            return res.status(400).json({ message: 'El comprobante excede el límite de 100 caracteres' });
        }

        const [results] = await pool.query(
            `INSERT INTO pago (
                id_estudiante, 
                monto, 
                metodo, 
                comprobante, 
                fecha
            ) VALUES (?, ?, ?, ?, ?)`,
            [id_estudiante, parsedMonto, metodo || 'efectivo', comprobante || null, fecha]
        );

        res.json({
            id: results.insertId,
            id_estudiante,
            monto: parsedMonto,
            metodo: metodo || 'efectivo',
            comprobante,
            fecha
        });
    } catch (error) {
        console.error('Error creating pago:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: estudiante no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Entrada duplicada en pago' });
        }
        res.status(500).json({ message: `Error al crear pago: ${error.message}` });
    }
};

export const updatePago = async (req, res) => {
    const pool = await connect();
    const { id_estudiante, monto, metodo, comprobante, fecha } = req.body;
    const id = parseInt(req.params.id);

    try {
        
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID del pago inválido' });
        }

        const [pagoCheck] = await pool.query('SELECT id FROM pago WHERE id = ?', [id]);
        if (pagoCheck.length === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        if (!id_estudiante && !monto && metodo === undefined && comprobante === undefined && !fecha) {
            return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar' });
        }

        if (id_estudiante) {
            const [estudianteCheck] = await pool.query('SELECT id FROM estudiante WHERE id = ?', [id_estudiante]);
            if (estudianteCheck.length === 0) {
                return res.status(400).json({ message: 'Estudiante no encontrado' });
            }
        }

        if (monto) {
            const parsedMonto = parseFloat(monto);
            if (isNaN(parsedMonto) || parsedMonto <= 0) {
                return res.status(400).json({ message: 'Monto inválido: debe ser un número positivo' });
            }
        }

        if (fecha && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
            return res.status(400).json({ message: 'Formato de fecha inválido (use YYYY-MM-DD)' });
        }

        const validMetodos = ['efectivo', 'transferencia', 'tarjeta'];
        if (metodo && !validMetodos.includes(metodo)) {
            return res.status(400).json({ message: `Método inválido. Use: ${validMetodos.join(', ')}` });
        }

        if (comprobante && comprobante.length > 100) {
            return res.status(400).json({ message: 'El comprobante excede el límite de 100 caracteres' });
        }

        const fields = [];
        const values = [];

        if (id_estudiante) {
            fields.push('id_estudiante = ?');
            values.push(id_estudiante);
        }
        if (monto) {
            fields.push('monto = ?');
            values.push(parseFloat(monto));
        }
        if (metodo !== undefined) {
            fields.push('metodo = ?');
            values.push(metodo);
        }
        if (comprobante !== undefined) {
            fields.push('comprobante = ?');
            values.push(comprobante);
        }
        if (fecha) {
            fields.push('fecha = ?');
            values.push(fecha);
        }

        const [results] = await pool.query(
            `UPDATE pago SET ${fields.join(', ')} WHERE id = ?`,
            [...values, id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Pago no encontrado o ningún cambio realizado' });
        }

        const [updatedPago] = await pool.query(
            `SELECT 
                p.id,
                p.id_estudiante,
                p.monto,
                p.metodo,
                p.comprobante,
                p.fecha,
                p.created_at,
                p.updated_at,
                e.ru,
                e_2.nombres AS estudiante_nombres,
                e_2.apellidopat AS estudiante_apellidopat,
                e_2.apellidomat AS estudiante_apellidomat
             FROM pago p
             LEFT JOIN estudiante e ON p.id_estudiante = e.id
             LEFT JOIN persona e_2 ON e.per_id = e_2.id
             WHERE p.id = ?`,
            [id]
        );

        res.json({
            message: 'Pago actualizado',
            data: updatedPago[0]
        });
    } catch (error) {
        console.error('Error updating pago:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: estudiante no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Entrada duplicada en pago' });
        }
        res.status(500).json({ message: `Error al actualizar pago: ${error.message}` });
    }
};

export const deletePago = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM pago WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Pago no encontrado' });
        res.json({ message: 'Pago eliminado' });
    } catch (error) {
        console.error('Error deleting pago:', error);
        res.status(500).json({ message: 'Error al eliminar pago' });
    }
};