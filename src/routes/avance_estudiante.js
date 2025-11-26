import { Router } from "express";
import { getAvances, getAvance, createAvance, updateAvance, deleteAvance, getAvanceEstudiante, getAvancesPorcentaje } from "../controlers/avance_estudiante";

const router = Router();

/**
 * @swagger
 * /avances:
 *   get:
 *     summary: Obtener todos los registros de avances de estudiantes
 *     tags: [Avances]
 *     responses:
 *       200:
 *         description: Lista de avances obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del registro de avance
 *                   id_estudiante:
 *                     type: integer
 *                     description: ID del estudiante asociado al avance
 *                   id_modulo:
 *                     type: integer
 *                     description: ID del módulo asociado al avance
 *                   responsable:
 *                     type: string
 *                     description: Nombre o identificador del responsable que registró el avance
 *                   fecha:
 *                     type: string
 *                     description: Fecha del registro del avance (formato ISO 8601, ej. YYYY-MM-DD)
 *                   estado:
 *                     type: string
 *                     description: Estado del avance (ej. en progreso, completado, retrasado)
 *       500:
 *         description: Error del servidor
 */
router.get("/avances", getAvances);

router.get("/avances/resumen", getAvancesPorcentaje);

/**
 * @swagger
 * /avances/{id}:
 *   get:
 *     summary: Obtener un registro de avance por su ID
 *     tags: [Avances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del registro de avance
 *     responses:
 *       200:
 *         description: Registro de avance obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del registro de avance
 *                 id_estudiante:
 *                   type: integer
 *                   description: ID del estudiante asociado al avance
 *                 id_modulo:
 *                   type: integer
 *                   description: ID del módulo asociado al avance
 *                 responsable:
 *                   type: string
 *                   description: Nombre o identificador del responsable que registró el avance
 *                 fecha:
 *                   type: string
 *                   description: Fecha del registro del avance (formato ISO 8601, ej. YYYY-MM-DD)
 *                 estado:
 *                   type: string
 *                   description: Estado del avance (ej. en progreso, completado, retrasado)
 *       404:
 *         description: Registro de avance no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/avances/:id", getAvance);

/**
 * @swagger
 * /avances:
 *   post:
 *     summary: Crear un nuevo registro de avance
 *     tags: [Avances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_estudiante
 *               - id_modulo
 *               - responsable
 *               - fecha
 *               - estado
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *                 description: ID del estudiante asociado al avance
 *               id_modulo:
 *                 type: integer
 *                 description: ID del módulo asociado al avance
 *               responsable:
 *                 type: string
 *                 description: Nombre o identificador del responsable que registró el avance
 *               fecha:
 *                 type: string
 *                 description: Fecha del registro del avance (formato ISO 8601, ej. YYYY-MM-DD)
 *               estado:
 *                 type: string
 *                 description: Estado del avance (ej. en progreso, completado, retrasado)
 *     responses:
 *       201:
 *         description: Registro de avance creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_estudiante:
 *                   type: integer
 *                 id_modulo:
 *                   type: integer
 *                 responsable:
 *                   type: string
 *                 fecha:
 *                   type: string
 *                 estado:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/avances/create", createAvance);

/**
 * @swagger
 * /avances/{id}:
 *   put:
 *     summary: Actualizar un registro de avance
 *     tags: [Avances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del registro de avance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *                 description: ID del estudiante asociado al avance
 *               id_modulo:
 *                 type: integer
 *                 description: ID del módulo asociado al avance
 *               responsable:
 *                 type: string
 *                 description: Nombre o identificador del responsable que registró el avance
 *               fecha:
 *                 type: string
 *                 description: Fecha del registro del avance (formato ISO 8601, ej. YYYY-MM-DD)
 *               estado:
 *                 type: string
 *                 description: Estado del avance (ej. en progreso, completado, retrasado)
 *     responses:
 *       200:
 *         description: Registro de avance actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_estudiante:
 *                   type: integer
 *                 id_modulo:
 *                   type: integer
 *                 responsable:
 *                   type: string
 *                 fecha:
 *                   type: string
 *                 estado:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Registro de avance no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/avances/update/:id", updateAvance);

/**
 * @swagger
 * /avances/{id}:
 *   delete:
 *     summary: Eliminar un registro de avance
 *     tags: [Avances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del registro de avance
 *     responses:
 *       204:
 *         description: Registro de avance eliminado exitosamente
 *       404:
 *         description: Registro de avance no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/avances/delete/:id", deleteAvance);

/**
 * @swagger
 * /avance/estudiante/{id_estudiante}:
 *   get:
 *     summary: Obtener los registros de avances de un estudiante por su ID
 *     tags: [Avances]
 *     parameters:
 *       - in: path
 *         name: id_estudiante
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del estudiante
 *     responses:
 *       200:
 *         description: Lista de registros de avances del estudiante obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del registro de avance
 *                   id_estudiante:
 *                     type: integer
 *                     description: ID del estudiante asociado al avance
 *                   id_modulo:
 *                     type: integer
 *                     description: ID del módulo asociado al avance
 *                   responsable:
 *                     type: string
 *                     description: Nombre o identificador del responsable que registró el avance
 *                   fecha:
 *                     type: string
 *                     description: Fecha del registro del avance (formato ISO 8601, ej. YYYY-MM-DD)
 *                   estado:
 *                     type: string
 *                     description: Estado del avance (ej. en progreso, completado, retrasado)
 *       404:
 *         description: Registros de avances no encontrados para el estudiante
 *       500:
 *         description: Error del servidor
 */
router.get("/avance/estudiante/:id_estudiante", getAvanceEstudiante);

export default router;