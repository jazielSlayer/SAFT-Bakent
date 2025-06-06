import { connect } from '../database';
import bcrypt from 'bcryptjs';

// Registro de usuario
export const registerUser = async (req, res) => {
    const pool = await connect();
    const { nombre, apellido, email, password, tipo_usuario, numero_identificacion } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [results] = await pool.query(
            "INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario, numero_identificacion) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, apellido, email, hashedPassword, tipo_usuario, numero_identificacion]
        );
        res.json({ id: results.insertId, nombre, apellido, email, tipo_usuario });
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
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        res.json({ id: user.usuario_id, nombre: user.nombre, tipo_usuario: user.tipo_usuario });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: "Error en el login" });
    }
};

// Reporte de laboratorios prestados y no entregados por usuario
export const getUserLabReservas = async (req, res) => {
    const pool = await connect();
    try {
        const [reservaRows] = await pool.query(`
            SELECT 
                r.reserva_id,
                r.usuario_id,
                l.nombre AS laboratorio_nombre,
                l.ubicacion,
                r.fecha_inicio,
                r.fecha_fin,
                r.proposito,
                r.estado
            FROM reservas_laboratorio r
            JOIN Laboratorios l ON r.laboratorio_id = l.laboratorio_id
            WHERE r.usuario_id = ?
            ORDER BY r.fecha_inicio DESC
        `, [req.params.id]);

        const [prestamoRows] = await pool.query(`
            SELECT 
                p.prestamo_id,
                p.usuario_id,
                e.nombre AS equipo_nombre,
                p.fecha_prestamo,
                p.fecha_devolucion_prevista,
                p.fecha_devolucion_real,
                p.estado,
                p.notas
            FROM prestamos p
            JOIN equipos e ON p.equipo_id = e.equipo_id
            WHERE p.usuario_id = ?
            ORDER BY p.fecha_prestamo DESC
        `, [req.params.id]);

        const currentDate = new Date();

        const aprobadas = [];
        const pendientesReservas = [];
        const canceladas = [];
        const todasReservas = [];

        reservaRows.forEach(reserva => {
            if (!reserva.reserva_id) {
                console.warn('Reserva sin reserva_id encontrada:', reserva);
                return;
            }
            if (reserva.usuario_id !== parseInt(req.params.id)) {
                console.warn(`Reserva con usuario_id incorrecto: reserva_id=${reserva.reserva_id}, usuario_id=${reserva.usuario_id}, esperado=${req.params.id}`);
                return;
            }

            const reservaData = {
                reserva_id: reserva.reserva_id,
                laboratorio_nombre: reserva.laboratorio_nombre || 'N/A',
                ubicacion: reserva.ubicacion || 'N/A',
                fecha_inicio: reserva.fecha_inicio,
                fecha_fin: reserva.fecha_fin,
                proposito: reserva.proposito || 'N/A',
                estado: reserva.estado || 'N/A'
            };

            todasReservas.push(reservaData);

            if (reserva.estado === 'aprobada') {
                aprobadas.push(reservaData);
            } else if (reserva.estado === 'pendiente') {
                pendientesReservas.push(reservaData);
            } else if (reserva.estado === 'cancelada') {
                canceladas.push(reservaData);
            } else {
                console.warn('Reserva no clasificada:', reserva);
            }
        });

        const pendientesPrestamos = [];
        const atrasados = [];
        const devueltos = [];
        const todosPrestamos = [];

        prestamoRows.forEach(prestamo => {
            if (!prestamo.prestamo_id) {
                console.warn('Préstamo sin prestamo_id encontrado:', prestamo);
                return;
            }
            if (prestamo.usuario_id !== parseInt(req.params.id)) {
                console.warn(`Préstamo con usuario_id incorrecto: prestamo_id=${prestamo.prestamo_id}, usuario_id=${prestamo.usuario_id}, esperado=${req.params.id}`);
                return;
            }

            const devolucionPrevista = prestamo.fecha_devolucion_prevista ? new Date(prestamo.fecha_devolucion_prevista) : null;
            const prestamoData = {
                prestamo_id: prestamo.prestamo_id,
                equipo_nombre: prestamo.equipo_nombre || 'N/A',
                fecha_prestamo: prestamo.fecha_prestamo,
                fecha_devolucion_prevista: prestamo.fecha_devolucion_prevista,
                fecha_devolucion_real: prestamo.fecha_devolucion_real,
                estado: prestamo.estado || 'N/A',
                notas: prestamo.notas || 'N/A'
            };

            todosPrestamos.push(prestamoData);

            if (prestamo.estado === 'devuelto' && prestamo.fecha_devolucion_real) {
                devueltos.push(prestamoData);
            } else if (prestamo.estado === 'atrasado') {
                atrasados.push(prestamoData);
            } else if (prestamo.estado === 'activo') {
                if (!prestamo.fecha_devolucion_real && devolucionPrevista && devolucionPrevista < currentDate) {
                    atrasados.push(prestamoData);
                } else if (!prestamo.fecha_devolucion_real) {
                    pendientesPrestamos.push(prestamoData);
                } else {
                    console.warn(`Préstamo con estado="activo" pero con fecha_devolucion_real:`, prestamo);
                    atrasados.push(prestamoData);
                }
            } else {
                console.warn('Préstamo no clasificado:', prestamo);
            }
        });

        const sortByFechaInicio = (a, b) => new Date(b.fecha_inicio || b.fecha_prestamo) - new Date(a.fecha_inicio || a.fecha_prestamo);
        aprobadas.sort(sortByFechaInicio);
        pendientesReservas.sort(sortByFechaInicio);
        canceladas.sort(sortByFechaInicio);
        todasReservas.sort(sortByFechaInicio);
        pendientesPrestamos.sort(sortByFechaInicio);
        atrasados.sort(sortByFechaInicio);
        devueltos.sort(sortByFechaInicio);
        todosPrestamos.sort(sortByFechaInicio);

        res.json({
            usuario_id: req.params.id,
            total_reservas: todasReservas.length,
            total_aprobadas: aprobadas.length,
            total_pendientes_reservas: pendientesReservas.length,
            total_canceladas: canceladas.length,
            reservas_aprobadas: aprobadas,
            reservas_pendientes: pendientesReservas,
            reservas_canceladas: canceladas,
            todas_reservas: todasReservas,
            total_prestamos: todosPrestamos.length,
            total_pendientes_prestamos: pendientesPrestamos.length,
            total_atrasados: atrasados.length,
            total_devueltos: devueltos.length,
            prestamos_pendientes: pendientesPrestamos,
            prestamos_atrasados: atrasados,
            prestamos_devueltos: devueltos,
            todos_prestamos: todosPrestamos
        });
    } catch (error) {
        console.error('Error fetching lab and loan report:', error);
        res.status(500).json({ message: 'Error al generar el reporte de laboratorios y préstamos' });
    }
};

// Reporte de préstamos hechos por el usuario
export const getUserLoanReport = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.prestamo_id,
                p.usuario_id,
                e.nombre AS equipo_nombre,
                p.fecha_prestamo,
                p.fecha_devolucion_prevista,
                p.fecha_devolucion_real,
                p.estado,
                p.notas
            FROM prestamos p
            JOIN equipos e ON p.equipo_id = e.equipo_id
            WHERE p.usuario_id = ?
            ORDER BY p.fecha_prestamo DESC
        `, [req.params.id]);

        const currentDate = new Date();
        const pending = [];
        const overdue = [];
        const returned = [];
        const todosPrestamos = [];

        rows.forEach(prestamo => {
            if (!prestamo.prestamo_id) {
                console.warn('Préstamo sin prestamo_id encontrado:', prestamo);
                return;
            }

            if (prestamo.usuario_id !== parseInt(req.params.id)) {
                console.warn(`Préstamo con usuario_id incorrecto: prestamo_id=${prestamo.prestamo_id}, usuario_id=${prestamo.usuario_id}, esperado=${req.params.id}`);
                return;
            }

            const devolucionPrevista = prestamo.fecha_devolucion_prevista ? new Date(prestamo.fecha_devolucion_prevista) : null;
            const prestamoData = {
                prestamo_id: prestamo.prestamo_id,
                equipo_nombre: prestamo.equipo_nombre || 'N/A',
                fecha_prestamo: prestamo.fecha_prestamo,
                fecha_devolucion_prevista: prestamo.fecha_devolucion_prevista,
                fecha_devolucion_real: prestamo.fecha_devolucion_real,
                estado: prestamo.estado || 'N/A',
                notas: prestamo.notas || 'N/A'
            };

            todosPrestamos.push(prestamoData);

            if (prestamo.estado === 'devuelto' && prestamo.fecha_devolucion_real) {
                returned.push(prestamoData);
            } else if (prestamo.estado === 'atrasado') {
                overdue.push(prestamoData);
            } else if (prestamo.estado === 'activo') {
                if (!prestamo.fecha_devolucion_real && devolucionPrevista && devolucionPrevista < currentDate) {
                    overdue.push(prestamoData);
                } else if (!prestamo.fecha_devolucion_real) {
                    pending.push(prestamoData);
                } else {
                    console.warn(`Préstamo con estado="activo" pero con fecha_devolucion_real:`, prestamo);
                    overdue.push(prestamoData);
                }
            } else {
                console.warn('Préstamo no clasificado:', prestamo);
            }
        });

        const sortByFechaPrestamo = (a, b) => new Date(b.fecha_prestamo) - new Date(a.fecha_prestamo);
        pending.sort(sortByFechaPrestamo);
        overdue.sort(sortByFechaPrestamo);
        returned.sort(sortByFechaPrestamo);
        todosPrestamos.sort(sortByFechaPrestamo);

        res.json({
            usuario_id: req.params.id,
            total_prestamos: todosPrestamos.length,
            total_pendientes: pending.length,
            total_atrasados: overdue.length,
            total_devueltos: returned.length,
            prestamos_pendientes: pending,
            prestamos_atrasados: overdue,
            prestamos_devueltos: returned,
            todos_prestamos: todosPrestamos
        });
    } catch (error) {
        console.error('Error fetching loan report:', error);
        res.status(500).json({ message: 'Error al generar el reporte de préstamos' });
    }
};

// Nueva función para el dashboard de admin
export const getAdminDashboardData = async (req, res) => {
    const pool = await connect();
    try {
        // Verificar si el usuario es admin
        const usuario_id = req.body.usuario_id || req.params.usuario_id;
        if (!usuario_id) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }
        const [userRows] = await pool.query("SELECT tipo_usuario FROM usuarios WHERE usuario_id = ?", [usuario_id]);
        if (userRows.length === 0 || userRows[0].tipo_usuario !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: Solo administradores' });
        }

        // Consultas para obtener todos los datos
        const [users] = await pool.query("SELECT * FROM usuarios");
        const [labs] = await pool.query("SELECT * FROM laboratorios");
        const [equipment] = await pool.query("SELECT * FROM equipos");
        const [categories] = await pool.query("SELECT * FROM categorias_equipos");
        const [loans] = await pool.query("SELECT * FROM prestamos");
        const [reservations] = await pool.query("SELECT * FROM reservas_laboratorio");
        const [maintenances] = await pool.query("SELECT * FROM mantenimiento");

        // Calcular métricas
        const usersByType = { estudiante: 0, profesor: 0, personal: 0, admin: 0 };
        users.forEach(user => {
            if (usersByType.hasOwnProperty(user.tipo_usuario)) {
                usersByType[user.tipo_usuario]++;
            }
        });

        const labsByType = { electronica: 0, hardware: 0, telecomunicaciones: 0, redes: 0 };
        labs.forEach(lab => {
            if (labsByType.hasOwnProperty(lab.tipo_laboratorio)) {
                labsByType[lab.tipo_laboratorio]++;
            }
        });

        const equipmentByCategory = {};
        categories.forEach(cat => equipmentByCategory[cat.nombre] = 0);
        equipment.forEach(eq => {
            const cat = categories.find(c => c.categoria_id === eq.categoria_id);
            if (cat) equipmentByCategory[cat.nombre]++;
        });

        const loansByStatus = { activo: 0, devuelto: 0, atrasado: 0 };
        loans.forEach(loan => {
            if (loansByStatus.hasOwnProperty(loan.estado)) {
                loansByStatus[loan.estado]++;
            }
        });

        const reservationsByStatus = { pendiente: 0, aprobada: 0, cancelada: 0 };
        reservations.forEach(res => {
            if (reservationsByStatus.hasOwnProperty(res.estado)) {
                reservationsByStatus[res.estado]++;
            }
        });

        // Equipos más solicitados
        const validLoans = loans.filter(loan => equipment.some(eq => eq.equipo_id === loan.equipo_id));
        const loanCounts = validLoans.reduce((acc, loan) => {
            acc[loan.equipo_id] = (acc[loan.equipo_id] || 0) + 1;
            return acc;
        }, {});
        const mostRequested = Object.entries(loanCounts)
            .map(([equipo_id, count]) => {
                const eq = equipment.find(e => e.equipo_id === parseInt(equipo_id));
                if (!eq) {
                    console.warn(`No se encontró equipo para equipo_id: ${equipo_id}`);
                    return null;
                }
                return { equipo_id: parseInt(equipo_id), nombre: eq.nombre, count };
            })
            .filter(item => item !== null)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        res.json({
            total_users: users.length,
            users_by_type: usersByType,
            total_labs: labs.length,
            labs_by_type: labsByType,
            total_equipment: equipment.length,
            equipment_by_category: equipmentByCategory,
            total_loans: loans.length,
            loans_by_status: loansByStatus,
            total_reservations: reservations.length,
            reservations_by_status: reservationsByStatus,
            total_maintenances: maintenances.length,
            most_requested_equipment: mostRequested,
            users,
            labs,
            equipment,
            categories,
            loans,
            reservations,
            maintenances
        });
    } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        res.status(500).json({ message: 'Error al obtener datos del dashboard' });
    }
};

export const getUsers = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

export const getUser = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE usuario_id = ?", [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
};

export const getUserCount = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query("SELECT COUNT(*) FROM usuarios");
        res.json(rows[0]['COUNT(*)']);
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Error al contar usuarios' });
    }
};

export const saveUser = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query(
            "INSERT INTO usuarios (nombre, apellido, email, tipo_usuario, numero_identificacion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)",
            [
                req.body.nombre,
                req.body.apellido,
                req.body.email,
                req.body.tipo_usuario,
                req.body.numero_identificacion,
                req.body.fecha_registro
            ]
        );
        res.json({
            id: results.insertId,
            ...req.body
        });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error al guardar usuario' });
    }
};

export const deleteUser = async (req, res) => {
    const pool = await connect();
    try {
        const [result] = await pool.query("DELETE FROM usuarios WHERE usuario_id = ?", [req.params.id]);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

export const updateUser = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("UPDATE usuarios SET ? WHERE usuario_id = ?", [req.body, req.params.id]);
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};