"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _taller = require("../controlers/taller");
var router = (0, _express.Router)();

/**
 * @swagger
 * /talleres:
 *   get:
 *     summary: Obtener los datos de los talleres
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
 *                   id_docente:
 *                     type: integer
 *                   id_programa_academico:
 *                     type: integer
 *                   descripcion:
 *                     type: string
 *                   fecha_inicio:
 *                     type: string
 *                   fecha_finalizacion:
 *                     type: string
 *                   estado:
 *                     type: boolean
 */
router.get("/talleres", _taller.getTalleres);

/**
 * @swagger
 * /talleres/{id}:
 *   get:
 *     summary: Obtener los datos de taller por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/taller/:id", _taller.getTaller);

/**
 * @swagger
 * /talleres:
 *   post:
 *     summary: Crea un nuevo taller
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               id_docente:
 *                 type: integer
 *               id_programa_academico:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.post("/create-taller", _taller.createTaller);

/**
 * @swagger
 * /talleres/{id}:
 *   put:
 *     summary: Actaulaizar un tallaer por ID
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
 *               id_docente:
 *                 type: integer
 *               id_programa_academico:
 *                 type: integer
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.put("/update-taller/:id", _taller.updateTaller);

/**
 * @swagger
 * /talleres/{id}:
 *   delete:
 *     summary: Eliminar un taller
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/delete-taller/:id", _taller.deleteTaller);
var _default = exports["default"] = router;