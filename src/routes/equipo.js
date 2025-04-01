import { Router } from "express"; 
import { saveTeam, deleteTeam, getTeams, getTeamCount, getTeam, updateTeam } from "../controlers/equipos";
const router = Router();
/**
 * @swagger
 * /equipos:
 * get:
 *  summary: Get all teams
 */
router.get("/equipos", getTeams);
/**
 * @swagger
 * /equipos/count:
 * get:
 *  summary: Get count of all teams
 */
router.get("/equipos/count", getTeamCount);
/**
 * @swagger
 * /equipos:
 * get:
 *  summary: Get team by id
 */
router.get("/equipos/:id", getTeam);
/**
 * @swagger
 * /equipos:
 * post:
 *  summary: Create a new team
 */
router.post("/equipos", saveTeam);
/**
 * @swagger
 * /equipos:
 * delete:
 *  summary: delete a team by id
 */
router.delete("/equipos/:id", deleteTeam);
/**
 * @swagger
 * /equipos:
 * put:
 *  summary: Update a team by id
 */
router.put("/equipos/:id", updateTeam);
export default router

