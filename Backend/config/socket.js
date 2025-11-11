import http from 'http'
import { Server } from 'socket.io'
import express from 'express'

const app = express();
const server = http.createServer(app);

const io = new Server(server , {
    cors:{
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    },     
});

// Store online users
const onlineUsers = new Map();

export const getRecieverSocketId = (userId) => {
    return onlineUsers.get(userId?.toString());
};

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    // Store user when they connect
    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        onlineUsers.set(userId, socket.id);
        console.log("User registered:", userId, "Socket:", socket.id);

        // Emit updated online users to all clients
        io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
    }

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
   
       
        // Remove user from online users
        if (userId && userId !== "undefined") {
            onlineUsers.delete(userId);
            console.log("User removed:", userId);

            // Emit updated online users to all clients
            io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
        }
    });    
});

export { app, io, server, onlineUsers };