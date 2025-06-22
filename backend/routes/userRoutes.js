const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/authController');


router.post('/signup', registerUser);
router.post('/login', loginUser); 

module.exports = router;
