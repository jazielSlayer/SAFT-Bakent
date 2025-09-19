import { connect } from '../database';

export const getPersonas = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM persona");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching personas:', error);
        res.status(500).json({ message: 'Error al obtener personas' });
    }
};

export const getPersona = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM persona WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Persona no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching persona:', error);
        res.status(500).json({ message: 'Error al obtener persona' });
    }
};

export const createPersona = async (req, res) => {
    const pool = await connect();
    const { nombres, apellidopat, apellidomat, carnet, direccion, telefono, correo, fecha_nacimiento, estado } = req.body;
    try {
        const [results] = await pool.query(
            "INSERT INTO persona (nombres, apellidopat, apellidomat, carnet, direccion, telefono, correo, fecha_nacimiento, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [nombres, apellidopat, apellidomat, carnet, direccion, telefono, correo, fecha_nacimiento, estado || 1]
        );
        res.json({ id: results.insertId, nombres, apellidopat, apellidomat, carnet, direccion, telefono, correo, fecha_nacimiento, estado });
    } catch (error) {
        console.error('Error creating persona:', error);
        res.status(500).json({ message: 'Error al crear persona' });
    }
};

export const updatePersona = async (req, res) => {
    const pool = await connect();
    const { nombres, apellidopat, apellidomat, carnet, direccion, telefono, correo, fecha_nacimiento, estado } = req.body;
    try {
        const [results] = await pool.query(
            "UPDATE persona SET nombres = ?, apellidopat = ?, apellidomat = ?, carnet = ?, direccion = ?, telefono = ?, correo = ?, fecha_nacimiento = ?, estado = ? WHERE id = ?",
            [nombres, apellidopat, apellidomat, carnet, direccion, telefono, correo, fecha_nacimiento, estado, req.params.id]
        );
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Persona no encontrada' });
        res.json({ message: 'Persona actualizada' });
    } catch (error) {
        console.error('Error updating persona:', error);
        res.status(500).json({ message: 'Error al actualizar persona' });
    }
};

export const deletePersona = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM persona WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Persona no encontrada' });
        res.json({ message: 'Persona eliminada' });
    } catch (error) {
        console.error('Error deleting persona:', error);
        res.status(500).json({ message: 'Error al eliminar persona' });
    }
};