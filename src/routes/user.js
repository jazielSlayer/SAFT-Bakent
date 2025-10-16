import { Router } from "express"; 
import { saveUser, deleteUser, getUsers, getUserCount, getUser, updateUser, registerUser, loginUser } from "../controlers/users";

const router = Router();


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
router.post("/users/register", registerUser);

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
router.post("/users/login", loginUser);

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
router.get("/users", getUsers);

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
router.get("/users/count", getUserCount);

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
router.get("/users/:id", getUser);

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
router.post("/users", saveUser);

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
router.put("/users/:id", updateUser);

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
router.delete("/users/:id", deleteUser);



export default router;