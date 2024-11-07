const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connectDB } = require('./configs/db');
const authRoutes = require("./routes/authRoute");
const potholeRoutes = require("./routes/potholeRoute");
const mapRoutes = require("./routes/mapRoute");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Kết nối tới MongoDB và khởi động server sau khi kết nối thành công
connectDB().then(() => {
    // Test Route
    app.get('/', (req, res) => {
        res.send("Hello Express");
    });

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/potholes', potholeRoutes);
    app.use('/api/map', mapRoutes);

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});
