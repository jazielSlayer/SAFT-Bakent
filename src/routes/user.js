import { Router } from "express"; 
import { 
    saveUser, 
    deleteUser, 
    getUsers, 
    getUserCount, 
    getUser, 
    updateUser, 
    registerUser, 
    loginUser, 
    assignRoleToUser,
    getRoles, getUserRoleByEmail  
} from "../controlers/users";

const router = Router();

// =====================================================
// AUTENTICACIÓN
// =====================================================

/**
 * @swagger
 * /users/register:
 * post:
 *  summary: Register a new user with role assignment
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
router.post("/users/register", registerUser);

/**
 * @swagger
 * /users/login:
 * post:
 *  summary: Login a user
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
 *      description: Login successful
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
 *      description: Invalid credentials
 *    403:
 *      description: User inactive or no role assigned
 *    404:
 *      description: User not found
 */
router.post("/users/login", loginUser);

// =====================================================
// CRUD DE USUARIOS
// =====================================================

/**
 * @swagger
 * /users:
 * get:
 *  summary: Get all users with their roles
 *  tags: [Users]
 *  responses:
 *    200:
 *      description: List of all users
 */
router.get("/users", getUsers);

/** 
 * @swagger
 * /users/count:
 * get:
 *  summary: Get total number of users
 *  tags: [Users]
 *  responses:
 *    200:
 *      description: Total count of users
 */
router.get("/users/count", getUserCount);

/**
 * @swagger
 * /users/{id}:
 * get:
 *  summary: Get a user by id with role information
 *  tags: [Users]
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *  responses:
 *    200:
 *      description: User details
 *    404:
 *      description: User not found
 */
router.get("/users/:id", getUser);

/**
 * @swagger
 * /users:
 * post:
 *  summary: Save a new user (without password)
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
router.post("/users", saveUser);

/**
 * @swagger
 * /users/{id}:
 * put:
 *  summary: Update a user by id (including role)
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
router.put("/users/:id", updateUser);

/**
 * @swagger
 * /users/{id}:
 * delete:
 *  summary: Delete a user by id (also deletes associated persona)
 *  tags: [Users]
 *  parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *  responses:
 *    200:
 *      description: User deleted successfully
 *    404:
 *      description: User not found
 */
router.delete("/users/:id", deleteUser);

// =====================================================
// GESTIÓN DE ROLES
// =====================================================

/**
 * @swagger
 * /roles:
 * get:
 *  summary: Get all available roles
 *  tags: [Roles]
 *  responses:
 *    200:
 *      description: List of all roles
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                start_path:
 *                  type: string
 *                descripcion:
 *                  type: string
 *                is_default:
 *                  type: boolean
 */
router.get("/roles", getRoles);

/**
 * @swagger
 * /users/{id}/assign-role:
 * post:
 *  summary: Assign a role to a user
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
 *              description: ID of the role to assign
 *  responses:
 *    200:
 *      description: Role assigned successfully
 *    404:
 *      description: User or role not found
 */
router.post("/users/:id/assign-role", assignRoleToUser);

/**
 * @swagger
 * /users/role-by-email:
 * post:
 *  summary: Get user email and role by email
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
 *              description: Email of the user to query
 *  responses:
 *    200:
 *      description: User email and role details
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
 *      description: Email is required and must be a string
 *    404:
 *      description: User not found
 *    500:
 *      description: Server error
 */
router.post("/users/role-by-email", getUserRoleByEmail);



export default router;