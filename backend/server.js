const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

const app = express();

// ✅ FIXED CORS CONFIG
app.use(cors({
  origin: 'http://localhost:3000', // ✅ Your React app URL
  credentials: true               // ✅ Needed for cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
