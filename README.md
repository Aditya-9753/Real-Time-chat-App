# 💬 ChatApp — Real-Time One-to-One Chat Application

A **production-ready**, real-time private messaging application built with React (Vite), Node.js, Express, Socket.io, and MongoDB. It features a premium, WhatsApp-inspired dark UI with instant messaging, online/offline presence tracking, live typing indicators, and real-time message delivery/read receipts.

The project uses **Tailwind CSS v4** combined with a unified CSS design system for optimized performance and a beautiful visual presentation.

---

## ✨ Features

- 🔐 **Passwordless Login** — Users join by entering a unique username (created automatically on first login).
- 💬 **One-to-One Private Chat** — Messages are stored securely and delivered in real-time only to the active recipient.
- 🟢 **Live Presence Tracking** — Socket.io tracks connection state to update online/offline indicators immediately.
- ⌨️ **Real-Time Typing Indicators** — Shows active animated dots when the sender begins typing.
- ✓ **WhatsApp-Style Status Ticks** — Sent (Single Tick) ➔ Delivered (Double Grey Ticks) ➔ Read (Double Blue Ticks).
- 📜 **Chat History** — Automatic loading of past conversation logs from MongoDB on chat selection.
- 🕐 **Timestamps & Date Labels** — Beautiful layout with formatted message times and relative date separators (e.g., "Today", "Yesterday").
- 📜 **Auto Scroll** — Dynamically adjusts scroll view to lock onto the newest messages.
- 🔄 **Resilient Reconnection** — Auto-reconnects socket client on connection drops.
- 🎨 **Sleek Glassmorphism Dark UI** — WhatsApp-inspired colors with modern, tailored animations.
- 📱 **Fully Responsive Layout** — Optimized sidebar and drawer behavior for mobile and desktop screens.
- 🔍 **Real-Time Contact Search** — Instantly filter user list by username.

---

## 🛠 Tech Stack

### Frontend
- **React 19 + Vite 8** — UI component structure & hot-reloading development server
- **Tailwind CSS v4** — Utility-first styles with `@tailwindcss/vite` integration
- **React Router DOM v7** — Core client-side routing & page redirection
- **Socket.io Client** — Event-driven real-time network layer
- **Axios** — Configured instance with custom request interceptors
- **Context API** — Global state orchestration for Auth, Chat, and Sockets

### Backend
- **Node.js + Express 5** — RESTful HTTP router & JSON API layer
- **Socket.io** — Real-time event publisher/subscriber broker
- **MongoDB + Mongoose** — Document store and object data modeling
- **express-validator** — Robust HTTP body payload sanitization and validation
- **dotenv** — Project configuration & environment variables
- **nodemon** — Local live development runner

---

## 📁 Project Structure

```
Realtime-Chat-App/
├── client/                   # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js          # Pre-configured Axios client instance
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── LoginForm.jsx
│   │   │   ├── chat/
│   │   │   │   ├── ChatBody.jsx
│   │   │   │   ├── ChatContainer.jsx
│   │   │   │   ├── ChatHeader.jsx
│   │   │   │   ├── EmptyChat.jsx
│   │   │   │   ├── MessageBubble.jsx
│   │   │   │   ├── MessageInput.jsx
│   │   │   │   ├── MessageStatus.jsx
│   │   │   │   └── TypingIndicator.jsx
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Modal.jsx
│   │   │   └── sidebar/
│   │   │       ├── OnlineBadge.jsx
│   │   │       ├── SearchUser.jsx
│   │   │       ├── Sidebar.jsx
│   │   │       ├── UserCard.jsx
│   │   │       └── UserList.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # Persists user in localStorage & manages login/logout
│   │   │   ├── ChatContext.jsx   # Orchestrates messages, online users list, & socket logic
│   │   │   └── SocketContext.jsx # Initiates the real-time client socket connection
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useAutoScroll.js
│   │   │   ├── useChat.js
│   │   │   ├── useSocket.js
│   │   │   └── useTyping.js
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx    # Responsive split view sidebar layout
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   └── NotFound.jsx
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx     # Route selector (guards private and public views)
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── messageService.js
│   │   │   ├── socketService.js  # Singleton Socket client builder
│   │   │   └── userService.js
│   │   ├── utils/
│   │   │   ├── constants.js      # Consolidated Socket event name mappings
│   │   │   ├── formatTime.js
│   │   │   ├── storage.js
│   │   │   └── validators.js
│   │   ├── index.css             # Unified CSS Design System & Tailwind v4 Directive
│   │   ├── main.jsx              # React app mounting root
│   │   └── App.jsx
│   ├── vite.config.js            # Vite configurations with `@tailwindcss/vite`
│   └── package.json
│
└── server/                   # Node.js REST & WebSockets Server
    ├── src/
    │   ├── config/
    │   │   ├── cors.js           # Server-side CORS configurations
    │   │   ├── database.js       # MongoDB connection initializer
    │   │   └── socket.js         # Socket.io connection constructor
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── messageController.js
    │   │   └── userController.js
    │   ├── middleware/
    │   │   ├── authMiddleware.js
    │   │   ├── errorMiddleware.js
    │   │   ├── notFoundMiddleware.js
    │   │   └── validationMiddleware.js
    │   ├── models/
    │   │   ├── Message.js        # message model (sender, receiver, delivery/read flags)
    │   │   └── User.js           # user model (username, online status, active socket ID)
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── messageRoutes.js
    │   │   └── userRoutes.js
    │   ├── services/
    │   │   ├── authService.js
    │   │   ├── messageService.js
    │   │   ├── socketService.js  # Server-side socket dispatch logic
    │   │   └── userService.js
    │   ├── sockets/
    │   │   ├── chatSocket.js     # Registers real-time Socket event listeners
    │   │   └── socketEvents.js
    │   ├── utils/
    │   │   ├── constants.js
    │   │   ├── formatDate.js
    │   │   ├── logger.js         # Colorful terminal logger helper
    │   │   ├── response.js
    │   │   └── socketUsers.js    # In-memory mapping of active user ID -> socket ID
    │   ├── app.js                # Express app setup
    │   └── server.js             # HTTP and Socket server initiator
    ├── .env
    └── package.json
```

---

## ⚙️ Configuration & Environment Variables

Make sure the following `.env` configurations are set up:

### Server configuration (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/realtime-chat
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client configuration (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## 🚀 Installation & Setup Guide

### 1. Prerequisite Installations
- **Node.js**: v18.0.0 or higher is required.
- **MongoDB**: Installed locally and running on port `27017` (Community Edition), or an active MongoDB Atlas cluster.

### 2. Get Code base
```bash
git clone https://github.com/yourusername/Realtime-Chat-App.git
cd Realtime-Chat-App
```

### 3. Server Startup
```bash
cd server
npm install
# Ensure you configure your server/.env file
npm start
```
The server will run on `http://localhost:5000` with Mongo connected.

### 4. Client Startup
```bash
cd ../client
npm install
# Ensure you configure your client/.env file
npm run dev
```
The client app will launch at `http://localhost:5173`.

---

## 🛰 Real-Time Sockets Event Interface

| Event Name | Type | Payload Structure | Description |
|---|---|---|---|
| `join` | `emit` | `userId` (string) | Sent by client to register active connection mapping on server. |
| `privateMessage` | `emit` | `{ senderId, receiverId, message }` | Emits a new text message to the server. |
| `receivePrivateMessage` | `on` | `{ _id, senderId, receiverId, message, read, delivered, createdAt }` | Receives private messages (both incoming & self-sent echoes). |
| `typing` | `emit` / `on` | `{ senderId, receiverId }` | Relays live typing state status flags. |
| `stopTyping` | `emit` / `on` | `{ senderId, receiverId }` | Signals typing timeout or message dispatch. |
| `messageDelivered` | `on` | `{ messageId }` | Triggers double grey tick confirmation indicators. |
| `messageRead` | `emit` / `on` | `{ senderId, receiverId }` | Marks previous texts as read, changing ticks to double blue. |
| `userOnline` | `on` | `{ userId }` | Broadcaster payload marking contacts online. |
| `userOffline` | `on` | `{ userId }` | Broadcaster payload marking contacts offline. |
