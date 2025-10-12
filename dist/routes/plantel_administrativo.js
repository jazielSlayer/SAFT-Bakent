"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _plantel_administrativo = require("../controlers/plantel_administrativo");
var router = (0, _express.Router)();
/**
 * @swagger
 * /planteles:
 *   get:
 *     summary: Obtener todos los miembros del personal administrativo
 *     tags: [Planteles]
 *     responses:
 *       200:
 *         description: Lista de personal administrativo obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del miembro del personal
 *                   per_id:
 *                     type: integer
 *                     description: ID de la persona asociada al miembro del personal
 *                   cargo:
 *                     type: string
 *                     description: Cargo o rol del miembro del personal
 *                   unidad:
 *                     type: string
 *                     description: Unidad o departamento al que pertenece
 *                   estado:
 *                     type: boolean
 *                     description: Estado activo/inactivo del miembro del personal
 *       500:
 *         description: Error del servidor
 */
router.get("/planteles", _plantel_administrativo.getPlanteles);

/**
 * @swagger
 * /planteles/{id}:
 *   get:
 *     summary: Obtener un miembro del personal administrativo por su ID
 *     tags: [Planteles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del miembro del personal administrativo
 *     responses:
 *       200:
 *         description: Miembro del personal administrativo obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del miembro del personal
 *                 per_id:
 *                   type: integer
 *                   description: ID de la persona asociada
 *                 cargo:
 *                   type: string
 *                   description: Cargo o rol del miembro del personal
 *                 unidad:
 *                   type: string
 *                   description: Unidad o departamento al que pertenece
 *                 estado:
 *                   type: boolean
 *                   description: Estado activo/inactivo del miembro del personal
 *       404:
 *         description: Miembro del personal no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/planteles/:id", _plantel_administrativo.getPlantel);

/**
 * @swagger
 * /planteles:
 *   post:
 *     summary: Crear un nuevo miembro del personal administrativo
 *     tags: [Planteles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - per_id
 *               - cargo
 *               - unidad
 *             properties:
 *               per_id:
 *                 type: integer
 *                 description: ID de la persona asociada al miembro del personal
 *               cargo:
 *                 type: string
 *                 description: Cargo o rol del miembro del personal
 *               unidad:
 *                 type: string
 *                 description: Unidad o departamento al que pertenece
 *               estado:
 *                 type: boolean
 *                 description: Estado activo/inactivo del miembro del personal
 *     responses:
 *       201:
 *         description: Miembro del personal administrativo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 per_id:
 *                   type: integer
 *                 cargo:
 *                   type: string
 *                 unidad:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/planteles", _plantel_administrativo.createPlantel);

/**
 * @swagger
 * /planteles/{id}:
 *   put:
 *     summary: Actualizar un miembro del personal administrativo
 *     tags: [Planteles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del miembro del personal administrativo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               per_id:
 *                 type: integer
 *                 description: ID de la persona asociada al miembro del personal
 *               cargo:
 *                 type: string
 *                 description: Cargo o rol del miembro del personal
 *               unidad:
 *                 type: string
 *                 description: Unidad o departamento al que pertenece
 *               estado:
 *                 type: boolean
 *                 description: Estado activo/inactivo del miembro del personal
 *     responses:
 *       200:
 *         description: Miembro del personal administrativo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 per_id:
 *                   type: integer
 *                 cargo:
 *                   type: string
 *                 unidad:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Miembro del personal no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/planteles/:id", _plantel_administrativo.updatePlantel);

/**
 * @swagger
 * /planteles/{id}:
 *   delete:
 *     summary: Eliminar un miembro del personal administrativo
 *     tags: [Planteles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del miembro del personal administrativo
 *     responses:
 *       204:
 *         description: Miembro del personal administrativo eliminado exitosamente
 *       404:
 *         description: Miembro del personal no encontrado
 *       500:
 *         description: Error del servidor
 */
router["delete"]("/planteles/:id", _plantel_administrativo.deletePlantel);
var _default = exports["default"] = router;