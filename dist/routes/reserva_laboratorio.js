"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Reservas_laboratorios = require("../controlers/Reservas_laboratorios");
var router = (0, _express.Router)();

/**
 * @swagger
 * /reservas_laboratorios:
 * get:
 *  summary: Get all reservations
 */

router.get("/reservas_laboratorios", _Reservas_laboratorios.getReservations);
/**
 * @swagger
 * /reservas_laboratorios/count:
 * get:
 *  summary: Get count of reservations
 */
router.get("/reservas_laboratorios/count", _Reservas_laboratorios.getBookingCount);
/**
 * @swagger
 * /reservas_laboratorios:
 * get:
 *  summary: Get reservation by id
 */
router.get("/reservas_laboratorios/:id", _Reservas_laboratorios.getBooking);
/**
 * @swagger
 * /reservas_laboratorios:
 * post:
 *  summary: Create a new reservation
 */
router.post("/reservas_laboratorios", _Reservas_laboratorios.saveBooking);
/**
 * @sawgger
 * /reservas_laboratorios:
 * delete:
 *  summary: Delete a reservation by id
 */
router["delete"]("/reservas_laboratorios/:id", _Reservas_laboratorios.deleteBooking);
/**
 * @sawgger
 * /reservas_laboratorios:
 * put:
 *  summary: Update a reservation by id
 */
router.put("/reservas_laboratorios/:id", _Reservas_laboratorios.updateBooking);
var _default = exports["default"] = router;