import { Router } from "express";
import { getTalleres, getTaller, createTaller, updateTaller, deleteTaller } from "../controlers/taller";

const router = Router();

/**
 * @swagger
 * /talleres:
 *   get:
 *     summary: Get all workshops
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   id_docente:
 *                     type: integer
 *                   id_programa_academico:
 *                     type: integer
 *                   descripcion:
 *                     type: string
 *                   fecha_inicio:
 *                     type: string
 *                   fecha_finalizacion:
 *                     type: string
 *                   estado:
 *                     type: boolean
 */
router.get("/talleres", getTalleres);

/**
 * @swagger
 * /talleres/{id}:
 *   get:
 *     summary: Get a workshop by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/talleres/:id", getTaller);

/**
 * @swagger
 * /talleres:
 *   post:
 *     summary: Create a new workshop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               id_docente:
 *                 type: integer
 *               id_programa_academico:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.post("/talleres", createTaller);

/**
 * @swagger
 * /talleres/{id}:
 *   put:
 *     summary: Update a workshop
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               id_docente:
 *                 type: integer
 *               id_programa_academico:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.put("/talleres/:id", updateTaller);

/**
 * @swagger
 * /talleres/{id}:
 *   delete:
 *     summary: Delete a workshop
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/talleres/:id", deleteTaller);

export default router;