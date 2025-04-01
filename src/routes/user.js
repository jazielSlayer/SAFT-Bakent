import { Router } from "express"; 
import { saveUser, deleteUser, getUsers, getUserCount, getUser, updateUser } from "../controlers/users";


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
 * /users/id:
 * get:
 *  summary: Get a user by id
 */

router.get("/users/:id", getUser);

/**
 * @swagger
 * /users:
 * post:
 *  summary: save a new user
 */

router.post("/users", saveUser);
/**
 * @swagger
 * /users:
 * delete:
 *  summary: delet users
 */
router.delete("/users/:id", deleteUser);
/**
 * @swagger
 * /users:
 * put:
 *  summary: update users
 */
router.put("/users/:id", updateUser);
export default router