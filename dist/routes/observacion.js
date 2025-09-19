"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _observacion = require("../controlers/observacion");
var router = (0, _express.Router)();

/**
 * @swagger
 * /observaciones:
 *   get:
 *     summary: Get all observations
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
 *                   contenido:
 *                     type: string
 *                   autor:
 *                     type: string
 *                   fecha:
 *                     type: string
 */
router.get("/observaciones", _observacion.getObservaciones);

/**
 * @swagger
 * /observaciones/{id}:
 *   get:
 *     summary: Get an observation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/observaciones/:id", _observacion.getObservacion);

/**
 * @swagger
 * /observaciones:
 *   post:
 *     summary: Create a new observation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *               contenido:
 *                 type: string
 *               autor:
 *                 type: string
 *               fecha:
 *                 type: string
 */
router.post("/observaciones", _observacion.createObservacion);

/**
 * @swagger
 * /observaciones/{id}:
 *   put:
 *     summary: Update an observation
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
 *               contenido:
 *                 type: string
 *               autor:
 *                 type: string
 *               fecha:
 *                 type: string
 */
router.put("/observaciones/:id", _observacion.updateObservacion);

/**
 * @swagger
 * /observaciones/{id}:
 *   delete:
 *     summary: Delete an observation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/observaciones/:id", _observacion.deleteObservacion);
var _default = exports["default"] = router;