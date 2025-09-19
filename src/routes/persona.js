import { Router } from "express";
import { getPersonas, getPersona, createPersona, updatePersona, deletePersona } from "../controlers/persona";

const router = Router();

/**
 * @swagger
 * /personas:
 *   get:
 *     summary: Get all persons
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
 *                   nombres:
 *                     type: string
 *                   apellidopat:
 *                     type: string
 *                   apellidomat:
 *                     type: string
 *                   carnet:
 *                     type: string
 *                   direccion:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   fecha_nacimiento:
 *                     type: string
 *                   estado:
 *                     type: boolean
 */
router.get("/personas", getPersonas);

/**
 * @swagger
 * /personas/{id}:
 *   get:
 *     summary: Get a person by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/personas/:id", getPersona);

/**
 * @swagger
 * /personas:
 *   post:
 *     summary: Create a new person
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidopat:
 *                 type: string
 *               apellidomat:
 *                 type: string
 *               carnet:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               correo:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.post("/personas", createPersona);

/**
 * @swagger
 * /personas/{id}:
 *   put:
 *     summary: Update a person
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
 *               nombres:
 *                 type: string
 *               apellidopat:
 *                 type: string
 *               apellidomat:
 *                 type: string
 *               carnet:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               correo:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.put("/personas/:id", updatePersona);

/**
 * @swagger
 * /personas/{id}:
 *   delete:
 *     summary: Delete a person
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/personas/:id", deletePersona);

export default router;