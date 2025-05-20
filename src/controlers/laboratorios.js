import { connect } from '../database';

export const getLaboratories = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM laboratorios");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching laboratories:', error);
        res.status(500).json({ message: 'Error al obtener laboratorios' });
    }
};

export const getLaboratory = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM laboratorios WHERE laboratorio_id = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Laboratorio no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching laboratory:', error);
        res.status(500).json({ message: 'Error al obtener laboratorio' });
    }
};

export const getLaboratoryCount = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT COUNT(*) AS count FROM laboratorios");
        res.json(rows[0].count);
    } catch (error) {
        console.error('Error fetching laboratory count:', error);
        res.status(500).json({ message: 'Error al contar laboratorios' });
    }
};

export const saveLaboratory = async (req, res) => {
    const pool = await connect();
    try {
        const {
            nombre,
            ubicacion,
            tipo_laboratorio,
            capacidad,
            responsable_id
        } = req.body;

        const [results] = await pool.query(
            "INSERT INTO laboratorios (nombre, ubicacion, tipo_laboratorio, capacidad, responsable_id) VALUES (?, ?, ?, ?, ?)",
            [
                nombre,
                ubicacion,
                tipo_laboratorio,
                capacidad,
                responsable_id
            ]
        );
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error('Error saving laboratory:', error);
        res.status(500).json({ message: 'Error al guardar laboratorio' });
    }
};

export const deleteLaboratory = async (req, res) => {
    const pool = await connect();
    try {
        const [result] = await pool.query("DELETE FROM laboratorios WHERE laboratorio_id = ?", [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Laboratorio no encontrado' });
        }
        res.json({ message: 'Laboratorio eliminado' });
    } catch (error) {
        console.error('Error deleting laboratory:', error);
        res.status(500).json({ message: 'Error al eliminar laboratorio' });
    }
};

export const updateLaboratory = async (req, res) => {
    const pool = await connect();
    try {
        const [result] = await pool.query("UPDATE laboratorios SET ? WHERE laboratorio_id = ?", [req.body, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Laboratorio no encontrado' });
        }
        res.json({ message: 'Laboratorio actualizado' });
    } catch (error) {
        console.error('Error updating laboratory:', error);
        res.status(500).json({ message: 'Error al actualizar laboratorio' });
    }
};