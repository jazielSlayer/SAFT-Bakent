"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _persona = require("../controlers/persona");
var router = (0, _express.Router)();

/**
 * @swagger
 * /personas:
 *   get:
 *     summary: Get all persons
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
 *                   nombres:
 *                     type: string
 *                   apellidopat:
 *                     type: string
 *                   apellidomat:
 *                     type: string
 *                   carnet:
 *                     type: string
 *                   direccion:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   fecha_nacimiento:
 *                     type: string
 *                   estado:
 *                     type: boolean
 */
router.get("/personas", _persona.getPersonas);

/**
 * @swagger
 * /personas/{id}:
 *   get:
 *     summary: Get a person by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/personas/:id", _persona.getPersona);

/**
 * @swagger
 * /personas:
 *   post:
 *     summary: Create a new person
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidopat:
 *                 type: string
 *               apellidomat:
 *                 type: string
 *               carnet:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               correo:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.post("/personas", _persona.createPersona);

/**
 * @swagger
 * /personas/{id}:
 *   put:
 *     summary: Update a person
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
 *               nombres:
 *                 type: string
 *               apellidopat:
 *                 type: string
 *               apellidomat:
 *                 type: string
 *               carnet:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               correo:
 *                 type: string
 *               fecha_nacimiento:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.put("/personas/:id", _persona.updatePersona);

/**
 * @swagger
 * /personas/{id}:
 *   delete:
 *     summary: Delete a person
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/personas/:id", _persona.deletePersona);
var _default = exports["default"] = router;