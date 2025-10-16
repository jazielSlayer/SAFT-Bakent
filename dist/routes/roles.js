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

/**
 * @swagger
 * /users/{id}/assign-role:
 * post:
 *  summary: Asisgnacion de roles
 *  tags: [Roles]
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          required:
 *            - role_id
 *          properties:
 *            role_id:
 *              type: integer
 *              description: ID de rol asignado
 *  responses:
 *    200:
 *      description: Role asignado
 *    404:
 *      description: Rol de usuario no asignado
 */
router.post("/users/:id/assign-role", _roles.assignRoleToUser);

/**
 * @swagger
 * /users/role-by-email:
 * post:
 *  summary: Obtenr el correo y el rol del usuario por correo
 *  tags: [Users]
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          required:
 *            - email
 *          properties:
 *            email:
 *              type: string
 *              description: Ingresar el email del usuario
 *  responses:
 *    200:
 *      description: email y rol del Usuario
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              role:
 *                type: string
 *    400:
 *      description: Email es requerido
 *    404:
 *      description: Usuario no encontrado
 *    500:
 *      description: Server error
 */
router.post("/users/role-by-email", _roles.getUserRoleByEmail);
router.post("/users/:id/remove-role", _roles.removeRoleFromUser);
var _default = exports["default"] = router;