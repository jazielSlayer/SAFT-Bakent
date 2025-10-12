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
 *     summary: Obtener todos los módulos
 *     tags: [Módulos]
 *     responses:
 *       200:
 *         description: Lista de módulos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del módulo
 *                   codigo:
 *                     type: string
 *                     description: Código identificador del módulo
 *                   nombre:
 *                     type: string
 *                     description: Nombre del módulo
 *                   id_docente:
 *                     type: integer
 *                     description: ID del docente asignado al módulo
 *                   id_metodologia:
 *                     type: integer
 *                     description: ID de la metodología asociada al módulo
 *                   duracion:
 *                     type: string
 *                     description: Duración del módulo (ej. '8 semanas')
 *                   descripcion:
 *                     type: string
 *                     description: Descripción detallada del módulo
 *                   fecha_inicio:
 *                     type: string
 *                     description: Fecha de inicio del módulo (formato ISO 8601, ej. YYYY-MM-DD)
 *                   fecha_finalizacion:
 *                     type: string
 *                     description: Fecha de finalización del módulo (formato ISO 8601, ej. YYYY-MM-DD)
 *       500:
 *         description: Error del servidor
 */
router.get("/modulos", _modulo.getModulos);

/**
 * @swagger
 * /modulos/{id}:
 *   get:
 *     summary: Obtener un módulo por su ID
 *     tags: [Módulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del módulo
 *     responses:
 *       200:
 *         description: Módulo obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del módulo
 *                 codigo:
 *                   type: string
 *                   description: Código identificador del módulo
 *                 nombre:
 *                   type: string
 *                   description: Nombre del módulo
 *                 id_docente:
 *                   type: integer
 *                   description: ID del docente asignado al módulo
 *                 id_metodologia:
 *                   type: integer
 *                   description: ID de la metodología asociada al módulo
 *                 duracion:
 *                   type: string
 *                   description: Duración del módulo (ej. '8 semanas')
 *                 descripcion:
 *                   type: string
 *                   description: Descripción detallada del módulo
 *                 fecha_inicio:
 *                   type: string
 *                   description: Fecha de inicio del módulo (formato ISO 8601, ej. YYYY-MM-DD)
 *                 fecha_finalizacion:
 *                   type: string
 *                   description: Fecha de finalización del módulo (formato ISO 8601, ej. YYYY-MM-DD)
 *       404:
 *         description: Módulo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/modulos/:id", _modulo.getModulo);

/**
 * @swagger
 * /modulos:
 *   post:
 *     summary: Crear un nuevo módulo
 *     tags: [Módulos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - nombre
 *               - id_docente
 *               - id_metodologia
 *               - duracion
 *               - fecha_inicio
 *               - fecha_finalizacion
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: Código identificador del módulo
 *               nombre:
 *                 type: string
 *                 description: Nombre del módulo
 *               id_docente:
 *                 type: integer
 *                 description: ID del docente asignado al módulo
 *               id_metodologia:
 *                 type: integer
 *                 description: ID de la metodología asociada al módulo
 *               duracion:
 *                 type: string
 *                 description: Duración del módulo (ej. '8 semanas')
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada del módulo
 *               fecha_inicio:
 *                 type: string
 *                 description: Fecha de inicio del módulo (formato ISO 8601, ej. YYYY-MM-DD)
 *               fecha_finalizacion:
 *                 type: string
 *                 description: Fecha de finalización del módulo (formato ISO 8601, ej. YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Módulo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 codigo:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 id_docente:
 *                   type: integer
 *                 id_metodologia:
 *                   type: integer
 *                 duracion:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 fecha_inicio:
 *                   type: string
 *                 fecha_finalizacion:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/modulos", _modulo.createModulo);

/**
 * @swagger
 * /modulos/{id}:
 *   put:
 *     summary: Actualizar un módulo
 *     tags: [Módulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del módulo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: Código identificador del módulo
 *               nombre:
 *                 type: string
 *                 description: Nombre del módulo
 *               id_docente:
 *                 type: integer
 *                 description: ID del docente asignado al módulo
 *               id_metodologia:
 *                 type: integer
 *                 description: ID de la metodología asociada al módulo
 *               duracion:
 *                 type: string
 *                 description: Duración del módulo (ej. '8 semanas')
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada del módulo
 *               fecha_inicio:
 *                 type: string
 *                 description: Fecha de inicio del módulo (formato ISO 8601, ej. YYYY-MM-DD)
 *               fecha_finalizacion:
 *                 type: string
 *                 description: Fecha de finalización del módulo (formato ISO 8601, ej. YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Módulo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 codigo:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 id_docente:
 *                   type: integer
 *                 id_metodologia:
 *                   type: integer
 *                 duracion:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 fecha_inicio:
 *                   type: string
 *                 fecha_finalizacion:
 *                   type: string
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Módulo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/modulos/:id", _modulo.updateModulo);

/**
 * @swagger
 * /modulos/{id}:
 *   delete:
 *     summary: Eliminar un módulo
 *     tags: [Módulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del módulo
 *     responses:
 *       204:
 *         description: Módulo eliminado exitosamente
 *       404:
 *         description: Módulo no encontrado
 *       500:
 *         description: Error del servidor
 */
router["delete"]("/modulos/:id", _modulo.deleteModulo);
var _default = exports["default"] = router;