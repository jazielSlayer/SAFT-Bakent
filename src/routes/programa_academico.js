import { Router } from "express";
import { getProgramas, getPrograma, createPrograma, updatePrograma, deletePrograma } from "../controlers/programa_academico";

const router = Router();

/**
 * @swagger
 * /programas:
 *   get:
 *     summary: Get all academic programs
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
 *                   codigo:
 *                     type: string
 *                   nombre_programa:
 *                     type: string
 *                   modalidad:
 *                     type: string
 *                   facultad:
 *                     type: string
 *                   nivel:
 *                     type: string
 *                   estado:
 *                     type: boolean
 */
router.get("/programas", getProgramas);

/**
 * @swagger
 * /programas/{id}:
 *   get:
 *     summary: Get an academic program by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/programas/:id", getPrograma);

/**
 * @swagger
 * /programas:
 *   post:
 *     summary: Create a new academic program
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               nombre_programa:
 *                 type: string
 *               modalidad:
 *                 type: string
 *               facultad:
 *                 type: string
 *               nivel:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.post("/programas", createPrograma);

/**
 * @swagger
 * /programas/{id}:
 *   put:
 *     summary: Update an academic program
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
 *               codigo:
 *                 type: string
 *               nombre_programa:
 *                 type: string
 *               modalidad:
 *                 type: string
 *               facultad:
 *                 type: string
 *               nivel:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.put("/programas/:id", updatePrograma);

/**
 * @swagger
 * /programas/{id}:
 *   delete:
 *     summary: Delete an academic program
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/programas/:id", deletePrograma);

export default router;