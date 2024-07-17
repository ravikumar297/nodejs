const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller.js');

// Create a new User
router.post('/users', users.create);

// Retrieve all Users
router.get('/users', users.findAll);

// Retrieve a single User with id
router.get('/user/:id', users.findOne);

// Update a User with id
router.put('/user/:id', users.update);

// Delete a User with id
router.delete('/user/:id', users.delete);

module.exports = router;
