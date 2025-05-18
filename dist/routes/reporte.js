"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _users = require("../controlers/users");
var router = (0, _express.Router)();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 */
router.get("/users", _users.getUsers);

/**
 * @swagger
 * /users/count:
 *   get:
 *     summary: Get total number of users
 */
router.get("/users/count", _users.getUserCount);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by id
 */
router.get("/users/:id", _users.getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Save a new user
 */
router.post("/users", _users.saveUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 */
router["delete"]("/users/:id", _users.deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 */
router.put("/users/:id", _users.updateUser);
router.post("/users/register", _users.registerUser);
router.post("/users/login", _users.loginUser);

/**
 * @swagger
 * /users/report:
 *   get:
 *     summary: Generate user report
 */
router.get("/users/report", _users.getUserReport); // <-- Nueva ruta de reporte
var _default = exports["default"] = router;