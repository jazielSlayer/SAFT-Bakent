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
 *     summary: Get all administrative staff
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
 *                   per_id:
 *                     type: integer
 *                   cargo:
 *                     type: string
 *                   unidad:
 *                     type: string
 *                   estado:
 *                     type: boolean
 */
router.get("/planteles", _plantel_administrativo.getPlanteles);

/**
 * @swagger
 * /planteles/{id}:
 *   get:
 *     summary: Get an administrative staff member by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/planteles/:id", _plantel_administrativo.getPlantel);

/**
 * @swagger
 * /planteles:
 *   post:
 *     summary: Create a new administrative staff member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               per_id:
 *                 type: integer
 *               cargo:
 *                 type: string
 *               unidad:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.post("/planteles", _plantel_administrativo.createPlantel);

/**
 * @swagger
 * /planteles/{id}:
 *   put:
 *     summary: Update an administrative staff member
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
 *               per_id:
 *                 type: integer
 *               cargo:
 *                 type: string
 *               unidad:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.put("/planteles/:id", _plantel_administrativo.updatePlantel);

/**
 * @swagger
 * /planteles/{id}:
 *   delete:
 *     summary: Delete an administrative staff member
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/planteles/:id", _plantel_administrativo.deletePlantel);
var _default = exports["default"] = router;