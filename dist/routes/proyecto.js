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
 *     summary: Get all projects
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
 *     summary: Get a project by ID
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
 *     summary: Create a new project
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
 *     summary: Update a project
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
 *     summary: Delete a project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/proyectos/:id", _proyecto.deleteProyecto);

// Obtener proyectos de un estudiante por su id_estudiante
router.get('/proyectos/estudiante/:id_estudiante', _proyecto.getProyectoEstudiante);

// Obtener proyectos relacionados a un docente por su id_docente
router.get('/proyectos/docente/:id_docente', _proyecto.getProyectoDocente);
var _default = exports["default"] = router;