import { connect } from '../database';

export const getCategories = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM categorias_equipos");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Error al obtener categorías' });
    }
};

export const getCategory = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM categorias_equipos WHERE categoria_id = ?", [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ message: 'Error al obtener categoría' });
    }
};

export const getCategoryCount = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT COUNT(*) FROM categorias_equipos");
        res.json(rows[0]['COUNT(*)']);
    } catch (error) {
        console.error('Error fetching category count:', error);
        res.status(500).json({ message: 'Error al contar categorías' });
    }
};

export const saveCategory = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query(
            "INSERT INTO categorias_equipos (nombre, descripcion) VALUES (?, ?)",
            [req.body.nombre, req.body.descripcion]
        );
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error('Error saving category:', error);
        res.status(500).json({ message: 'Error al guardar categoría' });
    }
};

export const deleteCategory = async (req, res) => {
    const pool = await connect();
    try {
        const [result] = await pool.query("DELETE FROM categorias_equipos WHERE categoria_id = ?", [req.params.id]);
        res.json({ message: 'Categoría eliminada' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Error al eliminar categoría' });
    }
};

export const updateCategory = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("UPDATE categorias_equipos SET ? WHERE categoria_id = ?", [req.body, req.params.id]);
        res.json({ message: 'Categoría actualizada' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Error al actualizar categoría' });
    }
};