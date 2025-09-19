"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _historial_auditoria = require("../controlers/historial_auditoria");
var router = (0, _express.Router)();

/**
 * @swagger
 * /historiales:
 *   get:
 *     summary: Get all audit history records
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
 *                   entidad_afectada:
 *                     type: string
 *                   descripcion_operacion:
 *                     type: string
 *                   fecha_operacion:
 *                     type: string
 *                   usuario:
 *                     type: string
 */
router.get("/historiales", _historial_auditoria.getHistoriales);

/**
 * @swagger
 * /historiales/{id}:
 *   get:
 *     summary: Get an audit history record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/historiales/:id", _historial_auditoria.getHistorial);

/**
 * @swagger
 * /historiales:
 *   post:
 *     summary: Create a new audit history record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entidad_afectada:
 *                 type: string
 *               descripcion_operacion:
 *                 type: string
 *               fecha_operacion:
 *                 type: string
 *               usuario:
 *                 type: string
 */
router.post("/historiales", _historial_auditoria.createHistorial);

/**
 * @swagger
 * /historiales/{id}:
 *   put:
 *     summary: Update an audit history record
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
 *               entidad_afectada:
 *                 type: string
 *               descripcion_operacion:
 *                 type: string
 *               fecha_operacion:
 *                 type: string
 *               usuario:
 *                 type: string
 */
router.put("/historiales/:id", _historial_auditoria.updateHistorial);

/**
 * @swagger
 * /historiales/{id}:
 *   delete:
 *     summary: Delete an audit history record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/historiales/:id", _historial_auditoria.deleteHistorial);
var _default = exports["default"] = router;