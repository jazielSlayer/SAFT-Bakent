import { connect } from '../database';

export const getModulos = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT m.*, d.numero_item, p.nombres, p.apellidopat, p.apellidomat, met.nombre AS metodologia_nombre
            FROM modulo m
            JOIN docente d ON m.id_docente = d.id
            JOIN persona p ON d.per_id = p.id
            JOIN metodologia met ON m.id_metodologia = met.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching modulos:', error);
        res.status(500).json({ message: 'Error al obtener módulos' });
    }
};

export const getModulo = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT m.*, d.numero_item, p.nombres, p.apellidopat, p.apellidomat, met.nombre AS metodologia_nombre
            FROM modulo m
            JOIN docente d ON m.id_docente = d.id
            JOIN persona p ON d.per_id = p.id
            JOIN metodologia met ON m.id_metodologia = met.id
            WHERE m.id = ?
        `, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Módulo no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching modulo:', error);
        res.status(500).json({ message: 'Error al obtener módulo' });
    }
};

export const createModulo = async (req, res) => {
    const pool = await connect();
    const { codigo, nombre, id_docente, id_metodologia, duracion, descripcion, fecha_inicio, fecha_finalizacion } = req.body;
    try {
        const [results] = await pool.query(
            "INSERT INTO modulo (codigo, nombre, id_docente, id_metodologia, duracion, descripcion, fecha_inicio, fecha_finalizacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [codigo, nombre, id_docente, id_metodologia, duracion, descripcion || null, fecha_inicio, fecha_finalizacion]
        );
        res.json({ id: results.insertId, codigo, nombre, id_docente, id_metodologia, duracion, descripcion, fecha_inicio, fecha_finalizacion });
    } catch (error) {
        console.error('Error creating modulo:', error);
        res.status(500).json({ message: 'Error al crear módulo' });
    }
};

export const updateModulo = async (req, res) => {
    const pool = await connect();
    const { codigo, nombre, id_docente, id_metodologia, duracion, descripcion, fecha_inicio, fecha_finalizacion } = req.body;
    try {
        const [results] = await pool.query(
            "UPDATE modulo SET codigo = ?, nombre = ?, id_docente = ?, id_metodologia = ?, duracion = ?, descripcion = ?, fecha_inicio = ?, fecha_finalizacion = ? WHERE id = ?",
            [codigo, nombre, id_docente, id_metodologia, duracion, descripcion, fecha_inicio, fecha_finalizacion, req.params.id]
        );
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Módulo no encontrado' });
        res.json({ message: 'Módulo actualizado' });
    } catch (error) {
        console.error('Error updating modulo:', error);
        res.status(500).json({ message: 'Error al actualizar módulo' });
    }
};

export const deleteModulo = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM modulo WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Módulo no encontrado' });
        res.json({ message: 'Módulo eliminado' });
    } catch (error) {
        console.error('Error deleting modulo:', error);
        res.status(500).json({ message: 'Error al eliminar módulo' });
    }
};