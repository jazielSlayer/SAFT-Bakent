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
 * get:
 *  summary: Get all maintenances
 */
router.get("/mantenimientos", _mantenimientos.getMaintenaint);
/**
 * @swagger
 * /mantenimientos/count:
 * get:
 *  summary: Get count of all maintenances
 */
router.get("/mantenimientos/count", _mantenimientos.getMaintenCount);
/**
 * @swagger
 * /mantenimientos:
 * get:
 *  summary: Get maintenance by id
 */
router.get("/mantenimientos/:id", _mantenimientos.getMainten);
/**
 * @swagger
 * /mantenimientos:
 * post:
 *  summary: Create a new maintenance
 */
router.post("/mantenimientos", _mantenimientos.saveMainten);
/**
 * @swagger
 * /mantenimientos:
 * delete:
 *  summary: delete a maintenance by id
 */
router["delete"]("/mantenimientos/:id", _mantenimientos.deleteMainten);
/**
 * @swagger
 * /mantenimientos:
 * put:
 *  summary: Update a maintenance by id
 */
router.put("/mantenimientos/:id", _mantenimientos.updateMainten);
var _default = exports["default"] = router;