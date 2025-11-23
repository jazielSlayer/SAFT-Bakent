import { Router } from "express";
import { getObservaciones, getObservacion, createObservacion, updateObservacion, deleteObservacion } from "../controlers/observacion";

const router = Router();

/**
 * @swagger
 * /observaciones:
 *   get:
 *     summary: Obtener todas las observaciones
 *     tags: [Observaciones]
 *     responses:
 *       200:
 *         description: Lista de observaciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único de la observación
 *                   id_estudiante:
 *                     type: integer
 *                     description: ID del estudiante asociado a la observación
 *                   contenido:
 *                     type: string
 *                     description: Contenido o descripción de la observación
 *                   autor:
 *                     type: string
 *                     description: Nombre o identificador del autor de la observación
 *                   fecha:
 *                     type: string
 *                     description: Fecha de la observación (formato ISO 8601, ej. YYYY-MM-DD)
 *       500:
 *         description: Error del servidor
 */
router.get("/observaciones", getObservaciones);

/**
 * @swagger
 * /observaciones/{id}:
 *   get:
 *     summary: Obtener una observación por su ID
 *     tags: [Observaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la observación
 *     responses:
 *       200:
 *         description: Observación obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único de la observación
 *                 id_estudiante:
 *                   type: integer
 *                   description: ID del estudiante asociado a la observación
 *                 contenido:
 *                   type: string
 *                   description: Contenido o descripción de la observación
 *                 autor:
 *                   type: string
 *                   description: Nombre o identificador del autor de la observación
 *                 fecha:
 *                   type: string
 *                   description: Fecha de la observación (formato ISO 8601, ej. YYYY-MM-DD)
 *       404:
 *         description: Observación no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/observaciones/:id", getObservacion);

/**
 * @swagger
 * /observaciones:
 *   post:
 *     summary: Crear una nueva observación
 *     tags: [Observaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_estudiante
 *               - contenido
 *               - autor
 *               - fecha
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *                 description: ID del estudiante asociado a la observación
 *               contenido:
 *                 type: string
 *                 description: Contenido o descripción de la observación
 *               autor:
 *                 type: string
 *                 description: Nombre o identificador del autor de la observación
 *               fecha:
 *                 type: string
 *                 description: Fecha de la observación (formato ISO 8601, ej. YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Observación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_estudiante:
 *                   type: integer
 *                 contenido:
 *                   type: string
 *                 autor:
 *                   type: string
 *                 fecha:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/observaciones/create", createObservacion);

/**
 * @swagger
 * /observaciones/{id}:
 *   put:
 *     summary: Actualizar una observación
 *     tags: [Observaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la observación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *                 description: ID del estudiante asociado a la observación
 *               contenido:
 *                 type: string
 *                 description: Contenido o descripción de la observación
 *               autor:
 *                 type: string
 *                 description: Nombre o identificador del autor de la observación
 *               fecha:
 *                 type: string
 *                 description: Fecha de la observación (formato ISO 8601, ej. YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Observación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_estudiante:
 *                   type: integer
 *                 contenido:
 *                   type: string
 *                 autor:
 *                   type: string
 *                 fecha:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Observación no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/observaciones/update/:id", updateObservacion);

/**
 * @swagger
 * /observaciones/{id}:
 *   delete:
 *     summary: Eliminar una observación
 *     tags: [Observaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la observación
 *     responses:
 *       204:
 *         description: Observación eliminada exitosamente
 *       404:
 *         description: Observación no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/observaciones/delete/:id", deleteObservacion);

export default router;