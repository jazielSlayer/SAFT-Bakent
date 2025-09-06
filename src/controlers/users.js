import { connect } from '../database';
import bcrypt from 'bcryptjs';

// Registro de usuario
export const registerUser = async (req, res) => {
    const pool = await connect();
    const { nombres, apellidopat, apellidomat, carnet, email, password, user_name } = req.body;
    try {
        // Crear persona
        const [personaResults] = await pool.query(
            "INSERT INTO persona (nombres, apellidopat, apellidomat, carnet, correo, estado) VALUES (?, ?, ?, ?, ?, 1)",
            [nombres, apellidopat, apellidomat, carnet, email]
        );
        const per_id = personaResults.insertId;

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const [userResults] = await pool.query(
            "INSERT INTO users (user_name, per_id, email, password, status) VALUES (?, ?, ?, ?, 1)",
            [user_name, per_id, email, hashedPassword]
        );

        res.json({ id: userResults.insertId, user_name, nombres, apellidopat, apellidomat, email });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
};

// Login de usuario
export const loginUser = async (req, res) => {
    const pool = await connect();
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query("SELECT u.*, p.nombres, p.apellidopat, p.apellidomat FROM users u JOIN persona p ON u.per_id = p.id WHERE u.email = ?", [email]);
        if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        res.json({ id: user.id, user_name: user.user_name, nombres: user.nombres, apellidopat: user.apellidopat, apellidomat: user.apellidomat, email: user.email });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: "Error en el login" });
    }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT u.id, u.user_name, u.email, u.status, p.nombres, p.apellidopat, p.apellidomat, p.carnet FROM users u JOIN persona p ON u.per_id = p.id");
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
        const [rows] = await pool.query("SELECT u.id, u.user_name, u.email, u.status, p.nombres, p.apellidopat, p.apellidomat, p.carnet FROM users u JOIN persona p ON u.per_id = p.id WHERE u.id = ?", [req.params.id]);
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
    const { nombres, apellidopat, apellidomat, carnet, email, user_name } = req.body;
    try {
        const [personaResults] = await pool.query(
            "INSERT INTO persona (nombres, apellidopat, apellidomat, carnet, correo, estado) VALUES (?, ?, ?, ?, ?, 1)",
            [nombres, apellidopat, apellidomat, carnet, email]
        );
        const per_id = personaResults.insertId;

        const [userResults] = await pool.query(
            "INSERT INTO users (user_name, per_id, email, status) VALUES (?, ?, ?, 1)",
            [user_name, per_id, email]
        );

        res.json({
            id: userResults.insertId,
            user_name,
            nombres,
            apellidopat,
            apellidomat,
            email
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
        const { nombres, apellidopat, apellidomat, carnet, email, user_name } = req.body;
        const [userRows] = await pool.query("SELECT per_id FROM users WHERE id = ?", [req.params.id]);
        if (userRows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const per_id = userRows[0].per_id;
        await pool.query(
            "UPDATE persona SET nombres = ?, apellidopat = ?, apellidomat = ?, carnet = ?, correo = ? WHERE id = ?",
            [nombres, apellidopat, apellidomat, carnet, email, per_id]
        );
        await pool.query(
            "UPDATE users SET user_name = ?, email = ? WHERE id = ?",
            [user_name, email, req.params.id]
        );

        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

// Reporte de avances de estudiante (adaptado del lab-reservas)
export const getUserLabReservas = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT 
                a.id AS avance_id,
                a.id_estudiante,
                e.numero_matricula,
                p.nombres,
                p.apellidopat,
                p.apellidomat,
                m.nombre AS modulo_nombre,
                a.responsable,
                a.fecha,
                a.estado
            FROM avance_estudiante a
            JOIN estudiante e ON a.id_estudiante = e.id
            JOIN persona p ON e.per_id = p.id
            JOIN modulo m ON a.id_modulo = m.id
            WHERE e.per_id = (SELECT per_id FROM users WHERE id = ?)
            ORDER BY a.fecha DESC
        `, [req.params.id]);

        const avances = rows.map(row => ({
            avance_id: row.avance_id,
            numero_matricula: row.numero_matricula,
            nombres: row.nombres,
            apellidopat: row.apellidopat,
            apellidomat: row.apellidomat,
            modulo_nombre: row.modulo_nombre,
            responsable: row.responsable,
            fecha: row.fecha,
            estado: row.estado
        }));

        res.json({
            usuario_id: req.params.id,
            total_avances: avances.length,
            avances
        });
    } catch (error) {
        console.error('Error fetching student progress report:', error);
        res.status(500).json({ message: 'Error al generar el reporte de avances' });
    }
};

// Reporte de préstamos (no aplicable en saf, placeholder)
export const getUserLoanReport = async (req, res) => {
    res.status(501).json({ message: 'Reporte de préstamos no implementado para la base de datos saf' });
};

// Dashboard de admin
export const getAdminDashboardData = async (req, res) => {
    const pool = await connect();
    try {
        const usuario_id = req.body.usuario_id || req.params.usuario_id;
        if (!usuario_id) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }
        const [userRows] = await pool.query("SELECT r.name FROM users u JOIN model_has_roles mr ON u.id = mr.model_id JOIN roles r ON mr.role_id = r.id WHERE u.id = ?", [usuario_id]);
        if (userRows.length === 0 || userRows[0].name !== 'Admin') {
            return res.status(403).json({ message: 'Acceso denegado: Solo administradores' });
        }

        const [users] = await pool.query("SELECT * FROM users");
        const [personas] = await pool.query("SELECT * FROM persona");
        const [estudiantes] = await pool.query("SELECT * FROM estudiante");
        const [docentes] = await pool.query("SELECT * FROM docente");
        const [programas] = await pool.query("SELECT * FROM programa_academico");
        const [proyectos] = await pool.query("SELECT * FROM proyecto");
        const [avances] = await pool.query("SELECT * FROM avance_estudiante");

        const rolesCount = { Admin: 0, Docente: 0 };
        const [rolesRows] = await pool.query("SELECT r.name, COUNT(mr.model_id) as count FROM roles r LEFT JOIN model_has_roles mr ON r.id = mr.role_id GROUP BY r.name");
        rolesRows.forEach(row => {
            if (rolesCount.hasOwnProperty(row.name)) {
                rolesCount[row.name] = row.count;
            }
        });

        res.json({
            total_users: users.length,
            roles_count: rolesCount,
            total_personas: personas.length,
            total_estudiantes: estudiantes.length,
            total_docentes: docentes.length,
            total_programas: programas.length,
            total_proyectos: proyectos.length,
            total_avances: avances.length,
            users,
            personas,
            estudiantes,
            docentes,
            programas,
            proyectos,
            avances
        });
    } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        res.status(500).json({ message: 'Error al obtener datos del dashboard' });
    }
};