const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            // Use the new URL parser and unified topology settings for better compatibility
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // Log a success message if the connection is successful
        console.log('MongoDB connected');
    } catch (error) {
        // Log the error message if the connection fails
        console.error('MongoDB connection error:', error);

        process.exit(1);
    }
};

module.exports = connectDB;
