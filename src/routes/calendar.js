import { Router } from 'express';
import { connect } from '../database';

const router = Router();

router.get('/events', async (req, res) => {
    const connection = await connect();
    try {
        // Obtener reservas
        const [reservaRows] = await connection.query(`
            SELECT 
                r.reserva_id,
                r.usuario_id,
                l.nombre AS laboratorio_nombre,
                r.fecha_inicio,
                r.fecha_fin,
                r.proposito,
                r.estado,
                u.nombre AS usuario_nombre
            FROM reservas_laboratorio r
            JOIN laboratorios l ON r.laboratorio_id = l.laboratorio_id
            JOIN usuarios u ON r.usuario_id = u.usuario_id
        `);

        // Obtener préstamos
        const [prestamoRows] = await connection.query(`
            SELECT 
                p.prestamo_id,
                p.usuario_id,
                e.nombre AS equipo_nombre,
                p.fecha_prestamo,
                p.fecha_devolucion_prevista,
                p.estado,
                p.notas,
                u.nombre AS usuario_nombre
            FROM prestamos p
            JOIN equipos e ON p.equipo_id = e.equipo_id
            JOIN usuarios u ON p.usuario_id = u.usuario_id
        `);

        // Formatear eventos para react-big-calendar
        const events = [
            ...reservaRows.map(row => ({
                id: `reserva_${row.reserva_id}`,
                title: `Reserva: ${row.laboratorio_nombre}`,
                start: new Date(row.fecha_inicio),
                end: new Date(row.fecha_fin),
                description: `Usuario: ${row.usuario_nombre}\nPropósito: ${row.proposito}\nEstado: ${row.estado}`
            })),
            ...prestamoRows.map(row => ({
                id: `prestamo_${row.prestamo_id}`,
                title: `Préstamo: ${row.equipo_nombre}`,
                start: new Date(row.fecha_prestamo),
                end: new Date(row.fecha_devolucion_prevista),
                description: `Usuario: ${row.usuario_nombre}\nNotas: ${row.notas || 'Ninguna'}\nEstado: ${row.estado}`
            }))
        ];

        res.json(events);
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        res.status(500).json({ message: 'Error al obtener eventos del calendario' });
    }
});

export default router;