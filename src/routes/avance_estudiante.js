import { Router } from "express";
import { getAvances, getAvance, createAvance, updateAvance, deleteAvance, getAvanceEstudiante } from "../controlers/avance_estudiante";

const router = Router();

/**
 * @swagger
 * /avances:
 *   get:
 *     summary: Get all student progress records
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
 *                   id_estudiante:
 *                     type: integer
 *                   id_modulo:
 *                     type: integer
 *                   responsable:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                   estado:
 *                     type: string
 */
router.get("/avances", getAvances);

/**
 * @swagger
 * /avances/{id}:
 *   get:
 *     summary: Get a student progress record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Avance not found
 */
router.get("/avances/:id", getAvance);

/**
 * @swagger
 * /avances:
 *   post:
 *     summary: Create a new student progress record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *               id_modulo:
 *                 type: integer
 *               responsable:
 *                 type: string
 *               fecha:
 *                 type: string
 *               estado:
 *                 type: string
 */
router.post("/avances", createAvance);

/**
 * @swagger
 * /avances/{id}:
 *   put:
 *     summary: Update a student progress record
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
 *               id_estudiante:
 *                 type: integer
 *               id_modulo:
 *                 type: integer
 *               responsable:
 *                 type: string
 *               fecha:
 *                 type: string
 *               estado:
 *                 type: string
 */
router.put("/avances/:id", updateAvance);

/**
 * @swagger
 * /avances/{id}:
 *   delete:
 *     summary: Delete a student progress record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/avances/:id", deleteAvance);

router.get('/avance/estudiante/:id_estudiante', getAvanceEstudiante)

export default router;