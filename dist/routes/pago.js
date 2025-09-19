"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _pago = require("../controlers/pago");
var router = (0, _express.Router)();

/**
 * @swagger
 * /pagos:
 *   get:
 *     summary: Get all payments
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
 *                   monto:
 *                     type: number
 *                   metodo:
 *                     type: string
 *                   comprobante:
 *                     type: string
 *                   fecha:
 *                     type: string
 */
router.get("/pagos", _pago.getPagos);

/**
 * @swagger
 * /pagos/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/pagos/:id", _pago.getPago);

/**
 * @swagger
 * /pagos:
 *   post:
 *     summary: Create a new payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *               monto:
 *                 type: number
 *               metodo:
 *                 type: string
 *               comprobante:
 *                 type: string
 *               fecha:
 *                 type: string
 */
router.post("/pagos", _pago.createPago);

/**
 * @swagger
 * /pagos/{id}:
 *   put:
 *     summary: Update a payment
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
 *               monto:
 *                 type: number
 *               metodo:
 *                 type: string
 *               comprobante:
 *                 type: string
 *               fecha:
 *                 type: string
 */
router.put("/pagos/:id", _pago.updatePago);

/**
 * @swagger
 * /pagos/{id}:
 *   delete:
 *     summary: Delete a payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/pagos/:id", _pago.deletePago);
var _default = exports["default"] = router;