import mongoose from "mongoose";

export const connectDB = async  (req, res) => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URL || "");
        console.log("MongoDB Database connected : ", dbConnection.connection.host);
    } catch (error) {
        console.error("Database disconnected", error);
        process.exit(1);
    }
};

export default connectDB;