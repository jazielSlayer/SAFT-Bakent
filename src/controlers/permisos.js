// controllers/permissions.js

import { connect } from '../database';

// Obtener todos los permisos
export const getPermissions = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM permissions");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching permissions:', error);
        res.status(500).json({ message: 'Error al obtener permisos' });
    }
};

// Obtener un permiso por ID
export const getPermission = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM permissions WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Permiso no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching permission:', error);
        res.status(500).json({ message: 'Error al obtener permiso' });
    }
};

// Crear un nuevo permiso
export const createPermission = async (req, res) => {
    const pool = await connect();
    const { name, guard_name } = req.body;
    
    // Validaciones
    if (!name || !guard_name) {
        return res.status(400).json({ message: "Campos obligatorios faltantes: name, guard_name" });
    }

    try {
        const [results] = await pool.query(
            "INSERT INTO permissions (name, guard_name) VALUES (?, ?)",
            [name, guard_name]
        );

        res.json({ 
            id: results.insertId, 
            name, 
            guard_name 
        });
    } catch (error) {
        console.error('Error creating permission:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Permiso ya existe" });
        }
        res.status(500).json({ message: "Error al crear permiso" });
    }
};

// Actualizar un permiso
export const updatePermission = async (req, res) => {
    const pool = await connect();
    try {
        const [permissionRows] = await pool.query("SELECT * FROM permissions WHERE id = ?", [req.params.id]);
        if (permissionRows.length === 0) return res.status(404).json({ message: 'Permiso no encontrado' });

        const permission = permissionRows[0];

        // Solo actualiza los campos enviados, los demás se mantienen igual
        const {
            name = permission.name,
            guard_name = permission.guard_name
        } = req.body;

        await pool.query(
            "UPDATE permissions SET name = ?, guard_name = ? WHERE id = ?",
            [name, guard_name, req.params.id]
        );

        res.json({ message: 'Permiso actualizado' });
    } catch (error) {
        console.error('Error updating permission:', error);
        res.status(500).json({ message: 'Error al actualizar permiso' });
    }
};

// Eliminar un permiso
export const deletePermission = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM permissions WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Permiso no encontrado' });

        await pool.query("DELETE FROM permissions WHERE id = ?", [req.params.id]);
        res.json({ message: 'Permiso eliminado' });
    } catch (error) {
        console.error('Error deleting permission:', error);
        res.status(500).json({ message: 'Error al eliminar permiso' });
    }
};

// Obtener permisos de un rol específico
export const getPermissionsByRole = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT p.* 
            FROM permissions p
            JOIN role_has_permissions rhp ON p.id = rhp.permission_id
            WHERE rhp.role_id = ?
        `, [req.params.roleId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching permissions by role:', error);
        res.status(500).json({ message: 'Error al obtener permisos del rol' });
    }
};

// Asignar un permiso a un rol
export const assignPermissionToRole = async (req, res) => {
    const pool = await connect();
    const { permission_id } = req.body;
    
    if (!permission_id) {
        return res.status(400).json({ message: "permission_id es requerido" });
    }

    try {
        // Verificar si el rol y permiso existen
        const [roleRows] = await pool.query("SELECT * FROM roles WHERE id = ?", [req.params.roleId]);
        if (roleRows.length === 0) return res.status(404).json({ message: 'Rol no encontrado' });

        const [permRows] = await pool.query("SELECT * FROM permissions WHERE id = ?", [permission_id]);
        if (permRows.length === 0) return res.status(404).json({ message: 'Permiso no encontrado' });

        // Verificar si ya está asignado
        const [existing] = await pool.query("SELECT * FROM role_has_permissions WHERE role_id = ? AND permission_id = ?", [req.params.roleId, permission_id]);
        if (existing.length > 0) return res.status(409).json({ message: 'Permiso ya asignado a este rol' });

        await pool.query(
            "INSERT INTO role_has_permissions (permission_id, role_id) VALUES (?, ?)",
            [permission_id, req.params.roleId]
        );

        res.json({ message: 'Permiso asignado al rol' });
    } catch (error) {
        console.error('Error assigning permission to role:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Asignación duplicada" });
        }
        res.status(500).json({ message: "Error al asignar permiso al rol" });
    }
};

// Remover un permiso de un rol
export const removePermissionFromRole = async (req, res) => {
    const pool = await connect();
    const { permission_id } = req.body;
    
    if (!permission_id) {
        return res.status(400).json({ message: "permission_id es requerido" });
    }

    try {
        const [existing] = await pool.query("SELECT * FROM role_has_permissions WHERE role_id = ? AND permission_id = ?", [req.params.roleId, permission_id]);
        if (existing.length === 0) return res.status(404).json({ message: 'Asignación no encontrada' });

        await pool.query(
            "DELETE FROM role_has_permissions WHERE role_id = ? AND permission_id = ?",
            [req.params.roleId, permission_id]
        );

        res.json({ message: 'Permiso removido del rol' });
    } catch (error) {
        console.error('Error removing permission from role:', error);
        res.status(500).json({ message: 'Error al remover permiso del rol' });
    }
};