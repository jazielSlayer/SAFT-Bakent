"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _equipos = require("../controlers/equipos");
var router = (0, _express.Router)();
/**
 * @swagger
 * /equipos:
 * get:
 *  summary: Get all teams
 */
router.get("/equipos", _equipos.getTeams);
/**
 * @swagger
 * /equipos/count:
 * get:
 *  summary: Get count of all teams
 */
router.get("/equipos/count", _equipos.getTeamCount);
/**
 * @swagger
 * /equipos:
 * get:
 *  summary: Get team by id
 */
router.get("/equipos/:id", _equipos.getTeam);
/**
 * @swagger
 * /equipos:
 * post:
 *  summary: Create a new team
 */
router.post("/equipos", _equipos.saveTeam);
/**
 * @swagger
 * /equipos:
 * delete:
 *  summary: delete a team by id
 */
router["delete"]("/equipos/:id", _equipos.deleteTeam);
/**
 * @swagger
 * /equipos:
 * put:
 *  summary: Update a team by id
 */
router.put("/equipos/:id", _equipos.updateTeam);
var _default = exports["default"] = router;