"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _users = require("../controlers/users");
var router = (0, _express.Router)();

/**
 * @swagger
 * /users/register:
 * post:
 *  summary: Rgistrar nuevo usuario
 *  tags: [Authentication]
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          required:
 *            - user_name
 *            - email
 *            - password
 *          properties:
 *            user_name:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            per_id:
 *              type: integer
 *            role:
 *              type: string
 *              enum: [Admin, Docente, Estudiante]
 *            nombres:
 *              type: string
 *            apellidopat:
 *              type: string
 *            apellidomat:
 *              type: string
 *            carnet:
 *              type: string
 */
router.post("/users/register", _users.registerUser);

/**
 * @swagger
 * /users/login:
 * post:
 *  summary: Login del usuaro
 *  tags: [Authentication]
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *  responses:
 *    200:
 *      description: formulario de entrada
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              user_name:
 *                type: string
 *              email:
 *                type: string
 *              nombres:
 *                type: string
 *              apellidopat:
 *                type: string
 *              apellidomat:
 *                type: string
 *              carnet:
 *                type: string
 *              id_roles:
 *                type: integer
 *              role:
 *                type: string
 *              start_path:
 *                type: string
 *    401:
 *      description: Credenciales invalidas
 *    403:
 *      description: Usuario inactivo o rol no definido
 *    404:
 *      description: Uusuario no registrado
 */
router.post("/users/login", _users.loginUser);

/**
 * @swagger
 * /users:
 * get:
 *  summary: Obtener todos los datos de los usuarios
 *  tags: [Users]
 *  responses:
 *    200:
 *      description: Lista de usuarios
 */
router.get("/users", _users.getUsers);

/** 
 * @swagger
 * /users/count:
 * get:
 *  summary: Obtener el total de usuarios
 *  tags: [Users]
 *  responses:
 *    200:
 *      description: Total de cuentas de usuarios
 */
router.get("/users/count", _users.getUserCount);

/**
 * @swagger
 * /users/{id}:
 * get:
 *  summary: Obtener la informacion del usuaio por ID
 *  tags: [Users]
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *  responses:
 *    200:
 *      description: Detalles de usuarios
 *    404:
 *      description: Uusario no registrado
 */
router.get("/users/:id", _users.getUser);

/**
 * @swagger
 * /users:
 * post:
 *  summary: Gurdar usuario
 *  tags: [Users]
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *            user_name:
 *              type: string
 *            email:
 *              type: string
 *            nombres:
 *              type: string
 *            apellidopat:
 *              type: string
 *            apellidomat:
 *              type: string
 *            carnet:
 *              type: string
 *            id_roles:
 *              type: integer
 */
router.post("/users", _users.saveUser);

/**
 * @swagger
 * /users/{id}:
 * put:
 *  summary: Actualizar usuario por ID (Incluido el rol)
 *  tags: [Users]
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
 *          properties:
 *            user_name:
 *              type: string
 *            email:
 *              type: string
 *            nombres:
 *              type: string
 *            apellidopat:
 *              type: string
 *            apellidomat:
 *              type: string
 *            carnet:
 *              type: string
 *            id_roles:
 *              type: integer
 */
router.put("/users/:id", _users.updateUser);

/**
 * @swagger
 * /users/{id}:
 * delete:
 *  summary: Eliminacion del usuario (incluido la persona)
 *  tags: [Users]
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *  responses:
 *    200:
 *      description: Usuario eliminado
 *    404:
 *      description: Usuario no encontrado
 */
router["delete"]("/users/:id", _users.deleteUser);
var _default = exports["default"] = router;