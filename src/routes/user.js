// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers); // GET /users
router.get('/:id', userController.getUserById); // GET /users/:id
router.post('/', userController.createUser); // POST /users
router.put('/:id', userController.updateUser); // PUT /users/:id
router.delete('/:id', userController.deleteUser); // DELETE /users/:id

module.exports = router;