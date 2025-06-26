const express = require('express');
const router = express.Router();
const { registerUser,
  getAllUsers,
  updateUserStatus,
  deleteUser, } = require('../controllers/userController');
const { loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');


router.post('/signup', registerUser);
router.post('/login', loginUser); 
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

router.get('/me', protect, async (req, res) => {
  const { fullName, email, status, role } = req.user;
  res.json({ fullName, email, status, userType: role });
});


router.get('/', getAllUsers);
router.put('/:id/status', updateUserStatus);
router.delete('/:id', deleteUser);

module.exports = router;
