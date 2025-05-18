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
export const getUserLabReport = async (req, res) => {
  const connection = await connect();
  try {
    const [rows] = await connection.query(`
      SELECT 
        r.reserva_id,
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

    const currentDate = new Date();
    const borrowed = [];
    const notReturned = [];
    const todasReservas = [];

    rows.forEach(reserva => {
      const reservaEndDate = new Date(reserva.fecha_fin);
      const isNotReturned = reserva.estado === 'pendiente' || (reserva.estado === 'aprobada' && reservaEndDate >= currentDate);

      const reservaData = {
        reserva_id: reserva.reserva_id,
        laboratorio_nombre: reserva.laboratorio_nombre,
        ubicacion: reserva.ubicacion,
        fecha_inicio: reserva.fecha_inicio,
        fecha_fin: reserva.fecha_fin,
        proposito: reserva.proposito,
        estado: reserva.estado
      };

      // Add to todas_reservas (all reservations)
      todasReservas.push(reservaData);

      // Existing logic for borrowed and notReturned
      borrowed.push(reservaData);
      if (isNotReturned) {
        notReturned.push(reservaData);
      }
    });

    res.json({
      usuario_id: req.params.id,
      total_reservas: todasReservas.length,
      laboratorios_prestados: borrowed,
      laboratorios_no_entregados: notReturned,
      todas_reservas: todasReservas
    });
  } catch (error) {
    console.error('Error fetching lab report:', error);
    res.status(500).json({ message: 'Error al generar el reporte de laboratorios' });
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