import { Router } from "express"; 
import { saveUser, deleteUser, getUsers, getUserCount, getUser, updateUser, registerUser, loginUser, getUserLabReservas, getUserLoanReport, getAdminDashboardData } from "../controlers/users";

const router = Router();

/**
 * @swagger
 * /users:
 * get:
 *  summary: Get all users
 */
router.get("/users", getUsers);

/**
 * @swagger
 * /users/count:
 * get:
 *  summary: Get total number of users
 */
router.get("/users/count", getUserCount);

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
router.get("/users/:id", getUser);

/**
 * @swagger
 * /users:
 * post:
 *  summary: Save a new user
 */
router.post("/users", saveUser);

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
router.delete("/users/:id", deleteUser);

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
router.put("/users/:id", updateUser);

/**
 * @swagger
 * /users/register:
 * post:
 *  summary: Register a new user
 */
router.post("/users/register", registerUser);

/**
 * @swagger
 * /users/login:
 * post:
 *  summary: Login a user
 */
router.post("/users/login", loginUser);

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
router.get("/users/:id/avance-report", getUserLabReservas);

/**
 * @swagger
 * /users/{id}/loan-report:
 * get:
 *  summary: Get a report of loans for a user
 */
router.get("/users/:id/loan-report", getUserLoanReport);

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
router.get("/users/:id/admin/dashboard", getAdminDashboardData);

export default router;