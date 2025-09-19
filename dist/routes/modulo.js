"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _modulo = require("../controlers/modulo");
var router = (0, _express.Router)();

/**
 * @swagger
 * /modulos:
 *   get:
 *     summary: Get all modules
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
 *                   nombre:
 *                     type: string
 *                   id_docente:
 *                     type: integer
 *                   id_metodologia:
 *                     type: integer
 *                   duracion:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   fecha_inicio:
 *                     type: string
 *                   fecha_finalizacion:
 *                     type: string
 */
router.get("/modulos", _modulo.getModulos);

/**
 * @swagger
 * /modulos/{id}:
 *   get:
 *     summary: Get a module by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/modulos/:id", _modulo.getModulo);

/**
 * @swagger
 * /modulos:
 *   post:
 *     summary: Create a new module
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *               nombre:
 *                 type: string
 *               id_docente:
 *                 type: integer
 *               id_metodologia:
 *                 type: integer
 *               duracion:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 */
router.post("/modulos", _modulo.createModulo);

/**
 * @swagger
 * /modulos/{id}:
 *   put:
 *     summary: Update a module
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
 *               nombre:
 *                 type: string
 *               id_docente:
 *                 type: integer
 *               id_metodologia:
 *                 type: integer
 *               duracion:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 */
router.put("/modulos/:id", _modulo.updateModulo);

/**
 * @swagger
 * /modulos/{id}:
 *   delete:
 *     summary: Delete a module
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/modulos/:id", _modulo.deleteModulo);
var _default = exports["default"] = router;