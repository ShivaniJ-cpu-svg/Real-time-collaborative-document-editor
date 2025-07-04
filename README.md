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

MongoDB Atlas Account (or local MongoDB instance)  (Create a free cluster)
Create a .env file in the server/ folder with: MONGO_URI=your_mongodb_connection_string

# Output
<img width="1299" height="718" alt="Image" src="https://github.com/user-attachments/assets/6c550ab0-1f36-4e4b-8b11-383daaa492f8" />
<img width="1294" height="703" alt="Image" src="https://github.com/user-attachments/assets/2da2e029-3e6e-4823-82ea-ea3ca3dd6bc8" />
<img width="1112" height="565" alt="Image" src="https://github.com/user-attachments/assets/1d6cb610-eb0d-4883-9647-20069c7b21b0" />
