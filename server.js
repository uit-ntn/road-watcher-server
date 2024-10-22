const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// init app
const app = express();



app.listen(8000, () => {
    console.log("Server is running port 8000")
})