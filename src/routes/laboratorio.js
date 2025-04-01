import { Router } from "express"; 
import { saveLaboratory, deleteLaboratory, getLaboratories, getLaboratoryCount, getLaboratory, updateLaboratory } from "../controlers/laboratorios";
const router = Router();
/**
 * @swagger
 * /laboratorios:
 * get:
 *  summary: Get all laboratories
 */
router.get("/laboratorios", getLaboratories);   
/**
 * @swagger
 * /laboratorios/count:
 * get:
 *  summary: Get count of all laboratories
 */
router.get("/laboratorios/count", getLaboratoryCount);
/**
 * @swagger
 * /laboratorios:
 * get:
 *  summary: Get laboratory by id
 */
router.get("/laboratorios/:id", getLaboratory);
/**
 * @swagger
 * /laboratorios:
 * post:
 *  summary: Create a new laboratory
 */
router.post("/laboratorios", saveLaboratory);
/**
 * @swagger
 * /laboratorios:
 * delete:
 *  summary: delete a laboratory by id
 */
router.delete("/laboratorios/:id", deleteLaboratory);
/**
 * @swagger
 * /laboratorios:
 * put:
 *  summary: Update a laboratory by id
 */
router.put("/laboratorios/:id", updateLaboratory);
export default router