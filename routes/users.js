const express = require('express')
const router = express.Router()

const userControllers = require('../controllers/users')

// Gets all users
router.get('/', userControllers.listUsers)

// Get specific user
router.get('/:id', userControllers.showUser)

// Submit a new user
router.post('/', userControllers.createUser)

// Update existing user
router.put('/:id', userControllers.updateUser)

// Delete specific user
router.delete('/:id', userControllers.deleteUser)

module.exports = router