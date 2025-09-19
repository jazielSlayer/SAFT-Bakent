import { connect } from '../database';

export const getProgramas = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM programa_academico");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching programas:', error);
        res.status(500).json({ message: 'Error al obtener programas académicos' });
    }
};

export const getPrograma = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM programa_academico WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Programa académico no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching programa:', error);
        res.status(500).json({ message: 'Error al obtener programa académico' });
    }
};

export const createPrograma = async (req, res) => {
    const pool = await connect();
    const { codigo, nombre_programa, modalidad, facultad, nivel, estado } = req.body;
    try {
        const [results] = await pool.query(
            "INSERT INTO programa_academico (codigo, nombre_programa, modalidad, facultad, nivel, estado) VALUES (?, ?, ?, ?, ?, ?)",
            [codigo, nombre_programa, modalidad, facultad, nivel, estado || 0]
        );
        res.json({ id: results.insertId, codigo, nombre_programa, modalidad, facultad, nivel, estado });
    } catch (error) {
        console.error('Error creating programa:', error);
        res.status(500).json({ message: 'Error al crear programa académico' });
    }
};

export const updatePrograma = async (req, res) => {
    const pool = await connect();
    const { codigo, nombre_programa, modalidad, facultad, nivel, estado } = req.body;
    try {
        const [results] = await pool.query(
            "UPDATE programa_academico SET codigo = ?, nombre_programa = ?, modalidad = ?, facultad = ?, nivel = ?, estado = ? WHERE id = ?",
            [codigo, nombre_programa, modalidad, facultad, nivel, estado, req.params.id]
        );
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Programa académico no encontrado' });
        res.json({ message: 'Programa académico actualizado' });
    } catch (error) {
        console.error('Error updating programa:', error);
        res.status(500).json({ message: 'Error al actualizar programa académico' });
    }
};

export const deletePrograma = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM programa_academico WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Programa académico no encontrado' });
        res.json({ message: 'Programa académico eliminado' });
    } catch (error) {
        console.error('Error deleting programa:', error);
        res.status(500).json({ message: 'Error al eliminar programa académico' });
    }
};