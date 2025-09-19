import { connect } from '../database';

export const getDocentes = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT d.*, p.nombres, p.apellidopat, p.apellidomat
            FROM docente d
            JOIN persona p ON d.per_id = p.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching docentes:', error);
        res.status(500).json({ message: 'Error al obtener docentes' });
    }
};

export const getDocente = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT d.*, p.nombres, p.apellidopat, p.apellidomat
            FROM docente d
            JOIN persona p ON d.per_id = p.id
            WHERE d.id = ?
        `, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Docente no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching docente:', error);
        res.status(500).json({ message: 'Error al obtener docente' });
    }
};

export const createDocente = async (req, res) => {
    const pool = await connect();
    const { per_id, numero_item, especialidad, tipo_contrato, estado } = req.body;
    try {
        const [results] = await pool.query(
            "INSERT INTO docente (per_id, numero_item, especialidad, tipo_contrato, estado) VALUES (?, ?, ?, ?, ?)",
            [per_id, numero_item, especialidad, tipo_contrato, estado || 0]
        );
        res.json({ id: results.insertId, per_id, numero_item, especialidad, tipo_contrato, estado });
    } catch (error) {
        console.error('Error creating docente:', error);
        res.status(500).json({ message: 'Error al crear docente' });
    }
};

export const updateDocente = async (req, res) => {
    const pool = await connect();
    const { per_id, numero_item, especialidad, tipo_contrato, estado } = req.body;
    try {
        const [results] = await pool.query(
            "UPDATE docente SET per_id = ?, numero_item = ?, especialidad = ?, tipo_contrato = ?, estado = ? WHERE id = ?",
            [per_id, numero_item, especialidad, tipo_contrato, estado, req.params.id]
        );
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Docente no encontrado' });
        res.json({ message: 'Docente actualizado' });
    } catch (error) {
        console.error('Error updating docente:', error);
        res.status(500).json({ message: 'Error al actualizar docente' });
    }
};

export const deleteDocente = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM docente WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Docente no encontrado' });
        res.json({ message: 'Docente eliminado' });
    } catch (error) {
        console.error('Error deleting docente:', error);
        res.status(500).json({ message: 'Error al eliminar docente' });
    }
};