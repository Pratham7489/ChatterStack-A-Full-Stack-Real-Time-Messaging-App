# ChatterStack — Full-Stack Real-Time Chat Application

ChatterStack is a modern real-time chat application built using the MERN stack with secure authentication, real-time messaging using WebSockets, media sharing (images & videos), profile management, and online user presence detection.

## 🚀 Tech Stack

### Frontend
- React + Vite
- Zustand (Global State)
- Tailwind CSS
- Socket.io Client

### Backend
- Node.js / Express.js
- Socket.io (Real-Time Messaging)
- MongoDB + Mongoose
- Cloudinary (Media Uploads)
- JWT Authentication + Cookies

---

## ✨ Features

- 🔥 Real-time one-to-one chat
- 🟢 Online / Offline user status
- 💬 Edit & delete messages
- 📷 Send images & 🎥 Send videos
- ✍️ Profile update with image upload
- 🗂 Message selection mode
- 🧁 Fully responsive (mobile & desktop UI)
- 🔐 Secure authentication & protected routes

---

## 🛠️ Environment Variables

Create `.env` files in `backend/` and `frontend/`.

### Backend `.env`

PORT=3232
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx


### Frontend `.env`

VITE_SOCKET_URL=http://localhost:3232

---

## ▶️ Run Locally

Clone the repository:

git clone https://github.com/YOUR_USERNAME/chatterstack.git
cd chatterstack

### Backend

cd backend
npm install
npm run dev

### Frontend

cd frontend
npm install
npm run dev

---

## 📸 Screenshots (Add after pushing)
- Chat UI
- Profile Edit Page
- Message Selection Mode

---

## ⭐ Show Some Support
If you like this project, please ⭐ the repo and connect with me on LinkedIn 😄
