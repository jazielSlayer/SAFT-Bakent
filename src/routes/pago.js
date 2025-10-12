import { Router } from "express";
import { getPagos, getPago, createPago, updatePago, deletePago, getPagoEstudiante } from "../controlers/pago";

const router = Router();

/**
 * @swagger
 * /pagos:
 *   get:
 *     summary: Obtener todos los pagos
 *     tags: [Pagos]
 *     responses:
 *       200:
 *         description: Lista de pagos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del pago
 *                   id_estudiante:
 *                     type: integer
 *                     description: ID del estudiante asociado al pago
 *                   monto:
 *                     type: number
 *                     description: Monto del pago
 *                   metodo:
 *                     type: string
 *                     description: Método de pago (ej. transferencia, efectivo, tarjeta)
 *                   comprobante:
 *                     type: string
 *                     description: Identificador o número del comprobante de pago
 *                   fecha:
 *                     type: string
 *                     description: Fecha del pago (formato ISO 8601, ej. YYYY-MM-DD)
 *       500:
 *         description: Error del servidor
 */
router.get("/pagos", getPagos);

/**
 * @swagger
 * /pagos/{id}:
 *   get:
 *     summary: Obtener un pago por su ID
 *     tags: [Pagos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del pago
 *     responses:
 *       200:
 *         description: Pago obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del pago
 *                 id_estudiante:
 *                   type: integer
 *                   description: ID del estudiante asociado al pago
 *                 monto:
 *                   type: number
 *                   description: Monto del pago
 *                 metodo:
 *                   type: string
 *                   description: Método de pago (ej. transferencia, efectivo, tarjeta)
 *                 comprobante:
 *                   type: string
 *                   description: Identificador o número del comprobante de pago
 *                 fecha:
 *                   type: string
 *                   description: Fecha del pago (formato ISO 8601, ej. YYYY-MM-DD)
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/pagos/:id", getPago);

/**
 * @swagger
 * /pagos:
 *   post:
 *     summary: Crear un nuevo pago
 *     tags: [Pagos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_estudiante
 *               - monto
 *               - metodo
 *               - fecha
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *                 description: ID del estudiante asociado al pago
 *               monto:
 *                 type: number
 *                 description: Monto del pago
 *               metodo:
 *                 type: string
 *                 description: Método de pago (ej. transferencia, efectivo, tarjeta)
 *               comprobante:
 *                 type: string
 *                 description: Identificador o número del comprobante de pago
 *               fecha:
 *                 type: string
 *                 description: Fecha del pago (formato ISO 8601, ej. YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Pago creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_estudiante:
 *                   type: integer
 *                 monto:
 *                   type: number
 *                 metodo:
 *                   type: string
 *                 comprobante:
 *                   type: string
 *                 fecha:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/pagos", createPago);

/**
 * @swagger
 * /pagos/{id}:
 *   put:
 *     summary: Actualizar un pago
 *     tags: [Pagos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *                 description: ID del estudiante asociado al pago
 *               monto:
 *                 type: number
 *                 description: Monto del pago
 *               metodo:
 *                 type: string
 *                 description: Método de pago (ej. transferencia, efectivo, tarjeta)
 *               comprobante:
 *                 type: string
 *                 description: Identificador o número del comprobante de pago
 *               fecha:
 *                 type: string
 *                 description: Fecha del pago (formato ISO 8601, ej. YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Pago actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_estudiante:
 *                   type: integer
 *                 monto:
 *                   type: number
 *                 metodo:
 *                   type: string
 *                 comprobante:
 *                   type: string
 *                 fecha:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/pagos/:id", updatePago);

/**
 * @swagger
 * /pagos/{id}:
 *   delete:
 *     summary: Eliminar un pago
 *     tags: [Pagos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del pago
 *     responses:
 *       204:
 *         description: Pago eliminado exitosamente
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/pagos/:id", deletePago);

/**
 * @swagger
 * /pago/estudiante/{id_estudiante}:
 *   get:
 *     summary: Obtener los pagos de un estudiante por su ID
 *     tags: [Pagos]
 *     parameters:
 *       - in: path
 *         name: id_estudiante
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del estudiante
 *     responses:
 *       200:
 *         description: Lista de pagos del estudiante obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del pago
 *                   id_estudiante:
 *                     type: integer
 *                     description: ID del estudiante asociado al pago
 *                   monto:
 *                     type: number
 *                     description: Monto del pago
 *                   metodo:
 *                     type: string
 *                     description: Método de pago (ej. transferencia, efectivo, tarjeta)
 *                   comprobante:
 *                     type: string
 *                     description: Identificador o número del comprobante de pago
 *                   fecha:
 *                     type: string
 *                     description: Fecha del pago (formato ISO 8601, ej. YYYY-MM-DD)
 *       404:
 *         description: Pagos no encontrados para el estudiante
 *       500:
 *         description: Error del servidor
 */
router.get("/pago/estudiante/:id_estudiante", getPagoEstudiante);

export default router;