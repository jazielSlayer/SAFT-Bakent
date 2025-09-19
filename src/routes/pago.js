import { Router } from "express";
import { getPagos, getPago, createPago, updatePago, deletePago } from "../controlers/pago";

const router = Router();

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
router.get("/pagos", getPagos);

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
router.get("/pagos/:id", getPago);

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
router.post("/pagos", createPago);

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
router.put("/pagos/:id", updatePago);

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
router.delete("/pagos/:id", deletePago);

export default router;