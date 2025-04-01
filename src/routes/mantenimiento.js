import { Router } from "express"; 
import { saveMainten, deleteMainten, getMaintenaint, getMaintenCount, getMainten, updateMainten } from "../controlers/mantenimientos";
const router = Router();
/**
 * @swagger
 * /mantenimientos:
 * get:
 *  summary: Get all maintenances
 */
router.get("/mantenimientos", getMaintenaint);
/**
 * @swagger
 * /mantenimientos/count:
 * get:
 *  summary: Get count of all maintenances
 */
router.get("/mantenimientos/count", getMaintenCount);
/**
 * @swagger
 * /mantenimientos:
 * get:
 *  summary: Get maintenance by id
 */
router.get("/mantenimientos/:id", getMainten);
/**
 * @swagger
 * /mantenimientos:
 * post:
 *  summary: Create a new maintenance
 */
router.post("/mantenimientos", saveMainten);
/**
 * @swagger
 * /mantenimientos:
 * delete:
 *  summary: delete a maintenance by id
 */
router.delete("/mantenimientos/:id", deleteMainten);
/**
 * @swagger
 * /mantenimientos:
 * put:
 *  summary: Update a maintenance by id
 */
router.put("/mantenimientos/:id", updateMainten);
export default router
