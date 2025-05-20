import { connect } from '../database';
import bcrypt from 'bcryptjs';

// Registro de usuario
export const registerUser = async (req, res) => {
    const connection = await connect();
    const { nombre, apellido, email, password, tipo_usuario, numero_identificacion } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const [results] = await connection.query(
            "INSERT INTO usuarios (nombre, apellido, email, password, tipo_usuario, numero_identificacion) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, apellido, email, hashedPassword, tipo_usuario, numero_identificacion]
        );
        res.json({ id: results.insertId, nombre, apellido, email, tipo_usuario });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar usuario" });
    }
};

// Login de usuario
export const loginUser = async (req, res) => {
    const connection = await connect();
    const { email, password } = req.body;
    try {
        const [rows] = await connection.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

        res.json({ id: user.usuario_id, nombre: user.nombre, tipo_usuario: user.tipo_usuario });
    } catch (error) {
        res.status(500).json({ message: "Error en el login" });
    }
};

// Reporte de laboratorios prestados y no entregados por usuario
export const getUserLabReservas = async (req, res) => {
  const connection = await connect();
  try {
    // Consulta para reservas
    const [reservaRows] = await connection.query(`
      SELECT 
        r.reserva_id,
        r.usuario_id,
        l.nombre AS laboratorio_nombre,
        l.ubicacion,
        r.fecha_inicio,
        r.fecha_fin,
        r.proposito,
        r.estado
      FROM Reservas_Laboratorio r
      JOIN Laboratorios l ON r.laboratorio_id = l.laboratorio_id
      WHERE r.usuario_id = ?
      ORDER BY r.fecha_inicio DESC
    `, [req.params.id]);

    // Consulta para préstamos
    const [prestamoRows] = await connection.query(`
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

    // Procesar reservas
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

    // Procesar préstamos
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
          atrasados.push(prestamoData); // Tratar como atrasado
        }
      } else {
        console.warn('Préstamo no clasificado:', prestamo);
      }
    });

    // Ordenar categorías
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
      // Reservas
      total_reservas: todasReservas.length,
      total_aprobadas: aprobadas.length,
      total_pendientes_reservas: pendientesReservas.length,
      total_canceladas: canceladas.length,
      reservas_aprobadas: aprobadas,
      reservas_pendientes: pendientesReservas,
      reservas_canceladas: canceladas,
      todas_reservas: todasReservas,
      // Préstamos
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
  } finally {
    await connection.end();
  }
};
// Reporte de préstamos hechos por el usuario
export const getUserLoanReport = async (req, res) => {
  const connection = await connect();
  try {
    const [rows] = await connection.query(`
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

      // Validar que el préstamo pertenece al usuario
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

      // Agregar a todos los préstamos
      todosPrestamos.push(prestamoData);

      // Clasificación basada en estado
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
          overdue.push(prestamoData); // Tratar como atrasado si tiene fecha_devolucion_real
        }
      } else {
        console.warn('Préstamo no clasificado:', prestamo);
      }
    });

    // Ordenar cada categoría por fecha_prestamo descendente
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
  } finally {
    await connection.end();
  }
};
export const getUsers = async(req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM usuarios");
    res.json(rows);
}
export const getUser = async (req, res) => {
       const connection = await connect();
       const [rows] = await connection.query("SELECT * FROM usuarios WHERE usuario_id = ?", [req.params.id]);
    res.json(rows[0]);
}
export const getUserCount = async (req, res) =>{
    const connection = await connect();
    const [rows] = await connection.query("SELECT COUNT(*) FROM usuarios");
    res.json(rows[0]['COUNT(*)']);
}
export const saveUser = async (req, res) =>{
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO usuarios (nombre, apellido, email, tipo_usuario,numero_identificacion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)", 
        [req.body.nombre, 
            req.body.apellido, 
            req.body.email, 
            req.body.tipo_usuario, 
            req.body.numero_identificacion,
            req.body.fecha_registro]);  
    res.json({
        id: results.resultId,
        ...req.body
    });
}
export const deleteUser = async (req, res) =>{
    const connection = await connect();
    const result = await connection.query("DELETE FROM usuarios WHERE usuario_id = ?", [req.params.id]);
    console.log(result);
    res.json({
        message: 'Usuario eliminado'
    });
}
export const updateUser = async (req, res) =>{
   const connection = await connect();
   const results = await connection.query("UPDATE usuarios SET ? WHERE usuario_id = ?",
        [req.body, 
            req.params.id]);
    console.log(results);
    res.json({
        message: 'Usuario actualizado'
    });
}