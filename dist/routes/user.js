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
 * /users:
 * get:
 *  summary: Get all users
 */
router.get("/users", _users.getUsers);

/**
 * @swagger
 * /users/count:
 * get:
 *  summary: Get total number of users
 */
router.get("/users/count", _users.getUserCount);

/**
 * @swagger
 * /users/{id}:
 * get:
 *  summary: Get a user by id
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router.get("/users/:id", _users.getUser);

/**
 * @swagger
 * /users:
 * post:
 *  summary: Save a new user
 */
router.post("/users", _users.saveUser);

/**
 * @swagger
 * /users/{id}:
 * delete:
 *  summary: Delete a user by id
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router["delete"]("/users/:id", _users.deleteUser);

/**
 * @swagger
 * /users/{id}:
 * put:
 *  summary: Update a user by id
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router.put("/users/:id", _users.updateUser);

/**
 * @swagger
 * /users/register:
 * post:
 *  summary: Register a new user
 */
router.post("/users/register", _users.registerUser);

/**
 * @swagger
 * /users/login:
 * post:
 *  summary: Login a user
 */
router.post("/users/login", _users.loginUser);

/**
 * @swagger
 * /users/{id}/avance-report:
 * get:
 *  summary: Get a report of student progress for a user
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *  responses:
 *    200:
 *      description: Successful response
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              usuario_id:
 *                type: integer
 *              total_avances:
 *                type: integer
 *              avances:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    avance_id:
 *                      type: integer
 *                    numero_matricula:
 *                      type: string
 *                    nombres:
 *                      type: string
 *                    apellidopat:
 *                      type: string
 *                    apellidomat:
 *                      type: string
 *                    modulo_nombre:
 *                      type: string
 *                    responsable:
 *                      type: string
 *                    fecha:
 *                      type: string
 *                    estado:
 *                      type: string
 */
router.get("/users/:id/avance-report", _users.getUserLabReservas);

/**
 * @swagger
 * /users/{id}/loan-report:
 * get:
 *  summary: Get a report of loans for a user
 */
router.get("/users/:id/loan-report", _users.getUserLoanReport);

/**
 * @swagger
 * /users/{id}/admin/dashboard:
 * get:
 *  summary: Get admin dashboard data
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 */
router.get("/users/:id/admin/dashboard", _users.getAdminDashboardData);
var _default = exports["default"] = router;