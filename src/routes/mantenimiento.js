import { Router } from "express"; 
import { 
    saveMaintenance, 
    deleteMaintenance, 
    getMaintenances, 
    getMaintenanceCount, 
    getMaintenance, 
    updateMaintenance 
} from "../controlers/mantenimientos";

const router = Router();

/**
 * @swagger
 * /mantenimientos:
 *   get:
 *     summary: Get all maintenances
 */
router.get("/mantenimientos", getMaintenances);

/**
 * @swagger
 * /mantenimientos/count:
 *   get:
 *     summary: Get count of all maintenances
 */
router.get("/mantenimientos/count", getMaintenanceCount);

/**
 * @swagger
 * /mantenimientos/{id}:
 *   get:
 *     summary: Get maintenance by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/mantenimientos/:id", getMaintenance);

/**
 * @swagger
 * /mantenimientos:
 *   post:
 *     summary: Create a new maintenance
 */
router.post("/mantenimientos", saveMaintenance);

/**
 * @swagger
 * /mantenimientos/{id}:
 *   delete:
 *     summary: Delete a maintenance by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/mantenimientos/:id", deleteMaintenance);

/**
 * @swagger
 * /mantenimientos/{id}:
 *   put:
 *     summary: Update a maintenance by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/mantenimientos/:id", updateMaintenance);

export default router;