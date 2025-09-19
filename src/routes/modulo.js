import { Router } from "express";
import { getModulos, getModulo, createModulo, updateModulo, deleteModulo } from "../controlers/modulo";

const router = Router();

/**
 * @swagger
 * /modulos:
 *   get:
 *     summary: Get all modules
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
 *                   nombre:
 *                     type: string
 *                   id_docente:
 *                     type: integer
 *                   id_metodologia:
 *                     type: integer
 *                   duracion:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   fecha_inicio:
 *                     type: string
 *                   fecha_finalizacion:
 *                     type: string
 */
router.get("/modulos", getModulos);

/**
 * @swagger
 * /modulos/{id}:
 *   get:
 *     summary: Get a module by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/modulos/:id", getModulo);

/**
 * @swagger
 * /modulos:
 *   post:
 *     summary: Create a new module
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               nombre:
 *                 type: string
 *               id_docente:
 *                 type: integer
 *               id_metodologia:
 *                 type: integer
 *               duracion:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 */
router.post("/modulos", createModulo);

/**
 * @swagger
 * /modulos/{id}:
 *   put:
 *     summary: Update a module
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
 *               nombre:
 *                 type: string
 *               id_docente:
 *                 type: integer
 *               id_metodologia:
 *                 type: integer
 *               duracion:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 */
router.put("/modulos/:id", updateModulo);

/**
 * @swagger
 * /modulos/{id}:
 *   delete:
 *     summary: Delete a module
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/modulos/:id", deleteModulo);

export default router;