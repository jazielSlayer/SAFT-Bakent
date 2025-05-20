"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _mantenimientos = require("../controlers/mantenimientos");
var router = (0, _express.Router)();

/**
 * @swagger
 * /mantenimientos:
 *   get:
 *     summary: Get all maintenances
 */
router.get("/mantenimientos", _mantenimientos.getMaintenances);

/**
 * @swagger
 * /mantenimientos/count:
 *   get:
 *     summary: Get count of all maintenances
 */
router.get("/mantenimientos/count", _mantenimientos.getMaintenanceCount);

/**
 * @swagger
 * /mantenimientos/{id}:
 *   get:
 *     summary: Get maintenance by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/mantenimientos/:id", _mantenimientos.getMaintenance);

/**
 * @swagger
 * /mantenimientos:
 *   post:
 *     summary: Create a new maintenance
 */
router.post("/mantenimientos", _mantenimientos.saveMaintenance);

/**
 * @swagger
 * /mantenimientos/{id}:
 *   delete:
 *     summary: Delete a maintenance by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router["delete"]("/mantenimientos/:id", _mantenimientos.deleteMaintenance);

/**
 * @swagger
 * /mantenimientos/{id}:
 *   put:
 *     summary: Update a maintenance by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/mantenimientos/:id", _mantenimientos.updateMaintenance);
var _default = exports["default"] = router;