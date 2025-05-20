import { connect } from '../database';

export const getTeams = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM equipos");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Error al obtener equipos' });
    }
};

export const getTeam = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM equipos WHERE equipo_id = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching team:', error);
        res.status(500).json({ message: 'Error al obtener equipo' });
    }
};

export const getTeamCount = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT COUNT(*) AS count FROM equipos");
        res.json(rows[0].count);
    } catch (error) {
        console.error('Error fetching team count:', error);
        res.status(500).json({ message: 'Error al contar equipos' });
    }
};

export const saveTeam = async (req, res) => {
    const pool = await connect();
    try {
        const {
            nombre,
            codigo_inventario,
            categoria_id,
            laboratorio_id,
            estado,
            descripcion,
            fecha_adquisicion
        } = req.body;

        const [results] = await pool.query(
            "INSERT INTO equipos (nombre, codigo_inventario, categoria_id, laboratorio_id, estado, descripcion, fecha_adquisicion) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                nombre,
                codigo_inventario,
                categoria_id,
                laboratorio_id,
                estado,
                descripcion,
                fecha_adquisicion
            ]
        );
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error('Error saving team:', error);
        res.status(500).json({ message: 'Error al guardar equipo' });
    }
};

export const deleteTeam = async (req, res) => {
    const pool = await connect();
    try {
        const [result] = await pool.query("DELETE FROM equipos WHERE equipo_id = ?", [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json({ message: 'Equipo eliminado' });
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).json({ message: 'Error al eliminar equipo' });
    }
};

export const updateTeam = async (req, res) => {
    const pool = await connect();
    try {
        const [result] = await pool.query("UPDATE equipos SET ? WHERE equipo_id = ?", [req.body, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json({ message: 'Equipo actualizado' });
    } catch (error) {
        console.error('Error updating team:', error);
        res.status(500).json({ message: 'Error al actualizar equipo' });
    }
};