const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const Chat = require("./Models/chatSchema.js");
require("dotenv").config();

const AuthUser = require("./Routes/Authentication.js");
const getUsers = require("./Routes/getUser.js");
const debateTops = require("./Routes/debate.js");
const chatRoutes = require("./Routes/chats.js");
const notificationRoutes = require("./Routes/notification.js");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Auth end points
app.use("/api", AuthUser);
app.use("/api", getUsers);
app.use("/api", debateTops);
app.use("/api", chatRoutes);
app.use("/api", notificationRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Simple GET request
app.get("/", (req, res) => {
  res.send("Welcome to the debate app");
});

// Start server
const ser = server.listen(PORT, (err) => {
  if (err) {
    console.error("Server failed to start:", err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});

// Socket.IO
const io = new Server(ser, {
  cors: {
    origin: "*", // Allow all origins
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("setup", (userId) => {
    socket.join(userId);
    socket.emit("connected", userId);
    console.log("User connected to socket:", userId);
  });

  socket.on("joinroom", (room) => {
    socket.join(room);
    console.log("User joined room:", room);
  });

  // Listening for messages
  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast to all clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
