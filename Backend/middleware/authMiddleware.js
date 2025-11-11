import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = 
           req.cookies.token || req.header("Authorization")?.split(" ")[1];  // "Bearer token"

           if(!token) {
            return res.status(401).json({
                message: "Unauthorized: No token found!"
            });
           }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id)
        req.user = user; 
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: No token found!"
        });
    }
};