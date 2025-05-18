import { query } from '../database';
import { query as expressQuery, validationResult } from 'express-validator';

export const validateReporteReservas = [
  expressQuery('fecha_inicio').optional().isISO8601().toDate().withMessage('Fecha de inicio debe ser una fecha válida'),
  expressQuery('fecha_fin').optional().isISO8601().toDate().withMessage('Fecha de fin debe ser una fecha válida'),
  expressQuery('estado').optional().isIn(['pendiente', 'aprobada', 'cancelada']).withMessage('Estado inválido'),
  expressQuery('laboratorio_id').optional().isInt().withMessage('laboratorio_id debe ser un entero'),
  expressQuery('page').optional().isInt({ min: 1 }).toInt().withMessage('Página debe ser un entero mayor a 0'),
  expressQuery('limit').optional().isInt({ min: 1, max: 100 }).toInt().withMessage('Límite debe ser un entero entre 1 y 100'),
];

export const getReporteReservas = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { fecha_inicio, fecha_fin, estado, laboratorio_id, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Construir condiciones de la consulta
    let conditions = [];
    let params = [];

    if (fecha_inicio) {
      conditions.push('rl.fecha_inicio >= ?');
      params.push(fecha_inicio);
    }
    if (fecha_fin) {
      conditions.push('rl.fecha_fin <= ?');
      params.push(fecha_fin);
    }
    if (estado) {
      conditions.push('rl.estado = ?');
      params.push(estado);
    }
    if (laboratorio_id) {
      conditions.push('rl.laboratorio_id = ?');
      params.push(laboratorio_id);
    }

    const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    // Consulta 1: Estadísticas generales
    const statsQuery = `
      SELECT 
        l.laboratorio_id,
        l.nombre AS laboratorio_nombre,
        COUNT(rl.reserva_id) AS total_reservas,
        SUM(CASE WHEN rl.estado = 'pendiente' THEN 1 ELSE 0 END) AS reservas_pendientes,
        SUM(CASE WHEN rl.estado = 'aprobada' THEN 1 ELSE 0 END) AS reservas_aprobadas,
        SUM(CASE WHEN rl.estado = 'cancelada' THEN 1 ELSE 0 END) AS reservas_canceladas,
        GROUP_CONCAT(DISTINCT rl.proposito) AS propositos
      FROM Reservas_Laboratorio rl
      JOIN Laboratorios l ON rl.laboratorio_id = l.laboratorio_id
      ${whereClause}
      GROUP BY l.laboratorio_id, l.nombre
    `;
    const stats = await query(statsQuery, params);

    // Consulta 2: Lista de reservas detallada con paginación
    const detailsQuery = `
      SELECT 
        rl.reserva_id,
        l.nombre AS laboratorio_nombre,
        u.nombre AS usuario_nombre,
        u.apellido AS usuario_apellido,
        rl.fecha_inicio,
        rl.fecha_fin,
        rl.proposito,
        rl.estado
      FROM Reservas_Laboratorio rl
      JOIN Laboratorios l ON rl.laboratorio_id = l.laboratorio_id
      JOIN Usuarios u ON rl.usuario_id = u.usuario_id
      ${whereClause}
      ORDER BY rl.fecha_inicio DESC
      LIMIT ? OFFSET ?
    `;
    params.push(parseInt(limit), offset);
    const details = await query(detailsQuery, params);

    // Consulta 3: Total de reservas para paginación
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM Reservas_Laboratorio rl
      ${whereClause}
    `;
    const [countResult] = await query(countQuery, params.slice(0, -2));
    const total = countResult.total;

    res.status(200).json({
      estadisticas: stats,
      detalles: {
        data: details,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};