import { connect } from '../database';

export const getRoles = async (req, res) => {
    let pool;
    try {
        pool = await connect();
        const [rows] = await pool.query("SELECT * FROM roles");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Error al obtener roles' });
    } 
};

export const getRole = async (req, res) => {
    let pool;
    try {
        pool = await connect();
        const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Rol no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching role:', error);
        res.status(500).json({ message: 'Error al obtener rol' });
    } 
};

export const createRole = async (req, res) => {
    let pool;
    try {
        pool = await connect();
        const { name, descripcion, start_path, is_default, guard_name } = req.body;

        if (!name || !start_path || !guard_name) {
            return res.status(400).json({ message: "Campos obligatorios faltantes: name, start_path, guard_name" });
        }

        const [existingRole] = await pool.query(
            "SELECT * FROM roles WHERE name = ? AND guard_name = ?",
            [name, guard_name]
        );
        if (existingRole.length > 0) {
            return res.status(409).json({ message: "Ya existe un rol con este nombre y guard_name" });
        }

        const [results] = await pool.query(
            "INSERT INTO roles (name, descripcion, start_path, is_default, guard_name) VALUES (?, ?, ?, ?, ?)",
            [name, descripcion || null, start_path, is_default || 0, guard_name]
        );

        res.status(201).json({ 
            id: results.insertId, 
            name, 
            descripcion, 
            start_path, 
            is_default: is_default || 0, 
            guard_name 
        });
    } catch (error) {
        console.error('Error creating role:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Ya existe un rol con este nombre y guard_name" });
        }
        res.status(500).json({ message: "Error al crear rol" });
    } 
};

export const updateRole = async (req, res) => {
    let pool;
    try {
        pool = await connect();
        const [roleRows] = await pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        if (roleRows.length === 0) return res.status(404).json({ message: 'Rol no encontrado' });

        const role = roleRows[0];

        const {
            name = role.name,
            descripcion = role.descripcion,
            start_path = role.start_path,
            is_default = role.is_default,
            guard_name = role.guard_name
        } = req.body;

        const [existingRole] = await pool.query(
            "SELECT * FROM roles WHERE name = ? AND guard_name = ? AND id != ?",
            [name, guard_name, req.params.id]
        );
        if (existingRole.length > 0) {
            return res.status(409).json({ message: "Ya existe un rol con este nombre y guard_name" });
        }

        await pool.query(
            "UPDATE roles SET name = ?, descripcion = ?, start_path = ?, is_default = ?, guard_name = ? WHERE id = ?",
            [name, descripcion, start_path, is_default, guard_name, req.params.id]
        );

        const [updatedRole] = await pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        res.json({ message: 'Rol actualizado', role: updatedRole[0] });
    } catch (error) {
        console.error('Error updating role:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: "Ya existe un rol con este nombre y guard_name" });
        }
        res.status(500).json({ message: 'Error al actualizar rol' });
    } 
};

export const deleteRole = async (req, res) => {
    let pool;
    try {
        pool = await connect();
        const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Rol no encontrado' });

        const [users] = await pool.query("SELECT * FROM users WHERE id_roles = ?", [req.params.id]);
        const [permisos] = await pool.query("SELECT * FROM permisos_roles WHERE id_rol = ?", [req.params.id]);
        if (users.length > 0 || permisos.length > 0) {
            return res.status(400).json({ 
                message: 'No se puede eliminar el rol porque está asignado a usuarios o permisos' 
            });
        }

        await pool.query("DELETE FROM roles WHERE id = ?", [req.params.id]);
        res.json({ message: 'Rol eliminado' });
    } catch (error) {
        console.error('Error deleting role:', error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ 
                message: 'No se puede eliminar el rol porque está asignado a usuarios o permisos' 
            });
        }
        res.status(500).json({ message: 'Error al eliminar rol' });
    }
};

export const assignRoleToUser = async (req, res) => {
    let pool;
    try {
        pool = await connect();
        console.log('Received request - Params:', req.params, 'Body:', req.body);
        const { role_id } = req.body;
        const userId = req.params.id; // Changed from req.params.userId to req.params.id

        if (!userId || !role_id) {
            return res.status(400).json({ message: 'Faltan parámetros: userId o role_id' });
        }

        const [userCheck] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
        if (userCheck.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const [roleCheck] = await pool.query('SELECT id FROM roles WHERE id = ?', [role_id]);
        if (roleCheck.length === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        await pool.query('UPDATE users SET id_roles = ? WHERE id = ?', [role_id, userId]);

        res.json({
            message: 'Rol asignado correctamente',
            user_id: userId,
            role_id: role_id
        });
    } catch (error) {
        console.error('Error al asignar rol:', error);
        res.status(500).json({
            message: 'Error al asignar rol al usuario',
            error: error.message
        });
    }
};

export const removeRoleFromUser = async (req, res) => {
    let pool;
    try {
        pool = await connect();
        console.log('Received request - Params:', req.params, 'Body:', req.body);
        const { role_id } = req.body;
        const userId = req.params.userId;

        if (!role_id) {
            return res.status(400).json({ message: 'El ID del rol es obligatorio' });
        }

        const [userRows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const [existing] = await pool.query(
            'SELECT * FROM model_has_roles WHERE model_id = ? AND role_id = ? AND model_type = ?',
            [userId, role_id, 'App\\Models\\User']
        );
        if (existing.length === 0) {
            return res.status(404).json({ message: 'El rol no está asignado a este usuario' });
        }

        await pool.query(
            'DELETE FROM model_has_roles WHERE model_id = ? AND role_id = ? AND model_type = ?',
            [userId, role_id, 'App\\Models\\User']
        );

        await pool.query('UPDATE users SET id_roles = NULL WHERE id = ?', [userId]);

        res.json({ message: 'Rol eliminado del usuario', userId, role_id });
    } catch (error) {
        console.error('Error removing role from user:', error);
        res.status(500).json({ message: 'Error al eliminar rol del usuario', error: error.message });
    }
};

export const getUserRoleByEmail = async (req, res) => {
    let pool;
    try {
        pool = await connect();
        const { email } = req.body;

        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: "Correo requerido y debe ser texto" });
        }

        const [rows] = await pool.query(`
            SELECT 
                u.email,
                r.name as role_name
            FROM users u
            LEFT JOIN roles r ON u.id_roles = r.id
            WHERE u.email = ?
        `, [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];
        res.json({
            email: user.email,
            role: user.role_name || "Sin rol asignado"
        });
    } catch (error) {
        console.error('Error al obtener rol por correo:', error);
        res.status(500).json({ message: "Error al obtener el rol del usuario" });
    }
};