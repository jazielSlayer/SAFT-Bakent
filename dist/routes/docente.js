"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _docente = require("../controlers/docente");
var router = (0, _express.Router)();

/**
 * @swagger
 * /docentes:
 *   get:
 *     summary: Get all teachers
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
 *                   numero_item:
 *                     type: string
 *                   especialidad:
 *                     type: string
 *                   tipo_contrato:
 *                     type: string
 *                   estado:
 *                     type: boolean
 */
router.get("/docentes", _docente.getDocentes);

/**
 * @swagger
 * /docentes/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/docentes/:id", _docente.getDocente);

/**
 * @swagger
 * /docentes:
 *   post:
 *     summary: Create a new teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               per_id:
 *                 type: integer
 *               numero_item:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               tipo_contrato:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.post("/docentes", _docente.createDocente);

/**
 * @swagger
 * /docentes/{id}:
 *   put:
 *     summary: Update a teacher
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
 *               numero_item:
 *                 type: string
 *               especialidad:
 *                 type: string
 *               tipo_contrato:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.put("/docentes/:id", _docente.updateDocente);

/**
 * @swagger
 * /docentes/{id}:
 *   delete:
 *     summary: Delete a teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/docentes/:id", _docente.deleteDocente);
var _default = exports["default"] = router;