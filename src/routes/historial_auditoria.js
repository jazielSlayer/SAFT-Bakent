import { Router } from "express";
import { getHistoriales, getHistorial, createHistorial, updateHistorial, deleteHistorial } from "../controlers/historial_auditoria";

const router = Router();
/**
 * @swagger
 * /historiales:
 *   get:
 *     summary: Obtener todos los registros de auditoría
 *     tags: [Historiales]
 *     responses:
 *       200:
 *         description: Lista de registros de auditoría obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del registro de auditoría
 *                   entidad_afectada:
 *                     type: string
 *                     description: Nombre de la entidad afectada por la operación (ej. tabla o recurso)
 *                   descripcion_operacion:
 *                     type: string
 *                     description: Descripción de la operación realizada
 *                   fecha_operacion:
 *                     type: string
 *                     description: Fecha y hora de la operación (formato ISO 8601, ej. YYYY-MM-DDTHH:mm:ssZ)
 *                   usuario:
 *                     type: string
 *                     description: Identificador o nombre del usuario que realizó la operación
 *       500:
 *         description: Error del servidor
 */
router.get("/historiales", getHistoriales);

/**
 * @swagger
 * /historiales/{id}:
 *   get:
 *     summary: Obtener un registro de auditoría por su ID
 *     tags: [Historiales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del registro de auditoría
 *     responses:
 *       200:
 *         description: Registro de auditoría obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del registro de auditoría
 *                 entidad_afectada:
 *                   type: string
 *                   description: Nombre de la entidad afectada por la operación (ej. tabla o recurso)
 *                 descripcion_operacion:
 *                   type: string
 *                   description: Descripción de la operación realizada
 *                 fecha_operacion:
 *                   type: string
 *                   description: Fecha y hora de la operación (formato ISO 8601, ej. YYYY-MM-DDTHH:mm:ssZ)
 *                 usuario:
 *                   type: string
 *                   description: Identificador o nombre del usuario que realizó la operación
 *       404:
 *         description: Registro de auditoría no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/historiales/:id", getHistorial);

/**
 * @swagger
 * /historiales:
 *   post:
 *     summary: Crear un nuevo registro de auditoría
 *     tags: [Historiales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - entidad_afectada
 *               - descripcion_operacion
 *               - fecha_operacion
 *               - usuario
 *             properties:
 *               entidad_afectada:
 *                 type: string
 *                 description: Nombre de la entidad afectada por la operación (ej. tabla o recurso)
 *               descripcion_operacion:
 *                 type: string
 *                 description: Descripción de la operación realizada
 *               fecha_operacion:
 *                 type: string
 *                 description: Fecha y hora de la operación (formato ISO 8601, ej. YYYY-MM-DDTHH:mm:ssZ)
 *               usuario:
 *                 type: string
 *                 description: Identificador o nombre del usuario que realizó la operación
 *     responses:
 *       201:
 *         description: Registro de auditoría creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 entidad_afectada:
 *                   type: string
 *                 descripcion_operacion:
 *                   type: string
 *                 fecha_operacion:
 *                   type: string
 *                 usuario:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/historiales", createHistorial);

/**
 * @swagger
 * /historiales/{id}:
 *   put:
 *     summary: Actualizar un registro de auditoría
 *     tags: [Historiales]
 *     description: Registros de auditoria
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del registro de auditoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entidad_afectada:
 *                 type: string
 *                 description: Nombre de la entidad afectada por la operación (ej. tabla o recurso)
 *               descripcion_operacion:
 *                 type: string
 *                 description: Descripción de la operación realizada
 *               fecha_operacion:
 *                 type: string
 *                 description: Fecha y hora de la operación (formato ISO 8601, ej. YYYY-MM-DDTHH:mm:ssZ)
 *               usuario:
 *                 type: string
 *                 description: Identificador o nombre del usuario que realizó la operación
 *     responses:
 *       200:
 *         description: Registro de auditoría actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 entidad_afectada:
 *                   type: string
 *                 descripcion_operacion:
 *                   type: string
 *                 fecha_operacion:
 *                   type: string
 *                 usuario:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Registro de auditoría no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/historiales/:id", updateHistorial);

/**
 * @swagger
 * /historiales/{id}:
 *   delete:
 *     summary: Eliminar un registro de auditoría
 *     tags: [Historiales]
 *     description: Registros de auditoria
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del registro de auditoría
 *     responses:
 *       204:
 *         description: Registro de auditoría eliminado exitosamente
 *       404:
 *         description: Registro de auditoría no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/historiales/:id", deleteHistorial);

export default router;