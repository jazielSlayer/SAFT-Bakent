import { Router } from "express";
import { getProgramas, getPrograma, createPrograma, updatePrograma, deletePrograma } from "../controlers/programa_academico";

const router = Router();

/**
 * @swagger
 * /programas:
 *   get:
 *     summary: Obtener todos los programas académicos
 *     tags: [Programas]
 *     responses:
 *       200:
 *         description: Lista de programas académicos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del programa académico
 *                   codigo:
 *                     type: string
 *                     description: Código del programa
 *                   nombre_programa:
 *                     type: string
 *                     description: Nombre del programa académico
 *                   modalidad:
 *                     type: string
 *                     description: Modalidad del programa (presencial, virtual, etc.)
 *                   facultad:
 *                     type: string
 *                     description: Facultad a la que pertenece el programa
 *                   nivel:
 *                     type: string
 *                     description: Nivel del programa (pregrado, posgrado, etc.)
 *                   estado:
 *                     type: boolean
 *                     description: Estado activo/inactivo del programa
 *       500:
 *         description: Error del servidor
 */
router.get("/programas", getProgramas);

/**
 * @swagger
 * /programas/{id}:
 *   get:
 *     summary: Obtener un programa académico por su ID
 *     tags: [Programas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del programa académico
 *     responses:
 *       200:
 *         description: Programa académico obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del programa académico
 *                 codigo:
 *                   type: string
 *                   description: Código del programa
 *                 nombre_programa:
 *                   type: string
 *                   description: Nombre del programa académico
 *                 modalidad:
 *                   type: string
 *                   description: Modalidad del programa
 *                 facultad:
 *                   type: string
 *                   description: Facultad a la que pertenece el programa
 *                 nivel:
 *                   type: string
 *                   description: Nivel del programa
 *                 estado:
 *                   type: boolean
 *                   description: Estado del programa
 *       404:
 *         description: Programa no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/programas/:id", getPrograma);

/**
 * @swagger
 * /programas:
 *   post:
 *     summary: Crear un nuevo programa académico
 *     tags: [Programas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - nombre_programa
 *               - modalidad
 *               - facultad
 *               - nivel
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: Código único del programa
 *               nombre_programa:
 *                 type: string
 *                 description: Nombre del programa académico
 *               modalidad:
 *                 type: string
 *                 description: Modalidad del programa (presencial, virtual, etc.)
 *               facultad:
 *                 type: string
 *                 description: Facultad a la que pertenece el programa
 *               nivel:
 *                 type: string
 *                 description: Nivel del programa (pregrado, posgrado, etc.)
 *               estado:
 *                 type: boolean
 *                 description: Estado activo/inactivo del programa
 *     responses:
 *       201:
 *         description: Programa académico creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 codigo:
 *                   type: string
 *                 nombre_programa:
 *                   type: string
 *                 modalidad:
 *                   type: string
 *                 facultad:
 *                   type: string
 *                 nivel:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/programas", createPrograma);

/**
 * @swagger
 * /programas/{id}:
 *   put:
 *     summary: Actualizar un programa académico
 *     tags: [Programas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del programa académico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: Código único del programa
 *               nombre_programa:
 *                 type: string
 *                 description: Nombre del programa académico
 *               modalidad:
 *                 type: string
 *                 description: Modalidad del programa
 *               facultad:
 *                 type: string
 *                 description: Facultad a la que pertenece el programa
 *               nivel:
 *                 type: string
 *                 description: Nivel del programa
 *               estado:
 *                 type: boolean
 *                 description: Estado activo/inactivo del programa
 *     responses:
 *       200:
 *         description: Programa académico actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 codigo:
 *                   type: string
 *                 nombre_programa:
 *                   type: string
 *                 modalidad:
 *                   type: string
 *                 facultad:
 *                   type: string
 *                 nivel:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Programa no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/programas/:id", updatePrograma);

/**
 * @swagger
 * /programas/{id}:
 *   delete:
 *     summary: Eliminar un programa académico
 *     tags: [Programas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del programa académico
 *     responses:
 *       204:
 *         description: Programa académico eliminado exitosamente
 *       404:
 *         description: Programa no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/programas/:id", deletePrograma);

export default router;