import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getRecieverSocketId, io } from "../config/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const {text, editMessageId } = req.body;
        const userId = req.user?._id;
        const {receiverId} = req.params;

    // Handle Edit Existing Message (Text only)
    if (editMessageId) {
      const updated = await Message.findByIdAndUpdate(
        editMessageId,
        { text, editedAt: Date.now() },
        { new: true }
      ); 

    // Emit real-time update to both users
    const senderSocketId = getRecieverSocketId(userId);
    const receiverSocketId = getRecieverSocketId(receiverId);

    if (senderSocketId) 
        io.to(senderSocketId).emit("messageUpdated", updated);
    if (receiverSocketId) 
        io.to(receiverSocketId).emit("messageUpdated", updated);

      return res.status(200).json({
        success: true,
        message: "Message updated successfully",
        data: updated,
      });
    }
    
    // Handle New Message (text/media)
    let mediaUrl = null; // video/image
    let mediaUrlPublicId = null;
    let mediaType = null; // video/image

    if(req.file) {
        mediaUrl = req.file.path; // cloudinary URL
        mediaUrlPublicId = req.file.filename; // public_id generated
        mediaType = req.file.mimetype.startsWith("video") ? "video" : "image" ;
    }

    const newMessage = new Message({
        senderId: userId,
        receiverId,
        text,
        mediaUrl,
        mediaUrlPublicId,
        mediaType,

    })

    await newMessage.save();

    const senderSocketId = getRecieverSocketId(userId);
    const receiverSocketId = getRecieverSocketId(receiverId);

    // Emit new message to both users in real-time
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
        success: true,
        message: "Message sent Successfully!",
        data: newMessage,
    });

    } catch (error) {
        console.error("sendMessage Error:", error);
        res.status(500).json({
            success: false,
            message: `Something went Wrong : ${error}` ,
        });
    }
};

export const getUsersForChatting = async(req , res) => {
   const loggedInUserId = req.user._id;
   try {
      const filterUsers = await User.find({_id: { $ne: loggedInUserId }});
      if (!filterUsers) {
        return res.status(400).json({
            success: false,
            message: "User not found!",
        });
      }   

      res.status(200).json({
        success: true,
        users: filterUsers,
      });
   } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error with getting all users" + error,
      }); 
   };
};

export const getMessages = async (req, res) => {
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;
    try {
        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId },
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error with getting user messages" + error,
        });
    }
};

export const deleteMessages = async (req, res) => {
  try {
    const { messageIds } = req.body;
    const userId = req.user._id.toString();

    if (!messageIds || !Array.isArray(messageIds)) {
      return res.status(400).json({ success: false, message: "messageIds required" });
    }

    // Delete only messages that belong to the logged-in user (senderId)
    await Message.deleteMany({
      _id: { $in: messageIds },
      senderId: userId
    });

    return res.status(200).json({
      success: true,
      message: "Messages deleted successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};

// PATCH /api/message/:id  (edit text — only sender can edit)
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user?._id;

    const msg = await Message.findById(id);
    if (!msg) return res.status(404).json({ success:false, message:"Message not found" });
    if (msg.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ success:false, message:"Not allowed" });
    }
    if (msg.mediaUrl) {
      return res.status(400).json({ success:false, message:"Only text messages can be edited" });
    }

    msg.text = text;
    msg.editedAt = new Date();
    await msg.save();

    // realtime to both users
    const senderSocketId = getRecieverSocketId(msg.senderId.toString());
    const receiverSocketId = getRecieverSocketId(msg.receiverId.toString());
    if (senderSocketId) io.to(senderSocketId).emit("messageUpdated", msg);
    if (receiverSocketId) io.to(receiverSocketId).emit("messageUpdated", msg);

    res.json({ success:true, message:"Updated", data: msg });
  } catch (err) {
    res.status(500).json({ success:false, message:"Update failed: " + err });
  }
};

// DELETE /api/message/bulk  (delete many by ids — only sender’s messages will be removed)
export const deleteMessagesBulk = async (req, res) => {
  try {
    const { messageIds } = req.body;              // array of ids
    const userId = req.user?._id;

    if (!Array.isArray(messageIds) || messageIds.length === 0) {
      return res.status(400).json({ success:false, message:"messageIds required" });
    }

    // Only delete messages sent by the current user
    const toDelete = await Message.find({ _id: { $in: messageIds }, senderId: userId });
    if (!toDelete.length) {
      return res.json({ success:true, deletedIds: [] });
    }

    const deletedIds = toDelete.map(m => m._id.toString());
    await Message.deleteMany({ _id: { $in: deletedIds } });

    // realtime notify both sides
    // We notify by conversation, so emit to each counterpart as well.
    const counterpartIds = [...new Set(toDelete.map(m => m.receiverId.toString()))];
    const mySocket = getRecieverSocketId(userId.toString());
    counterpartIds.forEach(rid => {
      const other = getRecieverSocketId(rid);
      if (other) io.to(other).emit("messagesDeleted", deletedIds);
    });
    if (mySocket) io.to(mySocket).emit("messagesDeleted", deletedIds);

    res.json({ success:true, deletedIds });
  } catch (err) {
    res.status(500).json({ success:false, message:"Bulk delete failed: " + err });
  }
};

