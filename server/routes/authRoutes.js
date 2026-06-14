const express = require('express')
const router = express.Router()
const {signup, login} = require('../controllers/authController')

// reg signup route
router.post('/signup', signup)
// reg login route
router.post('/login', login)

module.exports = router