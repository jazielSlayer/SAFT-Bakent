"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _roles = require("../controlers/roles");
var router = (0, _express.Router)();

/**
 * @swagger
 * /roles:
 * get:
 *  summary: Obtener todos los roles
 */
router.get("/roles", _roles.getRoles);

/**
 * @swagger
 * /roles/{id}:
 * get:
 *  summary: Obtener el rol por ID
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router.get("/roles/:id", _roles.getRole);

/**
 * @swagger
 * /roles:
 * post:
 *  summary: Creamos un nuevo rol
 */
router.post("/roles", _roles.createRole);

/**
 * @swagger
 * /roles/{id}:
 * put:
 *  summary: Actaulizamos un rol por ID
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router.put("/roles/:id", _roles.updateRole);

/**
 * @swagger
 * /roles/{id}:
 * delete:
 *  summary: Eliminamos un rol por ID
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router["delete"]("/roles/:id", _roles.deleteRole);
var _default = exports["default"] = router;