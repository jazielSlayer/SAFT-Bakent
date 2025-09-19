import { Router } from "express";
import { getPlanteles, getPlantel, createPlantel, updatePlantel, deletePlantel } from "../controlers/plantel_administrativo";

const router = Router();

/**
 * @swagger
 * /planteles:
 *   get:
 *     summary: Get all administrative staff
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   per_id:
 *                     type: integer
 *                   cargo:
 *                     type: string
 *                   unidad:
 *                     type: string
 *                   estado:
 *                     type: boolean
 */
router.get("/planteles", getPlanteles);

/**
 * @swagger
 * /planteles/{id}:
 *   get:
 *     summary: Get an administrative staff member by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/planteles/:id", getPlantel);

/**
 * @swagger
 * /planteles:
 *   post:
 *     summary: Create a new administrative staff member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               per_id:
 *                 type: integer
 *               cargo:
 *                 type: string
 *               unidad:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.post("/planteles", createPlantel);

/**
 * @swagger
 * /planteles/{id}:
 *   put:
 *     summary: Update an administrative staff member
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               per_id:
 *                 type: integer
 *               cargo:
 *                 type: string
 *               unidad:
 *                 type: string
 *               estado:
 *                 type: boolean
 */
router.put("/planteles/:id", updatePlantel);

/**
 * @swagger
 * /planteles/{id}:
 *   delete:
 *     summary: Delete an administrative staff member
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/planteles/:id", deletePlantel);

export default router;