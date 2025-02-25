const mongoose = require("mongoose");

async function connect() {
    try {
        const URL = process.env.MONGODB_URL;
        if (!URL) {
            throw new Error("MONGODB_URL is not defined in environment variables.");
        }

        await mongoose.connect(URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        });

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Database connected successfully");
        });

        connection.on("error", (error) => {
            console.error("Something is wrong in DB connection:", error);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected! Retrying...");
            setTimeout(connect, 5000); // Retry after 5 seconds
        });
    } catch (error) {
        console.error("Something is wrong:", error);
    }
}

module.exports = connect;
