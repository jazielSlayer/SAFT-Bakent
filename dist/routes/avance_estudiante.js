"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _avance_estudiante = require("../controlers/avance_estudiante");
var router = (0, _express.Router)();

/**
 * @swagger
 * /avances:
 *   get:
 *     summary: Get all student progress records
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
 *                   id_modulo:
 *                     type: integer
 *                   responsable:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                   estado:
 *                     type: string
 */
router.get("/avances", _avance_estudiante.getAvances);

/**
 * @swagger
 * /avances/{id}:
 *   get:
 *     summary: Get a student progress record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Avance not found
 */
router.get("/avances/:id", _avance_estudiante.getAvance);

/**
 * @swagger
 * /avances:
 *   post:
 *     summary: Create a new student progress record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *               id_modulo:
 *                 type: integer
 *               responsable:
 *                 type: string
 *               fecha:
 *                 type: string
 *               estado:
 *                 type: string
 */
router.post("/avances", _avance_estudiante.createAvance);

/**
 * @swagger
 * /avances/{id}:
 *   put:
 *     summary: Update a student progress record
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
 *               id_modulo:
 *                 type: integer
 *               responsable:
 *                 type: string
 *               fecha:
 *                 type: string
 *               estado:
 *                 type: string
 */
router.put("/avances/:id", _avance_estudiante.updateAvance);

/**
 * @swagger
 * /avances/{id}:
 *   delete:
 *     summary: Delete a student progress record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/avances/:id", _avance_estudiante.deleteAvance);
router.get('/avance/estudiante/:id_estudiante', _avance_estudiante.getAvanceEstudiante);
var _default = exports["default"] = router;