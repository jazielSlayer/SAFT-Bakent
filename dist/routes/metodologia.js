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
 *     summary: Obtener todas las metodologías
 *     tags: [Metodologías]
 *     responses:
 *       200:
 *         description: Lista de metodologías obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único de la metodología
 *                   nombre:
 *                     type: string
 *                     description: Nombre de la metodología
 *                   descripcion:
 *                     type: string
 *                     description: Descripción detallada de la metodología
 *                   objetivos:
 *                     type: string
 *                     description: Objetivos de la metodología
 *                   numero_modulos:
 *                     type: integer
 *                     description: Número de módulos que componen la metodología
 *                   fecha_inicio:
 *                     type: string
 *                     description: Fecha de inicio de la metodología (formato ISO 8601, ej. YYYY-MM-DD)
 *                   fecha_finalizacion:
 *                     type: string
 *                     description: Fecha de finalización de la metodología (formato ISO 8601, ej. YYYY-MM-DD)
 *       500:
 *         description: Error del servidor
 */
router.get("/metodologias", _metodologia.getMetodologias);

/**
 * @swagger
 * /metodologias/{id}:
 *   get:
 *     summary: Obtener una metodología por su ID
 *     tags: [Metodologías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la metodología
 *     responses:
 *       200:
 *         description: Metodología obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único de la metodología
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la metodología
 *                 descripcion:
 *                   type: string
 *                   description: Descripción detallada de la metodología
 *                 objetivos:
 *                   type: string
 *                   description: Objetivos de la metodología
 *                 numero_modulos:
 *                   type: integer
 *                   description: Número de módulos que componen la metodología
 *                 fecha_inicio:
 *                   type: string
 *                   description: Fecha de inicio de la metodología (formato ISO 8601, ej. YYYY-MM-DD)
 *                 fecha_finalizacion:
 *                   type: string
 *                   description: Fecha de finalización de la metodología (formato ISO 8601, ej. YYYY-MM-DD)
 *       404:
 *         description: Metodología no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/metodologias/:id", _metodologia.getMetodologia);

/**
 * @swagger
 * /metodologias:
 *   post:
 *     summary: Crear una nueva metodología
 *     tags: [Metodologías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - objetivos
 *               - numero_modulos
 *               - fecha_inicio
 *               - fecha_finalizacion
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la metodología
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada de la metodología
 *               objetivos:
 *                 type: string
 *                 description: Objetivos de la metodología
 *               numero_modulos:
 *                 type: integer
 *                 description: Número de módulos que componen la metodología
 *               fecha_inicio:
 *                 type: string
 *                 description: Fecha de inicio de la metodología (formato ISO 8601, ej. YYYY-MM-DD)
 *               fecha_finalizacion:
 *                 type: string
 *                 description: Fecha de finalización de la metodología (formato ISO 8601, ej. YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Metodología creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 objetivos:
 *                   type: string
 *                 numero_modulos:
 *                   type: integer
 *                 fecha_inicio:
 *                   type: string
 *                 fecha_finalizacion:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/metodologias", _metodologia.createMetodologia);

/**
 * @swagger
 * /metodologias/{id}:
 *   put:
 *     summary: Actualizar una metodología
 *     tags: [Metodologías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la metodología
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la metodología
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada de la metodología
 *               objetivos:
 *                 type: string
 *                 description: Objetivos de la metodología
 *               numero_modulos:
 *                 type: integer
 *                 description: Número de módulos que componen la metodología
 *               fecha_inicio:
 *                 type: string
 *                 description: Fecha de inicio de la metodología (formato ISO 8601, ej. YYYY-MM-DD)
 *               fecha_finalizacion:
 *                 type: string
 *                 description: Fecha de finalización de la metodología (formato ISO 8601, ej. YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Metodología actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 objetivos:
 *                   type: string
 *                 numero_modulos:
 *                   type: integer
 *                 fecha_inicio:
 *                   type: string
 *                 fecha_finalizacion:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Metodología no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put("/metodologias/:id", _metodologia.updateMetodologia);

/**
 * @swagger
 * /metodologias/{id}:
 *   delete:
 *     summary: Eliminar una metodología
 *     tags: [Metodologías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la metodología
 *     responses:
 *       204:
 *         description: Metodología eliminada exitosamente
 *       404:
 *         description: Metodología no encontrada
 *       500:
 *         description: Error del servidor
 */
router["delete"]("/metodologias/:id", _metodologia.deleteMetodologia);
var _default = exports["default"] = router;