// controllers/roles.js

import { connect } from '../database';

// Obtener todos los roles
export const getRoles = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM roles");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Error al obtener roles' });
    }
};

// Obtener un rol por ID
export const getRole = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Rol no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching role:', error);
        res.status(500).json({ message: 'Error al obtener rol' });
    }
};

// Crear un nuevo rol
export const createRole = async (req, res) => {
    const pool = await connect();
    const { name, start_path, is_default, guard_name } = req.body;
    
    // Validaciones
    if (!name || !start_path || !guard_name) {
        return res.status(400).json({ message: "Campos obligatorios faltantes: name, start_path, guard_name" });
    }

    try {
        const [results] = await pool.query(
            "INSERT INTO roles (name, start_path, is_default, guard_name) VALUES (?, ?, ?, ?)",
            [name, start_path, is_default || 0, guard_name]
        );

        res.json({ 
            id: results.insertId, 
            name, 
            start_path, 
            is_default: is_default || 0, 
            guard_name 
        });
    } catch (error) {
        console.error('Error creating role:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Rol ya existe" });
        }
        res.status(500).json({ message: "Error al crear rol" });
    }
};

// Actualizar un rol
export const updateRole = async (req, res) => {
    const pool = await connect();
    try {
        const [roleRows] = await pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        if (roleRows.length === 0) return res.status(404).json({ message: 'Rol no encontrado' });

        const role = roleRows[0];

        // Solo actualiza los campos enviados, los demás se mantienen igual
        const {
            name = role.name,
            start_path = role.start_path,
            is_default = role.is_default,
            guard_name = role.guard_name
        } = req.body;

        await pool.query(
            "UPDATE roles SET name = ?, start_path = ?, is_default = ?, guard_name = ? WHERE id = ?",
            [name, start_path, is_default, guard_name, req.params.id]
        );

        res.json({ message: 'Rol actualizado' });
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ message: 'Error al actualizar rol' });
    }
};

// Eliminar un rol
export const deleteRole = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Rol no encontrado' });

        await pool.query("DELETE FROM roles WHERE id = ?", [req.params.id]);
        res.json({ message: 'Rol eliminado' });
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ message: 'Error al eliminar rol' });
    }
};