"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _permisos = require("../controlers/permisos");
// routes/permissions.js

var router = (0, _express.Router)();

/**
 * @swagger
 * /permissions:
 * get:
 *  summary: Get all permissions
 */
router.get("/permissions", _permisos.getPermissions);

/**
 * @swagger
 * /permissions/{id}:
 * get:
 *  summary: Get a permission by id
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router.get("/permissions/:id", _permisos.getPermission);

/**
 * @swagger
 * /permissions:
 * post:
 *  summary: Create a new permission
 */
router.post("/permissions", _permisos.createPermission);

/**
 * @swagger
 * /permissions/{id}:
 * put:
 *  summary: Update a permission by id
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router.put("/permissions/:id", _permisos.updatePermission);

/**
 * @swagger
 * /permissions/{id}:
 * delete:
 *  summary: Delete a permission by id
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router["delete"]("/permissions/:id", _permisos.deletePermission);

/**
 * @swagger
 * /roles/{roleId}/permissions:
 * get:
 *  summary: Get permissions for a specific role
 *  parameters:
 *    - in: path
 *      name: roleId
 *      required: true
 *      schema:
 *        type: integer
 */
router.get("/roles/:roleId/permissions", _permisos.getPermissionsByRole);

/**
 * @swagger
 * /roles/{roleId}/permissions:
 * post:
 *  summary: Assign a permission to a role
 *  parameters:
 *    - in: path
 *      name: roleId
 *      required: true
 *      schema:
 *        type: integer
 */
router.post("/roles/:roleId/permissions", _permisos.assignPermissionToRole);

/**
 * @swagger
 * /roles/{roleId}/permissions:
 * delete:
 *  summary: Remove a permission from a role
 *  parameters:
 *    - in: path
 *      name: roleId
 *      required: true
 *      schema:
 *        type: integer
 */
router["delete"]("/roles/:roleId/permissions", _permisos.removePermissionFromRole);
var _default = exports["default"] = router;