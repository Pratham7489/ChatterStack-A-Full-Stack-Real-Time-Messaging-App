import {Router} from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import uploadToCloudinary from "../middleware/cloudinaryUpload.js";
import {
    getMessages,
    getUsersForChatting,
    sendMessage,
    deleteMessages,
    updateMessage, 
    deleteMessagesBulk
} from "../controllers/message.controllers.js";

const messageRouter = Router();

messageRouter.get(
    "/users",
    authMiddleware, 
    getUsersForChatting
);

messageRouter.get(
    "/:id",
    authMiddleware,
    getMessages
);

messageRouter.post(
    "/send/:receiverId",
    authMiddleware,
    uploadToCloudinary.single("media"),
    sendMessage,
);

messageRouter.delete(
  "/delete",
  authMiddleware,
  deleteMessages
);

messageRouter.patch(
    "/:id", 
    authMiddleware, 
    updateMessage
);

messageRouter.delete(
    "/bulk", 
    authMiddleware, 
    deleteMessagesBulk
);


export default messageRouter;