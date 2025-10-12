import { connect } from '../database';

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