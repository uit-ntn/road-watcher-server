const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require('./configs/db');
const authRoutes = require("./routes/authRoute")
const potholeRoutes = require("./routes/potholeRoute")
dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send("Hello Express");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/potholes', potholeRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
