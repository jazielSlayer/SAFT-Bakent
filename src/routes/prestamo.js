import { Router } from "express"; 
import { saveLoan, deleteLoan, getLoans, getLoanCount, getLoan, updateLoan } from "../controlers/prestamos";
const router = Router();
/**
 * @swagger
 * /prestamos:
 * get:
 *  summary: Get all loans
 */

router.get("/prestamos", getLoans);
/**
 * @swagger
 * /prestamos/count:
 * get:
 *  summary: Get count of all loans
 */
router.get("/prestamos/count", getLoanCount);
/**
 * @swagger
 * /prestamos:
 * get:
 *  summary: Get loan by id
 */
router.get("/prestamos/:id", getLoan);
/**
 * @swagger
 * /prestamos:
 * post:
 *  summary: Create a new loan
 */
router.post("/prestamos", saveLoan);
/**
 * @swagger
 * /prestamos:
 * delete:
 *  summary: delete a loan by id
 */
router.delete("/prestamos/:id", deleteLoan);
/**
 * @swagger
 * /prestamos:
 * put:
 *  summary: Update a loan by id
 */
router.put("/prestamos/:id", updateLoan);
export default router
