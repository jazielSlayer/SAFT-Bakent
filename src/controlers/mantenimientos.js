import { connect } from '../database';

export const getMaintenances = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM mantenimiento");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching maintenances:', error);
        res.status(500).json({ message: 'Error al obtener mantenimientos' });
    }
};

export const getMaintenance = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM mantenimiento WHERE mantenimiento_id = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Mantenimiento no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching maintenance:', error);
        res.status(500).json({ message: 'Error al obtener mantenimiento' });
    }
};

export const getMaintenanceCount = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT COUNT(*) AS count FROM mantenimiento");
        res.json(rows[0].count);
    } catch (error) {
        console.error('Error fetching maintenance count:', error);
        res.status(500).json({ message: 'Error al contar mantenimientos' });
    }
};

export const saveMaintenance = async (req, res) => {
    const pool = await connect();
    try {
        const {
            equipo_id,
            fecha_inicio,
            fecha_fin,
            descripcion,
            tecnico,
            costo
        } = req.body;

        const [results] = await pool.query(
            "INSERT INTO mantenimiento (equipo_id, fecha_inicio, fecha_fin, descripcion, tecnico, costo) VALUES (?, ?, ?, ?, ?, ?)",
            [
                equipo_id,
                fecha_inicio,
                fecha_fin,
                descripcion,
                tecnico,
                costo
            ]
        );
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error('Error saving maintenance:', error);
        res.status(500).json({ message: 'Error al guardar mantenimiento' });
    }
};

export const deleteMaintenance = async (req, res) => {
    const pool = await connect();
    try {
        const [result] = await pool.query("DELETE FROM mantenimiento WHERE mantenimiento_id = ?", [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mantenimiento no encontrado' });
        }
        res.json({ message: 'Mantenimiento eliminado' });
    } catch (error) {
        console.error('Error deleting maintenance:', error);
        res.status(500).json({ message: 'Error al eliminar mantenimiento' });
    }
};

export const updateMaintenance = async (req, res) => {
    const pool = await connect();
    try {
        const [result] = await pool.query("UPDATE mantenimiento SET ? WHERE mantenimiento_id = ?", [req.body, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mantenimiento no encontrado' });
        }
        res.json({ message: 'Mantenimiento actualizado' });
    } catch (error) {
        console.error('Error updating maintenance:', error);
        res.status(500).json({ message: 'Error al actualizar mantenimiento' });
    }
};