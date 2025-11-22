import { Router } from "express";
import { getEstudiantes, getEstudiante, createEstudiante, updateEstudiante, deleteEstudiante, getEvaluacionEstudiante, getAprobacionEstudianteTaller } from "../controlers/estudiante";

const router = Router();

/**
 * @swagger
 * /estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del estudiante
 *                   per_id:
 *                     type: integer
 *                     description: ID de la persona asociada al estudiante
 *                   id_programa_academico:
 *                     type: integer
 *                     description: ID del programa académico al que está inscrito el estudiante
 *                   numero_matricula:
 *                     type: string
 *                     description: Número de matrícula del estudiante
 *                   fecha_inscripcion:
 *                     type: string
 *                     description: Fecha de inscripción del estudiante (formato ISO 8601, ej. YYYY-MM-DD)
 *                   estado:
 *                     type: boolean
 *                     description: Estado activo/inactivo del estudiante
 *       500:
 *         description: Error del servidor
 */
router.get("/estudiantes", getEstudiantes);

/**
 * @swagger
 * /estudiantes/{id}:
 *   get:
 *     summary: Obtener un estudiante por su ID
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del estudiante
 *     responses:
 *       200:
 *         description: Estudiante obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del estudiante
 *                 per_id:
 *                   type: integer
 *                   description: ID de la persona asociada al estudiante
 *                 id_programa_academico:
 *                   type: integer
 *                   description: ID del programa académico al que está inscrito el estudiante
 *                 numero_matricula:
 *                   type: string
 *                   description: Número de matrícula del estudiante
 *                 fecha_inscripcion:
 *                   type: string
 *                   description: Fecha de inscripción del estudiante (formato ISO 8601, ej. YYYY-MM-DD)
 *                 estado:
 *                   type: boolean
 *                   description: Estado activo/inactivo del estudiante
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/estudiantes/:id", getEstudiante);

/**
 * @swagger
 * /estudiantes:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - per_id
 *               - id_programa_academico
 *               - numero_matricula
 *               - fecha_inscripcion
 *             properties:
 *               per_id:
 *                 type: integer
 *                 description: ID de la persona asociada al estudiante
 *               id_programa_academico:
 *                 type: integer
 *                 description: ID del programa académico al que está inscrito el estudiante
 *               numero_matricula:
 *                 type: string
 *                 description: Número de matrícula del estudiante
 *               fecha_inscripcion:
 *                 type: string
 *                 description: Fecha de inscripción del estudiante (formato ISO 8601, ej. YYYY-MM-DD)
 *               estado:
 *                 type: boolean
 *                 description: Estado activo/inactivo del estudiante
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 per_id:
 *                   type: integer
 *                 id_programa_academico:
 *                   type: integer
 *                 numero_matricula:
 *                   type: string
 *                 fecha_inscripcion:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/estudiantes", createEstudiante);

/**
 * @swagger
 * /estudiantes/{id}:
 *   put:
 *     summary: Actualizar un estudiante
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               per_id:
 *                 type: integer
 *                 description: ID de la persona asociada al estudiante
 *               id_programa_academico:
 *                 type: integer
 *                 description: ID del programa académico al que está inscrito el estudiante
 *               numero_matricula:
 *                 type: string
 *                 description: Número de matrícula del estudiante
 *               fecha_inscripcion:
 *                 type: string
 *                 description: Fecha de inscripción del estudiante (formato ISO 8601, ej. YYYY-MM-DD)
 *               estado:
 *                 type: boolean
 *                 description: Estado activo/inactivo del estudiante
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 per_id:
 *                   type: integer
 *                 id_programa_academico:
 *                   type: integer
 *                 numero_matricula:
 *                   type: string
 *                 fecha_inscripcion:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/estudiantes/:id", updateEstudiante);

/**
 * @swagger
 * /estudiantes/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del estudiante
 *     responses:
 *       204:
 *         description: Estudiante eliminado exitosamente
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/estudiantes/:id", deleteEstudiante);

router.get("/estudiante/evaluacion/:id", getEvaluacionEstudiante);

router.get('/aprobacion-taller/:id', getAprobacionEstudianteTaller);

export default router;