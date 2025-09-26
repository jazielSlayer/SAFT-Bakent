// routes/permissions.js

import { Router } from "express"; 
import { getPermissions, getPermission, createPermission, updatePermission, deletePermission, getPermissionsByRole, assignPermissionToRole, removePermissionFromRole } from "../controlers/permisos";

const router = Router();

/**
 * @swagger
 * /permissions:
 * get:
 *  summary: Get all permissions
 */
router.get("/permissions", getPermissions);

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
router.get("/permissions/:id", getPermission);

/**
 * @swagger
 * /permissions:
 * post:
 *  summary: Create a new permission
 */
router.post("/permissions", createPermission);

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
router.put("/permissions/:id", updatePermission);

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
router.delete("/permissions/:id", deletePermission);

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
router.get("/roles/:roleId/permissions", getPermissionsByRole);

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
router.post("/roles/:roleId/permissions", assignPermissionToRole);

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
router.delete("/roles/:roleId/permissions", removePermissionFromRole);

export default router;