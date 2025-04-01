"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _laboratorios = require("../controlers/laboratorios");
var router = (0, _express.Router)();
/**
 * @swagger
 * /laboratorios:
 * get:
 *  summary: Get all laboratories
 */
router.get("/laboratorios", _laboratorios.getLaboratories);
/**
 * @swagger
 * /laboratorios/count:
 * get:
 *  summary: Get count of all laboratories
 */
router.get("/laboratorios/count", _laboratorios.getLaboratoryCount);
/**
 * @swagger
 * /laboratorios:
 * get:
 *  summary: Get laboratory by id
 */
router.get("/laboratorios/:id", _laboratorios.getLaboratory);
/**
 * @swagger
 * /laboratorios:
 * post:
 *  summary: Create a new laboratory
 */
router.post("/laboratorios", _laboratorios.saveLaboratory);
/**
 * @swagger
 * /laboratorios:
 * delete:
 *  summary: delete a laboratory by id
 */
router["delete"]("/laboratorios/:id", _laboratorios.deleteLaboratory);
/**
 * @swagger
 * /laboratorios:
 * put:
 *  summary: Update a laboratory by id
 */
router.put("/laboratorios/:id", _laboratorios.updateLaboratory);
var _default = exports["default"] = router;