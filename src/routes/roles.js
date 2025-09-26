import { Router } from "express"; 
import { getRoles, getRole, createRole, updateRole, deleteRole } from "../controlers/roles";

const router = Router();

/**
 * @swagger
 * /roles:
 * get:
 *  summary: Get all roles
 */
router.get("/roles", getRoles);

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
router.get("/roles/:id", getRole);

/**
 * @swagger
 * /roles:
 * post:
 *  summary: Create a new role
 */
router.post("/roles", createRole);

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
router.put("/roles/:id", updateRole);

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
router.delete("/roles/:id", deleteRole);

export default router;