import { Router } from "express";
import { getDocentes, getDocente, createDocente, updateDocente, deleteDocente } from "../controlers/docente";

const router = Router();

/**
 * @swagger
 * /docentes:
 *   get:
 *     summary: Obtener todos los docentes
 *     tags: [Docentes]
 *     responses:
 *       200:
 *         description: Lista de docentes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del docente
 *                   per_id:
 *                     type: integer
 *                     description: ID de la persona asociada al docente
 *                   numero_item:
 *                     type: string
 *                     description: Número de item o código asignado al docente
 *                   especialidad:
 *                     type: string
 *                     description: Especialidad o área de conocimiento del docente
 *                   tipo_contrato:
 *                     type: string
 *                     description: Tipo de contrato del docente (ej. permanente, temporal)
 *                   estado:
 *                     type: boolean
 *                     description: Estado activo/inactivo del docente
 *       500:
 *         description: Error del servidor
 */
router.get("/docentes", getDocentes);

/**
 * @swagger
 * /docentes/{id}:
 *   get:
 *     summary: Obtener un docente por su ID
 *     tags: [Docentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del docente
 *     responses:
 *       200:
 *         description: Docente obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del docente
 *                 per_id:
 *                   type: integer
 *                   description: ID de la persona asociada al docente
 *                 numero_item:
 *                   type: string
 *                   description: Número de item o código asignado al docente
 *                 especialidad:
 *                   type: string
 *                   description: Especialidad o área de conocimiento del docente
 *                 tipo_contrato:
 *                   type: string
 *                   description: Tipo de contrato del docente (ej. permanente, temporal)
 *                 estado:
 *                   type: boolean
 *                   description: Estado activo/inactivo del docente
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/docentes/:id", getDocente);

/**
 * @swagger
 * /docentes:
 *   post:
 *     summary: Crear un nuevo docente
 *     tags: [Docentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - per_id
 *               - numero_item
 *               - especialidad
 *               - tipo_contrato
 *             properties:
 *               per_id:
 *                 type: integer
 *                 description: ID de la persona asociada al docente
 *               numero_item:
 *                 type: string
 *                 description: Número de item o código asignado al docente
 *               especialidad:
 *                 type: string
 *                 description: Especialidad o área de conocimiento del docente
 *               tipo_contrato:
 *                 type: string
 *                 description: Tipo de contrato del docente (ej. permanente, temporal)
 *               estado:
 *                 type: boolean
 *                 description: Estado activo/inactivo del docente
 *     responses:
 *       201:
 *         description: Docente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 per_id:
 *                   type: integer
 *                 numero_item:
 *                   type: string
 *                 especialidad:
 *                   type: string
 *                 tipo_contrato:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/docentes", createDocente);

/**
 * @swagger
 * /docentes/{id}:
 *   put:
 *     summary: Actualizar un docente
 *     tags: [Docentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del docente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               per_id:
 *                 type: integer
 *                 description: ID de la persona asociada al docente
 *               numero_item:
 *                 type: string
 *                 description: Número de item o código asignado al docente
 *               especialidad:
 *                 type: string
 *                 description: Especialidad o área de conocimiento del docente
 *               tipo_contrato:
 *                 type: string
 *                 description: Tipo de contrato del docente (ej. permanente, temporal)
 *               estado:
 *                 type: boolean
 *                 description: Estado activo/inactivo del docente
 *     responses:
 *       200:
 *         description: Docente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 per_id:
 *                   type: integer
 *                 numero_item:
 *                   type: string
 *                 especialidad:
 *                   type: string
 *                 tipo_contrato:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/docentes/:id", updateDocente);

/**
 * @swagger
 * /docentes/{id}:
 *   delete:
 *     summary: Eliminar un docente
 *     tags: [Docentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del docente
 *     responses:
 *       204:
 *         description: Docente eliminado exitosamente
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/docentes/:id", deleteDocente);

export default router;