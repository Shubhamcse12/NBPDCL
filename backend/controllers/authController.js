const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
  try {
    const { email, password, captchaInput, captchaServer } = req.body;

    if (captchaInput !== captchaServer) {
      return res.status(400).json({ message: 'Invalid captcha' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: { email: user.email, fullName: user.fullName } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { loginUser };
