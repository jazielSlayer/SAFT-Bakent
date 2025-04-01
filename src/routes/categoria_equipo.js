import { Router } from "express"; 
import { saveCategory, deleteCategory, getCategories, getCategoryCount, getCategory, updateCategory } from "../controlers/categoria_equipos";
const router = Router();
/**
 * @swagger
 * /categoria_equipos:
 * get:
 *  summary: Get all categories
 */
router.get("/categoria_equipos", getCategories);
/**
 * @swagger
 * /categoria_equipos/count:
 * get:
 *  summary: Get count of all categories
 */
router.get("/categoria_equipos/count", getCategoryCount);
/**
 * @swagger
 * /categoria_equipos:
 * get:
 *  summary: Get category by id
 */
router.get("/categoria_equipos/:id", getCategory);
/**
 * @swagger
 * /categoria_equipos:
 * post:
 *  summary: Create a new category
 */
router.post("/categoria_equipos", saveCategory);
/**
 * @swagger
 * /categoria_equipos:
 * delete:
 *  summary: delete a category by id
 */
router.delete("/categoria_equipos/:id", deleteCategory);
/**
 * @swagger
 * /categoria_equipos:
 * put:
 *  summary: Update a category by id
 */
router.put("/categoria_equipos/:id", updateCategory);
export default router
