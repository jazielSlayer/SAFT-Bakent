import { connect } from '../database';

export const getHistoriales = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM historial_auditoria");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching historiales:', error);
        res.status(500).json({ message: 'Error al obtener historiales' });
    }
};

export const getHistorial = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM historial_auditoria WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Historial no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching historial:', error);
        res.status(500).json({ message: 'Error al obtener historial' });
    }
};

export const createHistorial = async (req, res) => {
    const pool = await connect();
    const { entidad_afectada, descripcion_operacion, fecha_operacion, usuario } = req.body;
    try {
        const [results] = await pool.query(
            "INSERT INTO historial_auditoria (entidad_afectada, descripcion_operacion, fecha_operacion, usuario) VALUES (?, ?, ?, ?)",
            [entidad_afectada, descripcion_operacion, fecha_operacion, usuario]
        );
        res.json({ id: results.insertId, entidad_afectada, descripcion_operacion, fecha_operacion, usuario });
    } catch (error) {
        console.error('Error creating historial:', error);
        res.status(500).json({ message: 'Error al crear historial' });
    }
};

export const updateHistorial = async (req, res) => {
    const pool = await connect();
    const { entidad_afectada, descripcion_operacion, fecha_operacion, usuario } = req.body;
    try {
        const [results] = await pool.query(
            "UPDATE historial_auditoria SET entidad_afectada = ?, descripcion_operacion = ?, fecha_operacion = ?, usuario = ? WHERE id = ?",
            [entidad_afectada, descripcion_operacion, fecha_operacion, usuario, req.params.id]
        );
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Historial no encontrado' });
        res.json({ message: 'Historial actualizado' });
    } catch (error) {
        console.error('Error updating historial:', error);
        res.status(500).json({ message: 'Error al actualizar historial' });
    }
};

export const deleteHistorial = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM historial_auditoria WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Historial no encontrado' });
        res.json({ message: 'Historial eliminado' });
    } catch (error) {
        console.error('Error deleting historial:', error);
        res.status(500).json({ message: 'Error al eliminar historial' });
    }
};