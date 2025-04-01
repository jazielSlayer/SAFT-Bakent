"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _prestamos = require("../controlers/prestamos");
var router = (0, _express.Router)();
/**
 * @swagger
 * /prestamos:
 * get:
 *  summary: Get all loans
 */

router.get("/prestamos", _prestamos.getLoans);
/**
 * @swagger
 * /prestamos/count:
 * get:
 *  summary: Get count of all loans
 */
router.get("/prestamos/count", _prestamos.getLoanCount);
/**
 * @swagger
 * /prestamos:
 * get:
 *  summary: Get loan by id
 */
router.get("/prestamos/:id", _prestamos.getLoan);
/**
 * @swagger
 * /prestamos:
 * post:
 *  summary: Create a new loan
 */
router.post("/prestamos", _prestamos.saveLoan);
/**
 * @swagger
 * /prestamos:
 * delete:
 *  summary: delete a loan by id
 */
router["delete"]("/prestamos/:id", _prestamos.deleteLoan);
/**
 * @swagger
 * /prestamos:
 * put:
 *  summary: Update a loan by id
 */
router.put("/prestamos/:id", _prestamos.updateLoan);
var _default = exports["default"] = router;