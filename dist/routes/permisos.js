"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _permisos = require("../controlers/permisos");
// routes/permissions.js

var router = (0, _express.Router)();

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Obtener todos los permisos
 *     tags: [Permisos]
 *     responses:
 *       200:
 *         description: Lista de permisos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del permiso
 *                   nombre:
 *                     type: string
 *                     description: Nombre del permiso
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del permiso
 *                   estado:
 *                     type: boolean
 *                     description: Estado activo/inactivo del permiso
 *       500:
 *         description: Error del servidor
 */
router.get("/permissions", _permisos.getPermissions);

/**
 * @swagger
 * /permissions/{id}:
 *   get:
 *     summary: Obtener un permiso por su ID
 *     tags: [Permisos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del permiso
 *     responses:
 *       200:
 *         description: Permiso obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del permiso
 *                 nombre:
 *                   type: string
 *                   description: Nombre del permiso
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del permiso
 *                 estado:
 *                   type: boolean
 *                   description: Estado activo/inactivo del permiso
 *       404:
 *         description: Permiso no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/permissions/:id", _permisos.getPermission);

/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Crear un nuevo permiso
 *     tags: [Permisos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del permiso
 *               descripcion:
 *                 type: string
 *                 description: Descripción del permiso
 *               estado:
 *                 type: boolean
 *                 description: Estado activo/inactivo del permiso
 *     responses:
 *       201:
 *         description: Permiso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error del servidor
 */
router.post("/permissions", _permisos.createPermission);

/**
 * @swagger
 * /permissions/{id}:
 *   put:
 *     summary: Actualizar un permiso
 *     tags: [Permisos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del permiso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del permiso
 *               descripcion:
 *                 type: string
 *                 description: Descripción del permiso
 *               estado:
 *                 type: boolean
 *                 description: Estado activo/inactivo del permiso
 *     responses:
 *       200:
 *         description: Permiso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Permiso no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/permissions/:id", _permisos.updatePermission);

/**
 * @swagger
 * /permissions/{id}:
 *   delete:
 *     summary: Eliminar un permiso
 *     tags: [Permisos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del permiso
 *     responses:
 *       204:
 *         description: Permiso eliminado exitosamente
 *       404:
 *         description: Permiso no encontrado
 *       500:
 *         description: Error del servidor
 */
router["delete"]("/permissions/:id", _permisos.deletePermission);

/**
 * @swagger
 * /roles/{roleId}/permissions:
 *   get:
 *     summary: Obtener los permisos asignados a un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del rol
 *     responses:
 *       200:
 *         description: Lista de permisos asignados al rol obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID único del permiso
 *                   nombre:
 *                     type: string
 *                     description: Nombre del permiso
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del permiso
 *                   estado:
 *                     type: boolean
 *                     description: Estado activo/inactivo del permiso
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/roles/:roleId/permissions", _permisos.getPermissionsByRole);

/**
 * @swagger
 * /roles/{roleId}/permissions:
 *   post:
 *     summary: Asignar un permiso a un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permissionId
 *             properties:
 *               permissionId:
 *                 type: integer
 *                 description: ID del permiso a asignar
 *     responses:
 *       201:
 *         description: Permiso asignado al rol exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roleId:
 *                   type: integer
 *                   description: ID del rol
 *                 permissionId:
 *                   type: integer
 *                   description: ID del permiso asignado
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Rol o permiso no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post("/roles/:roleId/permissions", _permisos.assignPermissionToRole);

/**
 * @swagger
 * /roles/{roleId}/permissions:
 *   delete:
 *     summary: Eliminar un permiso de un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permissionId
 *             properties:
 *               permissionId:
 *                 type: integer
 *                 description: ID del permiso a eliminar
 *     responses:
 *       204:
 *         description: Permiso eliminado del rol exitosamente
 *       404:
 *         description: Rol o permiso no encontrado
 *       500:
 *         description: Error del servidor
 */
router["delete"]("/roles/:roleId/permissions", _permisos.removePermissionFromRole);
var _default = exports["default"] = router;