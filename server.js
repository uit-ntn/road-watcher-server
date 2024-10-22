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
app.use(cors);
app.use(cookieParser);
app.use(express.json);

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`)
})