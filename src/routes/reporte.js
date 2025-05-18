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
    getUserReport // <-- Nueva función de reporte
} from "../controlers/users";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 */
router.get("/users", getUsers);

/**
 * @swagger
 * /users/count:
 *   get:
 *     summary: Get total number of users
 */
router.get("/users/count", getUserCount);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by id
 */
router.get("/users/:id", getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Save a new user
 */
router.post("/users", saveUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 */
router.delete("/users/:id", deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 */
router.put("/users/:id", updateUser);

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

/**
 * @swagger
 * /users/report:
 *   get:
 *     summary: Generate user report
 */
router.get("/users/report", getUserReport); // <-- Nueva ruta de reporte

export default router