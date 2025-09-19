"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _metodologia = require("../controlers/metodologia");
var router = (0, _express.Router)();

/**
 * @swagger
 * /metodologias:
 *   get:
 *     summary: Get all methodologies
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
 *                   descripcion:
 *                     type: string
 *                   objetivos:
 *                     type: string
 *                   numero_modulos:
 *                     type: string
 *                   fecha_inicio:
 *                     type: string
 *                   fecha_finalizacion:
 *                     type: string
 */
router.get("/metodologias", _metodologia.getMetodologias);

/**
 * @swagger
 * /metodologias/{id}:
 *   get:
 *     summary: Get a methodology by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/metodologias/:id", _metodologia.getMetodologia);

/**
 * @swagger
 * /metodologias:
 *   post:
 *     summary: Create a new methodology
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               objetivos:
 *                 type: string
 *               numero_modulos:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 */
router.post("/metodologias", _metodologia.createMetodologia);

/**
 * @swagger
 * /metodologias/{id}:
 *   put:
 *     summary: Update a methodology
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
 *               descripcion:
 *                 type: string
 *               objetivos:
 *                 type: string
 *               numero_modulos:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *               fecha_finalizacion:
 *                 type: string
 */
router.put("/metodologias/:id", _metodologia.updateMetodologia);

/**
 * @swagger
 * /metodologias/{id}:
 *   delete:
 *     summary: Delete a methodology
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/metodologias/:id", _metodologia.deleteMetodologia);
var _default = exports["default"] = router;