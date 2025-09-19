import { Router } from "express";
import { getMetodologias, getMetodologia, createMetodologia, updateMetodologia, deleteMetodologia } from "../controlers/metodologia";

const router = Router();

/**
 * @swagger
 * /metodologias:
 *   get:
 *     summary: Get all methodologies
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
 *                   descripcion:
 *                     type: string
 *                   objetivos:
 *                     type: string
 *                   numero_modulos:
 *                     type: string
 *                   fecha_inicio:
 *                     type: string
 *                   fecha_finalizacion:
 *                     type: string
 */
router.get("/metodologias", getMetodologias);

/**
 * @swagger
 * /metodologias/{id}:
 *   get:
 *     summary: Get a methodology by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/metodologias/:id", getMetodologia);

/**
 * @swagger
 * /metodologias:
 *   post:
 *     summary: Create a new methodology
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               objetivos:
 *                 type: string
 *               numero_modulos:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 */
router.post("/metodologias", createMetodologia);

/**
 * @swagger
 * /metodologias/{id}:
 *   put:
 *     summary: Update a methodology
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
 *               descripcion:
 *                 type: string
 *               objetivos:
 *                 type: string
 *               numero_modulos:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 */
router.put("/metodologias/:id", updateMetodologia);

/**
 * @swagger
 * /metodologias/{id}:
 *   delete:
 *     summary: Delete a methodology
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/metodologias/:id", deleteMetodologia);

export default router;