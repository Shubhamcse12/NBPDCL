const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');


router.post('/signup', registerUser);
router.post('/login', loginUser); 
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

router.get('/me', protect, async (req, res) => {
  res.json({ userType: 'user' });
});

module.exports = router;
