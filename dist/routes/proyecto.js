"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _proyecto = require("../controlers/proyecto");
var router = (0, _express.Router)();

/**
 * @swagger
 * /proyectos:
 *   get:
 *     summary: Obtenemos un proyecto por ID
 *     responses:
 *       200:
 *         description: Completado con exito
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
 *                   id_docente:
 *                     type: integer
 *                   id_taller:
 *                     type: integer
 *                   nombre_proyecto:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   fecha_inicio:
 *                     type: string
 *                   fecha_finalizacion:
 *                     type: string
 *                   estado:
 *                     type: boolean
 */
router.get("/proyectos", _proyecto.getProyectos);

/**
 * @swagger
 * /proyectos/{id}:
 *   get:
 *     summary: Obtener el proyecto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/proyectos/:id", _proyecto.getProyecto);

/**
 * @swagger
 * /proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *               id_docente:
 *                 type: integer
 *               id_taller:
 *                 type: integer
 *               nombre_proyecto:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.post("/proyectos", _proyecto.createProyecto);

/**
 * @swagger
 * /proyectos/{id}:
 *   put:
 *     summary: Actaulizar un proyecto
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
 *               id_docente:
 *                 type: integer
 *               id_taller:
 *                 type: integer
 *               nombre_proyecto:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.put("/proyectos/:id", _proyecto.updateProyecto);

/**
 * @swagger
 * /proyectos/{id}:
 *   delete:
 *     summary: Eliminar un proyecto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/proyectos/:id", _proyecto.deleteProyecto);

/**
 * @swagger
 * /proyectos/estudiante/{id_estudiante}:
 *   get:
 *     summary: Obtener el proyecto del estudiante por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id_estudiante
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Proyecto del estudiante obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_proyecto:
 *                   type: integer
 *                 nombre_proyecto:
 *                   type: string
 *                 id_estudiante:
 *                   type: integer
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/proyectos/estudiante/:id_estudiante', _proyecto.getProyectoEstudiante);

/**
 * @swagger
 * /proyectos/docente/{id_docente}:
 *   get:
 *     summary: Obtener proyectos relacionados a un docente por su ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id_docente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del docente
 *     responses:
 *       200:
 *         description: Lista de proyectos del docente obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_proyecto:
 *                     type: integer
 *                   nombre_proyecto:
 *                     type: string
 *                   id_docente:
 *                     type: integer
 *       404:
 *         description: Proyectos no encontrados
 *       500:
 *         description: Error del servidor
 */
router.get('/proyectos/docente/:id_docente', _proyecto.getProyectoDocente);
var _default = exports["default"] = router;