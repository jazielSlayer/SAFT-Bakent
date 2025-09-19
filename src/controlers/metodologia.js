import { connect } from '../database';

export const getMetodologias = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM metodologia");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching metodologias:', error);
        res.status(500).json({ message: 'Error al obtener metodologías' });
    }
};

export const getMetodologia = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM metodologia WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Metodología no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching metodologia:', error);
        res.status(500).json({ message: 'Error al obtener metodología' });
    }
};

export const createMetodologia = async (req, res) => {
    const pool = await connect();
    const { nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion } = req.body;
    try {
        const [results] = await pool.query(
            "INSERT INTO metodologia (nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion]
        );
        res.json({ id: results.insertId, nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion });
    } catch (error) {
        console.error('Error creating metodologia:', error);
        res.status(500).json({ message: 'Error al crear metodología' });
    }
};

export const updateMetodologia = async (req, res) => {
    const pool = await connect();
    const { nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion } = req.body;
    try {
        const [results] = await pool.query(
            "UPDATE metodologia SET nombre = ?, descripcion = ?, objetivos = ?, numero_modulos = ?, fecha_inicio = ?, fecha_finalizacion = ? WHERE id = ?",
            [nombre, descripcion, objetivos, numero_modulos, fecha_inicio, fecha_finalizacion, req.params.id]
        );
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Metodología no encontrada' });
        res.json({ message: 'Metodología actualizada' });
    } catch (error) {
        console.error('Error updating metodologia:', error);
        res.status(500).json({ message: 'Error al actualizar metodología' });
    }
};

export const deleteMetodologia = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM metodologia WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Metodología no encontrada' });
        res.json({ message: 'Metodología eliminada' });
    } catch (error) {
        console.error('Error deleting metodologia:', error);
        res.status(500).json({ message: 'Error al eliminar metodología' });
    }
};