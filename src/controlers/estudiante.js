import { connect } from '../database';

// FUNCIÓN AUXILIAR (pégala arriba de todo)
const calcularEstadoTalleres = (t1, t2, tf) => {
    const MIN = 61;

    if (!t1 || t1 < MIN) {
        return {
            taller1: { nota: t1 || null, aprobado: false, estado: 'Reprobado' },
            taller2: { nota: null, aprobado: false, estado: 'Bloqueado' },
            taller3: { nota: null, aprobado: false, estado: 'Bloqueado' },
            estado_general: 'Reprobado Taller 1',
            mensaje: 'Debe aprobar el Taller de Grado 1 (mínimo 61)',
            puede_taller2: false,
            puede_defensa: false,
            titulado: false
        };
    }

    if (t1 >= MIN && (!t2 || t2 < MIN)) {
        return {
            taller1: { nota: t1, aprobado: true, estado: 'Aprobado' },
            taller2: { nota: t2 || null, aprobado: false, estado: t2 ? 'Reprobado' : 'Pendiente' },
            taller3: { nota: null, aprobado: false, estado: 'Bloqueado' },
            estado_general: 'Aprobado Taller 1',
            mensaje: '¡Listo para inscribirse al Taller de Grado 2!',
            puede_taller2: true,
            puede_defensa: false,
            titulado: false
        };
    }

    if (t2 >= MIN && (!tf || tf < MIN)) {
        return {
            taller1: { nota: t1, aprobado: true, estado: 'Aprobado' },
            taller2: { nota: t2, aprobado: true, estado: 'Aprobado' },
            taller3: { nota: tf || null, aprobado: false, estado: tf ? 'Reprobado' : 'Pendiente Defensa Final' },
            estado_general: 'Aprobado Taller 2 - Listo para Defensa Final',
            mensaje: '¡Puede solicitar código de empastado y defensa externa!',
            puede_taller2: true,
            puede_defensa: true,
            titulado: false
        };
    }

    return {
        taller1: { nota: t1, aprobado: true, estado: 'Aprobado' },
        taller2: { nota: t2, aprobado: true, estado: 'Aprobado' },
        taller3: { nota: tf, aprobado: true, estado: 'Aprobado' },
        estado_general: 'TITULADO',
        mensaje: '¡FELICIDADES! El estudiante ha culminado exitosamente su proceso de grado.',
        puede_taller2: true,
        puede_defensa: true,
        titulado: true
    };
};

export const getEstudiantes = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT e.*, p.nombres, p.apellidopat, p.apellidomat, pa.nombre_programa
            FROM estudiante e
            JOIN persona p ON e.per_id = p.id
            JOIN programa_academico pa ON e.id_programa_academico = pa.id
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching estudiantes:', error);
        res.status(500).json({ message: 'Error al obtener estudiantes' });
    }
};

export const getEstudiante = async (req, res) => {
    const pool = await connect();
    try {
        const [rows] = await pool.query(`
            SELECT e.*, p.nombres, p.apellidopat, p.apellidomat, pa.nombre_programa
            FROM estudiante e
            JOIN persona p ON e.per_id = p.id
            JOIN programa_academico pa ON e.id_programa_academico = pa.id
            WHERE e.id = ?
        `, [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching estudiante:', error);
        res.status(500).json({ message: 'Error al obtener estudiante' });
    }
};

export const createEstudiante = async (req, res) => {
    const pool = await connect();
    const { per_id, id_programa_academico, numero_matricula, fecha_inscripcion, estado } = req.body;

    try {

        if (!per_id || !id_programa_academico || !numero_matricula || !fecha_inscripcion) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_inscripcion)) {
            return res.status(400).json({ message: 'Formato de fecha inválido (use YYYY-MM-DD)' });
        }

        const [personaCheck] = await pool.query('SELECT id FROM persona WHERE id = ?', [per_id]);
        if (personaCheck.length === 0) {
            return res.status(400).json({ message: 'Persona no encontrada' });
        }

        const [programaCheck] = await pool.query('SELECT id FROM programa_academico WHERE id = ?', [id_programa_academico]);
        if (programaCheck.length === 0) {
            return res.status(400).json({ message: 'Programa académico no encontrado' });
        }

        const estadoValue = estado === true || estado === 1 ? 1 : 0;

        const [results] = await pool.query(
            'INSERT INTO estudiante (per_id, id_programa_academico, numero_matricula, fecha_inscripcion, estado) VALUES (?, ?, ?, ?, ?)',
            [per_id, id_programa_academico, numero_matricula, fecha_inscripcion, estadoValue]
        );

        res.json({
            id: results.insertId,
            per_id,
            id_programa_academico,
            numero_matricula,
            fecha_inscripcion,
            estado: estadoValue
        });
    } catch (error) {
        console.error('Error creating estudiante:', error);
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Clave foránea inválida: persona o programa académico no existe' });
        }
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'El número de matrícula ya está registrado' });
        }
        res.status(500).json({ message: 'Error al crear estudiante' });
    }
};

export const updateEstudiante = async (req, res) => {
    const pool = await connect();
    const { per_id, id_programa_academico, numero_matricula, fecha_inscripcion, estado } = req.body;
    try {
        const [results] = await pool.query(
            "UPDATE estudiante SET per_id = ?, id_programa_academico = ?, numero_matricula = ?, fecha_inscripcion = ?, estado = ? WHERE id = ?",
            [per_id, id_programa_academico, numero_matricula, fecha_inscripcion, estado, req.params.id]
        );
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
        res.json({ message: 'Estudiante actualizado' });
    } catch (error) {
        console.error('Error updating estudiante:', error);
        res.status(500).json({ message: 'Error al actualizar estudiante' });
    }
};

export const deleteEstudiante = async (req, res) => {
    const pool = await connect();
    try {
        const [results] = await pool.query("DELETE FROM estudiante WHERE id = ?", [req.params.id]);
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
        res.json({ message: 'Estudiante eliminado' });
    } catch (error) {
        console.error('Error deleting estudiante:', error);
        res.status(500).json({ message: 'Error al eliminar estudiante' });
    }
};

export const getEvaluacionEstudiante = async (req, res) => {
    const pool = await connect();
    const { id } = req.params;

    try {
        const [base] = await pool.query(`
            SELECT 
                e.id AS estudiante_id,
                e.numero_matricula,
                p.nombres, p.apellidopat, p.apellidomat,
                pa.nombre_programa,

                proj.titulo AS proyecto_titulo,
                proj.calificacion,        -- Taller 1
                proj.calificacion2,       -- Taller 2
                proj.calificacion_final   -- Defensa Final
            FROM estudiante e
            JOIN persona p ON e.per_id = p.id
            JOIN programa_academico pa ON e.id_programa_academico = pa.id
            LEFT JOIN proyecto proj ON proj.id_estudiante = e.id
            WHERE e.id = ?
        `, [id]);

        if (base.length === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });

        const est = base[0];
        const estado = calcularEstadoTalleres(est.calificacion, est.calificacion2, est.calificacion_final);

        res.json({
            message: 'Evaluación completa',
            data: {
                estudiante_id: est.estudiante_id,
                nombre_completo: `${est.nombres} ${est.apellidopat} ${est.apellidomat}`.trim(),
                matricula: est.numero_matricula,
                programa: est.nombre_programa,
                proyecto: est.proyecto_titulo || 'Sin asignar',

                talleres_de_grado: {
                    taller1: {
                        nota: est.calificacion,
                        aprobado: est.calificacion >= 61,
                        ...estado.taller1
                    },
                    taller2: {
                        nota: est.calificacion2,
                        aprobado: est.calificacion2 >= 61,
                        ...estado.taller2
                    },
                    taller3: {
                        nota: est.calificacion_final,
                        aprobado: est.calificacion_final >= 61,
                        ...estado.taller3
                    },
                    estado_general: estado.estado_general,
                    mensaje: estado.mensaje,
                    titulado: estado.titulado
                }
            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno' });
    }
};

export const getAprobacionEstudianteTaller = async (req, res) => {
    const pool = await connect();
    const { id } = req.params;

    try {
        const [row] = await pool.query(`
            SELECT 
                e.numero_matricula,
                p.nombres, p.apellidopat, p.apellidomat,
                proj.titulo,
                proj.calificacion,        -- Taller 1
                proj.calificacion2,       -- Taller 2
                proj.calificacion_final   -- Final
            FROM estudiante e
            JOIN persona p ON e.per_id = p.id
            LEFT JOIN proyecto proj ON proj.id_estudiante = e.id
            WHERE e.id = ?
        `, [id]);

        if (row.length === 0) return res.status(404).json({ message: 'No encontrado' });

        const est = row[0];
        const estado = calcularEstadoTalleres(est.calificacion, est.calificacion2, est.calificacion_final);

        res.json({
            message: 'Estado actual en Talleres de Grado',
            data: {
                estudiante: {
                    nombre: `${est.nombres} ${est.apellidopat} ${est.apellidomat}`.trim(),
                    matricula: est.numero_matricula,
                    proyecto: est.titulo || 'Sin proyecto'
                },
                notas: {
                    "Taller de Grado 1": est.calificacion,
                    "Taller de Grado 2": est.calificacion2,
                    "Defensa Final": est.calificacion_final
                },
                progreso: estado,
                nota_minima: 61
            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error' });
    }
};