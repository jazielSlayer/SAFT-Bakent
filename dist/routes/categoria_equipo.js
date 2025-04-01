"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _categoria_equipos = require("../controlers/categoria_equipos");
var router = (0, _express.Router)();
/**
 * @swagger
 * /categoria_equipos:
 * get:
 *  summary: Get all categories
 */
router.get("/categoria_equipos", _categoria_equipos.getCategories);
/**
 * @swagger
 * /categoria_equipos/count:
 * get:
 *  summary: Get count of all categories
 */
router.get("/categoria_equipos/count", _categoria_equipos.getCategoryCount);
/**
 * @swagger
 * /categoria_equipos:
 * get:
 *  summary: Get category by id
 */
router.get("/categoria_equipos/:id", _categoria_equipos.getCategory);
/**
 * @swagger
 * /categoria_equipos:
 * post:
 *  summary: Create a new category
 */
router.post("/categoria_equipos", _categoria_equipos.saveCategory);
/**
 * @swagger
 * /categoria_equipos:
 * delete:
 *  summary: delete a category by id
 */
router["delete"]("/categoria_equipos/:id", _categoria_equipos.deleteCategory);
/**
 * @swagger
 * /categoria_equipos:
 * put:
 *  summary: Update a category by id
 */
router.put("/categoria_equipos/:id", _categoria_equipos.updateCategory);
var _default = exports["default"] = router;