import { connect } from '../database';

export const getPlanteles = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT pa.*, p.nombres, p.apellidopat, p.apellidomat
            FROM plantel_administrativo pa
            JOIN persona p ON pa.per_id = p.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching planteles:', error);
        res.status(500).json({ message: 'Error al obtener planteles' });
    }
};

export const getPlantel = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT pa.*, p.nombres, p.apellidopat, p.apellidomat
            FROM plantel_administrativo pa
            JOIN persona p ON pa.per_id = p.id
            WHERE pa.id = ?
        `, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Plantel no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching plantel:', error);
        res.status(500).json({ message: 'Error al obtener plantel' });
    }
};

export const createPlantel = async (req, res) => {
    const pool = await connect();
    const { per_id, cargo, unidad, estado } = req.body;
    try {
        const [results] = await pool.query(
            "INSERT INTO plantel_administrativo (per_id, cargo, unidad, estado) VALUES (?, ?, ?, ?)",
            [per_id, cargo, unidad, estado || 0]
        );
        res.json({ id: results.insertId, per_id, cargo, unidad, estado });
    } catch (error) {
        console.error('Error creating plantel:', error);
        res.status(500).json({ message: 'Error al crear plantel' });
    }
};

export const updatePlantel = async (req, res) => {
    const pool = await connect();
    const { per_id, cargo, unidad, estado } = req.body;
    try {
        const [results] = await pool.query(
            "UPDATE plantel_administrativo SET per_id = ?, cargo = ?, unidad = ?, estado = ? WHERE id = ?",
            [per_id, cargo, unidad, estado, req.params.id]
        );
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Plantel no encontrado' });
        res.json({ message: 'Plantel actualizado' });
    } catch (error) {
        console.error('Error updating plantel:', error);
        res.status(500).json({ message: 'Error al actualizar plantel' });
    }
};

export const deletePlantel = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM plantel_administrativo WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Plantel no encontrado' });
        res.json({ message: 'Plantel eliminado' });
    } catch (error) {
        console.error('Error deleting plantel:', error);
        res.status(500).json({ message: 'Error al eliminar plantel' });
    }
};