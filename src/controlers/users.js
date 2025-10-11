import { connect } from '../database';
import bcrypt from 'bcryptjs';

// Registro de usuario
export const registerUser = async (req, res) => {
    const pool = await connect();
    const { nombres, apellidopat, apellidomat, carnet, email, password, user_name, per_id, role } = req.body;
    
    console.log('registerUser recibió:', {
        per_id: per_id || 'NO PROPORCIONADO',
        nombres,
        email,
        user_name,
        role: role || 'NO PROPORCIONADO',
        password: password ? 'presente' : 'UNDEFINED'
    });
    
    try {
        // Validaciones
        if (!password || typeof password !== 'string') {
            return res.status(400).json({ message: "Contraseña requerida y debe ser texto" });
        }
        
        if (!user_name || !email) {
            return res.status(400).json({ message: "Campos obligatorios faltantes" });
        }
        
        let personaId;
        
        // Si ya existe per_id (viene del paso 1), usarlo
        if (per_id) {
            console.log('Usando per_id existente:', per_id);
            
            const [personaCheck] = await pool.query(
                "SELECT id FROM persona WHERE id = ?",
                [per_id]
            );
            
            if (personaCheck.length === 0) {
                return res.status(404).json({ message: "Persona no encontrada" });
            }
            
            personaId = per_id;
        } else {
            // Si NO existe per_id, crear nueva persona
            console.log('Creando nueva persona');
            
            if (!nombres) {
                return res.status(400).json({ message: "Nombres requerido para crear persona" });
            }
            
            const [personaResults] = await pool.query(
                "INSERT INTO persona (nombres, apellidopat, apellidomat, carnet, correo, estado) VALUES (?, ?, ?, ?, ?, 1)",
                [nombres, apellidopat || '', apellidomat || '', carnet || '', email]
            );
            personaId = personaResults.insertId;
        }

        // Determinar el role_id basado en el nombre del rol
        let roleId = null;
        let roleName = null;
        
        if (role) {
            const [roleCheck] = await pool.query(
                "SELECT id, name FROM roles WHERE name = ?",
                [role]
            );
            
            if (roleCheck.length > 0) {
                roleId = roleCheck[0].id;
                roleName = roleCheck[0].name;
                console.log(`Rol encontrado: "${roleName}" (id: ${roleId})`);
            } else {
                console.warn(`Rol "${role}" no encontrado en la base de datos`);
                return res.status(400).json({ message: `Rol "${role}" no válido` });
            }
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario CON id_roles
        const [userResults] = await pool.query(
            "INSERT INTO users (user_name, per_id, id_roles, email, password, status) VALUES (?, ?, ?, ?, ?, 1)",
            [user_name, personaId, roleId, email, hashedPassword]
        );

        const userId = userResults.insertId;

        console.log(`Usuario ${userId} creado con rol "${roleName}" (id_roles: ${roleId})`);

        // Retornar datos del usuario con el rol asignado
        res.json({ 
            id: userId, 
            user_name, 
            email,
            per_id: personaId,
            id_roles: roleId,
            role: roleName
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        
        // Manejar errores específicos de MySQL
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.message.includes('user_name')) {
                return res.status(409).json({ message: "Nombre de usuario ya existe" });
            }
            if (error.message.includes('email')) {
                return res.status(409).json({ message: "Email ya está registrado" });
            }
        }
        
        res.status(500).json({ message: "Error al registrar usuario" });
    }
};


// Login de usuario
export const loginUser = async (req, res) => {
    const pool = await connect();
    const { email, password } = req.body;
    
    try {
        const [rows] = await pool.query(`
            SELECT 
                u.id,
                u.user_name,
                u.email,
                u.password,
                u.status,
                u.id_roles,
                p.nombres,
                p.apellidopat,
                p.apellidomat,
                p.carnet,
                r.name as role_name,
                r.start_path,
                r.descripcion as role_descripcion
            FROM users u
            JOIN persona p ON u.per_id = p.id
            LEFT JOIN roles r ON u.id_roles = r.id
            WHERE u.email = ?
        `, [email]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];
        
        if (!user.status) {
            return res.status(403).json({ message: "Usuario inactivo. Contacta al administrador." });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        if (!user.id_roles || !user.role_name) {
            return res.status(403).json({ 
                message: "Usuario sin rol asignado. Contacta al administrador." 
            });
        }

        res.json({ 
            id: user.id, 
            user_name: user.user_name, 
            nombres: user.nombres, 
            apellidopat: user.apellidopat, 
            apellidomat: user.apellidomat, 
            email: user.email,
            carnet: user.carnet,
            id_roles: user.id_roles,
            role: user.role_name,
            start_path: user.start_path
        });
        
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: "Error en el login" });
    }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT 
                u.id, 
                u.user_name, 
                u.email, 
                u.status, 
                u.id_roles,
                r.name as role_name,
                p.nombres, 
                p.apellidopat, 
                p.apellidomat, 
                p.carnet 
            FROM users u 
            JOIN persona p ON u.per_id = p.id
            LEFT JOIN roles r ON u.id_roles = r.id
            ORDER BY u.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

// Obtener un usuario por ID
export const getUser = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT 
                u.id, 
                u.user_name, 
                u.email, 
                u.status, 
                u.id_roles,
                r.name as role_name,
                r.start_path,
                p.nombres, 
                p.apellidopat, 
                p.apellidomat, 
                p.carnet 
            FROM users u 
            JOIN persona p ON u.per_id = p.id
            LEFT JOIN roles r ON u.id_roles = r.id
            WHERE u.id = ?
        `, [req.params.id]);
        
        if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

// Contar usuarios
export const getUserCount = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT COUNT(*) AS count FROM users");
        res.json(rows[0].count);
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Error al contar usuarios' });
    }
};

// Guardar un usuario
export const saveUser = async (req, res) => {
    const pool = await connect();
    const { nombres, apellidopat, apellidomat, carnet, email, user_name, id_roles } = req.body;
    try {
        const [personaResults] = await pool.query(
            "INSERT INTO persona (nombres, apellidopat, apellidomat, carnet, correo, estado) VALUES (?, ?, ?, ?, ?, 1)",
            [nombres, apellidopat, apellidomat, carnet, email]
        );
        const per_id = personaResults.insertId;

        const [userResults] = await pool.query(
            "INSERT INTO users (user_name, per_id, id_roles, email, status) VALUES (?, ?, ?, ?, 1)",
            [user_name, per_id, id_roles || null, email]
        );

        res.json({
            id: userResults.insertId,
            user_name,
            nombres,
            apellidopat,
            apellidomat,
            email,
            id_roles
        });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error al guardar usuario' });
    }
};


// Eliminar un usuario
export const deleteUser = async (req, res) => {
    const pool = await connect();
    try {
        const [userRows] = await pool.query("SELECT per_id FROM users WHERE id = ?", [req.params.id]);
        if (userRows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const per_id = userRows[0].per_id;
        await pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);
        await pool.query("DELETE FROM persona WHERE id = ?", [per_id]);

        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    const pool = await connect();
    try {
        const [userRows] = await pool.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
        if (userRows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const user = userRows[0];
        const per_id = user.per_id;

        const [personaRows] = await pool.query("SELECT * FROM persona WHERE id = ?", [per_id]);
        if (personaRows.length === 0) return res.status(404).json({ message: 'Persona no encontrada' });
        const persona = personaRows[0];

        const {
            nombres = persona.nombres,
            apellidopat = persona.apellidopat,
            apellidomat = persona.apellidomat,
            carnet = persona.carnet,
            email = persona.correo,
            user_name = user.user_name,
            id_roles = user.id_roles
        } = req.body;

        await pool.query(
            "UPDATE persona SET nombres = ?, apellidopat = ?, apellidomat = ?, carnet = ?, correo = ? WHERE id = ?",
            [nombres, apellidopat, apellidomat, carnet, email, per_id]
        );
        
        await pool.query(
            "UPDATE users SET user_name = ?, email = ?, id_roles = ? WHERE id = ?",
            [user_name, email, id_roles, req.params.id]
        );

        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};



// Asignar rol a usuario
export const assignRoleToUser = async (req, res) => {
    const pool = await connect();
    const { role_id } = req.body;
    const userId = req.params.id;
    
    try {
        // Verificar que el usuario y rol existan
        const [userCheck] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
        if (userCheck.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        const [roleCheck] = await pool.query('SELECT id FROM roles WHERE id = ?', [role_id]);
        if (roleCheck.length === 0) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        
        // Verificar si ya está asignado
        const [existing] = await pool.query(
            'SELECT * FROM model_has_roles WHERE model_id = ? AND role_id = ?',
            [userId, role_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: 'El usuario ya tiene asignado este rol' });
        }

        // Asignar el rol
        await pool.query(
            'INSERT INTO model_has_roles (model_id, role_id, model_type) VALUES (?, ?, "App\\Models\\User")',
            [userId, role_id]
        );

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

export const getRoles = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM roles ORDER BY id");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ message: 'Error al obtener roles' });
    }
};

// Obtener correo y rol por correo
export const getUserRoleByEmail = async (req, res) => {
    const pool = await connect();
    const { email } = req.body;

    try {
        // Validar que se proporcione un correo
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: "Correo requerido y debe ser texto" });
        }

        // Consultar el usuario y su rol asociado
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