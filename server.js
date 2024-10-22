const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require('./configs/db');
const authRoutes = require("./routes/authRoute")
dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors()); // Gọi hàm cors()
app.use(cookieParser()); // Gọi hàm cookieParser()
app.use(express.json()); // Gọi hàm express.json() để parse JSON

// Test Route
app.get('/', (req, res) => {
    res.send("Hello Express");
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
