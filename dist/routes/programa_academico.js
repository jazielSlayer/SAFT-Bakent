"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _programa_academico = require("../controlers/programa_academico");
var router = (0, _express.Router)();

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
router.get("/programas", _programa_academico.getProgramas);

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
router.get("/programas/:id", _programa_academico.getPrograma);

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
router.post("/programas", _programa_academico.createPrograma);

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
router.put("/programas/:id", _programa_academico.updatePrograma);

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
router["delete"]("/programas/:id", _programa_academico.deletePrograma);
var _default = exports["default"] = router;