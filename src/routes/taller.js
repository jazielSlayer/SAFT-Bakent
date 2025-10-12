import { Router } from "express";
import { getTalleres, getTaller, createTaller, updateTaller, deleteTaller } from "../controlers/taller";

const router = Router();

/**
 * @swagger
 * /talleres:
 *   get:
 *     summary: Obtener los datos de los talleres
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
 *     summary: Obtener los datos de taller por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/taller/:id", getTaller);

/**
 * @swagger
 * /talleres:
 *   post:
 *     summary: Crea un nuevo taller
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
router.post("/create-taller", createTaller);

/**
 * @swagger
 * /talleres/{id}:
 *   put:
 *     summary: Actaulaizar un tallaer por ID
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
router.put("/update-taller/:id", updateTaller);

/**
 * @swagger
 * /talleres/{id}:
 *   delete:
 *     summary: Eliminar un taller
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/delete-taller/:id", deleteTaller);

export default router;