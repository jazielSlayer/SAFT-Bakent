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
 *  summary: Get all roles
 */
router.get("/roles", _roles.getRoles);

/**
 * @swagger
 * /roles/{id}:
 * get:
 *  summary: Get a role by id
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
 *  summary: Create a new role
 */
router.post("/roles", _roles.createRole);

/**
 * @swagger
 * /roles/{id}:
 * put:
 *  summary: Update a role by id
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
 *  summary: Delete a role by id
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router["delete"]("/roles/:id", _roles.deleteRole);
var _default = exports["default"] = router;