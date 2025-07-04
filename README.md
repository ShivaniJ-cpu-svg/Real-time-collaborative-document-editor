# 📄 Real-Time Collaborative Document Editor

A real-time document editor that allows multiple users to collaborate on documents simultaneously using WebSockets and Quill. Documents are persisted to MongoDB, and each user is identified by a unique user ID. users with same user id can work in same editor for real -time document editing 

## 🚀 Features

- Real-time collaborative editing using **Socket.IO**
- Rich text editor powered by **Quill.js**
- Auto-save and manual save to **MongoDB Atlas**
- User ID-based document rooms
- Live synchronization between multiple users
- Clean, responsive UI

---

## 🛠️ Tech Stack

**Frontend:**
- React
- React Router
- Quill.js
- Socket.IO Client

**Backend:**
- Node.js
- Express
- Socket.IO
- MongoDB + Mongoose

---

## 📁 Folder Structure
project-root/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.js
│ │ │ └── Editor.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── styles/
│ │ └── Editor.css
│ └── public/
│ └── index.html
│
├── server/ # Node backend
│ ├── models/
│ │ └── Document.js
│ ├── server.js
│ └── .env
│
└── README.md

✅ Prerequisites
Before you begin, ensure you have the following installed on your system:

🔧 Software
Node.js (v14 or higher)
Download Node.js

npm (comes with Node.js)

MongoDB Atlas Account (or local MongoDB instance)
Create a free cluster
Create a .env file in the server/ folder with: MONGO_URI=your_mongodb_connection_string
