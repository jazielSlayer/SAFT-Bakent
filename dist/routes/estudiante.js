"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _estudiante = require("../controlers/estudiante");
var router = (0, _express.Router)();

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
router.get("/estudiantes", _estudiante.getEstudiantes);

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
router.get("/estudiantes/:id", _estudiante.getEstudiante);

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
router.post("/estudiantes", _estudiante.createEstudiante);

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
router.put("/estudiantes/:id", _estudiante.updateEstudiante);

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
router["delete"]("/estudiantes/:id", _estudiante.deleteEstudiante);
var _default = exports["default"] = router;