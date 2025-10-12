import { Router } from "express"; 
import { getRoles, getRole, createRole, updateRole, deleteRole } from "../controlers/roles";

const router = Router();

/**
 * @swagger
 * /roles:
 * get:
 *  summary: Obtener todos los roles
 */
router.get("/roles", getRoles);

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
router.get("/roles/:id", getRole);

/**
 * @swagger
 * /roles:
 * post:
 *  summary: Creamos un nuevo rol
 */
router.post("/roles", createRole);

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
router.put("/roles/:id", updateRole);

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
router.delete("/roles/:id", deleteRole);

export default router;