import { Router } from "express"; 
import { saveBooking, deleteBooking, getReservations, getBookingCount, getBooking, updateBooking } from "../controlers/Reservas_laboratorios";
const router = Router();

/**
 * @swagger
 * /reservas_laboratorios:
 * get:
 *  summary: Get all reservations
 */

router.get("/reservas_laboratorios", getReservations);
/**
 * @swagger
 * /reservas_laboratorios/count:
 * get:
 *  summary: Get count of reservations
 */
router.get("/reservas_laboratorios/count", getBookingCount);
/**
 * @swagger
 * /reservas_laboratorios:
 * get:
 *  summary: Get reservation by id
 */
router.get("/reservas_laboratorios/:id", getBooking);
/**
 * @swagger
 * /reservas_laboratorios:
 * post:
 *  summary: Create a new reservation
 */
router.post("/reservas_laboratorios", saveBooking);
/**
 * @sawgger
 * /reservas_laboratorios:
 * delete:
 *  summary: Delete a reservation by id
 */
router.delete("/reservas_laboratorios/:id", deleteBooking);
/**
 * @sawgger
 * /reservas_laboratorios:
 * put:
 *  summary: Update a reservation by id
 */
router.put("/reservas_laboratorios/:id", updateBooking);
export default router
