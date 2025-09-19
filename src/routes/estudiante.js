import { Router } from "express";
import { getEstudiantes, getEstudiante, createEstudiante, updateEstudiante, deleteEstudiante } from "../controlers/estudiante";

const router = Router();

/**
 * @swagger
 * /estudiantes:
 *   get:
 *     summary: Get all students
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
 *                   per_id:
 *                     type: integer
 *                   id_programa_academico:
 *                     type: integer
 *                   numero_matricula:
 *                     type: string
 *                   fecha_inscripcion:
 *                     type: string
 *                   estado:
 *                     type: boolean
 */
router.get("/estudiantes", getEstudiantes);

/**
 * @swagger
 * /estudiantes/{id}:
 *   get:
 *     summary: Get a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/estudiantes/:id", getEstudiante);

/**
 * @swagger
 * /estudiantes:
 *   post:
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               per_id:
 *                 type: integer
 *               id_programa_academico:
 *                 type: integer
 *               numero_matricula:
 *                 type: string
 *               fecha_inscripcion:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.post("/estudiantes", createEstudiante);

/**
 * @swagger
 * /estudiantes/{id}:
 *   put:
 *     summary: Update a student
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
 *               per_id:
 *                 type: integer
 *               id_programa_academico:
 *                 type: integer
 *               numero_matricula:
 *                 type: string
 *               fecha_inscripcion:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.put("/estudiantes/:id", updateEstudiante);

/**
 * @swagger
 * /estudiantes/{id}:
 *   delete:
 *     summary: Delete a student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/estudiantes/:id", deleteEstudiante);

export default router;